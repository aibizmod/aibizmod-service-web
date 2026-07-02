import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Enterprise App Development | Internal Business Apps | aibizmod',
	description:
		'Enterprise mobile app development for internal operations, field teams, and employee productivity. iOS and Android apps built for security and reliability.',
	keywords: [
		'enterprise app development',
		'enterprise mobile apps',
		'business mobile application',
		'internal business apps',
		'field service apps',
		'employee productivity apps',
		'enterprise iOS apps',
		'enterprise Android apps',
		'secure mobile apps',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/mobile-app-development/enterprise-apps',
	},
	openGraph: {
		title: 'Enterprise Apps | Business Mobile Applications | aibizmod',
		description:
			'Enterprise mobile application development for internal operations, field teams, and employee productivity with security and reliability focus.',
		url: '/services/mobile-app-development/enterprise-apps',
	},
};

const data: SubservicePageData = {
	name: 'Enterprise Apps',
	parentName: 'Mobile App Development',
	parentSlug: 'mobile-app-development',
	slug: 'enterprise-apps',
	tagline:
		'Employee management, field service, and internal business apps built for the specific workflows of your organisation — integrated with existing enterprise systems and deployed to managed device fleets.',
	heroImage:
		'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Enterprise mobile applications fail when they are built as generic consumer-style apps applied to internal business workflows. Field technicians using an app that does not match how their work actually flows abandon it within weeks. Employee-facing apps that require connectivity lose utility the moment a field worker goes out of range. Internal apps with poor MDM integration cannot be deployed or updated centrally, creating version fragmentation across device fleets.',
		challengePoints: [
			'Field workforce using paper forms or spreadsheets because the existing app does not match their workflow',
			'Internal apps without offline capability that are unusable in locations without reliable connectivity',
			'No MDM integration, so apps cannot be deployed, updated, or remotely managed centrally',
			'Enterprise systems integration absent, so field workers re-enter data already in another system',
		],
		solution:
			'We build enterprise mobile applications around the specific workflows they need to support, with offline capability, enterprise system integrations, and MDM-compatible deployment. The application is designed from field research into how the work actually happens, not from assumptions about what the workflow should be.',
		solutionPoints: [
			'Workflow design based on how the role actually operates, not an assumed idealised process',
			'Offline-first architecture that queues actions and syncs when connectivity is restored',
			'Integration with ERP, CRM, HRMS, or other enterprise systems through API or direct connector',
			'MDM-compatible packaging for central deployment and update management',
		],
	},

	capabilities: [
		{
			icon: 'users',
			title: 'Field Service App Development',
			description:
				'Build apps for field technicians covering job dispatch, navigation, site data capture, photo evidence, and digital signature — with full offline support.',
			image: '/services/mobile-app-development/enterprise-field-service.png',
			imageAlt: 'Data schema showing blocks and nodes connecting together, representing job flow organization and dispatch structures.',
		},
		{
			icon: 'layers',
			title: 'Employee Self-Service Apps',
			description:
				'Build internal apps for HR workflows including leave requests, shift management, payslip access, and expense claims — integrated with your HRMS.',
			image: '/services/mobile-app-development/enterprise-employee-selfservice.png',
			imageAlt: 'Employee Self-service interface displaying portal options on both a desktop browser and a smartphone screen.',
		},
		{
			icon: 'database',
			title: 'Enterprise System Integration',
			description:
				'Integrate mobile applications with SAP, Oracle, Microsoft Dynamics, Salesforce, or custom enterprise systems via REST API or system-specific connectors.',
			image: '/services/mobile-app-development/enterprise-system-integration.png',
			imageAlt: 'Infographic displaying enterprise system integration hubs including Ecommerce, CMS, ERP, Cloud, CRM, and Databases.',
		},
		{
			icon: 'shield',
			title: 'MDM and Enterprise Deployment',
			description:
				'Configure applications for deployment through Microsoft Intune, Jamf, or VMware Workspace ONE for centralised management of enterprise device fleets.',
			image: '/services/mobile-app-development/enterprise-mdm.png',
			imageAlt: 'Diagram showing MDM flows connecting various enterprise modules like ERP, CRM, and BI with internal and supplier applications.',
		},
		{
			icon: 'network',
			title: 'Offline-First Architecture',
			description:
				'Design applications with local data persistence and sync queues so business-critical functions work without connectivity and data is reconciled when the device reconnects.',
			image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'High-speed cloud server racks storing local and server database systems.',
		},
		{
			icon: 'settings',
			title: 'Role-Based Access Control',
			description:
				'Implement role-based access within the app so different employee roles see only the functions and data relevant to them, with authentication through your existing identity provider.',
			image: '/services/mobile-app-development/enterprise-rbac.png',
			imageAlt: 'Diagram detailing system admin mapping users to roles (Beneficial owner, Accountant, Book-keeper) and roles to permissions to grant or deny access.',
		},
	],

	useCases: [
		{
			industry: 'Utilities',
			title: 'Field Engineer Job Management App',
			description:
				'A utilities company replaced paper job cards with a mobile app for field engineers covering job assignment, site arrival, work completion, and sign-off — with full offline support in remote locations.',
		},
		{
			industry: 'Retail',
			title: 'Store Operations App',
			description:
				'A retail chain built an internal app for store managers covering task management, compliance checklists, inventory counting, and incident reporting — integrated with their operations management platform.',
		},
		{
			industry: 'Healthcare',
			title: 'Community Nurse Visit App',
			description:
				'A healthcare provider built a mobile app for community nurses covering patient visit records, medication administration records, and care plan updates — with offline capability and HL7 integration.',
		},
		{
			industry: 'Construction',
			title: 'Site Safety Inspection App',
			description:
				'A construction group replaced paper safety inspection forms with a mobile app that captured inspection responses, photos, and signatures, syncing completed inspections to their HSE management system.',
		},
		{
			industry: 'Manufacturing',
			title: 'Quality Control Data Capture App',
			description:
				'A manufacturer built an Android app for quality control operatives capturing inspection data at production line stations, replacing clipboards and manual data entry with direct integration to their quality management system.',
		},
		{
			industry: 'Logistics',
			title: 'Driver Delivery Management App',
			description:
				'A logistics operator built a driver app covering route display, consignment confirmation, proof of delivery capture, and exception reporting — deployed to a managed fleet of 200 Android devices.',
		},
	],

	technologies: [
		'Flutter',
		'Kotlin',
		'Swift',
		'SQLite',
		'Room',
		'Core Data',
		'Microsoft Intune',
		'Jamf',
		'REST APIs',
		'SAP',
		'Salesforce',
		'Firebase',
	],

	benefits: [
		{
			title: 'Apps Built for How Work Actually Happens',
			description:
				'Workflow design grounded in how the role actually operates produces apps that employees use rather than avoid, driving the adoption that makes the investment worthwhile.',
		},
		{
			title: 'Operational in Disconnected Environments',
			description:
				'Offline-first architecture means field workers can complete their jobs regardless of connectivity, with data synced automatically when they return to coverage.',
		},
		{
			title: 'Enterprise Systems Kept Current',
			description:
				'Integration between the mobile app and enterprise systems means data flows directly without re-entry, reducing administrative overhead and the data quality problems of manual transfer.',
		},
		{
			title: 'Centrally Managed Device Fleet',
			description:
				'MDM-compatible deployment means updates, configuration changes, and app rollout are handled centrally rather than requiring each device to be updated individually.',
		},
		{
			title: 'Role-Appropriate Access',
			description:
				'Role-based access controls show each employee the data and functions relevant to their role, reducing complexity and the risk of inappropriate data access.',
		},
		{
			title: 'Replaces Paper Without Increasing Friction',
			description:
				'Enterprise apps that are genuinely easier to use than the paper forms they replace achieve adoption. Apps that add steps or require connectivity where paper did not are rejected by the workforce.',
		},
	],

	faqs: [
		{
			q: 'How do you design an enterprise app that field workers will actually use?',
			a: 'Field worker apps fail most often because they were designed by office-based staff making assumptions about the workflow rather than observing it. We start every enterprise app project with field research — going to the worksite, watching the workflow, understanding the connectivity constraints, the device types, and the environmental conditions. The app is designed around what we observe, not what is assumed.',
		},
		{
			q: 'What does offline-first mean in practice?',
			a: 'An offline-first app stores data locally on the device and queues all write operations when offline. When connectivity is restored, it syncs pending changes to the backend, handling any conflicts between local and server state. The user experience is uninterrupted regardless of connectivity — they complete their work in the app, and the sync happens in the background.',
		},
		{
			q: 'Can enterprise apps integrate with our SAP or Oracle system?',
			a: 'Yes, though the complexity depends on which system and what integration is required. SAP and Oracle expose APIs that most integration scenarios can use. Some older enterprise systems expose data through file exports or scheduled jobs rather than real-time APIs, which requires a different integration pattern. We assess the integration approach based on what your system actually supports.',
		},
		{
			q: 'How are enterprise apps distributed to employees?',
			a: 'Enterprise apps are typically distributed through an MDM platform — Microsoft Intune, Jamf, or VMware Workspace ONE — rather than the public app stores. This allows IT to push the app to enrolled devices, manage updates centrally, and revoke access when an employee leaves. We configure the app for MDM-compatible deployment as part of the build.',
		},
	],
	answerSummary:
		'UK and India organisations deploying mobile apps to field teams with specific workflows, offline requirements, and managed device fleets get enterprise apps designed around how work actually happens with MDM integration and enterprise system connectivity.',
};

export default function EnterpriseAppsPage() {
	return <SubservicePageLayout data={data} />;
}
