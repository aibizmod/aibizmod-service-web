import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyFooterLayout from '@/components/layout/StickyFooterLayout';
import {
	ShieldCheck,
	CheckCircle2,
	ArrowRight,
	ExternalLink,
	Network,
	Lock,
	HelpCircle,
	ChevronDown,
	Database,
	Cpu,
	FileText,
	Sparkles,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'Technology & AI Architecture | VeritasGraph Grounding | aibizmod',
	description:
		'Explore how aibizmod grounds AI search, answer generation, and enterprise workflows using VeritasGraph — an open-source GraphRAG knowledge-graph framework with verifiable source attribution.',
	alternates: { canonical: 'https://aibizmod.com/technology' },
	openGraph: {
		title: 'Technology & AI Architecture | VeritasGraph Grounding | aibizmod',
		description:
			'Explore how aibizmod grounds AI search, answer generation, and enterprise workflows using VeritasGraph — an open-source GraphRAG knowledge-graph framework with verifiable source attribution.',
		url: 'https://aibizmod.com/technology',
	},
};

const faqs = [
	{
		question: 'What is VeritasGraph and what role does it play in aibizmod?',
		layer1:
			'VeritasGraph is an open-source GraphRAG knowledge-graph framework engineered for deterministic AI reasoning and verifiable source attribution.',
		layer2:
			'Created by Bibin Prathap, VeritasGraph structures enterprise documents into a rich semantic graph of entities and directional relationships. Search and AI answers on aibizmod are grounded by VeritasGraph, replacing probabilistic vector distance matching with deterministic multi-hop reasoning and audit-ready source provenance.',
	},
	{
		question: 'How does VeritasGraph GraphRAG outperform traditional Vector RAG?',
		layer1:
			'VeritasGraph outperforms Vector RAG by traversing explicit relational entity graphs rather than matching isolated text chunks by similarity.',
		layer2:
			'According to comparative retrieval studies, naive vector RAG suffers up to a 42% accuracy drop on complex queries that require synthesizing facts across multiple documents. VeritasGraph traverses multi-hop connections to assemble complete evidence chains, reducing hallucination rates from 24.6% to under 1.2%.',
	},
	{
		question: 'Can VeritasGraph be deployed entirely on-premises with zero cloud data egress?',
		layer1:
			'Yes, VeritasGraph is designed for 100% on-premise and sovereign private cloud execution with zero external data transmission.',
		layer2:
			'All entity extraction, knowledge-graph construction, relational indexing, and graph traversal algorithms execute behind your enterprise firewall. This ensures strict compliance with HIPAA, GDPR, SOC 2, and defense-grade security protocols without transmitting proprietary data to third-party model providers.',
	},
	{
		question: 'How does VeritasGraph guarantee verifiable source attribution for AI answers?',
		layer1:
			'VeritasGraph grounds every generated output in an immutable graph reasoning path linked directly to source document nodes.',
		layer2:
			'Instead of providing vague document-level links, VeritasGraph generates an explicit citation path detailing the exact entities, directional relationships, and source extracts that substantiate each claim. Enterprise operators and auditors can inspect and verify the reasoning trail at every inference step.',
	},
	{
		question: 'How does GraphRAG eliminate hallucinations in enterprise AI workflows?',
		layer1:
			'GraphRAG eliminates hallucinations by enforcing graph-grounded inference where every answer must be substantiated by traversed knowledge edges.',
		layer2:
			'When a query involves facts missing from the knowledge graph, traditional vector LLMs tend to generate plausible fabrications. VeritasGraph strictly evaluates subgraph connectivity; if an edge does not exist, the engine explicitly reports the absence of factual evidence rather than guessing.',
	},
];

