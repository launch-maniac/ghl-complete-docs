// Enhanced AI-Powered Search System for GHL Documentation
class SmartSearchEngine {
    constructor() {
        this.searchIndex = [];
        this.semanticIndex = new Map();
        this.queryHistory = [];
        this.searchAnalytics = {
            totalSearches: 0,
            popularQueries: new Map(),
            noResultQueries: [],
            clickThroughRates: new Map()
        };
        
        // Semantic keyword mapping for GHL-specific terms
        this.semanticMappings = {
            'automation': ['workflow', 'trigger', 'action', 'sequence', 'campaign'],
            'lead': ['contact', 'prospect', 'customer', 'client'],
            'funnel': ['pipeline', 'journey', 'flow', 'process'],
            'api': ['integration', 'webhook', 'endpoint', 'developer', 'code'],
            'crm': ['contacts', 'deals', 'opportunities', 'pipeline'],
            'email': ['message', 'communication', 'mail', 'smtp'],
            'sms': ['text', 'message', 'phone', 'mobile'],
            'calendar': ['appointment', 'booking', 'schedule', 'meeting'],
            'marketplace': ['app', 'integration', 'plugin', 'addon'],
            'oauth': ['authentication', 'auth', 'login', 'token', 'permission'],
            'webhook': ['callback', 'endpoint', 'trigger', 'event', 'notification'],
            'location': ['account', 'subaccount', 'agency', 'client']
        };

        // Intent recognition patterns
        this.intentPatterns = {
            'how_to': /^(how\s+to|how\s+do|how\s+can)\s+/i,
            'what_is': /^(what\s+is|what\s+are|what\s+does)\s+/i,
            'troubleshoot': /\b(error|problem|issue|fix|broken|not\s+working)\b/i,
            'example': /\b(example|sample|demo|tutorial)\b/i,
            'setup': /\b(setup|install|configure|create|add)\b/i,
            'api': /\b(api|endpoint|integration|webhook|developer)\b/i,
            'video': /\b(video|tutorial|watch|training)\b/i
        };

        this.initialize();
    }

    async initialize() {
        console.log('🧠 Initializing Smart Search Engine...');
        await this.loadSearchIndex();
        await this.buildSemanticIndex();
        this.setupSearchInterface();
        console.log('✅ Smart Search Engine ready');
    }

    async loadSearchIndex() {
        try {
            // Load the existing search index
            const response = await fetch('./data/search-index.json');
            if (response.ok) {
                this.searchIndex = await response.json();
                console.log(`📚 Loaded ${this.searchIndex.length} documents`);
            }
        } catch (error) {
            console.error('Failed to load search index:', error);
        }
    }

    async buildSemanticIndex() {
        console.log('🔗 Building semantic relationships...');
        
        for (const doc of this.searchIndex) {
            const semanticTerms = this.extractSemanticTerms(doc);
            this.semanticIndex.set(doc.id || doc.slug, semanticTerms);
        }
        
        console.log(`🎯 Built semantic index for ${this.semanticIndex.size} documents`);
    }

    extractSemanticTerms(document) {
        const text = `${document.title} ${document.content || ''} ${document.description || ''}`.toLowerCase();
        const terms = new Set();

        // Extract base terms
        const words = text.match(/\b[a-z]{3,}\b/g) || [];
        words.forEach(word => terms.add(word));

        // Add semantic expansions
        for (const [concept, related] of Object.entries(this.semanticMappings)) {
            if (text.includes(concept)) {
                related.forEach(term => terms.add(term));
                terms.add(concept);
            }
        }

        // Extract technical terms (camelCase, API endpoints, etc.)
        const technicalTerms = text.match(/\b[a-z]+(?:[A-Z][a-z]*)+\b|\/[a-z-]+(?:\/[a-z-]*)*\b/g) || [];
        technicalTerms.forEach(term => {
            terms.add(term.toLowerCase());
            // Split camelCase
            const parts = term.split(/(?=[A-Z])/).map(p => p.toLowerCase());
            parts.forEach(part => terms.add(part));
        });

        return Array.from(terms);
    }

    detectSearchIntent(query) {
        const detectedIntents = [];
        
        for (const [intent, pattern] of Object.entries(this.intentPatterns)) {
            if (pattern.test(query)) {
                detectedIntents.push(intent);
            }
        }

        return detectedIntents.length > 0 ? detectedIntents : ['general'];
    }

    expandQuery(query) {
        const expanded = new Set([query.toLowerCase()]);
        const words = query.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];

