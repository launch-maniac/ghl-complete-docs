# Cloud Scheduler Setup for Automated Extraction

## Overview

This document describes how to set up automated documentation extraction using Google Cloud Scheduler to run the extraction script on a regular schedule.

## Prerequisites

- Google Cloud project: `gen-lang-client-0559256237`
- Cloud Scheduler API enabled ✓
- Cloud Functions API enabled ✓
- Cloud Run API enabled ✓
- Cloud Build API enabled ✓
- Cloud Storage bucket: `ghl-docs-backup-202510` ✓

## Option 1: Cloud Run Job (Recommended)

Cloud Run Jobs are ideal for long-running batch operations like documentation extraction.

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Google Cloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | \
    tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | \
    apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && apt-get install -y google-cloud-sdk

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Make script executable
RUN chmod +x scripts/cloud/scheduled-extraction.sh

# Run the extraction script
CMD ["./scripts/cloud/scheduled-extraction.sh"]
```

### Step 2: Build and Deploy Cloud Run Job

```bash
# Build container image
gcloud builds submit --tag gcr.io/gen-lang-client-0559256237/ghl-docs-extractor \
  --project=gen-lang-client-0559256237

# Create Cloud Run Job
gcloud run jobs create ghl-docs-extraction-job \
  --image gcr.io/gen-lang-client-0559256237/ghl-docs-extractor \
  --region us-central1 \
  --project=gen-lang-client-0559256237 \
  --max-retries 2 \
  --task-timeout 1h \
  --memory 2Gi \
  --cpu 2 \
  --set-env-vars="PROJECT_ID=gen-lang-client-0559256237,NO_EMOJI=true"
```

### Step 3: Create Cloud Scheduler Job

```bash
# Create scheduler to run daily at 12:30 AM PT
gcloud scheduler jobs create http ghl-docs-daily-extraction \
  --location us-central1 \
  --schedule="30 0 * * *" \
  --time-zone="America/Los_Angeles" \
  --uri="https://us-central1-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/gen-lang-client-0559256237/jobs/ghl-docs-extraction-job:run" \
  --http-method POST \
  --oauth-service-account-email="gen-lang-client-0559256237@appspot.gserviceaccount.com" \
  --project=gen-lang-client-0559256237 \
  --description="Daily GHL documentation extraction and backup"
```

### Step 4: Test the Job

```bash
# Manual execution
gcloud run jobs execute ghl-docs-extraction-job \
  --region us-central1 \
  --project=gen-lang-client-0559256237 \
  --wait

# View logs
gcloud run jobs executions logs read \
  --region us-central1 \
  --project=gen-lang-client-0559256237 \
  --limit 100
```

## Option 2: Cloud Functions (Simpler, Time-Limited)

Cloud Functions are simpler but limited to 9 minutes execution time.

### Step 1: Create Function

```javascript
// index.js
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

exports.extractGHLDocs = async (req, res) => {
  console.log('Starting GHL documentation extraction');

  try {
    // Run extraction scripts
    const { stdout: ideas } = await execPromise('npm run extract:ideas');
    console.log('Ideas extracted:', ideas);

    const { stdout: marketplace } = await execPromise('npm run extract:marketplace');
    console.log('Marketplace extracted:', marketplace);

    const { stdout: videos } = await execPromise('npm run extract:videos');
    console.log('Videos extracted:', videos);

    // Backup to Cloud Storage
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `gs://ghl-docs-backup-202510/function-backup-${timestamp}/`;

    await execPromise(`gcloud storage cp -r content ${backupPath}`);

    res.status(200).send({
      success: true,
      timestamp: timestamp,
      backupPath: backupPath
    });
  } catch (error) {
    console.error('Extraction failed:', error);
    res.status(500).send({
      success: false,
      error: error.message
    });
  }
};
```

### Step 2: Deploy Function

```bash
gcloud functions deploy extractGHLDocs \
  --gen2 \
  --runtime nodejs18 \
  --region us-central1 \
  --source . \
  --entry-point extractGHLDocs \
  --trigger-http \
  --memory 2GB \
  --timeout 540s \
  --max-instances 1 \
  --project=gen-lang-client-0559256237
```

### Step 3: Create Scheduler for Function

```bash
# Get function URL
FUNCTION_URL=$(gcloud functions describe extractGHLDocs \
  --region us-central1 \
  --project=gen-lang-client-0559256237 \
  --format='value(serviceConfig.uri)')

