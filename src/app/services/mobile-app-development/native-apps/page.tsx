import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Native App Development | iOS & Android Development | aibizmod',
	description:
		'Native iOS and Android app development using Swift and Kotlin. Build mobile applications that fully leverage device capabilities and platform-native user experience.',
	keywords: [
		'native app development',
		'iOS app development',
		'Android app development',
		'Swift development',
		'Kotlin development',
		'native mobile app',
		'mobile app development',
		'iOS developers',
		'Android developers',
		'native mobile development',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/mobile-app-development/native-apps',
	},
	openGraph: {
		title: 'Native Apps | iOS & Android | aibizmod',
		description:
			'Native iOS and Android app development using Swift, Kotlin, and platform-specific APIs to build mobile applications that fully leverage each operating system.',
		url: '/services/mobile-app-development/native-apps',
	},
};

const data: SubservicePageData = {
	name: 'Native Apps',
	parentName: 'Mobile App Development',
	parentSlug: 'mobile-app-development',
	slug: 'native-apps',
	tagline:
		'Native iOS and Android app development using Swift, Kotlin, and platform-specific APIs — for applications where performance, device capability access, and platform-native user experience are requirements, not preferences.',
	heroImage:
		'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Some mobile applications require capabilities or performance levels that cross-platform frameworks cannot consistently deliver. Real-time AR overlays, deep health kit integration, complex camera processing, or high-frame-rate animations are areas where native development remains the stronger choice. Choosing a cross-platform approach for these use cases produces an application that is technically functional but feels and performs below the standard users expect on each platform.',
		challengePoints: [
			'Application requiring access to platform-specific APIs not fully supported by cross-platform frameworks',
			'Performance-sensitive use cases where the abstraction layer of a cross-platform framework creates latency',
			'UI that needs to match the interaction conventions of each platform rather than a shared design',
			'Integration with hardware features — NFC, ARKit, biometric authentication — requiring native APIs',
		],
		solution:
			'We build native iOS apps using Swift and SwiftUI and native Android apps using Kotlin and Jetpack Compose, integrating the platform APIs your product requires. Both platforms can be developed from a shared design system and connected to the same backend, delivering full platform capability without the cross-platform compromise.',
		solutionPoints: [
			'iOS development using Swift and SwiftUI with full access to Apple platform APIs',
			'Android development using Kotlin and Jetpack Compose with full access to Android APIs',
			'Shared backend API architecture serving both platforms from the same data layer',
			'App Store and Google Play submission, review management, and release process handled',
		],
	},

	capabilities: [
		{
			icon: 'smartphone',
			title: 'iOS Development',
			description:
				'Build iOS applications using Swift and SwiftUI, with full integration of Apple platform APIs including HealthKit, ARKit, Core Location, Push Notifications, and in-app purchase.',
			image: '/services/mobile-app-development/native-apps-ios.png',
			imageAlt: 'Mobile screen displaying finance and stock trading charts next to a laptop with an Apple logo, representing native iOS app development.',
		},
		{
			icon: 'code2',
			title: 'Android Development',
			description:
				'Build Android applications using Kotlin and Jetpack Compose, with full integration of Android APIs including Google Maps, Biometric Auth, Camera2, NFC, and Google Pay.',
			image: '/services/mobile-app-development/native-apps-android.png',
			imageAlt: 'LG smartphone held in a stand showing Android home screen with app icons, representing native Android app development.',
		},
		{
			icon: 'shield',
			title: 'Biometric and Device Authentication',
			description:
				"Implement Face ID, Touch ID on iOS, and Android BiometricPrompt for secure, frictionless authentication that uses the device's built-in security hardware.",
			image: '/services/mobile-app-development/native-apps-biometrics.png',
			imageAlt: 'Infographic showing a fingerprint scanner, iris reader, face recognition system, and smart card reader, representing biometric and device authentication solutions.',
		},
		{
			icon: 'eye',
			title: 'Camera and AR Integration',
			description:
				'Build applications that use the device camera for AR overlays, barcode scanning, document capture, or image processing using ARKit, ARCore, and native camera APIs.',
			image: '/services/mobile-app-development/native-apps-camera-ar.png',
			imageAlt: 'Apple Vision Pro mixed reality headset displayed on a stand, representing camera and AR integration capabilities.',
		},
		{
			icon: 'activity',
			title: 'Health and Sensor Integration',
			description:
				'Integrate with Apple Health, Google Fit, and device sensors for fitness, health monitoring, or IoT applications requiring accurate, platform-calibrated sensor data.',
			image: '/services/mobile-app-development/native-apps-health-sensors.png',
			imageAlt: 'Smartwatch showing heart rate monitor with icons representing heart health, temperature, and respiration, representing health and sensor integration.',
		},
		{
			icon: 'globe',
			title: 'App Store Submission and Release Management',
			description:
				'Handle the full App Store Connect and Google Play Console submission process, including screenshots, app descriptions, age ratings, and the review response process.',
			image: '/services/mobile-app-development/native-apps-appstore.png',
			imageAlt: 'Apple App Store icon overlaying an iTunes Connect dashboard interface, representing App Store submission and release management services.',
		},
	],

	useCases: [
		{
			industry: 'Healthcare',
			title: 'Health Monitoring iOS App',
			description:
				'A healthcare company needed an iOS app that read data from HealthKit and displayed trends. Full HealthKit integration required native iOS development and could not be achieved to the required depth with a cross-platform framework.',
		},
		{
			industry: 'Retail',
			title: 'AR Product Visualiser for iOS',
			description:
				'A furniture retailer built an iOS app using ARKit that allowed customers to place product models in their room using the camera, requiring native AR capabilities not available in cross-platform frameworks.',
		},
		{
			industry: 'Finance',
			title: 'Mobile Banking App on iOS and Android',
			description:
				'A fintech company built separate native iOS and Android banking apps sharing a common API layer, with biometric authentication and NFC payment support implemented through platform-specific APIs.',
		},
		{
			industry: 'Logistics',
			title: 'Driver App with NFC and Barcode Scanning',
			description:
				'A logistics operator needed a driver app with NFC parcel scanning on Android. The NFC capability required native Android development with the NFC Adapter API.',
		},
		{
			industry: 'Fitness',
			title: 'Workout Tracking App with Sensor Integration',
			description:
				'A fitness company built a native iOS and Android app that tracked workout metrics using device motion sensors and Heart Rate monitor data from connected wearables.',
		},
		{
			industry: 'Field Services',
			title: 'Field Inspection App with Offline Mode',
			description:
				"A utilities company needed a native Android app for field technicians that worked fully offline, syncing inspection data when connectivity was restored using Android's WorkManager API.",
		},
	],

	technologies: [
		'Swift',
		'SwiftUI',
		'Kotlin',
		'Jetpack Compose',
		'Xcode',
		'Android Studio',
		'ARKit',
		'ARCore',
		'HealthKit',
		'Google Fit',
		'Firebase',
		'Fastlane',
	],

	benefits: [
		{
			title: 'Full Platform Capability',
			description:
				'Native development provides unrestricted access to every API and capability the platform exposes, without waiting for a cross-platform framework to add or fix support.',
		},
		{
			title: 'Platform-Appropriate User Experience',
			description:
				'Native applications use the interaction patterns, navigation conventions, and animation characteristics that users expect on each platform, producing a more natural experience.',
		},
		{
			title: 'Best Available Performance',
			description:
				'Code compiled for the native runtime without a cross-platform abstraction layer produces faster animations, lower memory usage, and more responsive interactions.',
		},
		{
			title: 'Reliable Hardware Integration',
			description:
				'Biometric authentication, NFC, camera, health sensors, and other hardware integrations work as documented when built with native APIs, without cross-platform edge cases.',
		},
		{
			title: 'Shared Backend Architecture',
			description:
				'Both platform codebases connect to the same backend API, so the data layer is built once and the native frontends handle the platform-specific presentation and device integration.',
		},
		{
			title: 'Full App Store Process Handled',
			description:
				'Submission, metadata, screenshots, review management, and release configuration for both stores are handled as part of the project, not left as a final hurdle.',
		},
	],

	faqs: [
		{
			q: 'When should we choose native development over a cross-platform framework?',
			a: 'Native is the stronger choice when your app needs deep integration with platform-specific capabilities — ARKit, HealthKit, NFC, high-performance camera processing, or complex animations — that cross-platform frameworks do not fully support. If your app is primarily displaying data, forms, and standard UI patterns, a cross-platform approach like Flutter or React Native will typically deliver a comparable experience at lower cost. We assess your specific requirements during scoping and recommend the right approach.',
		},
		{
			q: 'Can we build for both iOS and Android simultaneously?',
			a: 'Yes. We develop for both platforms in parallel, sharing the API and backend design across both. Platform-specific features are implemented separately in each codebase. Timeline for both platforms together is typically 25 to 40 percent longer than a single platform, not double — because the design, backend, and shared features are done once.',
		},
		{
			q: 'How do you handle App Store review and approval?',
			a: 'App Store review can take one to seven days on the first submission and is sometimes faster for updates. We prepare all required assets, write the store listing copy, and handle the submission. If a review rejection occurs, we address the specific reason provided and resubmit. We have not had a project fail to achieve app store approval, though the timeline to achieve it varies.',
		},
		{
			q: 'What happens to the source code at the end of the project?',
			a: 'The source code is yours. We deliver the full Xcode and Android Studio projects in a Git repository, including build configuration, signing certificates, and deployment instructions. We provide a handover session covering the project structure, how to update and release new versions, and how to manage the CI/CD pipeline if one was set up.',
		},
	],
	answerSummary:
		'UK and India products requiring deep platform-specific capabilities like ARKit, HealthKit, NFC, or high-performance camera processing get native iOS and Android apps built with Swift and Kotlin that fully leverage device hardware and platform-native user experience.',
};

export default function NativeAppsPage() {
	return <SubservicePageLayout data={data} />;
}
