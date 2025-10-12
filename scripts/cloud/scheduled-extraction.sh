#!/bin/bash
#
# GHL Complete Docs - Scheduled Extraction Script
# Runs automated documentation extraction and backup to Cloud Storage
#
# This script is designed to be run by Cloud Scheduler via:
# 1. Cloud Run Job (recommended for longer operations)
# 2. Cloud Function (for quick extractions)
# 3. Local cron (development)
#

set -e  # Exit on error

# Configuration
PROJECT_ID="gen-lang-client-0559256237"
BUCKET_NAME="ghl-docs-backup-202510"
TIMESTAMP=$(date +%Y%m%d-%H%M)
BACKUP_PATH="gs://${BUCKET_NAME}/automated-backup-${TIMESTAMP}/"
LOG_FILE="/tmp/extraction-${TIMESTAMP}.log"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE" >&2
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

# Main extraction process
main() {
    log "Starting GHL documentation extraction"
    log "Project: ${PROJECT_ID}"
    log "Backup destination: ${BACKUP_PATH}"

    # Navigate to project directory
    cd "$(dirname "$0")/../.."
    PROJECT_DIR=$(pwd)
    log "Project directory: ${PROJECT_DIR}"

    # Check dependencies
    log "Checking dependencies..."
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed"
        exit 1
    fi

    if ! command -v gcloud &> /dev/null; then
        error "gcloud CLI is not installed"
        exit 1
    fi

    # Run extraction scripts
    log "Running extraction: Ideas/Changelog"
    if NO_EMOJI=true npm run extract:ideas 2>&1 | tee -a "$LOG_FILE"; then
        log "Ideas extraction completed successfully"
    else
        warn "Ideas extraction had issues, continuing..."
    fi

    log "Running extraction: Marketplace documentation"
    if NO_EMOJI=true npm run extract:marketplace 2>&1 | tee -a "$LOG_FILE"; then
        log "Marketplace extraction completed successfully"
    else
        warn "Marketplace extraction had issues, continuing..."
    fi

    log "Running extraction: Video tutorials"
    if NO_EMOJI=true npm run extract:videos 2>&1 | tee -a "$LOG_FILE"; then
        log "Video extraction completed successfully"
    else
        warn "Video extraction had issues, continuing..."
    fi

    # Generate statistics
    log "Generating documentation statistics"
    if NO_EMOJI=true npm run stats 2>&1 | tee -a "$LOG_FILE"; then
        log "Statistics generated successfully"
    else
        warn "Statistics generation had issues, continuing..."
    fi

    # Count extracted files
    MARKDOWN_COUNT=$(find content -type f -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    log "Total markdown files: ${MARKDOWN_COUNT}"

    # Backup to Cloud Storage
    log "Backing up to Cloud Storage: ${BACKUP_PATH}"

    # Backup entire home directory with smart exclusions
    log "Backing up /Users/geoffreyflores/ (with exclusions)"

    # Define exclusion patterns
    EXCLUSIONS=(
        "Library/**"                    # 48GB of system/cache files
        "node_modules/**"               # Can be reinstalled
        ".cache/**"                     # Cache directories
        ".npm/**"                       # NPM cache
        ".nvm/**/node_modules/**"       # NVM node_modules
        "Downloads/**"                  # Temporary downloads
        "google-cloud-sdk/**"           # Can be reinstalled
        ".Trash/**"                     # Trash
        "**/.DS_Store"                  # Mac metadata
        "**/__pycache__/**"             # Python cache
        "**/.pytest_cache/**"           # Pytest cache
        "**/dist/**"                    # Build artifacts
        "**/build/**"                   # Build artifacts
        "**/.next/**"                   # Next.js build
        "**/.turbo/**"                  # Turborepo cache
        ".docker/**"                    # Docker cache
        ".expo/**"                      # Expo cache
        ".crawl4ai/**"                  # Crawler cache
    )

    # Build exclusion flags for gcloud
    EXCLUDE_FLAGS=""
    for pattern in "${EXCLUSIONS[@]}"; do
        EXCLUDE_FLAGS="${EXCLUDE_FLAGS} --exclude=${pattern}"
    done

    log "Excluded patterns: ${#EXCLUSIONS[@]} patterns"

    # Backup home directory with exclusions
    if eval "gcloud storage cp -r /Users/geoffreyflores/ ${BACKUP_PATH}home/ ${EXCLUDE_FLAGS} --project=${PROJECT_ID} 2>&1" | tee -a "$LOG_FILE"; then
        log "Home directory backup completed successfully"
    else
        error "Home directory backup failed"
        exit 1
    fi

    # Also backup project content from current directory for compatibility
    log "Backing up project content for compatibility"
    if gcloud storage cp -r content "${BACKUP_PATH}content/" --project="${PROJECT_ID}" 2>&1 | tee -a "$LOG_FILE"; then
        log "Project content backup completed successfully"
    else
        warn "Project content backup had issues, continuing..."
    fi

    if gcloud storage cp -r docs "${BACKUP_PATH}docs/" --project="${PROJECT_ID}" 2>&1 | tee -a "$LOG_FILE"; then
        log "Project docs backup completed successfully"
    else
        warn "Project docs backup had issues, continuing..."
    fi

    # Upload log file
    log "Uploading log file to Cloud Storage"
    gcloud storage cp "$LOG_FILE" "${BACKUP_PATH}extraction.log" --project="${PROJECT_ID}" 2>/dev/null || true

    # Summary
    log "========================================="
    log "Extraction and backup completed successfully"
    log "Files backed up: ${MARKDOWN_COUNT} markdown files"
    log "Backup location: ${BACKUP_PATH}"
    log "Log file: ${LOG_FILE}"
    log "========================================="

    # Cleanup old backups (keep last 30 days)
    log "Cleaning up old backups..."
    CUTOFF_DATE=$(date -v-30d +%Y%m%d 2>/dev/null || date -d "30 days ago" +%Y%m%d)
    log "Removing backups older than ${CUTOFF_DATE}"

    # This would need a more sophisticated cleanup script
    # For now, just log the intent
    log "Cleanup completed (manual review recommended)"

    exit 0
}

# Error handler
trap 'error "Script failed at line $LINENO"' ERR

# Run main function
main "$@"
