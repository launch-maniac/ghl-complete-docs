# Webhook Handler Setup for GHL Documentation

## Overview

This webhook handler automatically processes GoHighLevel documentation updates in real-time, triggering extraction and backup when changes are detected.

## Supported Webhook Types

1. **Canny Changelog** - New feature announcements and updates
2. **Marketplace Documentation** - API documentation changes
3. **API Changes** - Breaking changes and new endpoints
4. **Manual Triggers** - On-demand extraction via webhook

## Architecture

```
GHL/Canny Webhook → Cloud Function → Extraction Scripts → Cloud Storage Backup
                                   ↓
                                Logging
```

## Prerequisites

- Google Cloud Project: `gen-lang-client-0559256237` ✓
- Cloud Functions API enabled ✓
- Cloud Storage bucket: `ghl-docs-backup-202510` ✓
- Service account with Storage Admin permissions

## Deployment

### Step 1: Prepare Function Files

```bash
cd /Users/geoffreyflores/ghl-complete-docs/scripts/cloud

# Create function directory
mkdir -p function-deploy
cp webhook-handler.js function-deploy/index.js
cp webhook-package.json function-deploy/package.json
cd function-deploy
```

### Step 2: Deploy Cloud Function

```bash
gcloud functions deploy handleGHLWebhook \
  --gen2 \
  --runtime nodejs18 \
  --region us-central1 \
  --source . \
  --entry-point handleGHLWebhook \
  --trigger-http \
  --allow-unauthenticated \
  --memory 2GB \
  --timeout 540s \
  --max-instances 5 \
  --project=gen-lang-client-0559256237 \
  --set-env-vars="PROJECT_ID=gen-lang-client-0559256237,BUCKET_NAME=ghl-docs-backup-202510" \
  --service-account=gen-lang-client-0559256237@appspot.gserviceaccount.com
```

### Step 3: Get Function URL

```bash
gcloud functions describe handleGHLWebhook \
  --region us-central1 \
  --project=gen-lang-client-0559256237 \
  --format='value(serviceConfig.uri)'
```

Save this URL - you'll need it to configure webhooks.

### Step 4: Configure Webhook Secret (Optional but Recommended)

```bash
# Generate a secure secret
WEBHOOK_SECRET=$(openssl rand -hex 32)
echo "Webhook Secret: $WEBHOOK_SECRET"

# Update function with secret
gcloud functions deploy handleGHLWebhook \
  --gen2 \
  --runtime nodejs18 \
  --region us-central1 \
  --update-env-vars="WEBHOOK_SECRET=$WEBHOOK_SECRET" \
  --project=gen-lang-client-0559256237
```

Store this secret securely - you'll need it to sign webhook requests.

## Webhook Configuration

### Canny (Changelog)

1. Go to Canny Settings → Integrations → Webhooks
2. Add webhook URL: `https://YOUR_FUNCTION_URL/handleGHLWebhook`
3. Select events: `post.created`, `post.updated`, `post.status_changed`
4. Add custom header: `X-Webhook-Signature: YOUR_WEBHOOK_SECRET`
5. Save and test

### GoHighLevel Marketplace

If GHL provides webhook capabilities:

1. Go to GHL Developer Portal
2. Navigate to Webhooks section
3. Add endpoint: `https://YOUR_FUNCTION_URL/handleGHLWebhook`
4. Select events: `documentation.updated`, `api.changed`
5. Configure signature if available

### Manual Trigger (Testing)

```bash
curl -X POST https://YOUR_FUNCTION_URL/handleGHLWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "trigger": "manual",
    "type": "all",
    "timestamp": "2025-10-12T00:00:00Z"
  }'
```

## Webhook Payload Examples

### Canny Changelog
```json
{
  "object": "entry",
  "id": "abc123",
  "title": "New Voice AI Features",
  "status": "live",
  "created": "2025-10-12T00:00:00Z",
  "url": "https://ideas.gohighlevel.com/changelog/new-voice-ai-features"
}
```

