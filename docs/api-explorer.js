// GoHighLevel API Explorer JavaScript
class APIExplorer {
    constructor() {
        this.baseUrl = 'https://services.leadconnectorhq.com';
        this.currentEndpoint = null;
        this.endpointConfigs = this.initializeEndpoints();
        this.setupEventListeners();
    }

    initializeEndpoints() {
        return {
            'oauth': {
                method: 'POST',
                url: '/oauth/token',
                docs: {
                    title: 'OAuth 2.0 Token Exchange',
                    description: 'Exchange authorization code for access token',
                    parameters: [
                        { name: 'client_id', type: 'string', required: true, description: 'Your app client ID' },
                        { name: 'client_secret', type: 'string', required: true, description: 'Your app client secret' },
                        { name: 'grant_type', type: 'string', required: true, description: 'Set to "authorization_code"' },
                        { name: 'code', type: 'string', required: true, description: 'Authorization code from callback' },
                        { name: 'redirect_uri', type: 'string', required: true, description: 'Must match registered URI' }
                    ]
                },
                sampleBody: {
                    "client_id": "your_client_id",
                    "client_secret": "your_client_secret", 
                    "grant_type": "authorization_code",
                    "code": "authorization_code_here",
                    "redirect_uri": "https://your-app.com/callback"
                }
            },
            'contacts-list': {
                method: 'GET',
                url: '/contacts/',
                docs: {
                    title: 'List Contacts',
                    description: 'Retrieve a list of contacts with optional filtering and pagination',
                    parameters: [
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID in query params' },
                        { name: 'limit', type: 'number', required: false, description: 'Number of contacts to return (max 100)' },
                        { name: 'startAfter', type: 'string', required: false, description: 'Pagination cursor' },
                        { name: 'query', type: 'string', required: false, description: 'Search query for contacts' }
                    ]
                }
            },
            'contacts-create': {
                method: 'POST',
                url: '/contacts/',
                docs: {
                    title: 'Create Contact',
                    description: 'Create a new contact in the specified location',
                    parameters: [
                        { name: 'firstName', type: 'string', required: false, description: 'First name' },
                        { name: 'lastName', type: 'string', required: false, description: 'Last name' },
                        { name: 'email', type: 'string', required: false, description: 'Email address' },
                        { name: 'phone', type: 'string', required: false, description: 'Phone number' },
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' }
                    ]
                },
                sampleBody: {
                    "firstName": "John",
                    "lastName": "Doe", 
                    "email": "john.doe@example.com",
                    "phone": "+1234567890"
                }
            },
            'contacts-get': {
                method: 'GET',
                url: '/contacts/{contactId}',
                docs: {
                    title: 'Get Contact',
                    description: 'Retrieve a specific contact by ID',
                    parameters: [
                        { name: 'contactId', type: 'string', required: true, description: 'Contact ID in URL path' }
                    ]
                }
            },
            'contacts-update': {
                method: 'PUT',
                url: '/contacts/{contactId}',
                docs: {
                    title: 'Update Contact',
                    description: 'Update an existing contact',
                    parameters: [
                        { name: 'contactId', type: 'string', required: true, description: 'Contact ID in URL path' },
                        { name: 'firstName', type: 'string', required: false, description: 'First name' },
                        { name: 'lastName', type: 'string', required: false, description: 'Last name' },
                        { name: 'email', type: 'string', required: false, description: 'Email address' },
                        { name: 'phone', type: 'string', required: false, description: 'Phone number' }
                    ]
                },
                sampleBody: {
                    "firstName": "Jane",
                    "lastName": "Smith",
                    "email": "jane.smith@example.com"
                }
            },
            'conversations-list': {
                method: 'GET',
                url: '/conversations/',
                docs: {
                    title: 'List Conversations',
                    description: 'Get conversations for a location or contact',
                    parameters: [
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' },
                        { name: 'contactId', type: 'string', required: false, description: 'Filter by contact ID' },
                        { name: 'limit', type: 'number', required: false, description: 'Number of results (max 100)' }
                    ]
                }
            },
            'conversations-send': {
                method: 'POST',
                url: '/conversations/messages',
                docs: {
                    title: 'Send Message',
                    description: 'Send an SMS, email, or other message type',
                    parameters: [
                        { name: 'type', type: 'string', required: true, description: 'Message type: SMS, Email, etc.' },
                        { name: 'contactId', type: 'string', required: true, description: 'Contact ID to send to' },
                        { name: 'message', type: 'string', required: true, description: 'Message content' },
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' }
                    ]
                },
                sampleBody: {
                    "type": "SMS",
                    "contactId": "contact_id_here",
                    "message": "Hello from GoHighLevel API!",
                    "locationId": "location_id_here"
                }
            },
            'calendar-events': {
                method: 'GET',
                url: '/calendars/events',
                docs: {
                    title: 'Get Calendar Events',
                    description: 'Retrieve calendar events for a location',
                    parameters: [
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' },
                        { name: 'startDate', type: 'string', required: false, description: 'Start date (ISO 8601)' },
                        { name: 'endDate', type: 'string', required: false, description: 'End date (ISO 8601)' }
                    ]
                }
            },
            'calendar-create': {
                method: 'POST',
                url: '/calendars/events',
                docs: {
                    title: 'Create Appointment',
                    description: 'Schedule a new appointment',
                    parameters: [
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' },
                        { name: 'contactId', type: 'string', required: true, description: 'Contact ID' },
                        { name: 'title', type: 'string', required: true, description: 'Appointment title' },
                        { name: 'startTime', type: 'string', required: true, description: 'Start time (ISO 8601)' },
                        { name: 'endTime', type: 'string', required: true, description: 'End time (ISO 8601)' }
                    ]
                },
                sampleBody: {
                    "locationId": "location_id_here",
                    "contactId": "contact_id_here",
                    "title": "Consultation Call",
                    "startTime": "2025-01-01T10:00:00Z",
                    "endTime": "2025-01-01T11:00:00Z"
                }
            },
            'opportunities-list': {
                method: 'GET',
                url: '/opportunities/',
                docs: {
                    title: 'List Opportunities',
                    description: 'Get opportunities/deals from pipeline',
                    parameters: [
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' },
                        { name: 'pipelineId', type: 'string', required: false, description: 'Filter by pipeline' },
                        { name: 'limit', type: 'number', required: false, description: 'Number of results (max 100)' }
                    ]
                }
            },
            'opportunities-create': {
                method: 'POST',
                url: '/opportunities/',
                docs: {
                    title: 'Create Opportunity',
                    description: 'Create a new opportunity in pipeline',
                    parameters: [
                        { name: 'title', type: 'string', required: true, description: 'Opportunity title' },
                        { name: 'contactId', type: 'string', required: true, description: 'Associated contact ID' },
                        { name: 'pipelineId', type: 'string', required: true, description: 'Pipeline ID' },
                        { name: 'stageId', type: 'string', required: true, description: 'Pipeline stage ID' },
                        { name: 'monetaryValue', type: 'number', required: false, description: 'Deal value' }
                    ]
                },
                sampleBody: {
                    "title": "Website Development Project",
                    "contactId": "contact_id_here",
                    "pipelineId": "pipeline_id_here",
                    "stageId": "stage_id_here",
                    "monetaryValue": 5000
                }
            },
            'workflows-list': {
                method: 'GET',
                url: '/workflows/',
                docs: {
                    title: 'List Workflows',
                    description: 'Get available workflows for automation',
                    parameters: [
                        { name: 'locationId', type: 'string', required: true, description: 'Location ID' }
                    ]
                }
            },
            'workflows-trigger': {
                method: 'POST',
                url: '/workflows/{workflowId}/subscribe',
                docs: {
                    title: 'Trigger Workflow',
                    description: 'Add contact to workflow automation',
                    parameters: [
                        { name: 'workflowId', type: 'string', required: true, description: 'Workflow ID in URL path' },
                        { name: 'contactId', type: 'string', required: true, description: 'Contact ID to add' }
                    ]
                },
                sampleBody: {
                    "contactId": "contact_id_here"
                }
            }
        };
    }

