'use client';

import { ReactNode, useId, useState } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import {
	AlertCircle,
	ArrowRight,
	CheckCircle,
	Clock,
	MessageSquare,
	type LucideIcon,
} from 'lucide-react';
import ShaderBackground from '@/components/ui/shader-background';
import { StarButton } from '@/components/ui/star-button';
import { TextReveal } from '@/components/ui/cascade-text';
import { client } from '@/lib/apollo-client';
import { countries } from '@/lib/countries';

const CREATE_DEMO_REQUEST = gql`
	mutation CreateDemoRequest($input: CreateDemoRequestInput!) {
		createDemoRequest(input: $input) {
			_id
			firstName
			lastName
			email
			company
			phoneNumber
			companySize
			projectDetails
			formType
		}
	}
`;

const companySizeOptions = ['1-10', '11-50', '51-200', '201-1000', '1000+'];

const serviceOptions = [
	'Web Development',
	'Custom Software Development',
	'Mobile App Development',
	'Digital Marketing',
	'Hosting & Infrastructure',
	'Automation',
	'Customer Experience Management',
	'IT Consulting & IT Services',
];

interface ContactDetailItem {
	icon?: LucideIcon;
	flag?: ReactNode;
	label: string;
	value?: string;
	links?: { text: string; href?: string }[];
}

const contactDetails: ContactDetailItem[] = [
	...countries.map((c) => ({
		icon: undefined,
		flag: c.flag as ReactNode,
		label: c.name,
		links: [
			{ text: c.phone, href: `tel:${c.phone.replace(/\s+/g, '')}` },
			{ text: c.email, href: `mailto:${c.email}` },
		],
	})),
];

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	company: string;
	companySize: string;
	projectDetails: string;
	formType: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
	company?: string;
}

function validate(data: FormData): FormErrors {
	const errors: FormErrors = {};

	if (!data.firstName.trim()) {
		errors.firstName = 'First name is required.';
	}

	if (!data.lastName.trim()) {
		errors.lastName = 'Last name is required.';
	}

	if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
		errors.email = 'Please enter a valid email address.';
	}

	if (!data.phoneNumber.trim()) {
		errors.phoneNumber = 'Phone number is required.';
	}

	if (!data.company.trim()) {
		errors.company = 'Company name is required.';
	}

	return errors;
}

function FieldError({ id, message }: { id: string; message: string }) {
	return (
		<p
			id={id}
			role='alert'
			className='mt-1.5 flex items-center gap-1 text-xs text-red-400'
		>
			<AlertCircle size={11} className='shrink-0' />
			{message}
		</p>
	);
}

function NextStepCard() {
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const px = e.clientX - rect.left;
		const py = e.clientY - rect.top;
		const percentX = Math.min(100, Math.max(0, (px / rect.width) * 100));
		const percentY = Math.min(100, Math.max(0, (py / rect.height) * 100));
		card.style.setProperty('--mx', percentX + '%');
		card.style.setProperty('--my', percentY + '%');

		const rotateY = (px / rect.width - 0.5) * 18;
		const rotateX = -(py / rect.height - 0.5) * 18;
		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget;
		card.style.setProperty('--mx', '50%');
		card.style.setProperty('--my', '50%');
		card.style.transform = 'rotateX(0deg) rotateY(0deg)';
	};

	return (
		<div 
			className='relative overflow-hidden mt-6 rounded-2xl contact-card p-5'
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* Dotted Hologram Background Overlay */}
			<div 
				className="absolute inset-0 pointer-events-none z-0 opacity-100"
				style={{
					backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.03) 1.2px, transparent 1.2px)",
					backgroundSize: "20px 20px",
				}}
			/>
			<div className="relative z-10">
				<p className='text-sm font-semibold text-white'>
					What happens next?
				</p>
				<p className='mt-2 text-sm leading-7 text-slate-200'>
					We review your note, clarify goals, and suggest the simplest next step
					before any build work begins.
				</p>
				<Link
					href='/services'
					className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors'
				>
					View services
					<ArrowRight size={14} aria-hidden='true' />
				</Link>
			</div>
		</div>
	);
}