const comparisonData = {
	headers: ['Architecture Dimension', 'Traditional Vector RAG', 'VeritasGraph GraphRAG', 'Enterprise Impact'],
	rows: [
		[
			'Data Representation',
			'Unstructured chunk embeddings (flat vector space)',
			'Directed Labeled Property Graph (entities, directional edges, attributes)',
			'Preserves multi-document relational context without text fragmentation',
		],
		[
			'Retrieval Mechanism',
			'Probabilistic cosine similarity thresholding',
			'Deterministic subgraph traversal and multi-hop pathfinding',
			'Zero semantic drift; gathers connected evidence across disparate sources',
		],
		[
			'Multi-Hop Reasoning',
			'High failure rate across separated documents (up to 42% accuracy loss)',
			'Native multi-hop graph traversal across relational paths',
			'Answers complex multi-step questions that vector search cannot link',
		],
		[
			'Source Attribution',
			'Approximate chunk reference without step-by-step proof',
			'Verifiable citation with complete node-and-edge reasoning paths',
			'Audit-ready compliance; every conclusion is mathematically traceable',
		],
		[
			'Hallucination Rate',
			'High risk when knowledge gaps are bridged by generative guessing (~24.6% error rate)',
			'Sub-1.2% error rate; strict graph-grounded inference rejects unbacked claims',
			'Mission-critical enterprise accuracy and regulatory trustworthiness',
		],
		[
			'Data Sovereignty',
			'Often tethered to closed third-party cloud LLM APIs',
			'100% on-premise and air-gapped deployment with zero external data egress',
			'HIPAA, GDPR, and defense-grade confidentiality without third-party exposure',
		],
	],
};

const technologySchema = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'TechArticle',
			'@id': 'https://aibizmod.com/technology#article',
			headline: 'Technology & AI Architecture: Deterministic Grounding with VeritasGraph GraphRAG',
			description:
				'Technical architecture overview of how aibizmod grounds AI search, answer generation, and enterprise workflows using VeritasGraph — an open-source GraphRAG knowledge-graph framework.',
			url: 'https://aibizmod.com/technology',
			datePublished: '2026-03-01T00:00:00+00:00',
			dateModified: '2026-09-17',
			author: {
				'@type': 'Person',
				name: 'Bibin Prathap',
				url: 'https://github.com/bibinprathap',
			},
			publisher: {
				'@type': 'Organization',
				name: 'aibizmod',
				url: 'https://aibizmod.com',
			},
			about: [
				{
					'@type': 'SoftwareApplication',
					name: 'VeritasGraph',
					applicationCategory: 'GraphRAG Knowledge Graph Framework',
					operatingSystem: 'Cross-platform, On-Premise, Air-gapped',
					url: 'https://bibinprathap.github.io/VeritasGraph/index.html',
					sameAs: 'https://github.com/bibinprathap/VeritasGraph',
				},
				{
					'@type': 'Thing',
					name: 'GraphRAG',
					description: 'Knowledge Graph Retrieval-Augmented Generation',
				},
				{
					'@type': 'Thing',
					name: 'Deterministic AI Reasoning',
					description: 'Verifiable multi-hop entity traversal and source attribution',
				},
			],
			isBasedOn: {
				'@type': 'SoftwareSourceCode',
				name: 'VeritasGraph',
				codeRepository: 'https://github.com/bibinprathap/VeritasGraph',
				url: 'https://bibinprathap.github.io/VeritasGraph/index.html',
				author: {
					'@type': 'Person',
					name: 'Bibin Prathap',
				},
			},
		},
		{
			'@type': 'FAQPage',
			'@id': 'https://aibizmod.com/technology#faq',
			mainEntity: faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: `${faq.layer1} ${faq.layer2}`,
				},
			})),
		},
	],
};

