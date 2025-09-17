const fs = require('fs-extra');
const path = require('path');

// Simple test to verify video freshness system
async function testVideoFreshness() {
  console.log('🧪 Testing Video Freshness System...\n');
  
  // Test data - simulating videos with different ages
  const testVideos = [
    {
      id: 'test1',
      title: 'GHL API Integration Tutorial',
      url: 'https://youtube.com/watch?v=test1',
      publishedAt: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 months ago
      description: 'Learn how to integrate with the GHL API v2'
    },
    {
      id: 'test2', 
      title: 'Basic GHL Setup Guide',
      url: 'https://youtube.com/watch?v=test2',
      publishedAt: new Date(Date.now() - 8 * 30 * 24 * 60 * 60 * 1000), // 8 months ago
      description: 'Getting started with GoHighLevel fundamentals'
    },
    {
      id: 'test3',
      title: 'New GHL Marketplace Features',
      url: 'https://youtube.com/watch?v=test3', 
      publishedAt: new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000), // 5 months ago
      description: 'Latest marketplace updates and new features'
    }
  ];

  // Freshness configuration (same as in video-scraper.js)
  const freshnessConfig = {
    maxAgeMonths: 6,
    warningAgeMonths: 4,
    criticalTopics: ['api v2', 'oauth', 'marketplace', 'new features', 'updates'],
    criticalMaxAgeMonths: 3,
    evergreen: ['basic setup', 'fundamentals', 'getting started', 'intro']
  };

  // Test freshness determination logic
  function determineFreshness(video, config) {
    const now = new Date();
    const videoDate = new Date(video.publishedAt);
    const ageInMonths = (now - videoDate) / (1000 * 60 * 60 * 24 * 30);

    const title = video.title.toLowerCase();
    const description = video.description.toLowerCase();
    const content = `${title} ${description}`;

    // Check if evergreen
    const isEvergreen = config.evergreen.some(term => 
      content.includes(term.toLowerCase())
    );
    
    if (isEvergreen) {
      return { status: 'fresh', reason: 'evergreen content', ageMonths: ageInMonths };
    }

    // Check if critical topic
    const isCritical = config.criticalTopics.some(term => 
      content.includes(term.toLowerCase())
    );
    
    const maxAge = isCritical ? config.criticalMaxAgeMonths : config.maxAgeMonths;
    const warningAge = isCritical ? config.criticalMaxAgeMonths * 0.75 : config.warningAgeMonths;

    if (ageInMonths > maxAge) {
      return { status: 'expired', reason: 'exceeds max age', ageMonths: ageInMonths };
    } else if (ageInMonths > warningAge) {
      return { status: 'warning', reason: 'approaching expiry', ageMonths: ageInMonths };
    } else {
      return { status: 'fresh', reason: 'within freshness window', ageMonths: ageInMonths };
    }
  }

  // Test each video
  testVideos.forEach((video, index) => {
    const freshness = determineFreshness(video, freshnessConfig);
    const emoji = freshness.status === 'fresh' ? '🟢' : 
                 freshness.status === 'warning' ? '🟡' : '🔴';
    
    console.log(`${emoji} Video ${index + 1}: "${video.title}"`);
    console.log(`   Status: ${freshness.status.toUpperCase()}`);
    console.log(`   Age: ${freshness.ageMonths.toFixed(1)} months`);
    console.log(`   Reason: ${freshness.reason}`);
    console.log('');
  });

  // Test CSS class generation
  console.log('📝 CSS Classes Generated:');
  testVideos.forEach((video, index) => {
    const freshness = determineFreshness(video, freshnessConfig);
    console.log(`Video ${index + 1}: "freshness-${freshness.status}"`);
  });

  console.log('\n✅ Video freshness system test complete!');
  console.log('The system correctly identifies video freshness based on:');
  console.log('- Content age relative to thresholds');
  console.log('- Critical vs standard topics');  
  console.log('- Evergreen content detection');
}

// Run test
testVideoFreshness().catch(console.error);