import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutPageContent from '@/components/about/AboutPageContent';

import StickyFooterLayout from '@/components/layout/StickyFooterLayout';

export const metadata: Metadata = {
	title: 'About aibizmod | Technology Consulting Company',
	description:
		'About aibizmod — a team of builders and technologists delivering custom software, web development, mobile apps, and technology consulting for businesses worldwide.',
	alternates: { canonical: 'https://aibizmod.com/about' },
	openGraph: {
		title: 'About aibizmod | Technology Company',
		description:
			'A team of builders, thinkers, and technologists on a mission to help businesses grow through technology.',
		url: '/about',
	},
};

export default function AboutPage() {
	return (
		<>
			<Navbar />
			<StickyFooterLayout footer={<Footer />}>
				<main>
					<AboutPageContent />
				</main>
			</StickyFooterLayout>
		</>
	);
}
