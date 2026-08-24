import Link from 'next/link';
import React from 'react';
import { ArrowRight, LayoutGrid, Globe } from 'lucide-react';
import { StarButton } from '@/components/ui/star-button';
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaPinterestP,
	FaWhatsapp,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { countries } from '@/lib/countries';

const services = [
	{ label: 'AI & Automation', href: '/services/ai-automation' },
	{ label: 'Digital Marketing', href: '/services/digital-marketing' },
	{ label: 'Web Development', href: '/services/web-development' },
	{
		label: 'Custom Software Development',
		href: '/services/software-development',
	},
	{ label: 'Mobile App Development', href: '/services/mobile-app-development' },
	{
		label: 'Hosting & Infrastructure',
		href: '/services/hosting-infrastructure',
	},
	{
		label: 'Customer Experience',
		href: '/services/customer-experience-management',
	},
	{
		label: 'IT Consulting & IT Services',
		href: '/services/it-consulting-it-services',
	},
];

const company = [
	{ label: 'About Us', href: '/about' },
	{ label: 'Clients', href: '/clients' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Tools', href: '/tools' },
	{ label: 'Careers', href: '/careers' },
	{ label: 'FAQs', href: '/faq' },
];

const comparisons = [
	{ label: 'All Comparisons', href: '/comparisons' },
	{ label: 'Custom Software vs SaaS', href: '/comparisons/custom-software-vs-saas' },
	{
		label: 'Native vs Cross-Platform Apps',
		href: '/comparisons/native-vs-cross-platform-apps',
	},
	{
		label: 'Automation Platform vs Custom Workflow',
		href: '/comparisons/automation-platform-vs-custom-workflow',
	},
	{
		label: 'Redesign vs Incremental Improvements',
		href: '/comparisons/redesign-vs-improve-existing-website',
	},
	{ label: 'LLMClicks Alternative', href: '/comparisons/llmclicks-alternative' },
	{ label: 'Otterly Alternative', href: '/comparisons/otterly-alternative' },
	{ label: 'Peec Alternative', href: '/comparisons/peec-alternative' },
	{ label: 'Profound Alternative', href: '/comparisons/profound-alternative' },
	{ label: 'AIclicks Alternative', href: '/comparisons/aiclicks-alternative' },
];

const legal = [
	{ label: 'Privacy Policy', href: '/privacy' },
	{ label: 'Terms of Service', href: '/terms' },
];

const socials = [
	{
		label: 'LinkedIn',
		href: 'https://linkedin.com/company/aibizmod',
		icon: FaLinkedinIn,
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/aibizmod2026/',
		icon: FaInstagram,
	},
	{
		label: 'Pinterest',
		href: 'https://pinterest.com/aibizmod',
		icon: FaPinterestP,
	},
	{
		label: 'Facebook',
		href: 'https://facebook.com/aibizmod',
		icon: FaFacebookF,
	},
	{
		label: 'WhatsApp',
		href: 'https://wa.me/6586111900',
		icon: FaWhatsapp,
	},
	{
		label: 'Email',
		href: 'mailto:hello@aibizmod.com',
		icon: MdEmail,
	},
];

export default function Footer() {
	return (
		<footer className='bg-navy text-white/70 transition-colors duration-300 w-full'>
			{/* Start Today Section */}
			<div className='max-w-7xl mx-auto px-6 border-b border-white/10 py-5 md:py-6'>
				<div className='flex flex-col lg:flex-row lg:items-center justify-between gap-8'>
					<div className='max-w-3xl space-y-2'>
						<span className='text-[11px] font-bold uppercase tracking-[0.2em] text-[#22D3EE] block'>
							Start Today
						</span>
						<h2 className='font-display text-[26px] sm:text-[36px] md:text-[42px] leading-[1.05] tracking-tight text-white font-medium'>
							Ready to Achieve{' '}
							<span className='text-[#22D3EE] font-semibold'>More?</span>
						</h2>
						<p className='font-sans text-[14px] sm:text-[16px] leading-[1.6] text-white/50 max-w-2xl'>
							We partner with ambitious companies to solve complex challenges,
							improve operations and deliver real results using tailored digital
							solutions.
						</p>
					</div>
					<div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto shrink-0'>
						<Link
							href='/contact'
							className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-3xl w-full sm:w-auto'
						>
							<StarButton
								as='span'
								lightColor='#22D3EE'
								backgroundColor='#ffffff'
								textColor='text-black'
								className='w-full flex sm:inline-flex sm:w-auto font-sans font-semibold text-[11px] uppercase tracking-[0.2em]'
							>
								Start a Project
								<ArrowRight className='h-4 w-4 group-hover/star-button:translate-x-1 transition-transform duration-300 text-black' />
							</StarButton>
						</Link>
						<Link
							href='/services'
							className='focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-3xl w-full sm:w-auto'
						>
							<StarButton
								as='span'
								lightColor='#FAFAFA'
								backgroundColor='#ffffff'
								textColor='text-black'
								className='w-full flex sm:inline-flex sm:w-auto font-sans font-semibold text-[11px] uppercase tracking-[0.2em]'
							>
								View Services
							</StarButton>
						</Link>
					</div>
				</div>
			</div>

			{/* Main Grid Section */}
			<div className='max-w-7xl mx-auto px-6 py-5 md:py-6'>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6'>
					{/* Brand & Inquiries Column */}
					<div className='md:col-span-3 space-y-4'>
						<Link
							href='/'
							className='inline-block font-display font-bold text-[24px] tracking-tight select-none
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded'
							style={{ color: '#CFFAFE' }}
						>
							ai<span style={{ color: '#22D3EE' }}>biz</span>mod
						</Link>
						<p className='font-sans text-[13px] leading-[1.7] text-white/60 max-w-[280px]'>
							aibizmod is a digital growth & intelligent technology firm helping
							businesses navigate the AI-driven future, build a stronger digital
							presence and scale with confidence.
						</p>

						{/* General Outlook Inquiry Email */}
						<div className='pt-3 border-t border-white/10 w-fit'>
							<div className='flex items-center gap-2 text-[13px] text-white/50 font-sans'>
								<Globe size={12} className='text-[#22D3EE] shrink-0' />
								<a
									href='mailto:aibizmod@outlook.com'
									className='hover:text-white transition-colors'
								>
									aibizmod@outlook.com
								</a>
							</div>
						</div>
					</div>

					{/* Links Grid Column (6 out of 12) */}
					<div className='md:col-span-6 grid grid-cols-2 lg:grid-cols-4 gap-8'>
						{/* Services */}
						<div className='min-w-0'>
							<h3 className='text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-4'>
								Services
							</h3>
							<ul className='space-y-2.5'>
								{services.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className='text-[13.5px] text-white/60 hover:text-white transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white/30 after:transition-all after:duration-300'
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Company */}
						<div className='min-w-0'>
							<h3 className='text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-4'>
								Company
							</h3>
							<ul className='space-y-2.5'>
								{company.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className='text-[13.5px] text-white/60 hover:text-white transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white/30 after:transition-all after:duration-300'
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Comparisons */}
						<div className='min-w-0'>
							<h3 className='text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-4'>
								Comparisons
							</h3>
							<ul className='space-y-2.5'>
								{comparisons.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className='text-[13.5px] text-white/60 hover:text-white transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white/30 after:transition-all after:duration-300'
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Legal */}
						<div className='min-w-0'>
							<h3 className='text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50 mb-4'>
								Legal
							</h3>
							<ul className='space-y-2.5'>
								{legal.map((item) => (
									<li key={item.href}>
										<Link
											href={item.href}
											className='text-[13.5px] text-white/60 hover:text-white transition-colors duration-150 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-white/30 after:transition-all after:duration-300'
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Global Offices & Social */}
					<div className='md:col-span-3 space-y-6'>
						<div className='space-y-3'>
							<p className='font-sans text-[11px] text-white/40 uppercase tracking-widest'>
								Global Offices
							</p>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
								{countries.map((c) => (
									<div key={c.code} className='space-y-0.5 font-sans'>
										<div className='flex items-center gap-1.5 text-[13px] text-white/80 font-medium'>
											{c.flag}
											<span>{c.name}</span>
										</div>
										<div className='pl-6 text-[12.5px] text-white/50 space-y-0.5'>
											{c.phone && (
												<a
													href={`tel:${c.phone.replace(/\s/g, '')}`}
													className='hover:text-white transition-colors block'
												>
													{c.phone}
												</a>
											)}
											<a
												href={`mailto:${c.email}`}
												className='hover:text-white transition-colors block'
											>
												{c.email}
											</a>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Social Links */}
						<div className='pt-4 border-t border-white/10 flex gap-4 flex-wrap md:justify-start items-center'>
							{socials.map((item) => {
								const Icon = item.icon;
								return (
									<a
										key={item.label}
										href={item.href}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={item.label}
										className='text-white/30 hover:text-[#22D3EE] transition-all duration-300 transform hover:-translate-y-1'
									>
										<Icon size={18} />
									</a>
								);
							})}
							<span className='text-white/10 select-none'>|</span>
							<Link
								href='/social-media-platforms'
								aria-label='View all social media platforms'
								title='View all platforms'
								className='text-white/30 hover:text-[#22D3EE] transition-all duration-300 transform hover:-translate-y-1'
							>
								<LayoutGrid size={18} />
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar Section */}
			<div className='max-w-7xl mx-auto px-6 border-t border-white/10 py-3'>
				<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-white/40'>
					<p>
						&copy; {new Date().getFullYear()} aibizmod Ltd. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
