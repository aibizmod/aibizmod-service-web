import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'App Maintenance & Optimization Services | App Support | aibizmod',
	description:
		'Post-launch mobile app maintenance, updates, bug fixes, performance optimization, and feature development for iOS and Android applications.',
	keywords: [
		'app maintenance',
		'app support services',
		'app optimization',
		'mobile app updates',
		'bug fix services',
		'app performance optimization',
		'app management services',
		'app lifecycle support',
		'mobile app support',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/mobile-app-development/maintenance-optimization',
	},
	openGraph: {
		title: 'App Maintenance & Optimization | App Support | aibizmod',
		description:
			'Post-launch mobile app maintenance, updates, and optimization services to keep your iOS and Android apps running smoothly.',
		url: '/services/mobile-app-development/maintenance-optimization',
	},
};

const data: SubservicePageData = {
	name: 'Maintenance & Optimization',
	parentName: 'Mobile App Development',
	parentSlug: 'mobile-app-development',
	slug: 'maintenance-optimization',
	tagline:
		'App performance optimisation, bug fixes, OS compatibility updates, and ongoing maintenance services that keep your mobile app stable, fast, and compliant with evolving App Store and Google Play requirements after launch.',
	heroImage:
		'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Mobile apps do not maintain themselves after launch. New iOS and Android releases change APIs, introduce new permissions models, and deprecate existing approaches. App Store policy updates require modifications to comply or face removal. Performance that was acceptable at launch degrades as data volumes grow and the user base diversifies across device types. Without ongoing maintenance, a launched app gradually becomes unreliable and eventually unsubmittable.',
		challengePoints: [
			'App crashing on a new iOS or Android version after an operating system update',
			'App Store or Google Play compliance notices requiring changes to avoid removal',
			'Performance degrading over time as data grows and new device types are not tested against',
			'Bug reports accumulating without a maintenance process to triage and address them',
		],
		solution:
			'We provide structured maintenance programmes that keep your app current with operating system releases, address bugs systematically, optimise performance against real usage data, and ensure compliance with evolving platform policies.',
		solutionPoints: [
			'Annual OS compatibility review and update cycle ahead of iOS and Android major releases',
			'Bug triage process with priority classification and defined fix timelines',
			'Performance profiling against real device and usage data with prioritised optimisations',
			'App Store and Google Play policy monitoring with compliance updates before deadlines',
		],
	},

	capabilities: [
		{
			icon: 'refreshCw',
			title: 'OS Compatibility Updates',
			description:
				'Test the application against new iOS and Android releases before they ship, identify breaking changes, and implement updates to maintain compatibility.',
			image: '/services/mobile-app-development/maintenance-os-compatibility.png',
			imageAlt: 'Desk setup with three monitors displaying macOS, Windows, and Linux interfaces, representing cross-operating system compatibility testing and updates.',
		},
		{
			icon: 'zap',
			title: 'Performance Optimisation',
			description:
				'Profile application performance covering startup time, frame rate, memory usage, and battery consumption, with targeted optimisations based on measured baselines.',
			image: '/services/mobile-app-development/maintenance-performance-optimization.png',
			imageAlt: 'Performance optimization diagram displaying dashboard charts, speedometer gauge indicator, settings gear, and upward growth arrows.',
		},
		{
			icon: 'settings',
			title: 'Bug Fixing and Troubleshooting',
			description:
				'Triage, diagnose, and fix bug reports from user feedback, crash reports, and monitoring tools, with priority classification and documented resolution.',
			image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Development workspace showing code editor and debugger running on laptop.',
		},
		{
			icon: 'shield',
			title: 'App Store Compliance Updates',
			description:
				'Monitor App Store and Google Play policy updates, assess their impact on your app, and implement required changes before compliance deadlines.',
			image: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Two business colleagues reviewing lists and requirements, representing compliance checks.',
		},
		{
			icon: 'layers',
			title: 'Dependency and SDK Updates',
			description:
				'Keep third-party libraries, SDKs, and backend integrations updated to current stable versions to avoid deprecated API issues and security vulnerabilities.',
			image: '/services/mobile-app-development/maintenance-dependency-sdk-updates.png',
			imageAlt: 'Diagram showing dependency and SDK updates including automated updates, library version updates, platform SDK updates (iOS, Android, Flutter, Unity, Google Cloud), and key benefits (security, compatibility, performance, reliability).',
		},
		{
			icon: 'activity',
			title: 'Crash Monitoring and Analytics Review',
			description:
				'Review crash reports and analytics data on a regular cadence to identify and address the issues affecting the largest number of users.',
			image: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Mobile smartphone screen showing telemetry and diagnostic graphs.',
		},
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'Annual iOS Compatibility Programme',
			description:
				'A retail app ran an annual compatibility programme ahead of each iOS major release, identifying and resolving breaking changes before they affected live users on day-one iOS updaters.',
		},
		{
			industry: 'Finance',
			title: 'Performance Optimisation for a Banking App',
			description:
				"A banking app's startup time had grown from 1.2 seconds at launch to 4.8 seconds over two years of feature additions. Performance profiling and lazy initialisation reduced it to 1.6 seconds.",
		},
		{
			industry: 'Healthcare',
			title: 'App Store Compliance Update for Privacy Nutrition Labels',
			description:
				'A healthcare app received a compliance notice regarding App Store privacy nutrition label requirements. We audited data collection, updated the declarations, and submitted the required information within the deadline.',
		},
		{
			industry: 'SaaS',
			title: 'Bug Triage Programme for a Mobile Product',
			description:
				'A SaaS product had 200 open bug reports with no systematic process for addressing them. We implemented a triage and prioritisation process that cleared critical and high-priority bugs within four weeks.',
		},
		{
			industry: 'Fitness',
			title: 'Memory Leak Fix for a Workout App',
			description:
				'A fitness app was crashing after extended sessions due to a memory leak in the video player component. Profiling identified the root cause, and a fix reduced memory usage by 40 percent over a 60-minute session.',
		},
		{
			industry: 'Marketplace',
			title: 'Deprecated API Migration',
			description:
				'A marketplace app was using deprecated UIWebView APIs that Apple required to be replaced with WKWebView before a published deadline. We migrated all web view usage and submitted an update before the enforcement date.',
		},
	],

	technologies: [
		'Xcode Instruments',
		'Android Studio Profiler',
		'Firebase Crashlytics',
		'Sentry',
		'TestFlight',
		'Fastlane',
		'Charles Proxy',
		'Datadog',
		'App Store Connect',
		'Google Play Console',
	],

	benefits: [
		{
			title: 'App That Stays Compatible After OS Updates',
			description:
				'Proactive OS compatibility testing before major releases prevents the category of crash that affects a significant percentage of your user base when they update their operating system.',
		},
		{
			title: 'Compliance Issues Addressed Before Deadlines',
			description:
				'Monitoring App Store and Play Store policy updates and acting before enforcement deadlines prevents compliance-driven app removals that cut off your user base.',
		},
		{
			title: 'Performance That Reflects Actual Usage',
			description:
				'Optimisation based on profiling against real device types and usage patterns addresses the performance problems your users actually experience, not the ones visible on a developer device.',
		},
		{
			title: 'Bug Backlog Under Control',
			description:
				'A systematic triage and fix process keeps the bug backlog manageable and ensures high-impact issues are addressed rather than buried under low-priority reports.',
		},
		{
			title: 'Dependency Risk Managed',
			description:
				'Regular SDK and library updates prevent accumulation of deprecated API dependencies that create a large, disruptive update obligation when platform enforcement arrives.',
		},
		{
			title: 'Crash Rate Tracked and Reduced',
			description:
				'Crash monitoring with a regular review cadence keeps crash rates visible and declining rather than allowing them to drift upward unnoticed as the app evolves.',
		},
	],

	faqs: [
		{
			q: 'How often do mobile apps typically need maintenance updates?',
			a: 'At minimum, most apps require updates twice a year to address iOS and Android major release compatibility before the new operating systems ship in autumn. Apps with active user bases and changing business requirements typically release updates monthly or more frequently. Apps that are launched and then unmaintained for more than 12 months will usually encounter at least one significant compatibility or compliance issue that requires attention.',
		},
		{
			q: 'How do you prioritise bugs when there is a long backlog?',
			a: 'We use a priority classification based on impact (how many users are affected), severity (crash versus inconvenience), and breadcrumb trail (is the bug related to a known root cause that fixing will resolve multiple reports). Crashes on frequently used flows get priority regardless of report volume. Issues affecting only very old device versions or edge case configurations are lower priority.',
		},
		{
			q: 'What is involved in an iOS major release compatibility review?',
			a: "We install the new iOS beta on test devices, run through the full application test plan covering all key flows, and review Apple's release notes for deprecated APIs the app currently uses. Findings are categorised by urgency — critical (affects launch or key flows), important (affects secondary features), and informational (future deprecation notice). We submit a fix update before the public iOS release date.",
		},
		{
			q: 'Can you maintain an app that was built by a different development team?',
			a: 'Yes, though we start every inherited app with a codebase review to understand the structure, identify existing technical debt, and assess the quality of the test coverage. This gives us a realistic picture of the maintenance effort before committing to specific timelines. We document our findings and agree on a remediation approach for any significant structural issues that would affect ongoing maintenance efficiency.',
		},
	],
};

export default function MaintenanceOptimizationPage() {
	return <SubservicePageLayout data={data} />;
}
