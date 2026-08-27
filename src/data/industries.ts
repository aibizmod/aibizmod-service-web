export interface IndustryPage {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  heroImage: string;
  challenges: string[];
  services: { name: string; href: string; description: string }[];
  useCases: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
}

export const industries: IndustryPage[] = [
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    tagline: 'AI-driven personalisation, inventory automation, and conversion optimisation for online and physical retail.',
    description: 'Retail businesses use aibizmod to automate inventory management, personalise customer experiences, and build high-converting e-commerce platforms. From AI-powered product recommendations to automated supply chain workflows, we help retailers compete with larger players using technology as the advantage.',
    icon: '🛒',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Inventory mismanagement causing stockouts or overstock that drains cash flow',
      'Generic website experiences that fail to convert visitors into buyers',
      'Manual order processing and fulfilment workflows that scale poorly',
      'Disconnected online and offline customer data preventing personalisation',
    ],
    services: [
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate inventory, pricing, and customer segmentation with AI workflows.' },
      { name: 'Web Development', href: '/services/web-development', description: 'Build fast, conversion-optimised e-commerce platforms and product catalogues.' },
      { name: 'Digital Marketing', href: '/services/digital-marketing', description: 'Drive traffic and revenue with paid campaigns, SEO, and email automation.' },
    ],
    useCases: [
      { title: 'Automated inventory forecasting', description: 'ML models predict demand from historical sales, seasonality, and trends — reducing overstock by 30% and stockouts by 50%.' },
      { title: 'Personalised product recommendations', description: 'AI-driven recommendation engines that learn from browsing behaviour and purchase history to increase average order value.' },
      { title: 'Omnichannel customer data platform', description: 'Unify online and in-store customer data to deliver consistent personalised experiences across every touchpoint.' },
    ],
    faqs: [
      { q: 'Can you integrate with Shopify, WooCommerce, or Magento?', a: 'Yes. We build custom integrations with any e-commerce platform via API, or build headless commerce solutions from scratch for full control over performance and UX.' },
      { q: 'How does AI help with inventory management?', a: 'AI models analyse historical sales data, seasonal trends, supplier lead times, and market signals to predict demand more accurately than manual forecasting, reducing both overstock and stockouts.' },
      { q: 'Do you work with small retailers or only large enterprises?', a: 'We work with businesses of all sizes. Small retailers benefit most from automation that eliminates manual tasks, while larger retailers use us for custom AI and data platform work.' },
    ],
  },
  {
    slug: 'finance',
    name: 'Finance & Banking',
    tagline: 'Secure, compliant software and automation for financial services, fintech, and banking operations.',
    description: 'Financial institutions use aibizmod to build secure, compliant platforms — from automated reporting and risk analysis to customer-facing dashboards and internal workflow automation. We understand regulatory requirements and build systems that meet them.',
    icon: '💰',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Manual compliance reporting that consumes analyst time and introduces errors',
      'Disconnected data sources making consolidated reporting slow and unreliable',
      'Legacy systems that cannot scale with growing transaction volumes',
      'Customer onboarding processes that are slow, paper-heavy, and friction-filled',
    ],
    services: [
      { name: 'Software Development', href: '/services/software-development', description: 'Build secure, compliant financial platforms, dashboards, and reporting systems.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate risk analysis, compliance checks, and data extraction workflows.' },
      { name: 'IT Consulting', href: '/services/it-consulting-it-services', description: 'Strategic technology planning for regulatory compliance and digital transformation.' },
    ],
    useCases: [
      { title: 'Automated regulatory reporting', description: 'Extract, transform, and format data from multiple sources into compliance-ready reports — reducing preparation time from days to hours.' },
      { title: 'Risk scoring automation', description: 'ML models that analyse transaction patterns, customer data, and market signals to flag anomalies and assess risk in real time.' },
      { title: 'Digital customer onboarding', description: 'End-to-end digital workflows with identity verification, document processing, and automated compliance checks.' },
    ],
    faqs: [
      { q: 'How do you handle financial data security?', a: 'We implement bank-grade security: encryption at rest and in transit, role-based access control, audit logging, SOC 2 compliance patterns, and data residency controls. Every system is built with security as a foundation, not an afterthought.' },
      { q: 'Can you work with our existing core banking system?', a: 'Yes. We build integration layers that connect to legacy core banking systems via API, middleware, or database connectors — modernising the experience without requiring a core system replacement.' },
      { q: 'Do you support regulatory compliance for specific jurisdictions?', a: 'We build compliance-aware systems for UK FCA, EU MiFID II, and international frameworks. Our IT consulting team maps your regulatory requirements to technical controls before development begins.' },
    ],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare & Health Tech',
    tagline: 'HIPAA-compliant platforms, patient management systems, and AI-assisted clinical workflows.',
    description: 'Healthcare organisations use aibizmod to build secure patient management platforms, automate clinical documentation, and create AI-assisted diagnostic tools. We build with HIPAA, NHS Digital, and clinical safety standards from day one.',
    icon: '🏥',
    heroImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Clinical documentation that consumes hours of clinician time daily',
      'Disconnected patient data across multiple systems and departments',
      'Manual appointment scheduling and patient communication workflows',
      'Legacy systems that cannot support modern telehealth or remote monitoring',
    ],
    services: [
      { name: 'Software Development', href: '/services/software-development', description: 'Build HIPAA-compliant patient platforms, EHR integrations, and clinical tools.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate clinical documentation, coding, and patient communication workflows.' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Build patient-facing and clinician-facing mobile applications for telehealth and monitoring.' },
    ],
    useCases: [
      { title: 'AI-assisted clinical documentation', description: 'Speech-to-text and structured note generation that reduces clinician documentation time by 40% while improving record completeness.' },
      { title: 'Patient journey automation', description: 'Automated appointment reminders, follow-up communications, and care plan notifications that improve patient adherence and reduce no-shows.' },
      { title: 'Remote patient monitoring dashboard', description: 'Real-time dashboards that aggregate data from wearable devices and home monitoring equipment for clinician review.' },
    ],
    faqs: [
      { q: 'How do you ensure HIPAA compliance?', a: 'We implement HIPAA requirements as architectural decisions: encrypted data stores, access controls, audit logging, BAA agreements with cloud providers, and regular security assessments. Compliance is built into the system, not bolted on.' },
      { q: 'Can you integrate with Epic, Cerner, or other EHR systems?', a: 'Yes. We build HL7 FHIR and custom API integrations with major EHR platforms, enabling data exchange without replacing your existing clinical systems.' },
      { q: 'Do you build for NHS Digital standards?', a: 'Yes. We build to NHS Digital interoperability standards, DCB0129 clinical safety requirements, and DSPT (Data Security and Protection Toolkit) compliance for UK healthcare organisations.' },
    ],
  },
  {
    slug: 'manufacturing-logistics',
    name: 'Manufacturing & Logistics',
    tagline: 'Supply chain automation, IoT integration, and operational intelligence for factories and distribution.',
    description: 'Manufacturing and logistics companies use aibizmod to automate supply chain workflows, integrate IoT sensor data, and build operational dashboards. From warehouse management to predictive maintenance, we turn operational data into competitive advantage.',
    icon: '🏭',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Manual production scheduling that cannot adapt to demand fluctuations',
      'Reactive maintenance causing unplanned downtime and costly repairs',
      'Disconnected warehouse, shipping, and inventory data across facilities',
      'Lack of real-time visibility into supply chain performance and bottlenecks',
    ],
    services: [
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Predictive maintenance, demand forecasting, and process automation for operations.' },
      { name: 'Software Development', href: '/services/software-development', description: 'Build WMS, TMS, and custom operational platforms integrated with your ERP.' },
      { name: 'IT Consulting', href: '/services/it-consulting-it-services', description: 'Digital transformation strategy for manufacturing and logistics operations.' },
    ],
    useCases: [
      { title: 'Predictive maintenance scheduling', description: 'IoT sensor data analysed by ML models to predict equipment failure before it happens, reducing unplanned downtime by 35%.' },
      { title: 'Demand-driven production planning', description: 'AI models that adjust production schedules based on real-time demand signals, inventory levels, and supplier capacity.' },
      { title: 'Unified supply chain dashboard', description: 'Real-time visibility across warehouse, shipping, and production data from multiple facilities in a single operational view.' },
    ],
    faqs: [
      { q: 'Can you integrate with our existing ERP (SAP, Oracle, Dynamics)?', a: 'Yes. We build middleware and API integrations that connect to SAP, Oracle, Microsoft Dynamics, and custom ERP systems — extracting data for dashboards, automation, and AI workflows without replacing your core system.' },
      { q: 'Do you work with IoT sensors and edge devices?', a: 'Yes. We build edge computing solutions that process IoT sensor data locally for real-time alerts, then aggregate historical data in the cloud for ML model training and operational analytics.' },
      { q: 'How quickly can we see ROI from automation?', a: 'Most manufacturing and logistics clients see measurable ROI within 3-6 months. Quick wins like automated reporting and scheduling typically deliver value in weeks, while predictive maintenance models mature over 3-6 months.' },
    ],
  },
  {
    slug: 'saas-subscription',
    name: 'SaaS & Subscription',
    tagline: 'Product-led growth, churn reduction, and platform development for SaaS and subscription businesses.',
    description: 'SaaS companies use aibizmod to build product analytics platforms, automate customer success workflows, and develop features that drive retention. From onboarding funnels to usage-based billing, we build the systems that power product-led growth.',
    icon: '☁️',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'High churn rates from poor onboarding and unclear product value',
      'Manual customer success workflows that do not scale with user growth',
      'Fragmented product analytics making it hard to identify growth levers',
      'Usage-based billing complexity that breaks existing invoicing systems',
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development', description: 'Build product dashboards, admin panels, and customer-facing portals.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate customer success, churn prediction, and usage analytics workflows.' },
      { name: 'Digital Marketing', href: '/services/digital-marketing', description: 'Drive acquisition with SEO, content strategy, and paid campaigns for SaaS.' },
    ],
    useCases: [
      { title: 'Churn prediction and intervention', description: 'ML models that identify at-risk accounts from usage patterns and trigger automated outreach before cancellation.' },
      { title: 'Automated onboarding sequences', description: 'Behavioural triggers that guide new users through activation milestones, reducing time-to-value and improving trial-to-paid conversion.' },
      { title: 'Product usage analytics dashboard', description: 'Real-time dashboards showing feature adoption, usage trends, and cohort analysis to inform product roadmap decisions.' },
    ],
    faqs: [
      { q: 'Do you build SaaS products from scratch or integrate with existing ones?', a: 'Both. We build MVPs and full products for early-stage SaaS companies, and we integrate analytics, billing, and automation tools for established platforms looking to optimise growth.' },
      { q: 'How does AI help reduce SaaS churn?', a: 'ML models analyse login frequency, feature usage, support tickets, and billing patterns to predict which accounts are likely to churn. Automated workflows then trigger personalised interventions — in-app messages, success manager outreach, or retention offers.' },
      { q: 'Can you help with usage-based billing implementation?', a: 'Yes. We build metered billing systems that track usage events, calculate costs, and integrate with Stripe, Chargebee, or custom billing platforms for accurate usage-based invoicing.' },
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    tagline: 'CRM automation, project management, and client delivery platforms for consultancies and agencies.',
    description: 'Professional services firms use aibizmod to automate client delivery workflows, build custom CRM integrations, and create dashboards that show project health in real time. From scoping to invoicing, we streamline the operations that drive profitability.',
    icon: '💼',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Project profitability hidden behind manual timesheets and fragmented reporting',
      'Client onboarding and scoping processes that repeat for every engagement',
      'Disconnected CRM, project management, and invoicing systems',
      'Resource allocation decisions made on gut feel rather than data',
    ],
    services: [
      { name: 'Software Development', href: '/services/software-development', description: 'Build client portals, project dashboards, and delivery management platforms.' },
      { name: 'IT Consulting', href: '/services/it-consulting-it-services', description: 'Optimise your tech stack and operations for higher utilisation and profitability.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate scoping, resource allocation, and client reporting workflows.' },
    ],
    useCases: [
      { title: 'Real-time project profitability tracking', description: 'Integrate timesheets, budgets, and resource costs into a live dashboard showing margin per project, per client, and per team member.' },
      { title: 'Automated SOW generation', description: 'Template-driven scope-of-work documents generated from project parameters, reducing scoping time from hours to minutes.' },
      { title: 'AI-powered resource allocation', description: 'Models that match team skills, availability, and project requirements to optimise utilisation and reduce bench time.' },
    ],
    faqs: [
      { q: 'Can you integrate with our existing project management tools?', a: 'Yes. We integrate with Jira, Asana, Monday.com, Harvest, Toggl, and custom tools via API to create unified dashboards without replacing your current workflow.' },
      { q: 'How do you handle different engagement models (fixed price, time & materials, retainer)?', a: 'We build systems that support all engagement models, with automated tracking and reporting for each. Fixed-price projects track milestones and margins; time-and-materials track utilisation and burn rates.' },
      { q: 'Do you work with agencies or only consultancies?', a: 'Both. Marketing agencies, management consultancies, law firms, accounting firms, and design studios all benefit from the same operational improvements — automated reporting, better resource allocation, and streamlined client delivery.' },
    ],
  },
  {
    slug: 'legal',
    name: 'Legal & Compliance',
    tagline: 'Document automation, case management, and compliance platforms for law firms and legal teams.',
    description: 'Legal organisations use aibizmod to automate document review, build case management platforms, and create compliance tracking systems. We understand the unique requirements of legal work — confidentiality, audit trails, and precision.',
    icon: '⚖️',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Manual document review consuming hundreds of billable hours per matter',
      'Case information scattered across emails, files, and practice management systems',
      'Compliance deadlines tracked in spreadsheets with no automated alerts',
      'Client communication workflows that are inconsistent and hard to audit',
    ],
    services: [
      { name: 'Software Development', href: '/services/software-development', description: 'Build case management, document automation, and compliance tracking platforms.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate document review, contract analysis, and compliance monitoring.' },
      { name: 'IT Consulting', href: '/services/it-consulting-it-services', description: 'Technology strategy for legal digitisation and practice management modernisation.' },
    ],
    useCases: [
      { title: 'AI-assisted contract review', description: 'NLP models that extract key clauses, flag risks, and compare terms across contracts — reducing review time by 60% while improving consistency.' },
      { title: 'Automated compliance deadline tracking', description: 'System that monitors regulatory calendars, assigns tasks, and sends escalating alerts as deadlines approach.' },
      { title: 'Unified matter management dashboard', description: 'Single view across all active matters showing status, deadlines, billing, and client communications.' },
    ],
    faqs: [
      { q: 'How do you handle legal document confidentiality?', a: 'We implement strict access controls, encryption, audit logging, and data residency controls. All document processing can run on-premise or in isolated cloud environments to meet client confidentiality requirements.' },
      { q: 'Can you integrate with our practice management system?', a: 'Yes. We integrate with Clio, PracticePanther, LEAP, and custom PMS platforms via API to create unified workflows without disrupting your existing processes.' },
      { q: 'Do you build AI for legal document review?', a: 'Yes. We build NLP models trained on legal document types for clause extraction, risk flagging, and contract comparison. Models are trained on your firm\'s specific document patterns for higher accuracy.' },
    ],
  },
  {
    slug: 'education',
    name: 'Education & EdTech',
    tagline: 'Learning management platforms, student engagement tools, and educational content delivery systems.',
    description: 'Educational institutions and EdTech companies use aibizmod to build learning management systems, automate administrative workflows, and create AI-powered learning tools. From K-12 to corporate training, we build platforms that improve learning outcomes.',
    icon: '🎓',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Administrative overhead consuming teacher and faculty time',
      'Student engagement dropping in remote and hybrid learning environments',
      'Disconnected systems for enrollment, grading, attendance, and communication',
      'No data-driven insight into which teaching methods improve outcomes',
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development', description: 'Build learning management systems, student portals, and content delivery platforms.' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Build student-facing and educator mobile apps for learning on the go.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate grading, attendance tracking, and student communication workflows.' },
    ],
    useCases: [
      { title: 'Automated grading and feedback', description: 'AI-assisted grading for objective assessments with automated feedback generation, freeing educators for higher-value teaching.' },
      { title: 'Student engagement analytics', description: 'Dashboards tracking participation, assignment completion, and learning progression to identify at-risk students early.' },
      { title: 'Personalised learning pathways', description: 'Adaptive content delivery that adjusts difficulty and topics based on student performance and learning pace.' },
    ],
    faqs: [
      { q: 'Do you build LMS platforms or integrate with existing ones?', a: 'Both. We build custom LMS platforms for institutions with unique requirements, and we integrate with Moodle, Canvas, Blackboard, and Google Classroom for institutions that want to extend their existing systems.' },
      { q: 'Can your AI tools handle different assessment types?', a: 'Yes. Our AI grading handles multiple choice, short answer, code submissions, and structured responses. Essay-style assessments get AI-assisted scoring with educator review for quality control.' },
      { q: 'Do you work with K-12 schools or higher education?', a: 'Both. K-12 schools benefit from administrative automation and parent communication tools. Higher education institutions use us for research platforms, student success systems, and large-scale content delivery.' },
    ],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate & Property',
    tagline: 'Property platforms, tenant management, and AI-powered valuation tools for real estate businesses.',
    description: 'Real estate companies use aibizmod to build property listing platforms, automate tenant management workflows, and create AI-powered valuation and market analysis tools. From letting agents to property developers, we build technology that accelerates deals.',
    icon: '🏠',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Manual property matching and tenant screening consuming agent time',
      'Disconnected systems for listings, viewings, offers, and completions',
      'No automated way to track market trends and adjust pricing策略',
      'Tenant communication and maintenance request workflows that are slow and untracked',
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development', description: 'Build property listing platforms, tenant portals, and agent dashboards.' },
      { name: 'Digital Marketing', href: '/services/digital-marketing', description: 'Drive property inquiries with SEO, PPC, and portal integration strategies.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate property matching, valuation, and tenant communication workflows.' },
    ],
    useCases: [
      { title: 'AI-powered property matching', description: 'Models that match tenant preferences with available properties based on requirements, budget, and lifestyle factors — improving match rates and reducing void periods.' },
      { title: 'Automated tenant screening', description: 'Integrated credit checks, reference verification, and risk scoring that processes applications in hours instead of days.' },
      { title: 'Market pricing intelligence', description: 'AI analysis of comparable sales, market trends, and local demand to suggest optimal listing prices and identify investment opportunities.' },
    ],
    faqs: [
      { q: 'Do you build property portals or integrate with Rightmove/Zoopla?', a: 'Both. We build custom property platforms for agencies with unique requirements, and we integrate with Rightmove, Zoopla, and OnTheMarket APIs for listing synchronisation and lead management.' },
      { q: 'Can you build tenant management systems?', a: 'Yes. We build end-to-end tenant management platforms covering application processing, lease management, rent collection, maintenance requests, and communication — or integrate with existing property management software.' },
      { q: 'How accurate is AI property valuation?', a: 'Our valuation models use comparable sales data, market trends, property characteristics, and local demand signals. They provide a strong starting point for pricing decisions, though human judgement remains important for unique properties.' },
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality & Food Service',
    tagline: 'Booking platforms, guest management, and operational automation for hotels, restaurants, and venues.',
    description: 'Hospitality businesses use aibizmod to build booking and reservation platforms, automate guest communication, and optimise menu pricing and inventory. From boutique hotels to restaurant chains, we build technology that improves guest experience and operational efficiency.',
    icon: '🏨',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Manual reservation management across phone, email, and OTAs',
      'No-shows and last-minute cancellations destroying revenue predictability',
      'Food waste from poor demand forecasting and inventory management',
      'Guest communication that is inconsistent across touchpoints',
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development', description: 'Build booking engines, ordering platforms, and guest experience portals.' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Build guest-facing mobile apps for ordering, booking, and loyalty programmes.' },
      { name: 'Digital Marketing', href: '/services/digital-marketing', description: 'Drive bookings with local SEO, review management, and OTA optimisation.' },
    ],
    useCases: [
      { title: 'Unified reservation management', description: 'Single platform aggregating bookings from website, phone, OTAs, and walk-ins with real-time availability and automatic synchronisation.' },
      { title: 'AI demand forecasting for food inventory', description: 'Models that predict daily covers based on weather, events, seasonality, and historical patterns — reducing food waste by 25%.' },
      { title: 'Automated guest communication', description: 'Pre-arrival, during-stay, and post-checkout communication workflows triggered by booking events, improving guest satisfaction and review scores.' },
    ],
    faqs: [
      { q: 'Can you integrate with our PMS (Opera, Mews, Cloudbeds)?', a: 'Yes. We build integrations with major property management systems via API, enabling unified reporting, automated guest communication, and channel management without replacing your core PMS.' },
      { q: 'Do you build restaurant ordering systems?', a: 'Yes. We build online ordering platforms, table booking systems, and QR-code menu solutions for restaurants, cafes, and food service businesses — integrating with POS systems and delivery platforms.' },
      { q: 'How does AI help with hospitality revenue management?', a: 'AI models analyse booking patterns, competitor pricing, local events, and demand signals to optimise room rates, suggest menu pricing, and predict staffing requirements for maximum revenue per available room (RevPAR).' },
    ],
  },
  {
    slug: 'sales-crm',
    name: 'Sales & CRM',
    tagline: 'CRM automation, lead scoring, and sales intelligence platforms for revenue teams.',
    description: 'Sales teams use aibizmod to automate CRM workflows, build custom lead scoring models, and create sales intelligence dashboards. From pipeline management to forecasting, we build the systems that help sales teams close more deals.',
    icon: '📈',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Sales reps spending more time on CRM admin than selling',
      'Lead scoring that is inconsistent and misses high-intent prospects',
      'Forecasting based on gut feel rather than pipeline data',
      'Disconnected sales, marketing, and customer success data',
    ],
    services: [
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate lead scoring, CRM data entry, and sales follow-up workflows.' },
      { name: 'Software Development', href: '/services/software-development', description: 'Build custom CRM extensions, sales dashboards, and forecasting tools.' },
      { name: 'CRM & IT Consulting', href: '/services/customer-experience-management', description: 'CRM strategy, implementation, and optimisation for sales teams.' },
    ],
    useCases: [
      { title: 'AI lead scoring and prioritisation', description: 'Models that score leads based on engagement, firmographics, and behavioural signals — surfacing the highest-intent prospects for sales focus.' },
      { title: 'Automated CRM data enrichment', description: 'Workflows that automatically populate CRM records from email, calendar, and external data sources — eliminating manual data entry.' },
      { title: 'Pipeline forecasting dashboard', description: 'AI-powered forecasting that analyses deal stages, historical conversion rates, and rep activity to predict revenue with data-driven confidence.' },
    ],
    faqs: [
      { q: 'Do you build custom CRM features or only integrate with existing ones?', a: 'Both. We build custom extensions, workflows, and dashboards for Salesforce, HubSpot, and Pipedrive, and we build entirely custom CRM platforms for teams with unique requirements.' },
      { q: 'How does AI improve lead scoring?', a: 'Traditional lead scoring uses static rules. AI models learn from your actual conversion data — which leads closed, which didn\'t, and what patterns distinguish them — to score new leads with higher accuracy that improves over time.' },
      { q: 'Can you connect our CRM to marketing automation?', a: 'Yes. We build bi-directional integrations between CRMs and marketing platforms (Marketo, Mailchimp, ActiveCampaign, custom) so lead data flows seamlessly from campaign to sales handoff.' },
    ],
  },
  {
    slug: 'hr-recruitment',
    name: 'HR & Recruitment',
    tagline: 'Applicant tracking, employee management, and people analytics platforms for HR teams.',
    description: 'HR departments use aibizmod to automate recruitment workflows, build employee self-service portals, and create people analytics dashboards. From hiring to retention, we build technology that helps organisations attract and keep the best talent.',
    icon: '👥',
    heroImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Manual resume screening consuming recruiter time on low-value work',
      'Onboarding processes that are inconsistent and slow for new hires',
      'No data-driven insight into attrition causes and retention levers',
      'Employee requests routed through email with no tracking or SLA',
    ],
    services: [
      { name: 'Software Development', href: '/services/software-development', description: 'Build ATS, HRIS, employee portals, and people analytics platforms.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate resume screening, interview scheduling, and onboarding workflows.' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Build employee self-service mobile apps for HR requests and communications.' },
    ],
    useCases: [
      { title: 'AI resume screening and matching', description: 'NLP models that extract skills, experience, and qualifications from resumes, matching them against job requirements to surface the strongest candidates.' },
      { title: 'Automated onboarding workflows', description: 'Step-by-step onboarding processes with automated document collection, training assignment, and team introductions — reducing time-to-productivity.' },
      { title: 'People analytics dashboard', description: 'Dashboards showing attrition trends, engagement scores, diversity metrics, and hiring pipeline health for data-driven HR decisions.' },
    ],
    faqs: [
      { q: 'Do you build ATS systems or integrate with existing ones?', a: 'Both. We build custom applicant tracking systems for organisations with unique hiring workflows, and we integrate with Greenhouse, Lever, Workable, and Bullhorn for teams that want to extend their current ATS.' },
      { q: 'How does AI help with recruitment?', a: 'AI screens resumes faster, identifies top candidates based on actual hiring outcomes, automates interview scheduling, and reduces unconscious bias in initial screening — while keeping humans in the decision loop for final hiring.' },
      { q: 'Can you build employee self-service portals?', a: 'Yes. We build portals where employees can submit HR requests, access payslips, manage leave, complete training, and find company policies — reducing HR admin volume by 40-60%.' },
    ],
  },
  {
    slug: 'fitness',
    name: 'Fitness & Wellness',
    tagline: 'Booking platforms, membership management, and AI personalisation for gyms and wellness businesses.',
    description: 'Fitness and wellness businesses use aibizmod to build class booking platforms, automate membership management, and create AI-powered personalisation for training programmes. From gyms to wellness studios, we build technology that improves member experience and retention.',
    icon: '💪',
    heroImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Class scheduling managed manually with no real-time availability',
      'Member retention dropping without personalised engagement',
      'Disconnected booking, payment, and communication systems',
      'No data on which classes, trainers, and programmes drive retention',
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development', description: 'Build class booking platforms, membership portals, and trainer dashboards.' },
      { name: 'Mobile App Development', href: '/services/mobile-app-development', description: 'Build member-facing mobile apps for booking, tracking, and engagement.' },
      { name: 'Digital Marketing', href: '/services/digital-marketing', description: 'Drive membership sign-ups with local SEO, social media, and referral campaigns.' },
    ],
    useCases: [
      { title: 'AI-powered class scheduling', description: 'Models that optimise class schedules based on attendance patterns, trainer availability, and member preferences to maximise utilisation.' },
      { title: 'Member retention prediction', description: 'ML models that identify at-risk members from visit frequency, class attendance, and engagement patterns — triggering personalised re-engagement campaigns.' },
      { title: 'Personalised training recommendations', description: 'AI that suggests classes, trainers, and programmes based on member goals, fitness level, and historical preferences.' },
    ],
    faqs: [
      { q: 'Do you build booking systems or integrate with Mindbody/Glofox?', a: 'Both. We build custom booking platforms for unique requirements, and we integrate with Mindbody, Glofox, ClubRight, and other gym management platforms via API.' },
      { q: 'Can you build a branded member app?', a: 'Yes. We build branded mobile apps for class booking, workout tracking, membership management, and push notifications — available on iOS and Android from a single codebase.' },
      { q: 'How does AI improve fitness member retention?', a: 'AI identifies members whose visit frequency is declining, predicts which members are likely to cancel, and triggers personalised interventions — special offers, trainer outreach, or class recommendations — before they leave.' },
    ],
  },
  {
    slug: 'content-media',
    name: 'Content & Media',
    tagline: 'Content management, audience analytics, and AI-powered publishing platforms for media businesses.',
    description: 'Content and media companies use aibizmod to build publishing platforms, automate content distribution, and create AI-powered analytics dashboards. From newsrooms to content studios, we build technology that scales content operations.',
    icon: '📰',
    heroImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'Content publishing workflows that are slow and require too many manual steps',
      'No unified view of audience engagement across platforms and channels',
      'Manual content repurposing consuming editorial time',
      'Revenue optimisation that is manual and inconsistent',
    ],
    services: [
      { name: 'Web Development', href: '/services/web-development', description: 'Build publishing platforms, CMS solutions, and audience-facing digital products.' },
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Automate content distribution, summarisation, and audience segmentation workflows.' },
      { name: 'Digital Marketing', href: '/services/digital-marketing', description: 'Drive audience growth with SEO, social strategy, and newsletter optimisation.' },
    ],
    useCases: [
      { title: 'Automated content distribution', description: 'Workflows that publish and format content across website, newsletter, social media, and syndication partners from a single source.' },
      { title: 'Audience analytics dashboard', description: 'Unified view of engagement across web, email, social, and video platforms — showing which content drives the most value.' },
      { title: 'AI content repurposing', description: 'Tools that transform long-form content into social posts, newsletter excerpts, video scripts, and SEO-optimised summaries.' },
    ],
    faqs: [
      { q: 'Do you build custom CMS platforms or work with WordPress/Headless CMS?', a: 'Both. We build custom publishing tools for media companies with unique workflows, and we extend WordPress, Strapi, Contentful, and Sanity for teams that want headless CMS architecture.' },
      { q: 'Can AI help with content creation?', a: 'AI assists with content repurposing, SEO optimisation, audience segmentation, and performance analysis. Human editors remain in control of editorial decisions and creative direction.' },
      { q: 'Do you build paywall and subscription systems?', a: 'Yes. We build metered paywalls, freemium models, and subscription management systems integrated with Stripe, Recurly, and custom billing platforms for media businesses.' },
    ],
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    tagline: 'Help desk automation, AI chatbots, and customer service platforms for support teams.',
    description: 'Customer support teams use aibizmod to automate ticket routing, build AI-powered chatbots, and create knowledge bases that deflect common questions. From help desks to enterprise support operations, we build technology that improves resolution times and customer satisfaction.',
    icon: '🎧',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80&auto=format&fit=crop',
    challenges: [
      'High ticket volume from repetitive questions that could be self-served',
      'Slow first-response times due to manual routing and prioritisation',
      'Knowledge base content that is outdated and hard to search',
      'No visibility into support trends, team performance, or customer satisfaction',
    ],
    services: [
      { name: 'AI & Automation', href: '/services/ai-automation', description: 'Build AI chatbots, auto-routing, and sentiment analysis for support operations.' },
      { name: 'Software Development', href: '/services/software-development', description: 'Build custom help desk platforms, knowledge bases, and customer portals.' },
      { name: 'CRM & IT Consulting', href: '/services/customer-experience-management', description: 'Customer experience strategy and support operation optimisation.' },
    ],
    useCases: [
      { title: 'AI chatbot for first-line support', description: 'Conversational AI that handles common questions, searches the knowledge base, and escalates complex issues to human agents with full context.' },
      { title: 'Intelligent ticket routing', description: 'Models that classify tickets by topic, urgency, and required expertise — routing them to the best-equipped agent automatically.' },
      { title: 'Support analytics dashboard', description: 'Real-time visibility into ticket volume, response times, resolution rates, CSAT scores, and team performance metrics.' },
    ],
    faqs: [
      { q: 'Do you build chatbots or integrate with existing ones?', a: 'Both. We build custom AI chatbots trained on your knowledge base and support history, and we integrate with Intercom, Zendesk, Freshdesk, and Drift for teams that want to enhance their existing support stack.' },
      { q: 'How does AI reduce support ticket volume?', a: 'AI chatbots resolve 40-60% of common questions without human intervention. AI-powered knowledge base search helps customers find answers faster. Predictive routing reduces misrouted tickets and first-response delays.' },
      { q: 'Can you integrate with our existing help desk?', a: 'Yes. We build integrations with Zendesk, Freshdesk, Intercom, Salesforce Service Cloud, and custom help desk systems — adding AI capabilities without replacing your current platform.' },
    ],
  },
];

export function getIndustry(slug: string): IndustryPage | undefined {
  return industries.find((i) => i.slug === slug);
}
