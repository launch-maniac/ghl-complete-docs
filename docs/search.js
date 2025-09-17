// Basic Search Functionality for GHL Documentation
let searchData = [];
let searchResults = [];

// Initialize search system
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

async function initializeSearch() {
    console.log('🚀 Initializing search system...');
    try {
        // Load search data
        console.log('📡 Fetching search index from ./data/search-index.json');
        const response = await fetch('./data/search-index.json');
        console.log('📡 Fetch response status:', response.status, response.ok);
        
        if (response.ok) {
            searchData = await response.json();
            console.log(`✅ Search index loaded: ${searchData.length} documents`);
            console.log('📄 Sample document:', searchData[0]);
        } else {
            console.log('⚠️ Search index not found, using fallback data');
            searchData = getFallbackSearchData();
        }
        
        // Update stats
        updateSearchStats();
        console.log('✅ Search initialization complete');
    } catch (error) {
        console.error('❌ Failed to load search data:', error);
        searchData = getFallbackSearchData();
        updateSearchStats();
        console.log('✅ Search initialization complete with fallback data');
    }
}

function getFallbackSearchData() {
    return [
        {
            id: "api-auth",
            title: "API Authentication",
            content: "Learn how to authenticate with the GoHighLevel API using OAuth 2.0 and API keys",
            category: "API Documentation",
            url: "#",
            type: "documentation"
        },
        {
            id: "webhook-setup",
            title: "Webhook Configuration",
            content: "Set up webhooks to receive real-time notifications from GoHighLevel",
            category: "API Documentation", 
            url: "#",
            type: "documentation"
        },
        {
            id: "contact-management",
            title: "Contact Management",
            content: "Create, update, and manage contacts in your GoHighLevel account",
            category: "Help Articles",
            url: "#",
            type: "documentation"
        },
        {
            id: "automation-workflows", 
            title: "Automation Workflows",
            content: "Build powerful automation workflows to streamline your business processes",
            category: "Help Articles",
            url: "#",
            type: "documentation"
        },
        {
            id: "marketplace-apps",
            title: "Marketplace Development",
            content: "Develop and publish apps on the GoHighLevel marketplace",
            category: "Marketplace Guides",
            url: "#",
            type: "documentation"
        },
        {
            id: "getting-started-video",
            title: "Getting Started with GoHighLevel",
            content: "Complete tutorial for new users to get started with the platform",
            category: "YouTube Videos",
            url: "https://youtube.com/watch?v=example1",
            type: "video"
        },
        {
            id: "api-tutorial-video",
            title: "API Integration Tutorial",
            content: "Step-by-step video guide for integrating with GoHighLevel API",
            category: "YouTube Videos", 
            url: "https://youtube.com/watch?v=example2",
            type: "video"
        }
    ];
}

function performSearch(query = null) {
    console.log('🔍 performSearch called with query:', query);
    
    const searchInput = document.getElementById('searchInput');
    const searchQuery = query || searchInput.value.trim();
    
    console.log('📝 Final search query:', searchQuery);
    console.log('📚 Search data available:', searchData.length, 'documents');
    
    if (!searchQuery) {
        console.log('⚠️ Empty query, showing welcome message');
        displayWelcomeMessage();
        return;
    }
    
    console.log('🔍 Performing search for:', searchQuery);
    
    // Simple search implementation
    const results = searchData.filter(doc => {
        const searchText = (doc.title + ' ' + doc.content + ' ' + doc.category).toLowerCase();
        const queryLower = searchQuery.toLowerCase();
        const matches = searchText.includes(queryLower);
        if (matches) {
            console.log('✅ Match found:', doc.title);
        }
        return matches;
    });
    
    console.log('📊 Search results:', results.length, 'found');
    
    displaySearchResults(results, searchQuery);
    
    // Update analytics
    updateSearchAnalytics(searchQuery, results.length);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h3>No results found for "${query}"</h3>
                <p>Try these suggestions:</p>
                <ul>
                    <li>Check your spelling</li>
                    <li>Try more general terms like "API", "contact", "automation"</li>
                    <li>Use the quick search buttons below the search bar</li>
                </ul>
            </div>
        `;
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result">
            <h4><a href="${result.url}" target="_blank">${result.title}</a></h4>
            <p class="result-snippet">${result.content}</p>
            <div class="result-meta">
                <span class="result-category">${result.category}</span>
                <span class="result-type">${result.type}</span>
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = `
        <div class="search-header">
            <h3>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</h3>
        </div>
        <div class="results-list">
            ${resultsHTML}
        </div>
    `;
}

function displayWelcomeMessage() {
    const searchResults = document.getElementById('searchResults');
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        searchResults.innerHTML = welcomeMessage.outerHTML;
    }
}

function updateSearchStats() {
    const statsElement = document.getElementById('stats');
    if (statsElement) {
        statsElement.textContent = `${searchData.length} documents available for search`;
    }
}

function updateSearchAnalytics(query, resultCount) {
    // Simple analytics tracking
    console.log(`Search: "${query}" returned ${resultCount} results`);
}

// Handle Enter key in search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Make performSearch available globally
window.performSearch = performSearch;