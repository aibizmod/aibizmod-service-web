# How to Create a ChatGPT Plugin for AI Visibility Report Tool

**Objective:** Convert your AI Visibility Audit Report tool into a ChatGPT plugin that users can access directly within ChatGPT.

**Timeline:** 3–4 weeks to build, test, and submit

---

## What is a ChatGPT Plugin?

A ChatGPT plugin is a tool that:
- Connects to an external API
- Allows users to interact with your service directly in ChatGPT
- Uses natural language to trigger actions
- Returns data/results formatted for ChatGPT display

**Example User Interaction:**
```
User: "Can you audit AI visibility for aibizmod.com?"
ChatGPT: "I'll check your visibility across ChatGPT, Perplexity, and Google AI..."
[Plugin queries your API]
ChatGPT: "Here's your report: [Results]"
```

---

## Prerequisites

### 1. **Backend API** (You Probably Already Have This)
Your AI Visibility Audit tool needs REST API endpoints:
- `POST /api/audit/start` → Start a new audit
- `GET /api/audit/{audit_id}` → Get audit status/results
- `GET /api/audit/{domain}` → Audit a specific domain

### 2. **Authentication**
- API key for ChatGPT to authenticate requests
- OAuth 2.0 (recommended for user authentication)

### 3. **Hosting**
- HTTPS endpoint (required)
- CORS enabled for ChatGPT requests
- Rate limiting (to prevent abuse)

### 4. **Plugin Manifest**
- OpenAPI specification file (openapi.yaml)
- Plugin manifest (ai-plugin.json)

### 5. **Legal/Terms**
- Privacy policy
- Terms of service
- Compliance with OpenAI's plugin policies

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│         ChatGPT (User Interface)        │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  ChatGPT Plugin (Middleware/Router)     │
│  - Parses user natural language         │
│  - Determines which API endpoint to use │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│    Your API Backend (aibizmod.com)      │
│  - Handles audit requests               │
│  - Queries AI search engines            │
│  - Returns formatted results            │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│   External APIs (ChatGPT, Perplexity)   │
│   - Check where your business is cited  │
└─────────────────────────────────────────┘
```

---

## Step 1: Create the Plugin Manifest (ai-plugin.json)

Save this to: `https://aibizmod.com/.well-known/ai-plugin.json`

```json
{
  "schema_version": "v1",
  "name_for_human": "AI Visibility Audit",
  "name_for_model": "ai_visibility_audit",
  "description_for_human": "Audit your business visibility across ChatGPT, Perplexity, Google AI, and other AI search engines. Get a detailed report on where you're cited.",
  "description_for_model": "This plugin provides AI visibility audits for business websites. It checks where a domain or business is mentioned, cited, or recommended across AI-powered search and answer engines. Users can request audits for their own domain and get comprehensive visibility reports.",
  "auth": {
    "type": "oauth2",
    "client_url": "https://aibizmod.com/oauth/authorize",
    "scope": "read:audits create:audits",
    "authorization_url": "https://aibizmod.com/oauth/token",
    "authorization_content_type": "application/x-www-form-urlencoded",
    "verification_tokens": {
      "openai": "YOUR_VERIFICATION_TOKEN_HERE"
    }
  },
  "api": {
    "type": "openapi",
    "url": "https://aibizmod.com/openapi.yaml"
  },
  "logo_url": "https://aibizmod.com/logo.png",
  "contact_email": "plugin-support@aibizmod.com",
  "legal_info_url": "https://aibizmod.com/legal"
}
```

---

## Step 2: Create OpenAPI Specification (openapi.yaml)

Save this to: `https://aibizmod.com/openapi.yaml`

