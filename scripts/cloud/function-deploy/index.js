/**
 * GHL Home Directory Backup - Cloud Function
 *
 * Backs up /Users/geoffreyflores/ to Cloud Storage with smart exclusions
 * Triggered by Cloud Scheduler daily at 12:30 AM PDT
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const PROJECT_ID = 'gen-lang-client-0559256237';
const BUCKET_NAME = 'ghl-docs-backup-202510';
const HOME_DIR = '/Users/geoffreyflores';

// Exclusion patterns (same as scheduled-extraction.sh)
const EXCLUSIONS = [
  'Library/**',
  'node_modules/**',
  '.cache/**',
  '.npm/**',
  '.nvm/**/node_modules/**',
  'Downloads/**',
  'google-cloud-sdk/**',
  '.Trash/**',
  '**/.DS_Store',
  '**/__pycache__/**',
  '**/.pytest_cache/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/.turbo/**',
  '.docker/**',
  '.expo/**',
  '.crawl4ai/**'
];

/**
 * Main Cloud Function entry point
 */
exports.backupHomeDirectory = async (req, res) => {
  const startTime = Date.now();
  console.log('Starting home directory backup');
  console.log(`Timestamp: ${new Date().toISOString()}`);

  try {
    // Generate timestamp for backup path
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupPath = `gs://${BUCKET_NAME}/backup-${timestamp}/home/`;

    console.log(`Backup destination: ${backupPath}`);
    console.log(`Exclusions: ${EXCLUSIONS.length} patterns`);

    // Build exclusion flags
    const excludeFlags = EXCLUSIONS.map(pattern => `--exclude="${pattern}"`).join(' ');

    // Build backup command
    const backupCommand = `gcloud storage cp -r ${HOME_DIR}/ ${backupPath} ${excludeFlags} --project=${PROJECT_ID}`;

    console.log('Starting backup upload...');

    // Execute backup (this will take 20-60 minutes for first backup)
    const { stdout, stderr } = await execPromise(backupCommand, {
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer for output
      timeout: 540000 // 9 minutes max (Cloud Function limit)
    });

    if (stdout) console.log('Backup output:', stdout);
    if (stderr) console.warn('Backup warnings:', stderr);

    // Calculate duration
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Success response
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      backupPath: backupPath,
      duration: `${duration} seconds`,
      exclusions: EXCLUSIONS.length,
      message: 'Home directory backup completed successfully'
    };

    console.log('Backup completed successfully');
    console.log(`Duration: ${duration} seconds`);

    res.status(200).json(response);

  } catch (error) {
    console.error('Backup failed:', error);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Error response
    const errorResponse = {
      success: false,
      timestamp: new Date().toISOString(),
      error: error.message,
      duration: `${duration} seconds`,
      message: 'Home directory backup failed'
    };

    res.status(500).json(errorResponse);
  }
};

/**
 * Health check endpoint
 */
exports.healthCheck = (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    project: PROJECT_ID,
    bucket: BUCKET_NAME,
    homeDir: HOME_DIR
  });
};
