import type { Metadata } from 'next';
import PromptLibraryContent from '@/components/prompts/PromptLibraryContent';

export const metadata: Metadata = {
	title: 'AI Visibility Audit Prompts: 54 Free Prompts To Check Your AI Search Presence',
	description:
		'Free prompt library for auditing AI visibility across ChatGPT, Perplexity, Gemini, and Claude. Brand visibility, competitor comparison, citation probes, and buyer-decision prompts. No signup required.',
	keywords: [
		'AI visibility prompts',
		'GEO audit prompts',
		'AI search audit prompts',
		'ChatGPT brand audit prompts',
		'AI visibility checker',
		'prompt library GEO',
		'LLM audit prompts',
	],
	alternates: { canonical: 'https://aibizmod.com/ai-visibility-prompts' },
	openGraph: {
		title: 'AI Visibility Audit Prompts | aibizmod',
		description:
			'54 free prompts to check how ChatGPT, Perplexity, Gemini, and Claude see your brand — and where competitors win.',
		url: '/ai-visibility-prompts',
	},
};

export default function AIVisibilityPromptsPage() {
	return <PromptLibraryContent />;
}