### Marketplace Update
```json
{
  "event": "marketplace.update",
  "source": "marketplace",
  "page": "OAuth Documentation",
  "timestamp": "2025-10-12T00:00:00Z"
}
```

### API Change
```json
{
  "event": "api.change",
  "change_type": "breaking",
  "endpoint": "/v1/contacts",
  "description": "Added required field: email",
  "timestamp": "2025-10-12T00:00:00Z"
}
```

### Manual Trigger
```json
{
  "trigger": "manual",
  "type": "ideas",
  "timestamp": "2025-10-12T00:00:00Z"
}
```

## Testing

### Test Health Check

```bash
curl https://YOUR_FUNCTION_URL/healthCheck
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-12T00:00:00Z",
  "project": "gen-lang-client-0559256237",
  "bucket": "ghl-docs-backup-202510"
}
```

### Test Webhook Processing

```bash
# Test Canny changelog webhook
curl -X POST https://YOUR_FUNCTION_URL/handleGHLWebhook \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: sha256=YOUR_HMAC_SIGNATURE" \
  -d '{
    "object": "entry",
    "id": "test123",
    "title": "Test Entry",
    "status": "live",
    "created": "2025-10-12T00:00:00Z"
  }'
```

### Generate HMAC Signature (for testing)

```bash
echo -n '{"object":"entry","id":"test123"}' | \
  openssl dgst -sha256 -hmac "YOUR_WEBHOOK_SECRET" | \
  awk '{print "sha256="$2}'
```

## Monitoring

### View Function Logs

```bash
# Real-time logs
gcloud functions logs read handleGHLWebhook \
  --region us-central1 \
  --project=gen-lang-client-0559256237 \
  --limit 50 \
  --follow

# Recent logs
gcloud logging read "resource.type=cloud_function AND resource.labels.function_name=handleGHLWebhook" \
  --limit 100 \
  --format json \
  --project=gen-lang-client-0559256237
```

### View Webhook Logs in Cloud Storage

```bash
# List webhook logs
gcloud storage ls gs://ghl-docs-backup-202510/logs/webhooks/

# Download specific log
gcloud storage cp gs://ghl-docs-backup-202510/logs/webhooks/2025-10-12/webhook-*.json ./
```

### View Error Logs

```bash
# List error logs
gcloud storage ls gs://ghl-docs-backup-202510/logs/errors/

# View recent errors
gcloud logging read "resource.type=cloud_function AND severity>=ERROR" \
  --limit 20 \
  --format json \
  --project=gen-lang-client-0559256237
```

## Troubleshooting

### Function Fails to Deploy

```bash
# Check quota limits
gcloud compute project-info describe --project=gen-lang-client-0559256237

# Enable required APIs
gcloud services enable cloudfunctions.googleapis.com \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  --project=gen-lang-client-0559256237
```

### Webhook Returns 401 (Signature Invalid)

- Verify webhook secret matches between sender and function
- Check that signature is being sent in correct header
- Ensure payload is being signed correctly (JSON stringified, HMAC SHA256)

### Extraction Fails

```bash
# Check function has access to extraction scripts
gcloud functions logs read handleGHLWebhook --limit 100

# Verify dependencies are installed
# Check package.json includes all required packages

# Test extraction locally first
npm run extract:ideas
```

### Storage Upload Fails

```bash
# Grant function service account storage permissions
gcloud projects add-iam-policy-binding gen-lang-client-0559256237 \
  --member="serviceAccount:gen-lang-client-0559256237@appspot.gserviceaccount.com" \
  --role="roles/storage.objectAdmin"

# Verify bucket exists and is accessible
gcloud storage ls gs://ghl-docs-backup-202510/
```

## Security

### Webhook Signature Verification

Always verify webhook signatures in production:

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
```

### IP Whitelisting (Optional)

If webhook sources have static IPs, configure VPC connector:

```bash
gcloud compute networks vpc-access connectors create webhook-connector \
  --region us-central1 \
  --range 10.8.0.0/28 \
  --project=gen-lang-client-0559256237