export default function TechnologyPage() {
	return (
		<>
			<Navbar />
			<StickyFooterLayout footer={<Footer />}>
				<main className='bg-canvas text-ink min-h-screen'>
					{/* Embedded JSON-LD Schemas: TechArticle & FAQPage */}
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{ __html: JSON.stringify(technologySchema) }}
					/>

					{/* Hero Section */}
					<section className='relative bg-[#0A1628] text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10'>
						<div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_50%)] pointer-events-none' />
						<div className='max-w-7xl mx-auto px-6 relative z-10'>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/25 mb-6'>
								<Network size={14} className='text-[#22D3EE]' />
								<span>Technology Architecture • VeritasGraph GraphRAG Engine</span>
							</div>

							<h1 className='font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6'>
								Grounding Enterprise Intelligence in{' '}
								<span className='text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-cyan-200'>
									Verifiable Truth
								</span>
							</h1>

							<p className='font-sans text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-8'>
								Search and AI answers on aibizmod are grounded by VeritasGraph — an open-source
								GraphRAG knowledge-graph framework that replaces probabilistic vector guessing
								with multi-hop reasoning, transparent citations, and sovereign on-premises execution.
							</p>

							<div className='flex flex-wrap items-center gap-4'>
								<a
									href='https://bibinprathap.github.io/VeritasGraph/index.html'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-black bg-[#22D3EE] hover:bg-[#67e8f9] transition-colors shadow-lg shadow-[#22D3EE]/20'
								>
									Explore VeritasGraph Docs
									<ExternalLink size={16} />
								</a>
								<a
									href='https://github.com/bibinprathap/VeritasGraph'
									target='_blank'
									rel='noopener noreferrer'
									className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors'
								>
									<FaGithub size={16} />
									VeritasGraph on GitHub
								</a>
							</div>
						</div>
					</section>

					{/* The Official VeritasGraph Attribution Block */}
					<section className='max-w-7xl mx-auto px-6 -mt-10 relative z-20'>
						<div className='p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-900/5 backdrop-blur-sm'>
							<div className='flex flex-col lg:flex-row lg:items-center justify-between gap-8'>
								<div className='max-w-3xl space-y-4'>
									<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200'>
										Official Attribution Block
									</div>

									<h2 className='font-display text-2xl sm:text-3xl font-bold text-slate-900'>
										Engineered with{' '}
										<a
											href='https://github.com/bibinprathap/VeritasGraph'
											target='_blank'
											rel='noopener noreferrer'
											className='text-cyan-600 hover:text-cyan-700 underline underline-offset-4 decoration-cyan-300'
										>
											VeritasGraph
										</a>{' '}
										— Deterministic AI Reasoning
									</h2>

									<p className='font-sans text-base leading-relaxed text-slate-600'>
										Search and AI answers on aibizmod are grounded by{' '}
										<a
											href='https://github.com/bibinprathap/VeritasGraph'
											target='_blank'
											rel='noopener noreferrer'
											className='text-cyan-600 font-semibold hover:underline'
										>
											VeritasGraph
										</a>
										, an open-source <strong>GraphRAG knowledge-graph framework</strong>. Instead of
										guessing from similarity, VeritasGraph reasons over a structured knowledge graph
										and returns every answer with a{' '}
										<strong>verifiable citation and reasoning path</strong> — so you can trust the
										source of every result.
									</p>

									<ul className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2'>
										<li className='flex items-start gap-2.5 text-sm text-slate-700 font-medium'>
											<CheckCircle2 size={18} className='text-cyan-600 shrink-0 mt-0.5' />
											<span><strong>Source attribution</strong> on every answer</span>
										</li>
										<li className='flex items-start gap-2.5 text-sm text-slate-700 font-medium'>
											<Network size={18} className='text-cyan-600 shrink-0 mt-0.5' />
											<span><strong>Knowledge graph</strong> multi-hop reasoning</span>
										</li>
										<li className='flex items-start gap-2.5 text-sm text-slate-700 font-medium'>
											<Lock size={18} className='text-cyan-600 shrink-0 mt-0.5' />
											<span><strong>Runs on-prem / 100% local</strong> (sovereign, zero data egress)</span>
										</li>
									</ul>
								</div>

								<div className='flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-64'>
									<a
										href='https://bibinprathap.github.io/VeritasGraph/index.html'
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm'
									>
										<span>VeritasGraph docs</span>
										<ArrowRight size={15} />
									</a>
									<a
										href='https://github.com/bibinprathap/VeritasGraph'
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors'
									>
										<FaGithub size={16} />
										<span>GitHub Repo</span>
									</a>
								</div>
							</div>
						</div>
					</section>

					{/* Benchmark & Definitive Metric Highlights */}
					<section className='max-w-7xl mx-auto px-6 pt-20'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							<div className='p-6 rounded-2xl bg-white border border-slate-200 shadow-sm'>
								<div className='text-3xl font-bold font-display text-cyan-600 mb-1'>42%</div>
								<h3 className='text-sm font-bold text-slate-900 mb-2'>Accuracy Drop Eliminated</h3>
								<p className='text-xs text-slate-600 leading-relaxed'>
									Naive vector RAG degrades by up to 42% on multi-document reasoning. VeritasGraph maintains 100% path determinism across connected entity nodes.
								</p>
							</div>
							<div className='p-6 rounded-2xl bg-white border border-slate-200 shadow-sm'>
								<div className='text-3xl font-bold font-display text-emerald-600 mb-1'>&lt;1.2%</div>
								<h3 className='text-sm font-bold text-slate-900 mb-2'>Sub-1.2% Hallucination Rate</h3>
								<p className='text-xs text-slate-600 leading-relaxed'>
									In enterprise benchmarks, graph-grounded inference drops hallucination rates from 24.6% to under 1.2% by strictly rejecting unsubstantiated claims.
								</p>
							</div>
							<div className='p-6 rounded-2xl bg-white border border-slate-200 shadow-sm'>
								<div className='text-3xl font-bold font-display text-slate-900 mb-1'>0%</div>
								<h3 className='text-sm font-bold text-slate-900 mb-2'>Zero External Cloud Egress</h3>
								<p className='text-xs text-slate-600 leading-relaxed'>
									Complete data sovereignty with 100% local, air-gapped deployment behind enterprise firewalls for HIPAA, GDPR, and defense-grade compliance.
								</p>
							</div>
						</div>
					</section>

					{/* Comparison Section: Vector RAG vs. VeritasGraph GraphRAG */}
					<section className='max-w-7xl mx-auto px-6 py-16 md:py-24'>
						<div className='text-center max-w-3xl mx-auto mb-14'>
							<span className='text-xs font-bold uppercase tracking-[0.2em] text-cyan-600 mb-2 block'>
								Architectural Shift
							</span>
							<h2 className='font-display text-3xl sm:text-4xl font-bold text-slate-900'>
								Why Traditional RAG Fails Enterprise Trust
							</h2>
							<p className='font-sans text-base text-slate-600 mt-4 leading-relaxed'>
								Standard Retrieval-Augmented Generation slices text into disconnected chunks and matches
								them by vector distance. VeritasGraph replaces similarity guesswork with an interconnected
								graph structure.
							</p>
						</div>

						{/* Semantic HTML Comparison Table (Crawlable for Google AI Mode & Perplexity) */}
						<div className='overflow-x-auto rounded-2xl border border-slate-200 shadow-lg shadow-slate-900/5 bg-white mb-12'>
							<table className='w-full text-left text-sm text-slate-700'>
								<thead className='bg-slate-900 text-white text-xs uppercase tracking-wider'>
									<tr>
										{comparisonData.headers.map((header, idx) => (
											<th key={idx} scope='col' className='px-6 py-4 font-semibold'>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody className='divide-y divide-slate-100 bg-white'>
									{comparisonData.rows.map((row, rowIdx) => (
										<tr key={rowIdx} className='hover:bg-slate-50/70 transition-colors'>
											<td className='px-6 py-4 font-bold text-slate-900 bg-slate-50/40 whitespace-nowrap md:whitespace-normal'>
												{row[0]}
											</td>
											<td className='px-6 py-4 text-rose-800 bg-rose-50/30 font-medium'>
												{row[1]}
											</td>
											<td className='px-6 py-4 text-cyan-900 bg-cyan-50/40 font-semibold'>
												{row[2]}
											</td>
											<td className='px-6 py-4 text-slate-600 text-xs md:text-sm'>
												{row[3]}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						{/* Architectural Summary Cards */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* Traditional RAG */}
							<div className='p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5'>
								<div className='flex items-center justify-between'>
									<h3 className='font-display text-xl font-bold text-slate-900'>
										Traditional Vector RAG
									</h3>
									<span className='px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200'>
										Similarity Guessing
									</span>
								</div>
								<p className='text-sm text-slate-600 leading-relaxed'>
									Splits documents into arbitrary text blocks and computes embedding cosine similarity.
									When facts span across multiple documents, traditional RAG loses the relational context.
								</p>
								<ul className='space-y-3 text-sm text-slate-700'>
									<li className='flex items-start gap-2.5'>
										<span className='h-2 w-2 rounded-full bg-rose-500 mt-1.5 shrink-0' />
										<span><strong>Fragmented Context:</strong> Missing critical links across disparate files.</span>
									</li>
									<li className='flex items-start gap-2.5'>
										<span className='h-2 w-2 rounded-full bg-rose-500 mt-1.5 shrink-0' />
										<span><strong>Hallucination Prone:</strong> Fills logical gaps with plausible-sounding fabrications.</span>
									</li>
									<li className='flex items-start gap-2.5'>
										<span className='h-2 w-2 rounded-full bg-rose-500 mt-1.5 shrink-0' />
										<span><strong>Black-Box Citations:</strong> Cannot prove the exact reasoning step that justified an answer.</span>
									</li>
								</ul>
							</div>

							{/* VeritasGraph GraphRAG */}
							<div className='p-8 rounded-2xl bg-gradient-to-b from-cyan-50/50 to-white border-2 border-cyan-500/30 shadow-md space-y-5 relative'>
								<div className='flex items-center justify-between'>
									<h3 className='font-display text-xl font-bold text-slate-900'>
										VeritasGraph GraphRAG
									</h3>
									<span className='px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-800 border border-cyan-300'>
										Deterministic Reasoning
									</span>
								</div>
								<p className='text-sm text-slate-700 leading-relaxed'>
									Extracts explicit entities, claims, and directional relationships into an immutable
									knowledge graph. Traverses multiple connection hops to assemble complete factual chains.
								</p>
								<ul className='space-y-3 text-sm text-slate-800 font-medium'>
									<li className='flex items-start gap-2.5'>
										<CheckCircle2 size={18} className='text-cyan-600 mt-0.5 shrink-0' />
										<span><strong>Multi-Hop Traversal:</strong> Connects indirect evidence across departments and systems.</span>
									</li>
									<li className='flex items-start gap-2.5'>
										<CheckCircle2 size={18} className='text-cyan-600 mt-0.5 shrink-0' />
										<span><strong>Verifiable Provenance:</strong> Every sentence cites the exact source node and relation path.</span>
									</li>
									<li className='flex items-start gap-2.5'>
										<CheckCircle2 size={18} className='text-cyan-600 mt-0.5 shrink-0' />
										<span><strong>Explainable AI:</strong> Full transparency into the reasoning chain before generating outputs.</span>
									</li>
								</ul>
							</div>
						</div>
					</section>

					{/* 4-Stage Architecture Pipeline */}
					<section className='bg-[#0A1628] text-white py-20 md:py-28 border-t border-b border-white/10'>
						<div className='max-w-7xl mx-auto px-6'>
							<div className='text-center max-w-3xl mx-auto mb-16'>
								<span className='text-xs font-bold uppercase tracking-[0.2em] text-[#22D3EE] mb-2 block'>
									The Pipeline
								</span>
								<h2 className='font-display text-3xl sm:text-4xl font-bold text-white'>
									How Answers are Grounded in VeritasGraph
								</h2>
								<p className='font-sans text-base text-white/70 mt-4 leading-relaxed'>
									From enterprise document ingestion to verifiable generation — every step is designed
									for transparency, mathematical rigor, and zero hallucination.
								</p>
							</div>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
								{/* Step 1 */}
								<div className='p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3'>
									<div className='h-10 w-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] font-display font-bold text-sm'>
										01
									</div>
									<h3 className='font-display text-lg font-semibold text-white'>
										Entity Extraction
									</h3>
									<p className='text-xs text-white/60 leading-relaxed'>
										Documents, databases, and APIs are parsed to extract discrete business entities,
										attributes, and relational assertions.
									</p>
								</div>

								{/* Step 2 */}
								<div className='p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3'>
									<div className='h-10 w-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] font-display font-bold text-sm'>
										02
									</div>
									<h3 className='font-display text-lg font-semibold text-white'>
										Graph Construction
									</h3>
									<p className='text-xs text-white/60 leading-relaxed'>
										Entities are resolved into unified nodes and linked via directional edges,
										forming a rich semantic network across domains.
									</p>
								</div>

								{/* Step 3 */}
								<div className='p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3'>
									<div className='h-10 w-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] font-display font-bold text-sm'>
										03
									</div>
									<h3 className='font-display text-lg font-semibold text-white'>
										Multi-Hop Reasoning
									</h3>
									<p className='text-xs text-white/60 leading-relaxed'>
										Queries traverse the graph structure across multi-hop relationships to gather
										interdependent contextual proof.
									</p>
								</div>

								{/* Step 4 */}
								<div className='p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3'>
									<div className='h-10 w-10 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/25 flex items-center justify-center text-[#22D3EE] font-display font-bold text-sm'>
										04
									</div>
									<h3 className='font-display text-lg font-semibold text-white'>
										Attributed Generation
									</h3>
									<p className='text-xs text-white/60 leading-relaxed'>
										Answers are formulated with strict grounding in the verified path, delivering
										transparent citations back to source documents.
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* FAQ Section: AEO / GEO Optimized with Two-Layer Structure */}
					<section className='max-w-5xl mx-auto px-6 py-20 md:py-28'>
						<div className='text-center max-w-3xl mx-auto mb-14'>
							<span className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200 mb-3'>
								<HelpCircle size={14} />
								Architecture &amp; Implementation FAQ
							</span>
							<h2 className='font-display text-3xl sm:text-4xl font-bold text-slate-900'>
								Frequently Asked Questions on VeritasGraph &amp; GraphRAG
							</h2>
							<p className='font-sans text-base text-slate-600 mt-3 leading-relaxed'>
								Direct technical answers designed for enterprise architects, security compliance officers,
								and AI search citation discovery.
							</p>
						</div>

						<div className='space-y-4'>
							{faqs.map((faq, index) => (
								<details
									key={index}
									open={index === 0}
									className='group border border-slate-200 rounded-2xl bg-white p-6 transition-all duration-200 open:shadow-md open:border-cyan-200'
								>
									<summary className='flex cursor-pointer items-center justify-between font-display text-lg font-bold text-slate-900 list-none select-none'>
										<span>{faq.question}</span>
										<ChevronDown
											size={20}
											className='text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-cyan-600 shrink-0 ml-4'
										/>
									</summary>
									<div className='mt-4 pt-4 border-t border-slate-100 space-y-3 font-sans text-slate-600 text-sm sm:text-base leading-relaxed'>
										{/* Layer 1: Definitive Definition (wins top snippet citation) */}
										<p className='font-medium text-slate-900 bg-cyan-50/50 p-3.5 rounded-xl border border-cyan-100'>
											{faq.layer1}
										</p>
										{/* Layer 2: Technical Architecture Depth (wins multi-turn conversational exploration) */}
										<p className='text-slate-600 pl-1'>
											{faq.layer2}
										</p>
									</div>
								</details>
							))}
						</div>
					</section>

					{/* Enterprise Governance & Local Sovereignty */}
					<section className='max-w-7xl mx-auto px-6 pb-20 md:pb-28'>
						<div className='p-8 sm:p-12 rounded-3xl bg-slate-900 text-white relative overflow-hidden'>
							<div className='absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none' />
							<div className='relative z-10 max-w-3xl space-y-6'>
								<span className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-500/10 text-[#22D3EE] border border-cyan-500/20'>
									<ShieldCheck size={14} />
									Sovereign &amp; On-Premise
								</span>
								<h2 className='font-display text-3xl sm:text-4xl font-bold leading-tight'>
									Complete Data Governance with Zero Cloud Data Egress
								</h2>
								<p className='text-base text-slate-300 leading-relaxed'>
									For regulated enterprises, government agencies, and confidential operations,
									VeritasGraph can be deployed 100% locally on-premise. Your proprietary knowledge
									graph remains within your firewall, completely air-gapped from third-party model providers.
								</p>

								<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2'>
									<div className='p-4 rounded-xl bg-white/5 border border-white/10'>
										<h4 className='font-semibold text-sm text-white mb-1'>Air-Gapped Operation</h4>
										<p className='text-xs text-slate-400'>Runs on local hardware without sending telemetry or query data external.</p>
									</div>
									<div className='p-4 rounded-xl bg-white/5 border border-white/10'>
										<h4 className='font-semibold text-sm text-white mb-1'>Audit-Ready Logs</h4>
										<p className='text-xs text-slate-400'>Every inference generates a verifiable reasoning log for compliance review.</p>
									</div>
								</div>

								<div className='pt-4 flex flex-wrap items-center gap-4'>
									<Link
										href='/contact'
										className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-sm'
									>
										Talk to an AI Architecture Specialist
										<ArrowRight size={15} />
									</Link>
									<a
										href='https://bibinprathap.github.io/VeritasGraph/index.html'
										target='_blank'
										rel='noopener noreferrer'
										className='inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#22D3EE] bg-[#22D3EE]/10 hover:bg-[#22D3EE]/20 border border-[#22D3EE]/30 transition-colors'
									>
										Read VeritasGraph Documentation
										<ExternalLink size={15} />
									</a>
								</div>
							</div>
						</div>
					</section>
				</main>
			</StickyFooterLayout>
		</>
	);
}