interface CustomSelectProps {
	id: string;
	value: string;
	onChange: (value: string) => void;
	options: string[];
	placeholder: string;
	suffix?: string;
}

function CustomSelect({ id, value, onChange, options, placeholder, suffix = '' }: CustomSelectProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleSelect = (optionValue: string) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	return (
		<div className="relative w-full">
			<button
				id={id}
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full rounded-2xl border bg-slate-950/50 border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-400 shadow-[0_10px_28px_rgba(0,0,0,0.15)] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 flex items-center justify-between text-left"
			>
				<span className={value ? 'text-white font-semibold' : 'text-slate-400'}>
					{value ? `${value}${suffix}` : placeholder}
				</span>
				<svg
					className={`ml-2 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<>
					{/* Click outside backdrop */}
					<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
					
					{/* Dropdown list */}
					<ul
						data-lenis-prevent
						className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-slate-700 bg-slate-950 p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-md outline-none custom-scrollbar"
					>
						<li
							onClick={() => handleSelect('')}
							className="relative flex cursor-pointer select-none items-center rounded-xl px-3.5 py-2.5 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
						>
							{placeholder}
						</li>
						{options.map((option) => (
							<li
								key={option}
								onClick={() => handleSelect(option)}
								className={`relative flex cursor-pointer select-none items-center rounded-xl px-3.5 py-2.5 text-sm transition hover:bg-slate-800 hover:text-white ${
									value === option ? 'bg-cyan-950/50 text-cyan-400 font-semibold border-l-2 border-cyan-400 pl-2.5' : 'text-white'
								}`}
							>
								{option}{suffix}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

export default function ContactPageContent() {
	const uid = useId();
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		company: '',
		companySize: '',
		projectDetails: '',
		formType: 'aibizmod',
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitError, setSubmitError] = useState('');

	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
		if (submitError) setSubmitError('');
	};

	const handleSelectChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
		if (submitError) setSubmitError('');
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const validationErrors = validate(formData);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			document
				.getElementById(`${uid}-${Object.keys(validationErrors)[0]}`)
				?.focus();
			return;
		}

		setIsSubmitting(true);
		setSubmitError('');
		try {
			await client.mutate({
				mutation: CREATE_DEMO_REQUEST,
				variables: { input: formData },
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Form submission error:', error);
			setSubmitError('Something went wrong. Please try again or email us directly.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleReset = () => {
		setSubmitted(false);
		setErrors({});
		setSubmitError('');
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			company: '',
			companySize: '',
			projectDetails: '',
			formType: 'aibizmod',
		});
	};

	const inputBase =
		'w-full rounded-2xl border bg-slate-950/50 border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-400 shadow-[0_10px_28px_rgba(0,0,0,0.15)] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20';
	const inputNormal = inputBase;
	const inputError = `${inputBase} border-red-500/30 bg-red-950/20 focus:border-red-400 focus:ring-red-500/20`;
	const cls = (field: keyof FormErrors) =>
		errors[field] ? inputError : inputNormal;

	const firstName = formData.firstName.trim();
	const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-100';
	const optionalClass = 'font-normal text-slate-400';

	
	const successIconClass = 'mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-800 bg-cyan-950/50 text-cyan-400';

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLElement>) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const px = e.clientX - rect.left;
		const py = e.clientY - rect.top;
		const percentX = Math.min(100, Math.max(0, (px / rect.width) * 100));
		const percentY = Math.min(100, Math.max(0, (py / rect.height) * 100));
		card.style.setProperty('--mx', percentX + '%');
		card.style.setProperty('--my', percentY + '%');

		const rotateY = (px / rect.width - 0.5) * 18;
		const rotateX = -(py / rect.height - 0.5) * 18;
		card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement | HTMLElement>) => {
		const card = e.currentTarget;
		card.style.setProperty('--mx', '50%');
		card.style.setProperty('--my', '50%');
		card.style.transform = 'rotateX(0deg) rotateY(0deg)';
	};

	return (
		<section className='relative isolate min-h-screen overflow-hidden bg-white px-4 sm:px-6 pb-20 pt-32 md:pt-36'>
			<style dangerouslySetInnerHTML={{ __html: `
				.contact-card {
					position: relative;
					background-color: #0F172A;
					box-shadow:
						0 1px 0 rgba(255,255,255,0.06) inset,
						0 0 0 1px rgba(34,211,238,0.08) inset,
						0 20px 40px -15px rgba(0,0,0,0.5),
						0 30px 70px -10px rgba(8,145,178,0.15);
					transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
				}
				.contact-card:hover {
					box-shadow:
						0 1px 0 rgba(255,255,255,0.08) inset,
						0 0 0 1px rgba(34,211,238,0.16) inset,
						0 30px 60px -15px rgba(0,0,0,0.55),
						0 40px 90px -10px rgba(8,145,178,0.28);
				}
				
				/* Spotlight border overlay inside card */
				.contact-card::after {
					content: '';
					position: absolute;
					inset: 0;
					border-radius: inherit;
					padding: 2.5px;
					background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.95), transparent 65%);
					-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
					-webkit-mask-composite: xor;
					mask-composite: exclude;
					opacity: 0;
					transition: opacity 0.35s ease;
					pointer-events: none;
					z-index: 6;
				}
				.contact-card:hover::after {
					opacity: 1;
				}
				
				/* Premium custom scrollbar for dropdowns */
				.custom-scrollbar::-webkit-scrollbar {
					width: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background-color: #22D3EE;
					border: 3px solid #020617;
					border-radius: 999px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background-color: #06B6D4;
				}
			` }} />
			<ShaderBackground className='absolute inset-0 z-0 h-full w-full opacity-80' />

			<div
				className='pointer-events-none absolute left-1/2 top-28 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl'
				aria-hidden='true'
			/>

			<div className='relative z-10 mx-auto max-w-6xl'>
				<div className='mx-auto max-w-3xl text-center'>
					<span className='inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)]'>
						<MessageSquare size={14} aria-hidden='true' />
						Contact
					</span>
					<h1
						className='mt-7 font-display font-thin text-[#0F172A] text-balance'
						style={{ fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: 1.02 }}
					>
						Let&apos;s Build Something{' '}
						<TextReveal
							text='Connected'
							as='span'
							fontSize='inherit'
							color='#0F172A'
							hoverColor='#0891B2'
							className='font-normal normal-case tracking-tight'
							style={{ padding: 0 }}
						/>
					</h1>
					<p className='mx-auto mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/85 px-6 py-4 text-base leading-8 text-slate-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] md:text-lg'>
						Tell us what you are planning. We will help shape the right next
						step for your website, app, automation, or cloud project.
					</p>
				</div>

				<div className='mt-14 grid gap-6 lg:grid-cols-2 lg:items-stretch'>
					<div 
						className='relative overflow-hidden rounded-[28px] contact-card p-4 sm:p-5 md:p-8 text-white h-full'
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						{/* Dotted Hologram Background Overlay */}
						<div 
							className="absolute inset-0 pointer-events-none z-0 opacity-100"
							style={{
								backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.03) 1.2px, transparent 1.2px)",
								backgroundSize: "20px 20px",
							}}
						/>
						<div className="relative z-10 h-full flex flex-col">
							{submitted ? (
								<div className='flex min-h-[420px] flex-col items-center justify-center text-center'>
									<div className={successIconClass}>
										<CheckCircle size={32} aria-hidden='true' />
									</div>
									<h2 className='font-display text-2xl font-semibold text-white'>
										Message sent
									</h2>
									<p className='mt-3 max-w-sm text-sm leading-7 text-slate-200'>
										Thanks{firstName ? `, ${firstName}` : ''}. We have your
										message and will reply within 24 business hours.
									</p>
									<button
										type="button"
										onClick={handleReset}
										className='mt-8 text-sm font-semibold text-cyan-400 underline-offset-4 hover:underline hover:text-cyan-300'
									>
										Send another message
									</button>
								</div>
							) : (
								<form
									onSubmit={handleSubmit}
									noValidate
									aria-label='Contact form'
									className='h-full flex flex-col'
								>
									<div className='space-y-5'>
									<div className='grid gap-5 sm:grid-cols-2'>
										<div>
											<label
												htmlFor={`${uid}-firstName`}
												className={labelClass}
											>
												First name
											</label>
											<input
												id={`${uid}-firstName`}
												name='firstName'
												type='text'
												autoComplete='given-name'
												placeholder='Jane'
												value={formData.firstName}
												onChange={handleChange}
												aria-invalid={!!errors.firstName}
												aria-describedby={
													errors.firstName ? `${uid}-firstName-error` : undefined
												}
												className={cls('firstName')}
											/>
											{errors.firstName && (
												<FieldError
													id={`${uid}-firstName-error`}
													message={errors.firstName}
												/>
											)}
										</div>

										<div>
											<label
												htmlFor={`${uid}-lastName`}
												className={labelClass}
											>
												Last name
											</label>
											<input
												id={`${uid}-lastName`}
												name='lastName'
												type='text'
												autoComplete='family-name'
												placeholder='Smith'
												value={formData.lastName}
												onChange={handleChange}
												aria-invalid={!!errors.lastName}
												aria-describedby={
													errors.lastName ? `${uid}-lastName-error` : undefined
												}
												className={cls('lastName')}
											/>
											{errors.lastName && (
												<FieldError
													id={`${uid}-lastName-error`}
													message={errors.lastName}
												/>
											)}
										</div>
									</div>

									<div className='grid gap-5 sm:grid-cols-2'>
										<div>
											<label
												htmlFor={`${uid}-email`}
												className={labelClass}
											>
												Email
											</label>
											<input
												id={`${uid}-email`}
												name='email'
												type='email'
												autoComplete='email'
												placeholder='jane@company.com'
												value={formData.email}
												onChange={handleChange}
												aria-invalid={!!errors.email}
												aria-describedby={
													errors.email ? `${uid}-email-error` : undefined
												}
												className={cls('email')}
											/>
											{errors.email && (
												<FieldError
													id={`${uid}-email-error`}
													message={errors.email}
												/>
											)}
										</div>

										<div>
											<label
												htmlFor={`${uid}-phoneNumber`}
												className={labelClass}
											>
												Phone number
											</label>
											<input
												id={`${uid}-phoneNumber`}
												name='phoneNumber'
												type='tel'
												autoComplete='tel'
												placeholder='+1 234 567 8900'
												value={formData.phoneNumber}
												onChange={handleChange}
												aria-invalid={!!errors.phoneNumber}
												aria-describedby={
													errors.phoneNumber ? `${uid}-phoneNumber-error` : undefined
												}
												className={cls('phoneNumber')}
											/>
											{errors.phoneNumber && (
												<FieldError
													id={`${uid}-phoneNumber-error`}
													message={errors.phoneNumber}
												/>
											)}
										</div>
									</div>

									<div className='grid gap-5 sm:grid-cols-2'>
										<div>
											<label
												htmlFor={`${uid}-company`}
												className={labelClass}
											>
												Company
											</label>
											<input
												id={`${uid}-company`}
												name='company'
												type='text'
												autoComplete='organization'
												placeholder='Company name'
												value={formData.company}
												onChange={handleChange}
												aria-invalid={!!errors.company}
												aria-describedby={
													errors.company ? `${uid}-company-error` : undefined
												}
												className={cls('company')}
											/>
											{errors.company && (
												<FieldError
													id={`${uid}-company-error`}
													message={errors.company}
												/>
											)}
										</div>

										<div>
											<label
												htmlFor={`${uid}-companySize`}
												className={labelClass}
											>
												Company size{' '}
												<span className={optionalClass}>(optional)</span>
											</label>
											<CustomSelect
												id={`${uid}-companySize`}
												value={formData.companySize}
												onChange={(val) => handleSelectChange('companySize', val)}
												options={companySizeOptions}
												placeholder="Select company size"
												suffix=" employees"
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor={`${uid}-projectDetails`}
											className={labelClass}
										>
											Which service are you looking for?{' '}
											<span className={optionalClass}>(optional)</span>
										</label>
										<CustomSelect
											id={`${uid}-projectDetails`}
											value={formData.projectDetails}
											onChange={(val) => handleSelectChange('projectDetails', val)}
											options={serviceOptions}
											placeholder="Select a service"
										/>
									</div>

									<div className='flex gap-3 items-center rounded-2xl border border-white/10 bg-white/5 p-3.5 mt-2'>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-800 bg-cyan-950/50 text-[#22D3EE]'>
											<Clock size={17} aria-hidden='true' />
										</div>
										<div>
											<p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]'>
												Response time
											</p>
											<p className='mt-1 text-sm font-semibold text-white'>
												Within 24 business hours
											</p>
										</div>
									</div>
									</div>

									{submitError && (
										<p
											role='alert'
											className='rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mt-6'
										>
											{submitError}
										</p>
									)}

									<div className='flex flex-col gap-3 pt-6 sm:flex-row sm:items-center mt-auto'>
										<button
											type='submit'
											disabled={isSubmitting}
											className='w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70'
										>
											<StarButton
												as='span'
												lightColor='#38bdf8'
												backgroundColor='#ffffff'
												textColor='text-black font-semibold'
												className='h-12 w-full sm:w-auto sm:max-w-[450px] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
											>
												{isSubmitting ? 'Sending...' : 'Send Message'}
												<ArrowRight size={16} aria-hidden='true' />
											</StarButton>
										</button>
										<p className='text-xs leading-5 text-white/50'>
											No spam. Just a practical reply from the team.
										</p>
									</div>
								</form>
							)}
						</div>
					</div>

					<aside 
						className='relative overflow-hidden rounded-[28px] contact-card p-4 sm:p-6 text-white h-full'
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
					>
						{/* Dotted Hologram Background Overlay */}
						<div 
							className="absolute inset-0 pointer-events-none z-0 opacity-100"
							style={{
								backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.03) 1.2px, transparent 1.2px)",
								backgroundSize: "20px 20px",
							}}
						/>
						<div className="relative z-10">
							<h2 className='font-display text-2xl font-semibold text-white'>
								Direct Contact
							</h2>
							<p className='mt-3 text-sm leading-7 text-slate-200'>
								Prefer a shorter path? Reach us through any channel below and we
								will route you to the right person.
							</p>

							<ul className='mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4'>
								{contactDetails.map(({ icon: Icon, flag, label, value, links }) => (
										<li
											key={label}
											className='flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition duration-300 hover:bg-white/10'
										>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-800 bg-cyan-950/50 text-[#22D3EE]'>
												{flag ? (
													flag
												) : Icon ? (
													<Icon size={17} aria-hidden='true' />
												) : null}
											</div>
											<div>
												<p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#22D3EE]'>
													{label}
												</p>
												{links ? (
													<div className='mt-1 space-y-1'>
														{links.map((link, idx) => (
															link.href ? (
																<a
																	key={idx}
																	href={link.href}
																	className='block whitespace-nowrap text-sm font-semibold text-white transition hover:text-[#22D3EE]'
																>
																	{link.text}
																</a>
															) : (
																<p key={idx} className='whitespace-nowrap text-sm font-semibold text-white'>
																	{link.text}
																</p>
															)
														))}
													</div>
												) : (
													<p className='mt-1 text-sm font-semibold text-white'>
														{value}
													</p>
												)}
											</div>
										</li>
								))}
							</ul>
						</div>
					</aside>
				</div>

				<NextStepCard />
			</div>
		</section>
	);
}