        // Add semantic expansions
        words.forEach(word => {
            if (this.semanticMappings[word]) {
                this.semanticMappings[word].forEach(related => expanded.add(related));
            }
            
            // Find reverse mappings
            for (const [concept, related] of Object.entries(this.semanticMappings)) {
                if (related.includes(word)) {
                    expanded.add(concept);
                    related.forEach(term => expanded.add(term));
                }
            }
        });

        return Array.from(expanded);
    }

    calculateRelevanceScore(document, expandedQuery, intents) {
        let score = 0;
        const docText = `${document.title} ${document.content || ''} ${document.description || ''}`.toLowerCase();
        const semanticTerms = this.semanticIndex.get(document.id || document.slug) || [];

        // Title match (highest weight)
        expandedQuery.forEach(term => {
            if (document.title.toLowerCase().includes(term)) {
                score += 10;
            }
        });

        // Content match
        expandedQuery.forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            const matches = (docText.match(regex) || []).length;
            score += matches * 2;
        });

        // Semantic match
        expandedQuery.forEach(term => {
            if (semanticTerms.includes(term)) {
                score += 3;
            }
        });

        // Intent-based boosting
        intents.forEach(intent => {
            switch (intent) {
                case 'api':
                    if (document.category === 'api' || docText.includes('endpoint')) score += 5;
                    break;
                case 'video':
                    if (document.category === 'videos' || document.type === 'tutorial') score += 5;
                    break;
                case 'how_to':
                    if (docText.includes('tutorial') || docText.includes('guide')) score += 3;
                    break;
                case 'example':
                    if (docText.includes('example') || docText.includes('sample')) score += 4;
                    break;
                case 'troubleshoot':
                    if (docText.includes('error') || docText.includes('troubleshoot')) score += 4;
                    break;
            }
        });

        // Category relevance
        const categoryBoosts = {
            'api': 2,
            'marketplace': 1.5,
            'help': 1.2,
            'videos': 1.8,
            'official': 2.5
        };
        
        if (categoryBoosts[document.category]) {
            score *= categoryBoosts[document.category];
        }

        // Freshness bonus (newer content gets slight boost)
        if (document.extracted_at || document.extractedAt) {
            const extractedDate = new Date(document.extracted_at || document.extractedAt);
            const daysSinceExtracted = (Date.now() - extractedDate.getTime()) / (1000 * 60 * 60 * 24);
            if (daysSinceExtracted < 30) {
                score += 1;
            }
        }

        return score;
    }

    performSmartSearch(query, filters = {}) {
        console.log(`🔍 Smart search: "${query}"`);
        
        // Track analytics
        this.searchAnalytics.totalSearches++;
        this.searchAnalytics.popularQueries.set(query, (this.searchAnalytics.popularQueries.get(query) || 0) + 1);
        
        const intents = this.detectSearchIntent(query);
        const expandedQuery = this.expandQuery(query);
        
        console.log(`🎯 Detected intents: ${intents.join(', ')}`);
        console.log(`📈 Expanded query: ${expandedQuery.slice(0, 10).join(', ')}${expandedQuery.length > 10 ? '...' : ''}`);

        // Filter documents based on filters
        let filteredDocs = this.searchIndex;
        
        if (filters.categories && filters.categories.length > 0) {
            filteredDocs = filteredDocs.filter(doc => 
                filters.categories.includes(doc.category)
            );
        }

        if (filters.types && filters.types.length > 0) {
            filteredDocs = filteredDocs.filter(doc => 
                filters.types.includes(doc.type)
            );
        }

        // Calculate relevance scores
        const scoredResults = filteredDocs.map(doc => ({
            ...doc,
            relevanceScore: this.calculateRelevanceScore(doc, expandedQuery, intents),
            matchedTerms: expandedQuery.filter(term => 
                `${doc.title} ${doc.content || ''} ${doc.description || ''}`.toLowerCase().includes(term)
            )
        }));

        // Sort by relevance
        const results = scoredResults
            .filter(doc => doc.relevanceScore > 0)
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 50); // Limit to top 50 results

        // Generate search suggestions if no results
        let suggestions = [];
        if (results.length === 0) {
            suggestions = this.generateSearchSuggestions(query);
            this.searchAnalytics.noResultQueries.push({
                query,
                timestamp: new Date().toISOString(),
                expandedQuery,
                intents
            });
        }

        const searchResult = {
            query,
            results,
            totalResults: results.length,
            intents,
            expandedTerms: expandedQuery,
            suggestions,
            searchTime: Date.now(),
            analytics: {
                totalSearches: this.searchAnalytics.totalSearches,
                hasResults: results.length > 0
            }
        };

        // Store search in history
        this.queryHistory.unshift(searchResult);
        if (this.queryHistory.length > 100) {
            this.queryHistory = this.queryHistory.slice(0, 100);
        }

        return searchResult;
    }

    generateSearchSuggestions(query) {
        const suggestions = [];
        const queryWords = query.toLowerCase().split(/\s+/);

        // Find similar queries from popular searches
        for (const [popularQuery] of this.searchAnalytics.popularQueries) {
            const similarity = this.calculateQuerySimilarity(query, popularQuery);
            if (similarity > 0.3) {
                suggestions.push({
                    query: popularQuery,
                    type: 'popular',
                    similarity
                });
            }
        }

        // Suggest related terms from semantic mappings
        queryWords.forEach(word => {
            if (this.semanticMappings[word]) {
                this.semanticMappings[word].forEach(related => {
                    suggestions.push({
                        query: query.replace(word, related),
                        type: 'semantic',
                        original: word,
                        suggested: related
                    });
                });
            }
        });

        // Intent-based suggestions
        const intents = this.detectSearchIntent(query);
        if (intents.includes('general')) {
            suggestions.push(
                { query: `how to ${query}`, type: 'intent', intent: 'tutorial' },
                { query: `${query} example`, type: 'intent', intent: 'example' },
                { query: `${query} API`, type: 'intent', intent: 'api' }
            );
        }

        return suggestions
            .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
            .slice(0, 5);
    }

    calculateQuerySimilarity(query1, query2) {
        const words1 = new Set(query1.toLowerCase().split(/\s+/));
        const words2 = new Set(query2.toLowerCase().split(/\s+/));
        
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        
        return intersection.size / union.size;
    }

    setupSearchInterface() {
        // Enhanced search input with real-time suggestions
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const searchSuggestions = document.createElement('div');
        searchSuggestions.id = 'searchSuggestions';
        searchSuggestions.className = 'search-suggestions';
        
        if (searchInput) {
            searchInput.parentNode.insertBefore(searchSuggestions, searchInput.nextSibling);
            
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (e.target.value.length > 2) {
                        this.showSearchSuggestions(e.target.value);
                    } else {
                        this.hideSearchSuggestions();
                    }
                }, 300);
            });

            // Override the existing search function
            window.performSearch = (query = null) => {
                const searchQuery = query || searchInput.value.trim();
                if (!searchQuery) return;

                const filters = this.getActiveFilters();
                const results = this.performSmartSearch(searchQuery, filters);
                this.displaySearchResults(results);
                this.hideSearchSuggestions();
            };
        }

        // Add search analytics display
        this.addSearchAnalytics();
    }

    showSearchSuggestions(query) {
        const suggestions = this.generateSearchSuggestions(query);
        const suggestionsEl = document.getElementById('searchSuggestions');
        
        if (suggestions.length === 0) {
            this.hideSearchSuggestions();
            return;
        }

        const suggestionsHTML = suggestions.map(suggestion => `
            <div class="suggestion-item" onclick="performSearch('${suggestion.query}')">
                <span class="suggestion-text">${suggestion.query}</span>
                <span class="suggestion-type">${suggestion.type}</span>
            </div>
        `).join('');

        suggestionsEl.innerHTML = suggestionsHTML;
        suggestionsEl.style.display = 'block';
    }

    hideSearchSuggestions() {
        const suggestionsEl = document.getElementById('searchSuggestions');
        if (suggestionsEl) {
            suggestionsEl.style.display = 'none';
        }
    }

    getActiveFilters() {
        const filters = { categories: [], types: [] };
        
        document.querySelectorAll('.filter-checkbox:checked').forEach(checkbox => {
            filters.categories.push(checkbox.value);
        });
        
        // Add any additional filter logic here
        
        return filters;
    }

    displaySearchResults(searchResult) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        // Update search stats
        this.updateSearchStats(searchResult);

        // Display intent information
        let intentInfo = '';
        if (searchResult.intents.length > 0 && !searchResult.intents.includes('general')) {
            intentInfo = `
                <div class="search-intent">
                    🎯 Search intent: ${searchResult.intents.map(intent => 
                        intent.replace('_', ' ')
                    ).join(', ')}
                </div>
            `;
        }

        // Display suggestions if no results
        let suggestionsHTML = '';
        if (searchResult.results.length === 0 && searchResult.suggestions.length > 0) {
            suggestionsHTML = `
                <div class="no-results">
                    <h3>No results found for "${searchResult.query}"</h3>
                    <p>Try these suggestions:</p>
                    <div class="search-suggestions-list">
                        ${searchResult.suggestions.map(s => `
                            <button class="suggestion-btn" onclick="performSearch('${s.query}')">
                                ${s.query}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Display results
        const resultsHTML = searchResult.results.map(result => `
            <div class="result-item" onclick="trackClick('${result.id || result.slug}', '${searchResult.query}')">
                <div class="result-header">
                    <h3 class="result-title">${result.title}</h3>
                    <div class="result-meta">
                        <span class="result-category">${result.category}</span>
                        ${result.type ? `<span class="result-type">${result.type}</span>` : ''}
                        <span class="relevance-score" title="Relevance Score">${result.relevanceScore.toFixed(1)}</span>
                    </div>
                </div>
                <div class="result-content">
                    ${result.description || result.content?.substring(0, 200) + '...' || ''}
                </div>
                ${result.matchedTerms?.length ? `
                    <div class="matched-terms">
                        Matched: ${result.matchedTerms.slice(0, 5).join(', ')}
                    </div>
                ` : ''}
            </div>
        `).join('');

        resultsContainer.innerHTML = `
            ${intentInfo}
            ${suggestionsHTML}
            <div class="results-list">
                ${resultsHTML}
            </div>
        `;
    }

    updateSearchStats(searchResult) {
        const statsEl = document.getElementById('stats');
        if (!statsEl) return;

        const stats = {
            total: this.searchIndex.length,
            found: searchResult.totalResults,
            query: searchResult.query,
            intents: searchResult.intents
        };

        // Get category counts
        const categoryCounts = {};
        searchResult.results.forEach(result => {
            categoryCounts[result.category] = (categoryCounts[result.category] || 0) + 1;
        });

        statsEl.innerHTML = `
            <strong>${stats.found}</strong> results found for "${stats.query}" •
            ${Object.entries(categoryCounts).map(([cat, count]) => `${cat}: ${count}`).join(' • ')}
        `;
    }

    trackClick(documentId, query) {
        // Track click-through rate
        const key = `${query}:${documentId}`;
        this.searchAnalytics.clickThroughRates.set(key, 
            (this.searchAnalytics.clickThroughRates.get(key) || 0) + 1
        );
        
        console.log(`📊 Tracked click: ${documentId} for query: ${query}`);
    }

    addSearchAnalytics() {
        // Add analytics panel to the page
        const analyticsHTML = `
            <div id="searchAnalytics" class="search-analytics" style="display: none;">
                <h4>🧠 Smart Search Analytics</h4>
                <div class="analytics-content">
                    <div class="stat-item">
                        <label>Total Searches:</label>
                        <span id="totalSearches">0</span>
                    </div>
                    <div class="stat-item">
                        <label>Success Rate:</label>
                        <span id="successRate">0%</span>
                    </div>
                    <div class="stat-item">
                        <label>Popular Queries:</label>
                        <div id="popularQueries"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', analyticsHTML);
    }

    getAnalytics() {
        const successfulSearches = this.searchAnalytics.totalSearches - this.searchAnalytics.noResultQueries.length;
        const successRate = this.searchAnalytics.totalSearches > 0 
            ? (successfulSearches / this.searchAnalytics.totalSearches * 100).toFixed(1)
            : 0;

        return {
            totalSearches: this.searchAnalytics.totalSearches,
            successRate: `${successRate}%`,
            popularQueries: Array.from(this.searchAnalytics.popularQueries.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5),
            noResultQueries: this.searchAnalytics.noResultQueries.slice(-10),
            recentSearches: this.queryHistory.slice(0, 10)
        };
    }
}

// Global click tracking function
window.trackClick = function(documentId, query) {
    if (window.smartSearch) {
        window.smartSearch.trackClick(documentId, query);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.smartSearch = new SmartSearchEngine();
});

// CSS for enhanced search interface
const searchStyles = `
<style>
.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: none;
    z-index: 1000;
    max-height: 300px;
    overflow-y: auto;
}

.suggestion-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.suggestion-item:hover {
    background: #f8f9fa;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-text {
    font-weight: 500;
}

.suggestion-type {
    font-size: 12px;
    color: #666;
    background: #e9ecef;
    padding: 2px 6px;
    border-radius: 4px;
}

.search-intent {
    background: #e3f2fd;
    padding: 8px 12px;
    border-radius: 6px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #1565c0;
}

.no-results {
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

.search-suggestions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 16px;
}

.suggestion-btn {
    background: var(--color-secondary);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
}

.suggestion-btn:hover {
    background: #0090b3;
    transform: translateY(-1px);
}

.result-item {
    cursor: pointer;
    transition: all 0.3s ease;
}

.result-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.result-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 4px;
}

.relevance-score {
    background: #28a745;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
}

.matched-terms {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
    font-style: italic;
}

.search-analytics {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    min-width: 250px;
    z-index: 1000;
}

.analytics-content .stat-item {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
}

@media (max-width: 768px) {
    .search-analytics {
        position: relative;
        top: auto;
        right: auto;
        margin: 20px;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', searchStyles);