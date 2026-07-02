'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Search } from 'lucide-react';
import AnimatedSection from '@/components/common/AnimatedSection';
import { blogPosts, categories } from '@/data/blog';
import NeuralBackground from '@/components/ui/flow-field-background';
import BlogCard from '@/components/blog/BlogCard';

function BlogCardSkeleton() {
	return (
		<div className='w-full max-w-sm rounded-3xl border border-cyan-100/60 bg-white p-3 shadow-md animate-pulse'>
			{/* Image Placeholder */}
			<div className='relative aspect-[16/10] overflow-hidden rounded-2xl bg-stone-200/80'>
				<div className='absolute left-4 top-4 h-6 w-16 rounded-full bg-stone-300/60' />
			</div>

			{/* Content Placeholder */}
			<div className='p-3 pt-4 flex flex-col'>
				{/* Title Lines */}
				<div className='h-6 w-5/6 rounded-md bg-stone-200/90 mb-3' />
				<div className='h-6 w-2/3 rounded-md bg-stone-200/90 mb-5' />

				{/* Excerpt Lines */}
				<div className='h-3.5 w-full rounded bg-stone-100/90 mb-2' />
				<div className='h-3.5 w-11/12 rounded bg-stone-100/90 mb-2' />
				<div className='h-3.5 w-4/5 rounded bg-stone-100/90 mb-6' />

				{/* Divider */}
				<div className='border-t border-stone-150 pt-5 mt-auto flex items-center gap-3'>
					{/* Author Avatar */}
					<div className='h-8 w-8 rounded-full bg-stone-200/90 shrink-0' />
					{/* Author details */}
					<div className='flex-1 min-w-0'>
						<div className='h-3.5 w-16 rounded bg-stone-200/90 mb-1.5' />
						<div className='h-3 w-12 rounded bg-stone-100/90' />
					</div>
					{/* Read time */}
					<div className='h-3 w-16 rounded bg-stone-100/90 shrink-0 ml-auto' />
				</div>
			</div>
		</div>
	);
}

export default function BlogPageContent() {
	const [activeCategory, setActiveCategory] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [hoveredCardRect, setHoveredCardRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

	useEffect(() => {
		setIsSearching(true);
		const timer = setTimeout(() => {
			setIsSearching(false);
		}, 350);

		return () => clearTimeout(timer);
	}, [searchQuery, activeCategory]);

	const handleCardMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const cardEl = e.currentTarget;
		const canvasContainerEl = document.getElementById('blog-list');
		if (!cardEl || !canvasContainerEl) return;

		const cardRect = cardEl.getBoundingClientRect();
		const containerRect = canvasContainerEl.getBoundingClientRect();

		setHoveredCardRect({
			x: cardRect.left - containerRect.left,
			y: cardRect.top - containerRect.top,
			width: cardRect.width,
			height: cardRect.height,
		});
	};

	const handleCardMouseLeave = () => {
		setHoveredCardRect(null);
	};

	const visiblePosts = blogPosts.filter((post) => {
		const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
		const matchesSearch =
			searchQuery.trim() === '' ||
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<>
			<section
				id='blog-list'
				className='relative isolate overflow-hidden bg-white px-6 pb-16 pt-44 md:pb-20 md:pt-48'
			>
				{/* Interactive Flow Field Background */}
				<NeuralBackground
					className='absolute inset-0 -z-10'
					color='#22d3ee' // Cyan-400
					trailOpacity={0.16} // Subtle trails
					particleCount={950} // Elegant and clean density
					speed={1.6} // Rhythmic, smooth movement speed
					theme='light'
					hoveredCardRect={hoveredCardRect}
				/>

				{/* Grid & Radial Gradient overlay on top of canvas */}
				<div
					className='pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_0%,rgba(210,247,255,0.58),transparent_34%)]'
					style={{
						backgroundImage:
							'linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)',
						backgroundSize: '72px 72px',
					}}
					aria-hidden='true'
				/>

				<div className='relative z-10 mx-auto max-w-7xl'>
					{/* Header Content */}
					<div className='mx-auto max-w-4xl text-center mb-16 md:mb-20'>
						<AnimatedSection>
							<span className='inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md'>
								<BookOpen size={14} aria-hidden='true' />
								aibizmod Journal
							</span>
							<h1
								className='mx-auto mt-7 max-w-3xl font-display font-thin text-[#0F172A] text-balance'
								style={{ fontSize: 'clamp(34px, 5vw, 58px)', lineHeight: 1.04 }}
							>
								Practical Notes From Building a{' '}
								<span className='gradient-text font-normal'>Service Brand</span>
							</h1>
							<p className='mx-auto mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-base leading-8 text-stone-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md md:text-lg'>
								Field notes on the aibizmod domain, our SEO service journey,
								generative search, and the trust work that happens before traffic
								starts to matter.
							</p>
						</AnimatedSection>
					</div>

					{/* Filters & Search Row */}
					<div className='mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
						{/* Search Bar */}
						<div className='relative w-full max-w-md shrink-0'>
							<input
								type='text'
								placeholder='Search articles by title or author...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full rounded-full border border-stone-300 bg-white px-5 py-2.5 pl-11 text-sm font-medium text-stone-900 placeholder-stone-400 shadow-sm transition hover:border-stone-400 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20'
							/>
							<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-stone-500'>
								<Search size={16} aria-hidden='true' />
							</div>
						</div>

						{/* Category Filters */}
						<div className='flex items-center gap-2 overflow-x-auto pb-1 md:pb-0'>
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setActiveCategory(category)}
									className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
										activeCategory === category
											? 'bg-[#0F172A] text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)]'
											: 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300'
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					{/* Blog Cards Grid / Empty State */}
					{isSearching ? (
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center w-full'>
							{Array.from({ length: 3 }).map((_, i) => (
								<BlogCardSkeleton key={i} />
							))}
						</div>
					) : visiblePosts.length > 0 ? (
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center'>
							{visiblePosts.map((post, index) => (
								<BlogCard
									key={post.slug}
									post={post}
									delay={index * 0.06}
									onMouseEnter={handleCardMouseEnter}
									onMouseLeave={handleCardMouseLeave}
								/>
							))}
						</div>
					) : (
						<AnimatedSection className='flex flex-col items-center justify-center py-16 text-center w-full'>
							<div className='flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-4'>
								<Search size={28} aria-hidden='true' />
							</div>
							<h3 className='font-display text-xl font-semibold text-[#0F172A]'>No Articles Found</h3>
							<p className='mt-2 text-stone-500 max-w-md text-sm leading-6'>
								We couldn&apos;t find any articles matching &quot;{searchQuery}&quot; in the &quot;{activeCategory}&quot; category. Try typing something else or selecting a different category.
							</p>
						</AnimatedSection>
					)}
				</div>
			</section>
		</>
	);
}