```yaml
openapi: 3.0.1
info:
  title: AI Visibility Audit API
  description: API for auditing business visibility in AI search engines
  version: v1.0.0
servers:
  - url: https://aibizmod.com/api/v1
paths:
  /audit:
    post:
      operationId: startAudit
      summary: Start a new AI visibility audit
      description: Initiates an audit to check visibility across ChatGPT, Perplexity, Google AI Overviews, and other AI search engines
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                domain:
                  type: string
                  description: The website domain to audit (e.g., "aibizmod.com")
                  example: "aibizmod.com"
                business_name:
                  type: string
                  description: Name of the business to search for
                  example: "aibizmod"
                industry:
                  type: string
                  description: Industry classification (e.g., "Technology", "Software Development")
                  example: "Technology Services"
              required:
                - domain
      responses:
        '200':
          description: Audit started successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  audit_id:
                    type: string
                    description: Unique identifier for the audit
                  status:
                    type: string
                    enum: [pending, processing, completed, failed]
                  created_at:
                    type: string
                    format: date-time
                  estimated_completion:
                    type: string
                    format: date-time
                  message:
                    type: string
        '400':
          description: Invalid request parameters
        '401':
          description: Authentication failed
        '429':
          description: Rate limit exceeded

  /audit/{audit_id}:
    get:
      operationId: getAuditResults
      summary: Get audit results
      description: Retrieve the results of a completed AI visibility audit
      parameters:
        - name: audit_id
          in: path
          required: true
          schema:
            type: string
          description: The audit ID returned from startAudit
      responses:
        '200':
          description: Audit results retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  audit_id:
                    type: string
                  domain:
                    type: string
                  status:
                    type: string
                  results:
                    type: object
                    properties:
                      overall_score:
                        type: number
                        description: AI visibility score 0-100
                      citations_found:
                        type: number
                        description: Total number of citations found
                      platforms:
                        type: array
                        items:
                          type: object
                          properties:
                            name:
                              type: string
                              enum: [chatgpt, perplexity, google_ai, bing_copilot, gemini]
                            visibility_score:
                              type: number
                            citations_count:
                              type: number
                            last_seen:
                              type: string
                              format: date-time
                            recommendation_rate:
                              type: number
                              description: Percentage of time recommended (0-100)
                      recommendations:
                        type: array
                        items:
                          type: string
                        description: Actionable recommendations to improve visibility
                      next_audit_date:
                        type: string
                        format: date-time
        '404':
          description: Audit not found
        '401':
          description: Unauthorized

  /audit/{domain}/quick:
    get:
      operationId: quickAudit
      summary: Quick audit (instant results)
      description: Get a quick AI visibility snapshot without a full audit
      parameters:
        - name: domain
          in: path
          required: true
          schema:
            type: string
          description: Domain to audit
      responses:
        '200':
          description: Quick audit results
          content:
            application/json:
              schema:
                type: object
                properties:
                  domain:
                    type: string
                  ai_visibility_status:
                    type: string
                    enum: [excellent, good, fair, poor, not_found]
                  estimated_citations:
                    type: number
                  platforms_visible:
                    type: array
                    items:
                      type: string
                  next_steps:
                    type: array
                    items:
                      type: string

  /audit/compare:
    post:
      operationId: compareVisibility
      summary: Compare AI visibility with competitors
      description: Compare your AI visibility with up to 5 competitors
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                your_domain:
                  type: string
                competitor_domains:
                  type: array
                  items:
                    type: string
                  maxItems: 5
      responses:
        '200':
          description: Comparison results
          content:
            application/json:
              schema:
                type: object
                properties:
                  comparison:
                    type: array
                    items:
                      type: object
                      properties:
                        domain:
                          type: string
                        score:
                          type: number
                        rank:
                          type: number
                        gap_analysis:
                          type: object
```

---

## Step 3: Set Up Authentication

### Option A: OAuth 2.0 (Recommended)

**Authorization Endpoint:** `https://aibizmod.com/oauth/authorize`

```
GET /oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://chatgpt.com/oauth/callback&
  response_type=code&
  scope=read:audits create:audits
```

**Token Endpoint:** `https://aibizmod.com/oauth/token`

```
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET&
redirect_uri=https://chatgpt.com/oauth/callback
```

### Option B: API Key (Simpler)

```
Authorization: Bearer YOUR_API_KEY
```

---

## Step 4: API Implementation (Backend Code)

### Node.js/Express Example

