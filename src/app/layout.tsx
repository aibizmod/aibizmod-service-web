import type { Metadata } from 'next';
import { Inter, Manrope, Fraunces } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import { AibizmodAuthProvider } from '@/components/providers/AibizmodAuthProvider';
import { AibizmodTrackingInit } from '@/components/providers/AibizmodTrackingInit';

const generalSans = localFont({
	src: [
		{ path: './fonts/GeneralSans-Semibold.woff2', weight: '600' },
		{ path: './fonts/GeneralSans-Bold.woff2', weight: '700' },
	],
	variable: '--font-general-sans',
	display: 'swap',
});

const entityGraph = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Organization',
			'@id': 'https://aibizmod.com/#organization',
			name: 'aibizmod Ltd.',
			url: 'https://aibizmod.com',
			logo: {
				'@type': 'ImageObject',
				'@id': 'https://aibizmod.com/#logo',
				url: 'https://aibizmod.com/logo.svg',
				contentUrl: 'https://aibizmod.com/logo.svg',
			},
			description:
				'End-to-end technology services for modern businesses — web development, mobile apps, digital marketing, cloud infrastructure, and automation.',
			email: 'hello@aibizmod.com',
			telephone: '+442079460958',
			areaServed: [
				{ '@type': 'City', name: 'London' },
				{ '@type': 'City', name: 'New York' },
				{ '@type': 'City', name: 'Bengaluru' },
				{ '@type': 'City', name: 'Singapore' },
				{ '@type': 'City', name: 'Sydney' },
			],
			foundingDate: '2019',
			sameAs: [
				'https://linkedin.com/company/aibizmod',
				'https://instagram.com/aibizmod',
				'https://pinterest.com/aibizmod',
				'https://facebook.com/aibizmod',
			],
			knowsAbout: [
				'Web Development',
				'Custom Software Development',
				'Mobile App Development',
				'Digital Marketing',
				'Cloud Hosting and Infrastructure',
				'Business Process Automation',
				'Customer Experience Management',
				'IT Consulting',
			],
		},
		{
			'@type': 'WebSite',
			'@id': 'https://aibizmod.com/#website',
			url: 'https://aibizmod.com',
			name: 'aibizmod',
			description:
				'End-to-end technology services for modern businesses — web development, mobile apps, digital marketing, cloud infrastructure, and automation.',
			publisher: { '@id': 'https://aibizmod.com/#organization' },
			inLanguage: 'en',
		},
	],
};

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
	weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-manrope',
	display: 'swap',
	weight: ['300', '400', '600', '700'],
});

const fraunces = Fraunces({
	subsets: ['latin'],
	variable: '--font-fraunces',
	display: 'swap',
	weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
	title: {
		default: 'aibizmod | Intelligent Tech Services',
		template: '%s | aibizmod',
	},
	description:
		'End-to-end technology services for modern businesses — web development, mobile apps, digital marketing, cloud infrastructure, and automation.',
	keywords: [
		'ai automation services',
		'custom software development',
		'web development company',
		'mobile app development',
		'cloud hosting services',
		'it consulting services',
		'digital marketing agency',
		'business process automation',
		'digital transformation consulting',
		'saas development company',
		'generative ai services',
		'managed it services',
	],
	metadataBase: new URL('https://aibizmod.com'),
	openGraph: {
		type: 'website',
		locale: 'en',
		siteName: 'aibizmod',
		title: 'aibizmod | Intelligent Tech Services',
		description:
			'End-to-end technology services for modern businesses — web development, mobile apps, digital marketing, cloud infrastructure, and automation.',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'aibizmod | Intelligent Tech Services',
		description:
			'End-to-end technology services for modern businesses — web development, mobile apps, digital marketing, cloud infrastructure, and automation.',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${inter.variable} ${generalSans.variable} ${manrope.variable} ${fraunces.variable}`}>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }}
				/>
			</head>
			<body className='font-sans antialiased bg-canvas text-ink'>
				<AibizmodAuthProvider>
					<AibizmodTrackingInit />
					<SmoothScroll>{children}</SmoothScroll>
				</AibizmodAuthProvider>
			</body>
		</html>
	);
}
