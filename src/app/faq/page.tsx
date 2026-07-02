import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FAQAccordion from './FAQAccordion';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import { TextReveal } from '@/components/ui/cascade-text';

const faqs = [
	{
		question: 'What type of technology services does aibizmod provide?',
		answer:
			'We help businesses with web platforms, mobile apps, cloud infrastructure, automation, digital marketing, customer experience systems, and IT consulting.',
	},
	{
		question: 'Can you take an idea and turn it into a complete product?',
		answer:
			'Yes. We can support discovery, planning, UI direction, development, deployment, testing, and post-launch improvements as one connected delivery process.',
	},
	{
		question: 'Do you work with startups and established businesses?',
		answer:
			'Yes. We work with early-stage teams that need a fast first release and established companies that need reliable systems, integrations, and scaling support.',
	},
	{
		question: 'How do you start a new project?',
		answer:
			'We begin with a consultation to understand goals, users, timelines, technical needs, and business priorities. From there, we outline scope, milestones, and the best delivery approach.',
	},
	{
		question: 'Can you improve an existing website or app?',
		answer:
			'Yes. We can audit an existing product, identify performance or UX issues, modernize the stack, add features, and improve reliability without rebuilding everything unnecessarily.',
	},
	{
		question: 'Do you provide mobile app development?',
		answer:
			'Yes. We build mobile experiences for iOS and Android, including customer apps, internal tools, booking flows, dashboards, and connected business workflows.',
	},
	{
		question: 'Can you handle cloud hosting and deployment?',
		answer:
			'Yes. We can set up hosting, CI/CD, monitoring, infrastructure configuration, database deployment, backups, and ongoing operational support.',
	},
	{
		question: 'Do you offer automation and AI-assisted workflows?',
		answer:
			'Yes. We design automations that reduce manual work, connect tools, route data, generate reports, and improve team productivity with practical AI-assisted workflows.',
	},
	{
		question: 'How long does a typical project take?',
		answer:
			'Timelines depend on scope. A focused landing page or website can be delivered quickly, while custom platforms and mobile apps usually move through phased milestones.',
	},
	{
		question: 'Will we get a clear project plan before development starts?',
		answer:
			'Yes. We define deliverables, milestones, dependencies, communication rhythm, and acceptance criteria before build work begins.',
	},
	{
		question: 'Can you support us after launch?',
		answer:
			'Yes. We provide post-launch support for bug fixes, updates, monitoring, optimization, security improvements, and new feature iterations.',
	},
	{
		question: 'Do you integrate third-party tools and APIs?',
		answer:
			'Yes. We integrate payment systems, CRMs, analytics tools, marketing platforms, maps, authentication, cloud services, and custom APIs.',
	},
	{
		question: 'How do you keep projects aligned with business goals?',
		answer:
			'We connect technical decisions to measurable outcomes such as speed, conversion, operational efficiency, customer experience, and long-term maintainability.',
	},
	{
		question: 'Can you help with digital marketing after the website is live?',
		answer:
			'Yes. We can support SEO, analytics setup, campaign landing pages, conversion tracking, content direction, and performance-focused improvements.',
	},
	{
		question: 'How can we contact aibizmod to discuss a project?',
		answer:
			'You can use the contact page to share your goals, timeline, and project details. The team will review it and get back with the next practical step.',
	},
];



const faqPageSchema = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqs.map((faq) => ({
		'@type': 'Question',
		name: faq.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: faq.answer,
		},
	})),
};

export const metadata: Metadata = {
	title: 'FAQ | Frequently Asked Questions | aibizmod',
	description:
		"Frequently asked questions about aibizmod's technology services — custom software development, web development, mobile apps, IT consulting, and more.",
	alternates: { canonical: 'https://aibizmod.com/faq' },
	openGraph: {
		title: 'FAQ | aibizmod',
		description:
			'Answers to common questions about our custom software, web development, mobile apps, and IT consulting services.',
		url: '/faq',
	},
};

export default function FAQPage() {
	return (
		<>
			<Navbar />
			<StickyFooterLayout footer={<Footer />}>
				<main>
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
					/>
					<section className='relative overflow-hidden bg-white px-6 py-24 md:py-32'>
						{/* Grid background */}
						<div
							className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(210,247,255,0.48),transparent_32%)]'
							style={{
								backgroundImage:
									'linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)',
								backgroundSize: '72px 72px',
							}}
							aria-hidden='true'
						/>

						<div className='relative mx-auto max-w-5xl text-center'>
							<span className='inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)]'>
								<HelpCircle size={14} aria-hidden='true' />
								Frequently Asked Questions
							</span>
							<h1
								className='mt-7 font-display font-thin text-[#0F172A] text-balance'
								style={{ fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: 1.02 }}
							>
								Questions About Building With{' '}
								<span className='inline-flex items-center font-normal tracking-tight'>
									<span className='font-normal text-stone-600'>ai</span>
									<TextReveal
										text='biz'
										as='span'
										fontSize='inherit'
										color='#0F172A'
										hoverColor='#0891B2'
										className='font-normal normal-case tracking-tight text-[#0F172A]'
										style={{ padding: 0 }}
										autoAnimate={true}
										interval={2500}
									/>
									<span className='font-normal text-stone-600'>mod</span>
								</span>
							</h1>
							<p className='mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg'>
								Simple answers to questions about our process, services, support
								and how we help businesses transform ideas into reliable digital
								systems.
							</p>
						</div>

						<FAQAccordion faqs={faqs} />
					</section>
				</main>
			</StickyFooterLayout>
		</>
	);
}