    setupEventListeners() {
        // Endpoint selection
        document.querySelectorAll('.endpoint-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.endpoint-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');
                this.selectEndpoint(item.dataset.endpoint);
            });
        });

        // Auto-format JSON inputs
        document.getElementById('requestBody').addEventListener('blur', this.formatJSON);
        document.getElementById('requestHeaders').addEventListener('blur', this.formatJSON);
    }

    selectEndpoint(endpointKey) {
        this.currentEndpoint = this.endpointConfigs[endpointKey];
        if (!this.currentEndpoint) return;

        // Update documentation
        this.updateDocumentation(this.currentEndpoint.docs);
        
        // Update URL
        const locationId = document.getElementById('locationId').value || '{locationId}';
        let url = this.baseUrl + this.currentEndpoint.url;
        url = url.replace('{locationId}', locationId);
        url = url.replace('{contactId}', '{contactId}');
        url = url.replace('{workflowId}', '{workflowId}');
        
        document.getElementById('requestUrl').value = url;

        // Update request body with sample if available
        if (this.currentEndpoint.sampleBody) {
            document.getElementById('requestBody').value = JSON.stringify(this.currentEndpoint.sampleBody, null, 2);
        } else {
            document.getElementById('requestBody').value = '';
        }

        // Show/hide body based on method
        const bodyGroup = document.getElementById('requestBody').closest('.form-group');
        bodyGroup.style.display = ['GET', 'DELETE'].includes(this.currentEndpoint.method) ? 'none' : 'block';
    }

    updateDocumentation(docs) {
        const docsContainer = document.getElementById('endpointDocs');
        
        let paramsTable = '';
        if (docs.parameters && docs.parameters.length > 0) {
            paramsTable = `
                <table class="params-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${docs.parameters.map(param => `
                            <tr>
                                <td><code>${param.name}</code></td>
                                <td>${param.type}</td>
                                <td>${param.required ? '<span class="required">Yes</span>' : 'No'}</td>
                                <td>${param.description}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }

        docsContainer.innerHTML = `
            <div class="docs-title">${docs.title}</div>
            <div class="docs-description">${docs.description}</div>
            ${paramsTable ? '<h4>Parameters:</h4>' + paramsTable : ''}
        `;
    }

    formatJSON(event) {
        try {
            const parsed = JSON.parse(event.target.value);
            event.target.value = JSON.stringify(parsed, null, 2);
        } catch (e) {
            // Invalid JSON, leave as is
        }
    }

    getAuthHeaders() {
        const apiKey = document.getElementById('apiKey').value;
        const headers = {
            'Content-Type': 'application/json'
        };

        if (apiKey) {
            if (apiKey.startsWith('Bearer ')) {
                headers['Authorization'] = apiKey;
            } else {
                headers['Authorization'] = `Bearer ${apiKey}`;
            }
        }

        // Merge with custom headers
        try {
            const customHeaders = JSON.parse(document.getElementById('requestHeaders').value || '{}');
            Object.assign(headers, customHeaders);
        } catch (e) {
            console.warn('Invalid JSON in request headers');
        }

        return headers;
    }

    async sendRequest() {
        if (!this.currentEndpoint) {
            alert('Please select an endpoint first');
            return;
        }

        const apiKey = document.getElementById('apiKey').value;
        if (!apiKey) {
            alert('Please enter your API key or access token');
            return;
        }

        // Show loading
        document.getElementById('loading').classList.add('active');
        document.getElementById('responseContainer').style.display = 'none';

        try {
            let url = document.getElementById('requestUrl').value;
            const locationId = document.getElementById('locationId').value;
            
            // Replace placeholders
            if (locationId) {
                url = url.replace('{locationId}', locationId);
            }

            // For demonstration purposes, we'll use a CORS proxy
            // In production, this would be handled by your backend
            const proxyUrl = 'https://api.allorigins.win/raw?url=';
            const fullUrl = url.startsWith('http') ? url : this.baseUrl + url;

            const requestOptions = {
                method: this.currentEndpoint.method,
                headers: this.getAuthHeaders()
            };

            // Add body for POST/PUT requests
            if (['POST', 'PUT', 'PATCH'].includes(this.currentEndpoint.method)) {
                const bodyText = document.getElementById('requestBody').value;
                if (bodyText.trim()) {
                    requestOptions.body = bodyText;
                }
            }

            console.log('Sending request:', { url: fullUrl, options: requestOptions });

            // Note: This is a demo implementation
            // In a real implementation, you'd need a backend proxy to avoid CORS issues
            this.simulateResponse();

        } catch (error) {
            console.error('Request failed:', error);
            this.displayResponse({
                status: 0,
                statusText: 'Network Error',
                headers: {},
                body: `Error: ${error.message}\n\nNote: This is a demo interface. To test real API calls, you need to:\n1. Set up a backend proxy to handle CORS\n2. Use a tool like Postman for direct API testing\n3. Implement the calls in your server-side application`
            });
        } finally {
            document.getElementById('loading').classList.remove('active');
        }
    }

    simulateResponse() {
        // Simulate a successful response for demo purposes
        setTimeout(() => {
            const responses = {
                'contacts-list': {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contacts: [
                            {
                                id: "contact_123",
                                firstName: "John",
                                lastName: "Doe",
                                email: "john.doe@example.com",
                                phone: "+1234567890",
                                dateAdded: "2025-01-01T10:00:00Z"
                            }
                        ],
                        meta: {
                            total: 1,
                            currentPage: 1
                        }
                    }, null, 2)
                },
                'contacts-create': {
                    status: 201,
                    statusText: 'Created',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contact: {
                            id: "contact_456",
                            firstName: "John",
                            lastName: "Doe",
                            email: "john.doe@example.com",
                            phone: "+1234567890",
                            dateAdded: "2025-01-01T10:00:00Z"
                        }
                    }, null, 2)
                }
            };

            const defaultResponse = {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: "This is a simulated response for demo purposes",
                    endpoint: this.currentEndpoint?.docs?.title || "Unknown",
                    note: "Use Postman or implement server-side proxy for real API testing"
                }, null, 2)
            };

            const response = responses[Object.keys(this.endpointConfigs).find(key => 
                this.endpointConfigs[key] === this.currentEndpoint
            )] || defaultResponse;

            this.displayResponse(response);
        }, 1000);
    }

    displayResponse(response) {
        const container = document.getElementById('responseContainer');
        const headersEl = document.getElementById('responseHeaders');
        const bodyEl = document.getElementById('responseBody');

        // Format headers
        let headerText = `HTTP/1.1 ${response.status} ${response.statusText}\n`;
        Object.entries(response.headers || {}).forEach(([key, value]) => {
            headerText += `${key}: ${value}\n`;
        });

        headersEl.innerHTML = `<span class="status-indicator status-${Math.floor(response.status / 100) * 100}">${response.status}</span> ${headerText}`;
        bodyEl.textContent = response.body;

        container.style.display = 'block';
    }

    clearRequest() {
        document.getElementById('requestBody').value = '';
        document.getElementById('responseContainer').style.display = 'none';
        document.getElementById('endpointDocs').innerHTML = `
            <div class="docs-title">Select an endpoint to get started</div>
            <div class="docs-description">
                Choose an API endpoint from the left panel to see documentation, parameters, and test the request.
            </div>
        `;
        document.getElementById('requestUrl').value = '';
        document.querySelectorAll('.endpoint-item').forEach(el => el.classList.remove('active'));
        this.currentEndpoint = null;
    }
}

// Global functions for HTML onclick events
window.sendRequest = function() {
    window.apiExplorer.sendRequest();
};

window.clearRequest = function() {
    window.apiExplorer.clearRequest();
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.apiExplorer = new APIExplorer();
});