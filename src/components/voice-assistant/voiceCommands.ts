export interface VoiceCommand {
	patterns: string[];
	response: string;
	action?: "navigate";
	path?: string;
}

export const COMMANDS: VoiceCommand[] = [
	// ── Navigation ──────────────────────────────────────────────────────────
	{
		patterns: ["home", "go home", "main page", "homepage"],
		response: "Taking you to the homepage!",
		action: "navigate",
		path: "/",
	},
	{
		patterns: [
			"services",
			"what services",
			"what do you offer",
			"our services",
			"show services",
		],
		response:
			"We offer AI automation, digital marketing, web development, and more. Here are our services.",
		action: "navigate",
		path: "/services",
	},
	{
		patterns: [
			"contact",
			"get in touch",
			"talk to someone",
			"reach you",
			"contact us",
			"call you",
		],
		response: "Opening our contact page for you.",
		action: "navigate",
		path: "/contact",
	},
	{
		patterns: [
			"about",
			"about you",
			"who are you",
			"tell me about aibizmod",
			"what is aibizmod",
		],
		response:
			"Aibizmod is a technology company specializing in AI automation, digital marketing, and web development. Let me show you.",
		action: "navigate",
		path: "/about",
	},
	{
		patterns: ["blog", "articles", "posts", "read blog"],
		response: "Here's our blog with the latest insights.",
		action: "navigate",
		path: "/blog",
	},
	{
		patterns: ["pricing", "cost", "how much", "plans", "price"],
		response: "Let me connect you with our team for pricing details.",
		action: "navigate",
		path: "/contact",
	},
	{
		patterns: ["industries", "industry", "what industries"],
		response: "We serve multiple industries. Here's an overview.",
		action: "navigate",
		path: "/industries",
	},
	{
		patterns: ["faq", "frequently asked", "common questions"],
		response: "Here are our most frequently asked questions.",
		action: "navigate",
		path: "/faq",
	},

	// ── Services ────────────────────────────────────────────────────────────
	{
		patterns: [
			"ai",
			"artificial intelligence",
			"automation",
			"ai automation",
			"ai agents",
			"machine learning",
		],
		response:
			"We build AI agents, custom workflows, and business automation. Our AI & Automation service helps you scale.",
		action: "navigate",
		path: "/services/ai-automation",
	},
	{
		patterns: [
			"marketing",
			"digital marketing",
			"seo",
			"ads",
			"advertising",
			"social media marketing",
		],
		response:
			"Our digital marketing covers SEO, paid ads, social media, and analytics. Ready to grow?",
		action: "navigate",
		path: "/services/digital-marketing",
	},
	{
		patterns: [
			"web development",
			"website",
			"web app",
			"build a site",
			"web design",
		],
		response:
			"We build fast, responsive websites and web applications. Check out our web development service.",
		action: "navigate",
		path: "/services/web-development",
	},
	{
		patterns: [
			"mobile",
			"app",
			"mobile app",
			"ios",
			"android",
			"react native",
			"flutter",
		],
		response:
			"We develop cross-platform mobile apps with React Native and Flutter.",
		action: "navigate",
		path: "/services/mobile-app-development",
	},
	{
		patterns: [
			"cloud",
			"cloud computing",
			"aws",
			"azure",
			"devops",
			"infrastructure",
		],
		response:
			"Our cloud & infrastructure services help you deploy, scale, and manage your applications.",
		action: "navigate",
		path: "/services/cloud-infrastructure",
	},
	{
		patterns: [
			"data",
			"data science",
			"analytics",
			"big data",
			"data analysis",
		],
		response:
			"We turn raw data into actionable insights with our data science and analytics services.",
		action: "navigate",
		path: "/services/data-science",
	},
	{
		patterns: ["cybersecurity", "security", "data protection", "privacy"],
		response:
			"Our cybersecurity services protect your business from threats and ensure compliance.",
		action: "navigate",
		path: "/services/cybersecurity",
	},
	{
		patterns: ["consulting", "consultant", "strategy", "tech strategy"],
		response:
			"Our consulting services help you plan and execute your technology roadmap.",
		action: "navigate",
		path: "/services/consulting",
	},

	// ── Tools ───────────────────────────────────────────────────────────────
	{
		patterns: [
			"audit",
			"visibility",
			"ai audit",
			"check my site",
			"seo audit",
			"ai visibility",
		],
		response:
			"Let's run an AI Visibility Audit on your website. This checks how well your site performs in AI search engines.",
		action: "navigate",
		path: "/tools/ai-visibility-audit",
	},
	{
		patterns: [
			"brand",
			"brand audit",
			"brand check",
			"brand score",
			"brand analysis",
		],
		response:
			"Running a Brand Audit will analyze your online presence. Let me take you there.",
		action: "navigate",
		path: "/tools/brand-audit",
	},
	{
		patterns: [
			"keywords",
			"keyword research",
			"keyword tool",
			"find keywords",
			"keyword analysis",
		],
		response:
			"Our Keyword Research tool helps you find high-value keywords. Let's go.",
		action: "navigate",
		path: "/tools/keyword-research",
	},

	// ── Greetings ───────────────────────────────────────────────────────────
	{
		patterns: [
			"hello",
			"hi",
			"hey",
			"good morning",
			"good afternoon",
			"good evening",
			"howdy",
			"greetings",
		],
		response:
			"Hello! I'm Aibizmod's voice assistant. How can I help you today? You can ask about our services, tools, or say 'help' for options.",
	},
	{
		patterns: ["how are you", "what's up", "how's it going"],
		response:
			"I'm doing great, thanks for asking! I'm here to help you navigate Aibizmod. What would you like to know?",
	},

	// ── Help ────────────────────────────────────────────────────────────────
	{
		patterns: [
			"help",
			"what can you do",
			"commands",
			"options",
			"what do you know",
		],
		response:
			"I can help you with: 1) Navigate to any page — say 'go to services' or 'contact'. 2) Learn about our services — say 'AI automation' or 'marketing'. 3) Use our tools — say 'audit my site' or 'keyword research'. 4) General info — say 'about' or 'pricing'. Just speak naturally!",
	},

	// ── Thanks / Goodbye ────────────────────────────────────────────────────
	{
		patterns: ["thank", "thanks", "thank you", "appreciate"],
		response: "You're welcome! Is there anything else I can help with?",
	},
	{
		patterns: [
			"bye",
			"goodbye",
			"see you",
			"that's all",
			"done",
			"stop",
		],
		response:
			"Goodbye! Feel free to come back anytime. Have a great day!",
	},
];

