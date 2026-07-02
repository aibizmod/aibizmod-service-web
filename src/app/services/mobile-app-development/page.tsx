import type { Metadata } from 'next';
import ServicePageLayout, {
	type ServicePageData,
	type ServiceCard,
} from '@/components/ServicePageLayout';
import TechStackCarousel, {
	MOBILE_APP_ROW1,
	MOBILE_APP_ROW2,
} from '@/components/ui/tech-stack-carousel';

export const metadata: Metadata = {
	title: 'Mobile App Development Services | UK & India | aibizmod',
	description:
		'iOS, Android, Flutter, and React Native app development — consumer apps, enterprise apps, and mobile-first products built and launched to the App Store and Google Play.',
	keywords: [
		'mobile app development company',
		'flutter app development',
		'react native development agency',
		'mobile app development',
		'iOS app development',
		'Android app development',
		'mobile application development',
		'app development services',
		'custom mobile app development',
		'app developers',
		'cross-platform app development',
		'mobile app development UK',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/mobile-app-development',
	},
	openGraph: {
		title: 'Mobile App Development Services | aibizmod',
		description:
			'iOS, Android, Flutter, and React Native app development — consumer apps, enterprise apps, and mobile-first products built and launched to the App Store and Google Play.',
		url: '/services/mobile-app-development',
	},
};

const data: ServicePageData = {
	name: 'Mobile App Development',
	tagline:
		'For businesses across the UK, USA, and internationally that need a mobile product built to production standard, we design and develop custom iOS and Android applications — booking tools, self-service portals, technician dispatch apps, and inventory trackers. You receive a tested, store-ready app with crash reporting, push notifications, and full source code ownership.',
	heroBullets: [
		'For businesses that need a mobile product built to production standard',
		'Custom iOS and Android apps — booking tools, self-service portals, technician dispatch, and inventory trackers',
		'Tested, store-ready app with crash reporting, push notifications, and full source code ownership',
		'Serving clients in the UK, USA, and internationally',
	],
	slug: 'mobile-app-development',
	iconColor: 'text-cyan-600',

	overview: {
		paragraphs: [
			'Building a mobile app is straightforward when the spec is clear. The hard part is usually getting to a clear spec. What does the app need to do offline? How does it handle a bad network connection in the field? What happens when a user submits a form twice? These questions matter more than the choice of framework. The app gets designed around actual use: the technician who needs job details without a signal, the customer who wants to track a delivery, the warehouse team scanning items into a system. It ships with crash reporting connected, the App Store submission handled, and the source code yours to keep.',
		],
		benefits: [
			'Direct Database API Integration',
			'Tested on Physical Devices, Not Just Emulators',
			'Offline Local Storage Configuration',
			'Push Notification Delivery Setup',
			'App Store and Play Store Compliance Support',
			'Full Source Code and Repository Access',
		],
	},

	features: [
		{
			icon: 'settings',
			title: 'App Store Submission Support',
			desc: 'We configure your developer accounts, draft submission metadata, submit builds, and respond directly to reviewer feedback to achieve production approval.',
		},
		{
			icon: 'shield',
			title: 'Privacy Labels',
			desc: 'We audit data-collection endpoints and draft the required data safety disclosures for Apple App Store and Google Play Store listings.',
		},
		{
			icon: 'layers',
			title: 'Screenshots',
			desc: 'We generate complete screenshot assets formatted to standard device viewport sizes for App Store and Google Play listings.',
		},
		{
			icon: 'activity',
			title: 'Crash Reporting Setup',
			desc: 'We integrate Sentry or Firebase Crashlytics to capture real-time stack traces, hardware states, and crash logs from production devices.',
		},
		{
			icon: 'lineChart',
			title: 'Analytics Integration',
			desc: 'We set up tracking logs for core user behaviors, recording button clicks, screen navigation, and application loading delays.',
		},
		{
			icon: 'bell',
			title: 'Push Notifications',
			desc: 'We set up Apple Push Notification service (APNs) and Firebase Cloud Messaging (FCM) credentials to dispatch transaction updates.',
		},
	],

	process: [
		{
			icon: 'compass',
			title: 'Requirements & Scope',
			desc: 'We define core user routes, offline behavior rules, target devices, and API endpoints to draft a technical blueprint.',
		},
		{
			icon: 'code2',
			title: 'Sprint Builds',
			desc: 'We compile features in 2-week agile sprints, distributing beta versions to your team via TestFlight or Firebase.',
		},
		{
			icon: 'testTube',
			title: 'Device QA & Audit',
			desc: 'We run QA checklists on physical iOS and Android devices, testing form validations, camera inputs, and offline recovery.',
		},
		{
			icon: 'rocket',
			title: 'Store Submission',
			desc: 'We upload the release candidates, complete the privacy label forms, publish the app, and set up crash alerting.',
		},
	],

	techStack: [],

	faqs: [
		{
			q: 'How do you handle App Store and Google Play review rejections?',
			a: 'We handle the review feedback process directly. If Apple or Google requests changes or clarifications regarding permissions, we adjust metadata or make the necessary code adjustments and resubmit the application at no additional fee.',
		},
		{
			q: 'Do you configure offline-first functionality in your mobile apps?',
			a: 'Yes. We design applications to store data locally (using SQLite or WatermelonDB) when network connections are unavailable. The app automatically queues uploads and reconciles database changes with your backend server once connection is restored.',
		},
		{
			q: 'Who owns the developer accounts and store listings?',
			a: 'You do. We assist you in registering your official Apple and Google Developer organization accounts. We upload builds directly to your accounts, ensuring you retain absolute ownership and control of the store listings.',
		},
		{
			q: 'How do we test work-in-progress versions during development?',
			a: 'We compile and upload development builds every two weeks. You can install and test these builds on your own phone using Apple TestFlight for iOS or Firebase App Distribution for Android.',
		},
	],
	answerSummary:
		'Mobile app development services for UK and India-based businesses. We design and build iOS, Android, Flutter, and React Native apps — from consumer apps to enterprise solutions — and launch them to the App Store and Google Play.',
};

