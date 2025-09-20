const fs = require('fs-extra');
const path = require('path');
const https = require('https');
const { getEmojiWithSpace } = require('../utils/emoji');

class ErrorMonitoringSystem {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.alertsDir = path.join(__dirname, '../../logs/alerts');
    this.metricsDir = path.join(__dirname, '../../logs/metrics');
    this.configPath = path.join(__dirname, '../../config/monitoring.json');
    
    this.stats = {
      errors: 0,
      warnings: 0,
      info: 0,
      debug: 0,
      startTime: new Date().toISOString()
    };

    this.thresholds = {
      errorRate: 0.05,        // 5% error rate threshold
      responseTime: 30000,    // 30 second response time threshold
      memoryUsage: 0.85,      // 85% memory usage threshold
      consecutiveFailures: 3   // 3 consecutive failures trigger alert
    };

    this.alertChannels = {
      console: true,
      file: true,
      github: true,
      webhook: false  // Set to true if webhook URL configured
    };

    this.initialize();
  }

  async initialize() {
    await fs.ensureDir(this.logDir);
    await fs.ensureDir(this.alertsDir);
    await fs.ensureDir(this.metricsDir);
    
    // Load configuration if exists
    try {
      if (await fs.pathExists(this.configPath)) {
        const config = await fs.readJson(this.configPath);
        Object.assign(this.thresholds, config.thresholds || {});
        Object.assign(this.alertChannels, config.alertChannels || {});
      }
    } catch (error) {
      this.log('warning', 'Failed to load monitoring configuration', { error: error.message });
    }

    // Setup periodic health checks
    setInterval(() => this.runHealthCheck(), 60000); // Every minute
    
    console.log(`${getEmojiWithSpace('🔍', 'INITIALIZED')}Error Monitoring System initialized`);
  }

  log(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      metadata,
      sessionId: process.env.GITHUB_RUN_ID || 'local',
      pid: process.pid
    };

    // Update stats
    this.stats[level.toLowerCase()]++;

    // Console output with colors
    this.logToConsole(logEntry);

    // File logging
    if (this.alertChannels.file) {
      this.logToFile(logEntry);
    }

    // Check if this triggers any alerts
    this.checkAlertConditions(logEntry);

    return logEntry;
  }

  logToConsole(logEntry) {
    const colors = {
      ERROR: '\x1b[31m',   // Red
      WARNING: '\x1b[33m', // Yellow
      INFO: '\x1b[36m',    // Cyan
      DEBUG: '\x1b[37m',   // White
      RESET: '\x1b[0m'
    };

    const color = colors[logEntry.level] || colors.INFO;
    const prefix = `${color}[${logEntry.level}]${colors.RESET}`;
    const timeStr = new Date(logEntry.timestamp).toLocaleTimeString();
    
    console.log(`${prefix} ${timeStr} ${logEntry.message}`);
    
    if (Object.keys(logEntry.metadata).length > 0) {
      console.log(`  ${getEmojiWithSpace('📊', 'METADATA')}Metadata:`, JSON.stringify(logEntry.metadata, null, 2));
    }
  }

  async logToFile(logEntry) {
    try {
      const date = new Date().toISOString().split('T')[0];
      const logFile = path.join(this.logDir, `extraction-${date}.log`);
      
      const logLine = JSON.stringify(logEntry) + '\n';
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  async checkAlertConditions(logEntry) {
    // Critical error detection
    if (logEntry.level === 'ERROR') {
      await this.sendAlert('critical', 'Critical Error Detected', {
        message: logEntry.message,
        metadata: logEntry.metadata,
        timestamp: logEntry.timestamp
      });
    }

    // Rate-based alerts
    const recentLogs = await this.getRecentLogs(300000); // Last 5 minutes
    const errorRate = recentLogs.filter(log => log.level === 'ERROR').length / recentLogs.length;
    
    if (errorRate > this.thresholds.errorRate && recentLogs.length > 10) {
      await this.sendAlert('high', 'High Error Rate Detected', {
        errorRate: (errorRate * 100).toFixed(2) + '%',
        threshold: (this.thresholds.errorRate * 100).toFixed(2) + '%',
        recentErrors: recentLogs.filter(log => log.level === 'ERROR').length,
        totalLogs: recentLogs.length
      });
    }
  }

  async sendAlert(severity, title, details) {
    const alert = {
      id: this.generateAlertId(),
      timestamp: new Date().toISOString(),
      severity,
      title,
      details,
      sessionId: process.env.GITHUB_RUN_ID || 'local',
      resolved: false
    };

    // Save alert to file
    const alertFile = path.join(this.alertsDir, `alert-${alert.id}.json`);
    await fs.writeJson(alertFile, alert, { spaces: 2 });

    // Console notification
    if (this.alertChannels.console) {
      const severityColors = {
        critical: '\x1b[41m\x1b[37m', // Red background, white text
        high: '\x1b[43m\x1b[30m',     // Yellow background, black text
        medium: '\x1b[46m\x1b[30m',   // Cyan background, black text
        low: '\x1b[47m\x1b[30m'       // White background, black text
      };
      
      const color = severityColors[severity] || severityColors.medium;
      console.log(`\n${color} 🚨 ALERT: ${title} ${'\x1b[0m'}`);
      console.log(`📋 Details:`, JSON.stringify(details, null, 2));
      console.log(`⏰ Time: ${alert.timestamp}\n`);
    }

    // GitHub issue creation for critical alerts
    if (this.alertChannels.github && severity === 'critical' && process.env.GITHUB_TOKEN) {
      await this.createGitHubIssue(alert);
    }

    // Webhook notification
    if (this.alertChannels.webhook && process.env.WEBHOOK_URL) {
      await this.sendWebhookAlert(alert);
    }

    return alert;
  }

  async createGitHubIssue(alert) {
    try {
      const issueBody = `
# 🚨 Critical Alert: ${alert.title}

**Alert ID:** \`${alert.id}\`  
**Timestamp:** ${alert.timestamp}  
**Session:** ${alert.sessionId}

## Details
\`\`\`json
${JSON.stringify(alert.details, null, 2)}
\`\`\`

## System Information
- **Run ID:** ${process.env.GITHUB_RUN_ID || 'N/A'}
- **Workflow:** ${process.env.GITHUB_WORKFLOW || 'N/A'}
- **Repository:** ${process.env.GITHUB_REPOSITORY || 'N/A'}

## Resolution Steps
- [ ] Investigate the root cause
- [ ] Check extraction logs for patterns
- [ ] Verify source site availability
- [ ] Update extraction scripts if needed
- [ ] Mark alert as resolved

---
*This issue was automatically created by the Error Monitoring System*
      `;

      const postData = JSON.stringify({
        title: `🚨 Critical Alert: ${alert.title}`,
        body: issueBody,
        labels: ['bug', 'critical', 'automated', 'monitoring']
      });

      await this.makeGitHubRequest('POST', '/repos/' + process.env.GITHUB_REPOSITORY + '/issues', postData);
      
      this.log('info', 'GitHub issue created for critical alert', { alertId: alert.id });
    } catch (error) {
      this.log('error', 'Failed to create GitHub issue', { error: error.message, alertId: alert.id });
    }
  }

  async sendWebhookAlert(alert) {
    try {
      const payload = {
        text: `🚨 ${alert.severity.toUpperCase()} Alert: ${alert.title}`,
        alert,
        system: {
          repository: process.env.GITHUB_REPOSITORY,
          runId: process.env.GITHUB_RUN_ID,
          workflow: process.env.GITHUB_WORKFLOW
        }
      };

      await this.makeHttpRequest(process.env.WEBHOOK_URL, 'POST', JSON.stringify(payload), {
        'Content-Type': 'application/json'
      });

      this.log('info', 'Webhook alert sent', { alertId: alert.id });
    } catch (error) {
      this.log('error', 'Failed to send webhook alert', { error: error.message, alertId: alert.id });
    }
  }

  async runHealthCheck() {
    const healthStatus = {
      timestamp: new Date().toISOString(),
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      stats: { ...this.stats },
      pid: process.pid
    };

    // Memory usage check
    const memoryUsage = healthStatus.memory.heapUsed / healthStatus.memory.heapTotal;
    if (memoryUsage > this.thresholds.memoryUsage) {
      await this.sendAlert('medium', 'High Memory Usage', {
        usage: (memoryUsage * 100).toFixed(2) + '%',
        threshold: (this.thresholds.memoryUsage * 100).toFixed(2) + '%',
        heapUsed: this.formatBytes(healthStatus.memory.heapUsed),
        heapTotal: this.formatBytes(healthStatus.memory.heapTotal)
      });
    }

    // Save health metrics
    const metricsFile = path.join(this.metricsDir, `health-${new Date().toISOString().split('T')[0]}.json`);
    let metrics = [];
    
    try {
      if (await fs.pathExists(metricsFile)) {
        metrics = await fs.readJson(metricsFile);
      }
    } catch (error) {
      // File doesn't exist or is corrupted, start fresh
    }
    
    metrics.push(healthStatus);
    
    // Keep only last 100 entries per day
    if (metrics.length > 100) {
      metrics = metrics.slice(-100);
    }
    
    await fs.writeJson(metricsFile, metrics, { spaces: 2 });
  }

  async getRecentLogs(timeWindowMs) {
    const cutoffTime = Date.now() - timeWindowMs;
    const logs = [];

    try {
      const logFiles = await fs.readdir(this.logDir);
      
      for (const file of logFiles.filter(f => f.endsWith('.log'))) {
        const filePath = path.join(this.logDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        
        const lines = content.trim().split('\n').filter(line => line.trim());
        for (const line of lines) {
          try {
            const logEntry = JSON.parse(line);
            const logTime = new Date(logEntry.timestamp).getTime();
            
            if (logTime >= cutoffTime) {
              logs.push(logEntry);
            }
          } catch (error) {
            // Skip malformed log entries
          }
        }
      }
    } catch (error) {
      this.log('warning', 'Failed to read recent logs', { error: error.message });
    }

    return logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  async generateReport() {
    const report = {
      generated: new Date().toISOString(),
      sessionId: process.env.GITHUB_RUN_ID || 'local',
      stats: { ...this.stats },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      recentAlerts: [],
      healthTrends: []
    };

    // Get recent alerts
    try {
      const alertFiles = await fs.readdir(this.alertsDir);
      const recentAlertFiles = alertFiles
        .filter(f => f.endsWith('.json'))
        .slice(-10); // Last 10 alerts

      for (const file of recentAlertFiles) {
        const alertPath = path.join(this.alertsDir, file);
        const alert = await fs.readJson(alertPath);
        report.recentAlerts.push(alert);
      }
    } catch (error) {
      this.log('warning', 'Failed to load recent alerts for report', { error: error.message });
    }

    // Get health trends
    try {
      const today = new Date().toISOString().split('T')[0];
      const metricsFile = path.join(this.metricsDir, `health-${today}.json`);
      
      if (await fs.pathExists(metricsFile)) {
        const metrics = await fs.readJson(metricsFile);
        report.healthTrends = metrics.slice(-24); // Last 24 health checks
      }
    } catch (error) {
      this.log('warning', 'Failed to load health trends for report', { error: error.message });
    }

    // Save report
    const reportFile = path.join(this.logDir, `monitoring-report-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    await fs.writeJson(reportFile, report, { spaces: 2 });

    this.log('info', 'Monitoring report generated', { 
      reportFile: path.basename(reportFile),
      alertCount: report.recentAlerts.length,
      healthChecks: report.healthTrends.length
    });

    return report;
  }

  generateAlertId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  async makeGitHubRequest(method, endpoint, data = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: endpoint,
        method: method,
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'User-Agent': 'ghl-docs-monitor/1.0.0',
          'Accept': 'application/vnd.github.v3+json'
        }
      };

      if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.headers['Content-Length'] = Buffer.byteLength(data);
      }

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(responseData || '{}'));
          } else {
            reject(new Error(`GitHub API error: ${res.statusCode} ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  }

  async makeHttpRequest(url, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: method,
        headers: {
          'User-Agent': 'ghl-docs-monitor/1.0.0',
          ...headers
        }
      };

      if (data) {
        options.headers['Content-Length'] = Buffer.byteLength(data);
      }

      const req = https.request(options, (res) => {
        let responseData = '';
        res.on('data', chunk => responseData += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData);
          } else {
            reject(new Error(`HTTP error: ${res.statusCode} ${responseData}`));
          }
        });
      });

      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  }

  // Graceful shutdown
  async shutdown() {
    this.log('info', 'Error monitoring system shutting down');
    await this.generateReport();
  }
}

// Export for use in other modules
module.exports = ErrorMonitoringSystem;

// Run standalone monitoring if called directly
if (require.main === module) {
  const monitor = new ErrorMonitoringSystem();
  
  // Example usage
  monitor.log('info', 'Monitoring system started');
  
  // Graceful shutdown handlers
  process.on('SIGINT', async () => {
    await monitor.shutdown();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await monitor.shutdown();
    process.exit(0);
  });
}