const VideoTutorialScraper = require('./scripts/extract/video-scraper.js');

// Test the 180-day filtering logic
async function test180DayFilter() {
  console.log('🧪 Testing 180-Day Video Filter Logic...\n');
  
  const scraper = new VideoTutorialScraper();
  
  // Test videos with different ages
  const testVideos = [
    { title: 'New GHL API Features', publishedText: '2 weeks ago', id: 'test1' },
    { title: 'GHL Tutorial: Workflows', publishedText: '3 months ago', id: 'test2' },  
    { title: 'GHL Setup Guide', publishedText: '7 months ago', id: 'test3' },
    { title: 'Recent GHL Update', publishedText: '1 month ago', id: 'test4' }
  ];
  
  // Test date parsing
  console.log('📅 Testing Date Parsing:');
  testVideos.forEach(video => {
    const parsedDate = scraper.parseYouTubeDate(video.publishedText);
    const daysAgo = parsedDate ? Math.floor((Date.now() - parsedDate.getTime()) / (1000 * 60 * 60 * 24)) : 'unknown';
    console.log(`"${video.publishedText}" → ${daysAgo} days ago`);
  });
  
  console.log('\n🚀 Testing 180-Day Filter:');
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 180);
  
  const filteredVideos = testVideos.filter(video => {
    const videoDate = scraper.parseYouTubeDate(video.publishedText);
    const withinRange = !videoDate || videoDate >= cutoffDate;
    console.log(`"${video.title}" (${video.publishedText}) → ${withinRange ? '✅ INCLUDED' : '❌ FILTERED OUT'}`);
    return withinRange;
  });
  
  console.log(`\n📊 Result: ${filteredVideos.length}/${testVideos.length} videos within 180-day window`);
  
  // Test video source configuration
  console.log('\n⚙️ Video Source Configuration:');
  console.log('Official Channel:', scraper.videoSources[0].name);
  console.log('Channel URL:', scraper.videoSources[0].urls[0]);
  console.log('Days Back Filter:', scraper.videoSources[0].daysBack);
  console.log('Priority:', scraper.videoSources[0].priority);
  
  console.log('\n✅ 180-Day Filter Test Complete!');
}

test180DayFilter().catch(console.error);