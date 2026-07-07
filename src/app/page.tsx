import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import AIAutomationHero from '@/components/sections/ai-automation-hero';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import GlobalPresence from '@/components/sections/GlobalPresence';
import HowWeWork from '@/components/sections/HowWeWork';
import Testimonials from '@/components/sections/Testimonials';
import FAQSection from '@/components/sections/FAQSection';
import ClientsSection from '@/components/sections/ClientsSection';
import LatestBlogsSection from '@/components/sections/LatestBlogsSection';

export const metadata: Metadata = {
	title: { absolute: 'aibizmod | AI Automation, Software & Digital Services' },
	description:
		'aibizmod delivers AI automation, custom software development, web development, mobile apps, cloud hosting, IT consulting, and digital marketing for businesses worldwide.',
	alternates: { canonical: 'https://aibizmod.com' },
	openGraph: {
		title: 'aibizmod | AI Automation, Software & Digital Services',
		description:
			'aibizmod delivers AI automation, custom software development, web development, mobile apps, cloud hosting, IT consulting, and digital marketing for businesses worldwide.',
		url: '/',
	},
};

export default function Home() {
	return (
		<>
			<Navbar />
			<StickyFooterLayout footer={<Footer />}>
				<main>
				<HeroSection />
				<ServicesGrid />
					<AIAutomationHero />
					<WhyChooseUs />
					<GlobalPresence />
					<HowWeWork />
					<LatestBlogsSection />
					<Testimonials />
					<FAQSection />
					<ClientsSection />
				</main>
			</StickyFooterLayout>
		</>
	);
}