const serviceCards: ServiceCard[] = [
	{
		title: 'Native Apps',
		image:
			'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop',
		bullets: ['Android', 'iOS'],
		href: '/services/mobile-app-development/native-apps',
	},
	{
		title: 'Cross-Platform Apps',
		image:
			'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80&auto=format&fit=crop',
		bullets: ['Flutter', 'React Native'],
		href: '/services/mobile-app-development/cross-platform-apps',
	},
	{
		title: 'Enterprise Apps',
		image:
			'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop',
		bullets: ['Employee Management', 'Field Service', 'Internal Business Apps'],
		href: '/services/mobile-app-development/enterprise-apps',
	},
	{
		title: 'Consumer Apps',
		image:
			'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&q=80&auto=format&fit=crop',
		bullets: [
			'E-commerce',
			'Social Networking',
			'Booking',
			'On-Demand Services',
		],
		href: '/services/mobile-app-development/consumer-apps',
	},
	{
		title: 'Backend Services',
		image:
			'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80&auto=format&fit=crop',
		bullets: ['APIs', 'Push Notifications', 'Authentication', 'Payments'],
		href: '/services/mobile-app-development/backend-services',
	},
	{
		title: 'Maintenance & Optimization',
		image:
			'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80&auto=format&fit=crop',
		bullets: ['App Performance Optimization', 'Bug Fixes & Troubleshooting'],
		href: '/services/mobile-app-development/maintenance-optimization',
	},
];

export default function MobileAppDevelopmentPage() {
	return (
		<ServicePageLayout
			data={data}
			techStackFooter={
				<TechStackCarousel row1={MOBILE_APP_ROW1} row2={MOBILE_APP_ROW2} />
			}
			serviceCards={serviceCards}
		/>
	);
}