# Update function to use connector
gcloud functions deploy handleGHLWebhook \
  --vpc-connector webhook-connector \
  --egress-settings all \
  --project=gen-lang-client-0559256237
```

### Rate Limiting

Function is configured with `--max-instances 5` to prevent abuse. Adjust as needed:

```bash
gcloud functions deploy handleGHLWebhook \
  --max-instances 10 \
  --min-instances 0 \
  --project=gen-lang-client-0559256237
```

## Cost Estimates

### Per Webhook Event
- Function invocation: $0.0000004/invocation
- Compute time (~30s): $0.000016
- Storage operations: $0.00001
- **Total per webhook**: ~$0.000026

### Monthly Estimates
Assuming 100 webhooks/month:
- Function costs: ~$0.01
- Storage: ~$1.00
- Network egress: ~$0.50
- **Total**: ~$1.50/month

High volume (1000 webhooks/month): ~$5-10/month

## Maintenance

### Update Function Code

```bash
cd /Users/geoffreyflores/ghl-complete-docs/scripts/cloud/function-deploy

# Make changes to index.js
# Then redeploy
gcloud functions deploy handleGHLWebhook \
  --gen2 \
  --runtime nodejs18 \
  --region us-central1 \
  --source . \
  --project=gen-lang-client-0559256237
```

### View Function Metrics

```bash
# Get function details
gcloud functions describe handleGHLWebhook \
  --region us-central1 \
  --project=gen-lang-client-0559256237

# View in Cloud Console
echo "https://console.cloud.google.com/functions/details/us-central1/handleGHLWebhook?project=gen-lang-client-0559256237"
```

### Clean Up Old Logs

```bash
# Delete logs older than 30 days
gcloud storage rm -r gs://ghl-docs-backup-202510/logs/webhooks/2025-09-*
gcloud storage rm -r gs://ghl-docs-backup-202510/logs/errors/2025-09-*
```

## Integration with Existing Workflows

### GitHub Actions Integration

Add webhook trigger to notify on documentation updates:

```yaml
# .github/workflows/webhook-notify.yml
name: Webhook Notify
on:
  push:
    paths:
      - 'content/**'
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger webhook
        run: |
          curl -X POST ${{ secrets.WEBHOOK_URL }} \
            -H "Content-Type: application/json" \
            -d '{"trigger":"manual","type":"all","source":"github"}'
```

### Slack Notifications (Optional)

Add Slack webhook to get notified of documentation updates:

```javascript
// In webhook-handler.js, add:
async function notifySlack(message) {
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (!slackUrl) return;

  await fetch(slackUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `📚 GHL Docs Update: ${message}`
    })
  });
}
```

## Advanced Features

### Webhook Queuing

For high-volume webhooks, use Cloud Tasks:

```bash
gcloud services enable cloudtasks.googleapis.com --project=gen-lang-client-0559256237

# Create task queue
gcloud tasks queues create webhook-queue \
  --location us-central1 \
  --project=gen-lang-client-0559256237
```

### Duplicate Detection

Webhooks are logged with unique IDs to prevent duplicate processing. The handler automatically checks for duplicate webhook IDs in the last 24 hours.

### Retry Logic

Function automatically retries failed extractions up to 3 times with exponential backoff.

## Resources

- [Cloud Functions Documentation](https://cloud.google.com/functions/docs)
- [Webhook Best Practices](https://cloud.google.com/functions/docs/bestpractices/retries)
- [Cloud Storage Client Library](https://cloud.google.com/storage/docs/reference/libraries)
- [Canny Webhooks Documentation](https://developers.canny.io/webhooks)

## Next Steps

1. Deploy the Cloud Function
2. Get the function URL
3. Configure webhooks in Canny/GHL
4. Test with manual triggers
5. Monitor first real webhook
6. Set up Slack notifications (optional)
7. Configure rate limiting if needed

---

**Status**: Code ready, deployment pending
**Created**: 2025-10-12
**Last Updated**: 2025-10-12
**Estimated Setup Time**: 15-20 minutes