```javascript
// routes/plugin-api.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware: Verify API key
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers.authorization?.split('Bearer ')[1];
  if (!apiKey || !isValidApiKey(apiKey)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

router.use(verifyApiKey);

// POST /api/v1/audit - Start new audit
router.post('/audit', async (req, res) => {
  const { domain, business_name, industry } = req.body;
  
  // Validate input
  if (!domain) {
    return res.status(400).json({ error: 'domain is required' });
  }

  try {
    // Create audit record in database
    const auditId = generateAuditId();
    const audit = {
      audit_id: auditId,
      domain,
      business_name,
      industry,
      status: 'processing',
      created_at: new Date(),
      estimated_completion: new Date(Date.now() + 5 * 60000) // 5 min
    };

    // Save to database
    await db.audits.insert(audit);

    // Trigger background job to query AI engines
    startAuditJob(auditId, domain, business_name);

    return res.json({
      audit_id: auditId,
      status: 'processing',
      created_at: audit.created_at,
      estimated_completion: audit.estimated_completion,
      message: `Audit started. Checking visibility across ChatGPT, Perplexity, Google AI...`
    });
  } catch (error) {
    console.error('Audit error:', error);
    return res.status(500).json({ error: 'Failed to start audit' });
  }
});

// GET /api/v1/audit/:audit_id - Get results
router.get('/audit/:audit_id', async (req, res) => {
  const { audit_id } = req.params;

  try {
    const audit = await db.audits.findOne({ audit_id });
    
    if (!audit) {
      return res.status(404).json({ error: 'Audit not found' });
    }

    return res.json({
      audit_id: audit.audit_id,
      domain: audit.domain,
      status: audit.status,
      results: audit.results || null,
      message: audit.status === 'processing' ? 'Audit still processing...' : 'Audit complete'
    });
  } catch (error) {
    console.error('Error retrieving audit:', error);
    return res.status(500).json({ error: 'Failed to retrieve audit' });
  }
});

// GET /api/v1/audit/:domain/quick - Quick audit
router.get('/audit/:domain/quick', async (req, res) => {
  const { domain } = req.params;

  try {
    // Quick check using cached data
    const quickResult = await performQuickAudit(domain);
    return res.json(quickResult);
  } catch (error) {
    console.error('Quick audit error:', error);
    return res.status(500).json({ error: 'Quick audit failed' });
  }
});

// POST /api/v1/audit/compare - Compare competitors
router.post('/audit/compare', async (req, res) => {
  const { your_domain, competitor_domains } = req.body;

  if (!your_domain || !competitor_domains?.length) {
    return res.status(400).json({ error: 'your_domain and competitor_domains required' });
  }

  try {
    const comparison = await compareVisibility(your_domain, competitor_domains);
    return res.json(comparison);
  } catch (error) {
    console.error('Comparison error:', error);
    return res.status(500).json({ error: 'Comparison failed' });
  }
});

module.exports = router;
```

### Background Job: Query AI Engines

```javascript
// jobs/audit-job.js
async function startAuditJob(auditId, domain, businessName) {
  try {
    const results = {
      overall_score: 0,
      citations_found: 0,
      platforms: []
    };

    // Query each AI engine
    const platforms = ['chatgpt', 'perplexity', 'google_ai', 'bing_copilot', 'gemini'];
    
    for (const platform of platforms) {
      const platformResult = await queryAIPlatform(platform, domain, businessName);
      results.platforms.push(platformResult);
      results.citations_found += platformResult.citations_count;
    }

    // Calculate overall score
    results.overall_score = calculateVisibilityScore(results.platforms);

    // Generate recommendations
    results.recommendations = generateRecommendations(results);

    // Update audit with results
    await db.audits.updateOne(
      { audit_id: auditId },
      { 
        status: 'completed',
        results: results,
        completed_at: new Date()
      }
    );

  } catch (error) {
    console.error('Audit job error:', error);
    await db.audits.updateOne(
      { audit_id: auditId },
      { status: 'failed', error: error.message }
    );
  }
}

async function queryAIPlatform(platform, domain, businessName) {
  // This is pseudo-code - implement based on each AI's API
  
  switch(platform) {
    case 'chatgpt':
      return await queryChatGPT(domain, businessName);
    case 'perplexity':
      return await queryPerplexity(domain, businessName);
    case 'google_ai':
      return await queryGoogleAI(domain, businessName);
    // ... etc
  }
}
```