# Create scheduler
gcloud scheduler jobs create http ghl-docs-function-trigger \
  --location us-central1 \
  --schedule="30 0 * * *" \
  --time-zone="America/Los_Angeles" \
  --uri="${FUNCTION_URL}" \
  --http-method POST \
  --project=gen-lang-client-0559256237 \
  --description="Daily GHL documentation extraction via Cloud Function"
```

## Option 3: Local Cron (Development)

For development/testing, use local cron:

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 12:30 AM)
30 0 * * * cd /Users/geoffreyflores/ghl-complete-docs && ./scripts/cloud/scheduled-extraction.sh >> /tmp/ghl-extraction.log 2>&1
```

## Schedule Options

### Daily at Midnight PT
```
30 0 * * *
```

### Every 6 Hours
```
0 */6 * * *
```

### Weekly on Sundays at 2 AM PT
```
0 2 * * 0
```

### Every Weekday at 6 AM PT
```
0 6 * * 1-5
```

## Monitoring and Alerts

### View Scheduler Jobs

```bash
# List all scheduler jobs
gcloud scheduler jobs list \
  --location us-central1 \
  --project=gen-lang-client-0559256237

# Describe specific job
gcloud scheduler jobs describe ghl-docs-daily-extraction \
  --location us-central1 \
  --project=gen-lang-client-0559256237
```

### View Execution Logs

```bash
# Cloud Run Job logs
gcloud logging read "resource.type=cloud_run_job AND resource.labels.job_name=ghl-docs-extraction-job" \
  --limit 50 \
  --format json \
  --project=gen-lang-client-0559256237

# Cloud Scheduler logs
gcloud logging read "resource.type=cloud_scheduler_job" \
  --limit 50 \
  --format json \
  --project=gen-lang-client-0559256237
```

### Set Up Alerts

```bash
# Create alert policy for failed executions
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="GHL Docs Extraction Failures" \
  --condition-display-name="Job Failed" \
  --condition-threshold-value=1 \
  --condition-threshold-duration=60s \
  --project=gen-lang-client-0559256237
```

## Cost Estimates

### Cloud Run Jobs (Recommended)
- Execution time: ~15-30 minutes daily
- Memory: 2GB
- CPU: 2 vCPU
- **Estimated cost**: $2-5/month

### Cloud Functions
- Execution time: ~5-9 minutes daily
- Memory: 2GB
- Invocations: ~30/month
- **Estimated cost**: $1-3/month

### Cloud Storage
- Storage: ~100MB
- Operations: ~1000/month
- **Estimated cost**: $0.50-1/month

**Total estimated monthly cost**: $3-9/month

## Troubleshooting

### Job Fails to Start
```bash
# Check service account permissions
gcloud projects get-iam-policy gen-lang-client-0559256237

# Grant necessary roles
gcloud projects add-iam-policy-binding gen-lang-client-0559256237 \
  --member="serviceAccount:gen-lang-client-0559256237@appspot.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"
```

### Extraction Timeouts
- Increase timeout: `--task-timeout 2h` for Cloud Run Jobs
- Split into separate jobs for each extraction type
- Optimize extraction scripts

### Storage Access Issues
```bash
# Grant Cloud Run service account access to bucket
gsutil iam ch \
  serviceAccount:gen-lang-client-0559256237@appspot.gserviceaccount.com:objectAdmin \
  gs://ghl-docs-backup-202510
```

## Manual Execution

### Trigger Scheduler Manually
```bash
gcloud scheduler jobs run ghl-docs-daily-extraction \
  --location us-central1 \
  --project=gen-lang-client-0559256237
```

### Run Script Locally
```bash
cd /Users/geoffreyflores/ghl-complete-docs
./scripts/cloud/scheduled-extraction.sh
```

## Security Best Practices

1. **Service Account**: Use dedicated service account with minimal permissions
2. **Secrets**: Store API keys in Secret Manager, not environment variables
3. **Network**: Use VPC if accessing private resources
4. **Authentication**: Use OAuth for scheduler → Cloud Run communication
5. **Audit Logging**: Enable for all operations

## Next Steps

1. Choose deployment option (Cloud Run Job recommended)
2. Build and deploy container/function
3. Create Cloud Scheduler job
4. Test manual execution
5. Monitor first automated run
6. Set up alerts for failures
7. Document operational procedures

## Resources

- [Cloud Scheduler Documentation](https://cloud.google.com/scheduler/docs)
- [Cloud Run Jobs Documentation](https://cloud.google.com/run/docs/create-jobs)
- [Cloud Functions Documentation](https://cloud.google.com/functions/docs)
- [Cloud Storage Documentation](https://cloud.google.com/storage/docs)

---

**Status**: Configuration ready, deployment pending
**Created**: 2025-10-12
**Last Updated**: 2025-10-12
