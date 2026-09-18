# aibizmod ReportGate: 4-Part Automated Lead Nurture Sequence

**Version:** 1.0.0 (Phase 2 Deliverable)  
**Target Brand:** aibizmod (`https://aibizmod.com`)  
**Audience:** Technical Buyers (CTOs, VPs of Engineering, Heads of Product, Enterprise Tech Leads)  
**Trigger Mechanism:** `ReportGate.tsx` OTP Verification on Interactive Assessment & Tool Pages

---

## 1. Funnel Strategy & Behavioral Context

The primary lead generation asset on `aibizmod.com` is the interactive assessment engine (`ReportGate.tsx`). When visitors configure custom system parameters, calculate ROI, or generate architecture benchmarks, they enter their corporate email and receive an OTP code to verify deliverability and business identity.

Upon successful OTP verification:
1. The visitor is granted instant client-side access to their generated report.
2. The user profile (`email`, `first_name`, `company`, `assessment_metadata`) is ingested via webhook into the email service provider (Resend, SendGrid, Klaviyo, or HubSpot).
3. The **4-part automated nurture sequence** begins.

### Conversion Objectives
- **Build Technical Trust:** Avoid generic sales pitching; establish aibizmod as elite enterprise engineering partners.
- **Address Decision Blockers:** Directly tackle enterprise data privacy, VPC isolation, and build-vs-buy economics.
- **Drive High-Intent Conversion:** Move prospects from passive report consumers to booking a **1-on-1 Architecture Consultation**.

---

## 2. Sequence Cadence & Matrix

| Step | Cadence | Subject Line | Subject Score | Spam Score | Primary Objective |
|---|---|---|---|---|---|
| **Email 1** | Immediate (Day 0) | `{first_name}, your architecture analysis is ready` | 74 / 100 | 2 (Low) | Deliver assessment link & highlight core technical findings |
| **Email 2** | +48 Hours (Day 2) | `{first_name}, how we reduced processing latency by 40%` | 74 / 100 | 2 (Low) | Case study: private VPC LLM pipeline with sub-100ms response |
| **Email 3** | +96 Hours (Day 4) | `{first_name}, quick answers on enterprise AI compliance` | 76 / 100 | 2 (Low) | Address enterprise security, HIPAA BAA, and EU AI Act Art. 50 |
| **Email 4** | +144 Hours (Day 6)| `{first_name}, invitation: 1-on-1 architecture review` | 72 / 100 | 2 (Low) | Low-friction invite to a 30-min principal engineering review |

*All email subject lines and HTML bodies are pre-validated against `email-subject-tester.py` and `spam-score-checker.py` with zero spam trigger penalties.*

---

## 3. Template Specifications & Assets

All templates reside in `email-templates/reportgate-nurture/`:

### Email 1: Custom Report Delivery (`email-1-report-ready.html`)
- **Tone:** Efficient, analytical, authoritative.
- **Visuals:** Dual metric cards displaying overall readiness score and modernization priority.
- **Key CTA:** `Access Full Assessment Report →` (`https://aibizmod.com/tools/ai-maturity-calculator`)
- **Key Message:** Your system evaluation highlights immediate workflow automation and architectural optimization opportunities.

### Email 2: Enterprise Case Study (`email-2-case-study.html`)
- **Tone:** Pragmatic engineering breakdown.
- **Visuals:** Production metric tiles: `40% Efficiency Gain`, `<100ms Median Latency`, `Zero Public Leakage`.
- **Key CTA:** `Explore Our Engineering Capabilities →` (`https://aibizmod.com/services/ai-automation/agentic-ai`)
- **Key Message:** Enterprise AI without third-party vendor lock-in or public API data leakage, running on private infrastructure.

### Email 3: Compliance & Sovereignty FAQ (`email-3-compliance-faq.html`)
- **Tone:** Reassuring, compliance-literate, architectural.
- **Visuals:** Left-accented technical FAQ callouts.
- **Key CTA:** `Read Our Audit Methodology →` (`https://aibizmod.com/how-we-audit-ai-visibility`)
- **Key Questions Answered:**
  1. *How is patient or customer data isolated?* (AWS VPC / GCP / on-premise Kubernetes; zero third-party token transmission).
  2. *How do we meet EU AI Act Article 50 guidelines?* (C2PA cryptographic metadata signing and provenance verification).
  3. *Can we integrate with our legacy enterprise databases?* (Clean microservice abstraction layers interfacing with SQL, Snowflake, and CRM platforms).

### Email 4: 1-on-1 Architecture Consultation (`email-4-architecture-consultation.html`)
- **Tone:** Advisory, high-touch, executive.
- **Visuals:** 3-point structured consultation agenda cards.
- **Key CTA:** `Schedule Architecture Consultation →` (`https://aibizmod.com/contact`)
- **Meeting Agenda:**
  1. Infrastructure & Sovereignty Scoping (private VPC vs. hybrid endpoints).
  2. Build vs. Buy Tradeoff Analysis (24-month total cost of ownership model).
  3. 60-Day Phased Deployment Blueprint.

---

## 4. Technical Integration Guide (ESP Webhooks)

### Resend / Node.js Trigger Example

```typescript
// pages/api/auth/otp-verify.ts or app/api/lead-capture/route.ts
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function onOtpVerified(lead: { email: string; firstName: string; reportUrl: string }) {
  // Read Email 1 template
  const templatePath = path.join(process.cwd(), 'email-templates/reportgate-nurture/email-1-report-ready.html');
  let html = fs.readFileSync(templatePath, 'utf8');

  // Interpolate tokens
  html = html.replace(/\{\{first_name\|default:"there"\}\}/g, lead.firstName || 'there')
             .replace(/\{\{unsubscribe_url\|default:'#'\}\}/g, `https://aibizmod.com/unsubscribe?email=${encodeURIComponent(lead.email)}`);

  await resend.emails.send({
    from: 'aibizmod Engineering <engineering@aibizmod.com>',
    to: lead.email,
    subject: `${lead.firstName || 'Here'}, your architecture analysis is ready`,
    html,
  });

  // Enqueue drip steps (Day 2, Day 4, Day 6) in background worker (BullMQ / Inngest / QStash)
}
```

---

## 5. Copy & Governance Standards

In adherence with `PROJECT_INSTRUCTIONS.md`:
1. **Never use AI cliches:** Zero occurrences of "delve", "game-changer", "unleash", "skyrocket", or "revolutionary".
2. **Spam Score Discipline:** All copy must score $\le 4$ on `spam-score-checker.py`.
3. **Sender Persona:** Sent from `Engineering & Architecture Advisory` at aibizmod, reinforcing technical partnership rather than junior SDR outreach.
