import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'Cross-Platform App Development | React Native, Flutter | aibizmod',
	description:
		'Cross-platform mobile application development using React Native and Flutter. Deploy to iOS and Android from a single codebase with near-native performance.',
	keywords: [
		'cross-platform app development',
		'React Native development',
		'Flutter development',
		'hybrid app development',
		'mobile app development',
		'multi-platform apps',
		'cross-platform mobile',
		'React Native developer',
		'Flutter apps',
	],
	alternates: {
		canonical:
			'https://aibizmod.com/services/mobile-app-development/cross-platform-apps',
	},
	openGraph: {
		title: 'Cross-Platform Apps | React Native & Flutter | aibizmod',
		description:
			'Cross-platform mobile development using React Native and Flutter to build apps for iOS and Android from a single codebase.',
		url: '/services/mobile-app-development/cross-platform-apps',
	},
};

const data: SubservicePageData = {
	name: 'Cross-Platform Apps',
	parentName: 'Mobile App Development',
	parentSlug: 'mobile-app-development',
	slug: 'cross-platform-apps',
	tagline:
		'Flutter and React Native app development that delivers a native-quality experience on iOS and Android from a single shared codebase — reducing build time and maintenance cost without sacrificing the quality users expect.',
	heroImage:
		'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Building and maintaining separate iOS and Android codebases doubles the development and ongoing maintenance cost for most standard mobile applications. Features are built twice. Bugs need to be fixed in two places. Releases need to be coordinated across both platforms. For apps whose requirements fall within what cross-platform frameworks handle well, this cost is not justified by the marginal benefits of fully separate native codebases.',
		challengePoints: [
			'Budget or timeline constraints making two separate native codebases impractical',
			'Feature parity problems between iOS and Android versions when teams build them separately',
			'Maintenance burden of two codebases compounding with every feature added',
			'Cross-platform framework previously attempted with poor results due to incorrect framework choice or poor implementation',
		],
		solution:
			'We build cross-platform mobile apps using Flutter or React Native, chosen based on your specific requirements and team context. Both frameworks can access native device APIs, produce genuinely smooth 60fps animations, and deliver apps that feel appropriate on each platform — without the cost of maintaining entirely separate codebases.',
		solutionPoints: [
			'Framework recommendation based on your specific feature requirements, existing codebase, and team',
			'Shared codebase with platform-specific adaptations where the user experience requires them',
			'Access to native APIs via plugins or platform channels for device features your app needs',
			'Single release pipeline managing both App Store and Google Play from the same codebase',
		],
	},

	capabilities: [
		{
			icon: 'smartphone',
			title: 'Flutter Development',
			description:
				'Build iOS and Android apps using Flutter and Dart, with a single codebase, custom widget rendering, and genuine 60fps performance across both platforms.',
			image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Laptop screen displaying Dart programming code for cross-platform Flutter application development.',
		},
		{
			icon: 'code2',
			title: 'React Native Development',
			description:
				'Build iOS and Android apps using React Native with JavaScript or TypeScript, sharing business logic and UI components while rendering through platform-native components.',
			image: '/services/mobile-app-development/cross-platform-react-native.png',
			imageAlt: 'Illustration displaying a smartphone with the React Native logo, showing connections to iOS, Android, and Windows platform options.',
		},
		{
			icon: 'layers',
			title: 'Platform-Specific Adaptations',
			description:
				'Implement platform-specific navigation patterns, styling, and interaction behaviour where the experience should differ between iOS and Android.',
			image: '/services/mobile-app-development/cross-platform-adaptation.png',
			imageAlt: '3D illustration showing a laptop display with various code windows, file folders, and a desk lamp, representing platform-specific coding and adaptations.',
		},
		{
			icon: 'zap',
			title: 'Native Module Integration',
			description:
				'Access platform-specific functionality through native modules or plugins when the cross-platform layer does not cover a required capability.',
			image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'A computer terminal displaying system code execution, representing low-level native modules bridge.',
		},
		{
			icon: 'settings',
			title: 'Performance Optimisation',
			description:
				'Profile and optimise app performance covering render performance, memory usage, startup time, and network efficiency for a smooth user experience on both platforms.',
			image: '/services/mobile-app-development/cross-platform-performance.png',
			imageAlt: 'Laptop screen displaying a line graph showing performance metrics over time, representing performance optimization.',
		},
		{
			icon: 'globe',
			title: 'App Store and Play Store Release',
			description:
				'Handle code signing, build configuration, store listing preparation, and the full submission process for both the App Store and Google Play.',
			image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=600&auto=format&fit=crop&q=60',
			imageAlt: 'Multiple mobile phones showing applications ready to be downloaded from the App Store and Play Store.',
		},
	],

	useCases: [
		{
			industry: 'SaaS',
			title: 'Mobile Companion App for a Web Platform',
			description:
				'A SaaS company needed an iOS and Android mobile app complementing their web product. Flutter allowed a single team to build and maintain both platforms against the same API.',
		},
		{
			industry: 'Retail',
			title: 'Customer Loyalty App',
			description:
				"A retail chain needed a loyalty app on both platforms within a tight timeline. React Native allowed a shared codebase with the web team's existing React knowledge, reducing the ramp-up time.",
		},
		{
			industry: 'Hospitality',
			title: 'Hotel Guest App',
			description:
				'A hotel group built a guest app on Flutter covering room service, local recommendations, and check-out, with both platforms delivered simultaneously and maintained from one codebase.',
		},
		{
			industry: 'Education',
			title: 'Learning App for iOS and Android',
			description:
				'An education provider built a cross-platform learning app in Flutter, with offline content download and progress tracking synced to their backend API.',
		},
		{
			industry: 'Logistics',
			title: 'Driver Delivery App',
			description:
				'A delivery company built a Flutter app for their drivers covering job dispatch, navigation integration, and proof-of-delivery photo capture, running on both iOS and Android devices.',
		},
		{
			industry: 'Healthcare',
			title: 'Patient Self-Service App',
			description:
				'A healthcare group built a React Native app for patients to view appointments, access test results, and message their care team, with the same codebase deployed to both platforms.',
		},
	],

	technologies: [
		'Flutter',
		'Dart',
		'React Native',
		'TypeScript',
		'Expo',
		'Firebase',
		'Redux',
		'Riverpod',
		'Fastlane',
		'GitHub Actions',
		'Xcode',
		'Android Studio',
	],

	benefits: [
		{
			title: 'Both Platforms from One Build',
			description:
				'A single codebase means features are built once, bugs are fixed once, and both platforms are always in sync — removing the coordination overhead of parallel native development.',
		},
		{
			title: 'Significantly Lower Build and Maintenance Cost',
			description:
				'For standard mobile applications, cross-platform development costs 40 to 60 percent less than building and maintaining equivalent separate native codebases.',
		},
		{
			title: 'Native-Quality Performance',
			description:
				'Modern cross-platform frameworks — particularly Flutter — render at 60fps and produce smooth, responsive applications that users cannot distinguish from native apps in standard interactions.',
		},
		{
			title: 'Shared Codebase with Appropriate Platform Adaptation',
			description:
				'Business logic, data fetching, and state management are shared. Platform-specific navigation patterns and styling can be adapted where the experience genuinely needs to differ.',
		},
		{
			title: 'Faster Time to Market',
			description:
				'Shipping both platforms simultaneously from one codebase is faster than sequencing separate native builds, getting your application to both audiences at the same time.',
		},
		{
			title: 'Single Team Maintains Both Platforms',
			description:
				'One team with one codebase is more efficient to staff and operate than two separate iOS and Android teams, or one team maintaining two parallel codebases.',
		},
	],

	faqs: [
		{
			q: 'What is the difference between Flutter and React Native?',
			a: 'Flutter uses Dart and renders its own UI using a custom rendering engine (Skia/Impeller), which gives it highly consistent visual output across platforms and very good performance. React Native uses JavaScript or TypeScript and renders through native platform components, which means it more closely follows platform UI conventions but has historically had more performance edge cases. Both are production-ready choices. We typically recommend Flutter for greenfield projects and React Native when a team has existing React or JavaScript expertise.',
		},
		{
			q: 'Can cross-platform apps access all device features?',
			a: 'Almost all device features are accessible through the plugin ecosystem for Flutter and React Native. Camera, location, push notifications, biometric authentication, file system access, Bluetooth, and many others are well-supported. Cutting-edge or very platform-specific features may require writing a native module, which adds cost but is entirely possible within a cross-platform project structure.',
		},
		{
			q: 'How does performance compare to native apps?',
			a: 'For the vast majority of mobile applications — forms, data display, navigation, animations, and standard UI interactions — cross-platform frameworks produce performance indistinguishable from native to users. The cases where native has a measurable advantage are high-frame-rate real-time graphics, intensive AR processing, and very low-level audio or sensor work. We assess whether your requirements fall into these categories during scoping.',
		},
		{
			q: 'How do you handle platform-specific design differences between iOS and Android?',
			a: "iOS and Android have different navigation paradigms, typography scales, and interaction conventions. We implement platform-specific adaptations for navigation patterns, icon styles, and interaction conventions where the experience genuinely benefits from following each platform's guidelines. We scope these adaptations explicitly so you understand what differs between the two platforms before development begins.",
		},
	],
	answerSummary:
		'UK and India teams needing iOS and Android apps within tighter budgets or timelines get Flutter or React Native builds from a single codebase that deliver near-native performance and platform-appropriate experience without maintaining two separate codebases.',
};

export default function CrossPlatformAppsPage() {
	return <SubservicePageLayout data={data} />;
}
