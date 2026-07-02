'use client';

import { useId, useState } from 'react';
import { gql } from '@apollo/client';
import Link from 'next/link';
import {
	AlertCircle,
	ArrowRight,
	CheckCircle,
	Clock,
	Globe,
	MessageSquare,
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

const contactDetails = [
	...countries.map((c) => ({
		icon: Globe,
		label: c.code,
		value: `${c.phone} · ${c.email}`,
		href: `mailto:${c.email}`,
	})),
	{
		icon: Clock,
		label: 'Response time',
		value: 'Within 24 business hours',
		href: undefined,
	},
] as const;

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
			className='mt-1.5 flex items-center gap-1 text-xs text-red-600'
		>
			<AlertCircle size={11} className='shrink-0' />
			{message}
		</p>
	);
}

function NextStepCard() {
	return (
		<div className='mt-6 rounded-2xl border border-cyan-100 bg-[#ECFEFF]/70 p-5'>
			<p className='text-sm font-semibold text-[#0F172A]'>
				What Happens Next?
			</p>
			<p className='mt-2 text-sm leading-7 text-slate-600'>
				We review your note, clarify goals, and suggest the simplest next step
				before any build work begins.
			</p>
			<Link
				href='/services'
				className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900'
			>
				View Services
				<ArrowRight size={14} aria-hidden='true' />
			</Link>
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
		'w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 shadow-[0_10px_28px_rgba(59,130,246,0.05)] outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20';
	const inputNormal = `${inputBase} border-cyan-100`;
	const inputError = `${inputBase} border-red-300 bg-red-50/60 focus:border-red-400 focus:ring-red-200`;
	const cls = (field: keyof FormErrors) =>
		errors[field] ? inputError : inputNormal;

	const firstName = formData.firstName.trim();

	return (
		<section className='relative isolate min-h-screen overflow-hidden bg-white px-6 pb-20 pt-32 md:pt-36'>
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
						Let&apos;s build something{' '}
						<TextReveal
							text='connected'
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

				<div className='mt-14 grid gap-6 lg:grid-cols-[1fr_0.62fr] lg:items-start'>
					<div className='rounded-[28px] border border-cyan-100/80 bg-white/88 p-5 shadow-[0_22px_70px_rgba(8,145,178,0.12)] md:p-8'>
						{submitted ? (
							<div className='flex min-h-[420px] flex-col items-center justify-center text-center'>
								<div className='mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700'>
									<CheckCircle size={32} aria-hidden='true' />
								</div>
								<h2 className='font-display text-2xl font-semibold text-[#0F172A]'>
									Message Sent
								</h2>
								<p className='mt-3 max-w-sm text-sm leading-7 text-slate-600'>
									Thanks{firstName ? `, ${firstName}` : ''}. We have your
									message and will reply within 24 business hours.
								</p>
								<button
									onClick={handleReset}
									className='mt-8 text-sm font-semibold text-cyan-700 underline-offset-4 hover:underline'
								>
									Send another message
								</button>
							</div>
						) : (
							<form
								onSubmit={handleSubmit}
								noValidate
								aria-label='Contact form'
								className='space-y-5'
							>
								<div className='grid gap-5 sm:grid-cols-2'>
									<div>
										<label
											htmlFor={`${uid}-firstName`}
											className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
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
											className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
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
											className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
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
											className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
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
											className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
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
											className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
										>
											Company size{' '}
											<span className='font-normal text-slate-400'>(optional)</span>
										</label>
										<select
											id={`${uid}-companySize`}
											name='companySize'
											value={formData.companySize}
											onChange={handleChange}
											className={inputNormal}
										>
											<option value=''>Select company size</option>
											{companySizeOptions.map((size) => (
												<option key={size} value={size}>
													{size} employees
												</option>
											))}
										</select>
									</div>
								</div>

								<div>
									<label
										htmlFor={`${uid}-projectDetails`}
										className='mb-1.5 block text-sm font-semibold text-[#0F172A]'
									>
										Which service are you looking for?{' '}
										<span className='font-normal text-slate-400'>(optional)</span>
									</label>
									<select
										id={`${uid}-projectDetails`}
										name='projectDetails'
										value={formData.projectDetails}
										onChange={handleChange}
										className={inputNormal}
									>
										<option value=''>Select a service</option>
										{serviceOptions.map((service) => (
											<option key={service} value={service}>
												{service}
											</option>
										))}
									</select>
								</div>

								{submitError && (
									<p
										role='alert'
										className='rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
									>
										{submitError}
									</p>
								)}

								<div className='flex flex-col gap-3 pt-2 sm:flex-row sm:items-center'>
									<button
										type='submit'
										disabled={isSubmitting}
										className='disabled:cursor-not-allowed disabled:opacity-70'
									>
										<StarButton
											as='span'
											lightColor='#38bdf8'
											backgroundColor='#0f172a'
											className='h-12 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.55),0_0_4px_rgba(56,189,248,0.7)]'
										>
											{isSubmitting ? 'Sending...' : 'Send Message'}
											<ArrowRight size={16} aria-hidden='true' />
										</StarButton>
									</button>
									<p className='text-xs leading-5 text-slate-500'>
										No spam. Just a practical reply from the team.
									</p>
								</div>
							</form>
						)}
					</div>

					<aside className='rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_18px_55px_rgba(59,130,246,0.12)]'>
						<h2 className='font-display text-2xl font-semibold text-[#0F172A]'>
							Direct Contact
						</h2>
						<p className='mt-3 text-sm leading-7 text-slate-600'>
							Prefer a shorter path? Reach us through any channel below and we
							will route you to the right person.
						</p>

						<ul className='mt-7 space-y-4'>
							{contactDetails.map(({ icon: Icon, label, value, href }) => (
								<li key={label} className='flex gap-4 rounded-2xl border border-cyan-100/80 bg-white/65 p-4'>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700'>
										<Icon size={17} aria-hidden='true' />
									</div>
									<div>
										<p className='text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700'>
											{label}
										</p>
										{href ? (
											<a
												href={href}
												className='mt-1 block text-sm font-semibold text-[#0F172A] transition hover:text-cyan-700'
											>
												{value}
											</a>
										) : (
											<p className='mt-1 text-sm font-semibold text-[#0F172A]'>
												{value}
											</p>
										)}
									</div>
								</li>
							))}
						</ul>
					</aside>
				</div>

				<NextStepCard />
			</div>
		</section>
	);
}
