#!/bin/bash
#
# Install cron job for daily home directory backup
# Runs at 12:30 AM PDT daily
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXTRACTION_SCRIPT="${SCRIPT_DIR}/scheduled-extraction.sh"
LOG_FILE="/tmp/ghl-backup-cron.log"

echo "Installing cron job for daily backup..."
echo "Script: ${EXTRACTION_SCRIPT}"
echo "Schedule: Daily at 12:30 AM"

# Make sure extraction script is executable
chmod +x "${EXTRACTION_SCRIPT}"

# Create cron entry
CRON_CMD="30 0 * * * cd /Users/geoffreyflores/ghl-complete-docs && ${EXTRACTION_SCRIPT} >> ${LOG_FILE} 2>&1"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "scheduled-extraction.sh"; then
    echo "Cron job already exists. Removing old entry..."
    crontab -l 2>/dev/null | grep -v "scheduled-extraction.sh" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -

echo ""
echo "✓ Cron job installed successfully!"
echo ""
echo "Schedule: Daily at 12:30 AM (00:30)"
echo "Log file: ${LOG_FILE}"
echo ""
echo "To view current cron jobs:"
echo "  crontab -l"
echo ""
echo "To view backup logs:"
echo "  tail -f ${LOG_FILE}"
echo ""
echo "To manually test the backup:"
echo "  ${EXTRACTION_SCRIPT}"
echo ""