---

## Step 5: Testing the Plugin Locally

### 1. **Use the Plugin Playground**
- Go to: https://platform.openai.com/plugins
- Click "Develop your own plugin"
- Enter your plugin manifest URL

### 2. **Test Endpoints**
```bash
# Start audit
curl -X POST https://aibizmod.com/api/v1/audit \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "aibizmod.com",
    "business_name": "aibizmod",
    "industry": "Technology Services"
  }'

# Get results
curl -X GET https://aibizmod.com/api/v1/audit/{audit_id} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 3. **ChatGPT Testing**
Ask ChatGPT in the plugin playground:
- "Audit my visibility on aibizmod.com"
- "Compare my AI visibility with competitors"
- "What's my AI search score?"

---

## Step 6: Deployment Checklist

- [ ] HTTPS enabled on all endpoints
- [ ] CORS configured for ChatGPT origin
- [ ] Rate limiting implemented (e.g., 100 requests/hour per API key)
- [ ] Error handling for all edge cases
- [ ] Logging/monitoring set up
- [ ] Database backup strategy
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] API documentation complete
- [ ] Test all OpenAPI endpoints work

---

## Step 7: Submit to ChatGPT Plugin Directory

### Application Process:
1. Go to: https://openai.com/plugin-review
2. Fill out the form:
   - Plugin name & description
   - Your website & contact info
   - Plugin manifest URL
   - Terms of service link
   - Privacy policy link
3. OpenAI reviews (1–2 weeks)
4. If approved, plugin goes live!

### Approval Criteria:
- ✅ Clearly useful & well-documented
- ✅ Follows OpenAI plugin guidelines
- ✅ No sensitive data exposure
- ✅ Proper authentication
- ✅ Working API endpoints
- ✅ HTTPS required
- ✅ No spam/misleading content

---

## Plugin Listing Example

Once approved, your plugin will appear in the ChatGPT marketplace like:

```
Name: AI Visibility Audit
Developer: aibizmod
Description: Audit your business visibility across ChatGPT, Perplexity, Google AI, 
and other AI search engines. Get detailed reports on where you're cited and 
recommendations to improve visibility.

Key Features:
• Check citation mentions across 5+ AI platforms
• Compare visibility with competitors
• Get actionable recommendations
• Track visibility over time
• Identify AI SEO opportunities
```

---

## Monetization Options

### 1. **Free Tier + Premium**
- Free: 1 audit/month
- Premium: Unlimited audits + reports ($99/year)

### 2. **API Pricing**
- Pay-per-audit: $0.50–$2 per audit
- Revenue share with OpenAI

### 3. **Consulting Upsell**
- Free plugin (lead gen)
- Upsell to "AI Visibility Audit Service" ($499–$5,000)

---

## Expected Results

### Week 1–2:
- Plugin available in ChatGPT
- Initial user testing & feedback

### Month 1:
- 100–500 users
- ~50–100 audits/month
- Feedback for improvements

### Month 3:
- 1,000+ users
- 500+ audits/month
- Conversion to paid service (~5–10%)

---

## Next Steps

1. **Ensure your API is ready** (test all endpoints work)
2. **Create ai-plugin.json** in `.well-known/` folder
3. **Create openapi.yaml** spec
4. **Set up authentication** (OAuth or API key)
5. **Test in ChatGPT plugin playground**
6. **Deploy to production**
7. **Submit to ChatGPT for approval**

---

## Support & Resources

- **OpenAI Plugin Docs:** https://platform.openai.com/docs/plugins/getting-started
- **OpenAPI Spec:** https://spec.openapis.org/
- **Plugin Examples:** https://github.com/openai/plugins-quickstart

---

**Last Updated:** September 2026  
**Status:** Ready to implement  
**Estimated Development Time:** 3–4 weeks
