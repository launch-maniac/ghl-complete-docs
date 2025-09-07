let searchIndex = [];
let fuse;

// Initialize search
async function initSearch() {
    try {
        // Load search index
        const response = await fetch('data/search-index.json');
        searchIndex = await response.json();
        
        // Initialize Fuse.js
        fuse = new Fuse(searchIndex, {
            keys: ['title', 'content', 'category', 'tags'],
            threshold: 0.3,
            includeScore: true,
            minMatchCharLength: 2
        });
        
        // Update stats
        updateStats();
        
        console.log('Search initialized with', searchIndex.length, 'documents');
    } catch (error) {
        console.error('Failed to initialize search:', error);
        document.getElementById('stats').innerHTML = 'Failed to load search index';
    }
}

// Update statistics
function updateStats() {
    const stats = {
        total: searchIndex.length,
        help: searchIndex.filter(d => d.category === 'help').length,
        ideas: searchIndex.filter(d => d.category === 'ideas').length,
        api: searchIndex.filter(d => d.category === 'api').length,
        marketplace: searchIndex.filter(d => d.category === 'marketplace').length
    };
    
    document.getElementById('stats').innerHTML = `
        <strong>${stats.total}</strong> documents indexed |
        📚 Help: ${stats.help} |
        💡 Ideas: ${stats.ideas} |
        🔧 API: ${stats.api} |
        🛍️ Marketplace: ${stats.marketplace}
    `;
}

// Get active filters
function getActiveFilters() {
    return Array.from(document.querySelectorAll('.filter:checked'))
        .map(cb => cb.value);
}

// Perform search
function performSearch() {
    const query = document.getElementById('search').value;
    
    if (query.length < 2) {
        document.getElementById('results').innerHTML = '';
        return;
    }
    
    // Get active filters
    const activeFilters = getActiveFilters();
    
    // Filter search index
    const filteredIndex = searchIndex.filter(doc => 
        activeFilters.includes(doc.category)
    );
    
    // Create filtered Fuse instance
    const filteredFuse = new Fuse(filteredIndex, {
        keys: ['title', 'content', 'category', 'tags'],
        threshold: 0.3,
        includeScore: true
    });
    
    // Search
    const results = filteredFuse.search(query).slice(0, 50);
    
    // Display results
    displayResults(results);
}

// Display search results
function displayResults(results) {
    if (results.length === 0) {
        document.getElementById('results').innerHTML = '<p>No results found</p>';
        return;
    }
    
    const html = results.map(result => {
        const item = result.item;
        const score = (1 - result.score).toFixed(2);
        
        return `
            <div class="result">
                <h3>${item.title}</h3>
                <div class="meta">
                    <span class="category">${item.category}</span>
                    <span>Score: ${score}</span>
                    ${item.votes ? `<span>👍 ${item.votes} votes</span>` : ''}
                </div>
                <p>${item.excerpt || item.content.substring(0, 200)}...</p>
                ${item.url ? `<a href="${item.url}" target="_blank">View original →</a>` : ''}
            </div>
        `;
    }).join('');
    
    document.getElementById('results').innerHTML = html;
}

// Event listeners
document.getElementById('search').addEventListener('input', performSearch);
document.querySelectorAll('.filter').forEach(cb => 
    cb.addEventListener('change', performSearch)
);

// Initialize on load
initSearch();