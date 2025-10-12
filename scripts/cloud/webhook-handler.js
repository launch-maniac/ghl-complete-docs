/**
 * GHL Complete Docs - Webhook Handler
 *
 * Cloud Function to process GoHighLevel webhooks for:
 * - New changelog entries (from Canny)
 * - Marketplace documentation updates
 * - API changes notifications
 *
 * Automatically triggers extraction and backup when changes are detected.
 */

const { exec } = require('child_process');
const { Storage } = require('@google-cloud/storage');
const crypto = require('crypto');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const PROJECT_ID = process.env.PROJECT_ID || 'gen-lang-client-0559256237';
const BUCKET_NAME = process.env.BUCKET_NAME || 'ghl-docs-backup-202510';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

// Initialize Cloud Storage
const storage = new Storage({ projectId: PROJECT_ID });
const bucket = storage.bucket(BUCKET_NAME);

/**
 * Main webhook handler
 * Entry point for Cloud Function
 */
exports.handleGHLWebhook = async (req, res) => {
  console.log('Received webhook request');
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers));

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log('Rejected: Invalid method');
    return res.status(405).send({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature if secret is configured
    if (WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(req);
      if (!isValid) {
        console.log('Rejected: Invalid signature');
        return res.status(401).send({ error: 'Invalid signature' });
      }
    }

    // Parse webhook payload
    const payload = req.body;
    console.log('Payload:', JSON.stringify(payload));

    // Determine webhook type and handle accordingly
    const webhookType = identifyWebhookType(payload);
    console.log('Webhook type:', webhookType);

    let result;
    switch (webhookType) {
      case 'canny_changelog':
        result = await handleCannyChangelog(payload);
        break;

      case 'marketplace_update':
        result = await handleMarketplaceUpdate(payload);
        break;

      case 'api_change':
        result = await handleAPIChange(payload);
        break;

      case 'manual_trigger':
        result = await handleManualTrigger(payload);
        break;

      default:
        console.log('Unknown webhook type, processing as generic update');
        result = await handleGenericUpdate(payload);
    }

    // Log webhook to Cloud Storage
    await logWebhook(webhookType, payload, result);

    // Return success response
    res.status(200).send({
      success: true,
      type: webhookType,
      timestamp: new Date().toISOString(),
      result: result
    });

  } catch (error) {
    console.error('Webhook processing failed:', error);

    // Log error to Cloud Storage
    await logError(error, req.body);

    res.status(500).send({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Verify webhook signature using HMAC
 */
function verifyWebhookSignature(req) {
  const signature = req.headers['x-webhook-signature'] || req.headers['x-hub-signature-256'];

  if (!signature) {
    console.log('No signature found in headers');
    return false;
  }

  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

/**
 * Identify the type of webhook based on payload structure
 */
function identifyWebhookType(payload) {
  // Canny changelog webhook
  if (payload.object === 'entry' || payload.type === 'post.created') {
    return 'canny_changelog';
  }

  // Marketplace update webhook
  if (payload.event === 'marketplace.update' || payload.source === 'marketplace') {
    return 'marketplace_update';
  }

  // API change notification
  if (payload.event === 'api.change' || payload.type === 'api_update') {
    return 'api_change';
  }

  // Manual trigger
  if (payload.trigger === 'manual' || payload.action === 'extract') {
    return 'manual_trigger';
  }

  return 'unknown';
}

/**
 * Handle Canny changelog webhooks
 */
async function handleCannyChangelog(payload) {
  console.log('Processing Canny changelog update');

  try {
    // Extract changelog entry details
    const entry = {
      id: payload.id || payload.objectID,
      title: payload.title,
      status: payload.status,
      created: payload.created,
      url: payload.url
    };

    console.log('Changelog entry:', entry);

    // Run ideas extraction
    const { stdout } = await execPromise('npm run extract:ideas', {
      cwd: '/workspace',
      env: { ...process.env, NO_EMOJI: 'true' }
    });

    console.log('Ideas extraction output:', stdout);

    // Backup to Cloud Storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `webhook-backup-${timestamp}/`;

    await uploadToStorage('content/ideas/', backupPath + 'ideas/');

    return {
      action: 'extracted_changelog',
      entry: entry,
      backupPath: `gs://${BUCKET_NAME}/${backupPath}`
    };

  } catch (error) {
    console.error('Failed to process changelog:', error);
    throw error;
  }
}

/**
 * Handle marketplace documentation update webhooks
 */
async function handleMarketplaceUpdate(payload) {
  console.log('Processing marketplace documentation update');

  try {
    // Run marketplace extraction
    const { stdout } = await execPromise('npm run extract:marketplace', {
      cwd: '/workspace',
      env: { ...process.env, NO_EMOJI: 'true' }
    });

    console.log('Marketplace extraction output:', stdout);

    // Backup to Cloud Storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `webhook-backup-${timestamp}/`;

    await uploadToStorage('content/marketplace/', backupPath + 'marketplace/');

    return {
      action: 'extracted_marketplace',
      backupPath: `gs://${BUCKET_NAME}/${backupPath}`
    };

  } catch (error) {
    console.error('Failed to process marketplace update:', error);
    throw error;
  }
}

/**
 * Handle API change notification webhooks
 */
async function handleAPIChange(payload) {
  console.log('Processing API change notification');

  try {
    const change = {
      type: payload.change_type,
      endpoint: payload.endpoint,
      description: payload.description,
      timestamp: payload.timestamp
    };

    console.log('API change:', change);

    // Run full extraction to capture all changes
    await execPromise('npm run extract:all', {
      cwd: '/workspace',
      env: { ...process.env, NO_EMOJI: 'true' }
    });

    // Backup everything
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `api-change-backup-${timestamp}/`;

    await uploadToStorage('content/', backupPath + 'content/');

    return {
      action: 'extracted_all',
      change: change,
      backupPath: `gs://${BUCKET_NAME}/${backupPath}`
    };

  } catch (error) {
    console.error('Failed to process API change:', error);
    throw error;
  }
}

/**
 * Handle manual trigger webhooks
 */
async function handleManualTrigger(payload) {
  console.log('Processing manual trigger');

  const extractionType = payload.type || 'all';

  let command;
  switch (extractionType) {
    case 'ideas':
      command = 'npm run extract:ideas';
      break;
    case 'marketplace':
      command = 'npm run extract:marketplace';
      break;
    case 'videos':
      command = 'npm run extract:videos';
      break;
    default:
      command = 'npm run extract:all';
  }

  const { stdout } = await execPromise(command, {
    cwd: '/workspace',
    env: { ...process.env, NO_EMOJI: 'true' }
  });

  console.log('Manual extraction output:', stdout);

  // Backup to Cloud Storage
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `manual-backup-${timestamp}/`;

  await uploadToStorage('content/', backupPath + 'content/');

  return {
    action: 'manual_extraction',
    type: extractionType,
    backupPath: `gs://${BUCKET_NAME}/${backupPath}`
  };
}

/**
 * Handle generic/unknown webhook types
 */
async function handleGenericUpdate(payload) {
  console.log('Processing generic update');

  // For unknown webhooks, just log and run a light extraction
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  return {
    action: 'logged',
    message: 'Webhook received and logged',
    timestamp: timestamp
  };
}

/**
 * Upload directory to Cloud Storage
 */
async function uploadToStorage(localPath, remotePath) {
  console.log(`Uploading ${localPath} to ${remotePath}`);

  try {
    const { stdout } = await execPromise(
      `gcloud storage cp -r ${localPath} gs://${BUCKET_NAME}/${remotePath} --project=${PROJECT_ID}`
    );
    console.log('Upload complete:', stdout);
    return true;
  } catch (error) {
    console.error('Upload failed:', error);
    return false;
  }
}

/**
 * Log webhook event to Cloud Storage
 */
async function logWebhook(type, payload, result) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp: timestamp,
    type: type,
    payload: payload,
    result: result
  };

  const filename = `logs/webhooks/${timestamp.split('T')[0]}/webhook-${Date.now()}.json`;
  const file = bucket.file(filename);

  try {
    await file.save(JSON.stringify(logEntry, null, 2), {
      contentType: 'application/json',
      metadata: {
        webhook_type: type,
        processed_at: timestamp
      }
    });
    console.log('Webhook logged to:', filename);
  } catch (error) {
    console.error('Failed to log webhook:', error);
  }
}

/**
 * Log error to Cloud Storage
 */
async function logError(error, payload) {
  const timestamp = new Date().toISOString();
  const errorEntry = {
    timestamp: timestamp,
    error: {
      message: error.message,
      stack: error.stack
    },
    payload: payload
  };

  const filename = `logs/errors/${timestamp.split('T')[0]}/error-${Date.now()}.json`;
  const file = bucket.file(filename);

  try {
    await file.save(JSON.stringify(errorEntry, null, 2), {
      contentType: 'application/json',
      metadata: {
        error_type: 'webhook_processing',
        occurred_at: timestamp
      }
    });
    console.log('Error logged to:', filename);
  } catch (logError) {
    console.error('Failed to log error:', logError);
  }
}

/**
 * Health check endpoint
 */
exports.healthCheck = async (req, res) => {
  res.status(200).send({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    project: PROJECT_ID,
    bucket: BUCKET_NAME
  });
};