const FALLBACK_RESPONSE =
	"I didn't quite catch that. You can say 'help' to see what I can do, or try asking about our services, tools, or how to contact us.";

export function matchCommand(transcript: string): VoiceCommand {
	const lower = transcript.toLowerCase().trim();

	let bestMatch: VoiceCommand | null = null;
	let bestScore = 0;

	for (const cmd of COMMANDS) {
		if (cmd.patterns.length === 0) continue;

		for (const pattern of cmd.patterns) {
			const patternLower = pattern.toLowerCase();

			// Exact match
			if (lower === patternLower) {
				return cmd;
			}

			// Phrase contains the pattern
			if (lower.includes(patternLower)) {
				const score = patternLower.length / lower.length;
				if (score > bestScore) {
					bestScore = score;
					bestMatch = cmd;
				}
				continue;
			}

			// Check individual words
			const patternWords = patternLower.split(/\s+/);
			const transcriptWords = lower.split(/\s+/);
			let matchCount = 0;

			for (const pw of patternWords) {
				if (transcriptWords.some((tw) => tw.includes(pw) || pw.includes(tw))) {
					matchCount++;
				}
			}

			const wordScore = matchCount / patternWords.length;
			if (wordScore > 0.5 && wordScore > bestScore) {
				bestScore = wordScore;
				bestMatch = cmd;
			}
		}
	}

	if (bestMatch && bestScore >= 0.5) {
		return bestMatch;
	}

	// Fallback
	return {
		patterns: [],
		response: FALLBACK_RESPONSE,
	};
}
