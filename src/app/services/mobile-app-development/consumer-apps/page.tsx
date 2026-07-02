import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Consumer App Development | User-Focused Mobile Apps | aibizmod',
	description:
		'Consumer mobile app development focused on user engagement, retention, and market success. Apps for iOS and Android with intuitive design and smooth performance.',
	keywords: [
		'consumer app development',
		'mobile app development',
		'user engagement apps',
		'consumer mobile application',
		'app store optimization',
		'mobile user experience',
		'social apps',
		'lifestyle apps',
		'consumer software',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/mobile-app-development/consumer-apps',
	},
	openGraph: {
		title: 'Consumer Apps | User-Focused Mobile Development | aibizmod',
		description:
			'Consumer mobile app development with focus on user engagement, retention, and market traction for iOS and Android platforms.',
		url: '/services/mobile-app-development/consumer-apps',
	},
};

const data: SubservicePageData = {
	name: 'Consumer Apps',
	parentName: 'Mobile App Development',
	parentSlug: 'mobile-app-development',
	slug: 'consumer-apps',
	tagline:
		'E-commerce, social, booking, and on-demand service mobile apps built for App Store and Google Play — designed for user retention, app store discoverability, and the performance expectations of a consumer audience.',
	heroImage:
		'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Consumer apps compete in environments where users have high expectations and low patience. A slow launch screen, a confusing onboarding flow, or inconsistent performance causes immediate uninstalls. App Store ranking algorithms favour engagement metrics — retention, session length, reviews — over download volume. Businesses building consumer apps often underestimate the product design work required to achieve sustainable user engagement and the ongoing effort needed to maintain app store position after launch.',
		challengePoints: [
			'App designed without a clear retention strategy, resulting in downloads that do not translate to active users',
			'Launch timing without an ASO strategy, so the app is invisible in App Store and Play Store search',
			"Poor onboarding flow losing users before they understand the app's core value",
			'No analytics instrumentation, so post-launch decisions about what to improve are based on guesswork',
		],
		solution:
			'We build consumer apps designed around the user journey from discovery through habitual use — with onboarding flows tested for conversion, push notification strategy for re-engagement, analytics instrumented from day one, and a plan for maintaining app store position after launch.',
		solutionPoints: [
			'User journey design covering onboarding, core flow, and re-engagement touchpoints',
			'App Store Optimisation strategy covering keywords, screenshots, and store listing copy',
			'Push notification and in-app messaging strategy for user re-engagement',
			'Analytics instrumented from launch to track retention, session quality, and conversion funnels',
		],
	},

	capabilities: [
		{
			icon: 'smartphone',
			title: 'E-Commerce App Development',
			description:
				'Build mobile e-commerce apps with product catalogue, search, cart, saved lists, checkout, and order tracking — integrated with your existing e-commerce backend or Shopify.',
			image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Online shopping discount and credit card payment mockup displayed on a device screen.',
		},
		{
			icon: 'users',
			title: 'Social and Community App Development',
			description:
				'Build apps with user profiles, content feeds, social interactions, direct messaging, and notification systems for community-centred products.',
			image: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Mockups of user direct messages and network feeds on screen representing community social apps.',
		},
		{
			icon: 'clock',
			title: 'Booking and Scheduling Apps',
			description:
				'Build apps for service booking, appointment scheduling, and resource management with calendar integration, availability display, and confirmation flows.',
			image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Monthly grid view of calendar highlighting appointments and event scheduling.',
		},
		{
			icon: 'zap',
			title: 'On-Demand Service Apps',
			description:
				'Build marketplace and on-demand service apps with provider and customer sides, real-time dispatch, location tracking, and payment processing.',
			image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Map pin icon overlaying dynamic street patterns representing on-demand dispatch and tracking.',
		},
		{
			icon: 'bell',
			title: 'Push Notification and Re-Engagement',
			description:
				'Configure push notification strategy including permission prompts, segmented notification campaigns, and in-app messaging to drive habitual app use after initial download.',
			image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Visual representing incoming message alerts and email notifications on a dark UI screen.',
		},
		{
			icon: 'lineChart',
			title: 'App Store Optimisation',
			description:
				'Optimise app store listings with keyword research, screenshot design, preview video, and A/B testing of store listing elements to improve organic download rates.',
			image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'A search engine optimization report diagram displayed on screen with key metrics.',
		},
	],

	useCases: [
		{
			industry: 'Retail',
			title: 'Mobile E-Commerce App',
			description:
				'A fashion retailer built a native iOS and Android app for their e-commerce store, with push notifications for personalised offers and order updates improving purchase frequency among app users.',
		},
		{
			industry: 'Fitness',
			title: 'Workout and Community App',
			description:
				'A fitness brand built a consumer app with workout tracking, a social feed for sharing progress, and a challenges feature — with a push notification strategy that improved 30-day retention from 18 to 34 percent.',
		},
		{
			industry: 'Hospitality',
			title: 'Restaurant Booking App',
			description:
				'A restaurant group built a booking app with real-time availability, group booking management, and a loyalty points tracker, with App Store Optimisation that achieved top-10 ranking in their category.',
		},
		{
			industry: 'Healthcare',
			title: 'Appointment Booking App for a Dental Chain',
			description:
				'A dental chain launched a consumer app for appointment booking and pre-appointment communication, reducing phone booking volume by 40 percent within three months of launch.',
		},
		{
			industry: 'Marketplace',
			title: 'On-Demand Home Services App',
			description:
				'A home services marketplace built a two-sided app covering customer booking and provider dispatch, with real-time job tracking and in-app communication between customer and provider.',
		},
		{
			industry: 'Media',
			title: 'Content Subscription App',
			description:
				'A media company built an iOS and Android subscription app with article reading, audio, offline download, and a personalised content feed driven by reading history.',
		},
	],

	technologies: [
		'Flutter',
		'React Native',
		'Swift',
		'Kotlin',
		'Firebase',
		'Stripe',
		'Braintree',
		'Segment',
		'Mixpanel',
		'OneSignal',
		'Shopify Storefront API',
		'Fastlane',
	],

	benefits: [
		{
			title: 'Designed for Retention, Not Just Downloads',
			description:
				'Consumer app success is measured in active users, not total downloads. Apps designed around habit formation and re-engagement produce sustainable user bases rather than download spikes followed by abandonment.',
		},
		{
			title: 'Discoverable in App Store Search',
			description:
				'App Store Optimisation applied at launch gives the app visibility in relevant searches, producing organic downloads without requiring paid user acquisition for every install.',
		},
		{
			title: 'Onboarding That Converts',
			description:
				"A well-designed onboarding flow converts first-time openers into activated users who understand the app's core value before they have a reason to leave.",
		},
		{
			title: 'Performance That Meets Consumer Expectations',
			description:
				"Consumer apps are compared against every other app on a user's device. Slow launch times, janky scroll performance, and inconsistent navigation cause uninstalls that reviews and search ranking permanently record.",
		},
		{
			title: 'Measurable from Day One',
			description:
				'Analytics instrumented at launch produces retention curves, funnel data, and engagement metrics from the first cohort, enabling evidence-based iteration rather than assumption-driven guesswork.',
		},
		{
			title: 'Payment Integration Ready',
			description:
				'In-app purchase, subscription billing through App Store and Google Play, and direct payment processing via Stripe or Braintree — configured for your business model and tested before launch.',
		},
	],

	faqs: [
		{
			q: 'What is the difference between a consumer app and an enterprise app?',
			a: 'Consumer apps are distributed through the public App Store and Google Play to end users — they compete for attention, need to be discovered, and succeed or fail based on user engagement metrics. Enterprise apps are typically distributed through MDM to a known employee population, where adoption is driven by business mandate rather than voluntary choice. The design, distribution, and success metrics are fundamentally different.',
		},
		{
			q: 'How important is App Store Optimisation at launch?',
			a: 'It matters significantly for organic discoverability. Apps in competitive categories with no ASO strategy are effectively invisible in search. ASO covers keyword research for app title and description, screenshot design that converts browsers to downloaders, preview video where relevant, and ongoing testing of listing elements. We treat ASO as part of the launch deliverable, not an optional extra.',
		},
		{
			q: 'How do you measure app success after launch?',
			a: 'The primary metrics for consumer apps are D1, D7, and D30 retention rates — what percentage of users who downloaded the app are still using it after 1, 7, and 30 days. We also track session length, key action completion rates, push notification opt-in and engagement rates, and app store rating trajectory. We configure dashboards for these from day one so you have the data to make informed iteration decisions.',
		},
		{
			q: 'Do you offer app marketing services alongside development?',
			a: 'Development and marketing are separate disciplines. We build the app and implement the analytics and notification infrastructure that marketing activity will use. For user acquisition campaigns, ASO, and influencer strategy, we work with specialist app marketing partners or your existing marketing team.',
		},
	],
	answerSummary:
		'UK and India consumer-facing products competing for app store visibility and user retention get mobile apps designed around the user journey from discovery through habitual use with ASO, onboarding optimisation, push notification strategy, and analytics from day one.',
};

export default function ConsumerAppsPage() {
	return <SubservicePageLayout data={data} />;
}
