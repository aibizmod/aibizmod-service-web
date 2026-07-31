const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'competitors-keywords');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.csv') && f !== 'keyword-master-sheet.csv');

const clusters = [
	{ terms: [/ai seo/i, /geo seo/i, /seo aeo/i, /generative engine/i, /ai optimization/i, /ai optimisation/i, /ai ranking/i, /answer engine/i, /llm/i], name: 'AI SEO / AEO / GEO' },
	{ terms: [/^seo services/i, /seo service\b/i, /search engine optimization service/i, /seo optimisation service/i, /seo agency/i, /seo company/i, /seo consultant/i, /seo expert/i, /seo firm/i, /seo provider/i, /seo solutions/i], name: 'SEO services / agency' },
	{ terms: [/ai search/i, /ai overview/i, /chatgpt/i, /perplexity/i, /gemini/i, /claude/i, /copilot/i, /ai answer/i, /google ai/i], name: 'AI search / search engine' },
	{ terms: [/seo tool/i, /semrush/i, /ahrefs/i, /surfer/i, /screaming/i, /moz\b/i, /keyword tool/i, /rank tracker/i, /seo software/i, /monitoring tool/i], name: 'SEO tools / software' },
	{ terms: [/ai marketing/i, /ai content/i, /ai copywrit/i, /ai advertising/i, /ai social/i, /ai email/i, /ai automation/i, /ai sales/i, /ai crm/i, /marketing ai/i], name: 'AI marketing' },
	{ terms: [/ai tool/i, /tools ai/i, /artificial intelligence tool/i, /ai generator/i, /ai app/i, /ai platform/i, /ai website/i, /free ai/i, /best ai/i], name: 'Generic AI tools' },
	{ terms: [/vs /i, /alternative/i, /comparison/i, /compare /i, /competitor/i], name: 'Comparison / competitor' },
];

const targetUrls = {
	'search-marketing': '/services/digital-marketing/search-marketing',
	'ai-visibility-audit': '/services/ai-automation/ai-visibility-audit',
	'digital-marketing': '/services/digital-marketing',
	'topics': '/topics/geo-for-service-businesses',
	'blog-geo': '/blog/what-is-generative-engine-optimization-geo',
};

const P0 = new Set(['seo services', 'search engine optimization services', 'seo optimisation services', 'ai seo services', 'search engine optimization agency', 'seo optimization agency', 'ai optimization', 'ai optimisation', 'ai ranking', 'geo seo']);
const P1 = new Set(['ai seo tools', 'ai seo tool', 'google ai search', 'ai search engine', 'perplexity ai search engine', 'ai marketing tools', 'ai tools for marketing', 'geo agency', 'seo aeo', 'ai seo agency', 'ai monitoring tools', 'best ai tools for seo', 'best ai seo tools', 'ai driven digital marketing', 'ai marketing automation']);
const rejectPatterns = [/^ai tool$/, /^tools ai$/, /artificial intelligence tool/, /^free ai/, /^ai tools free/, /^best ai$/, /best artificial intelligence/, /semrush (login|trial|price)/, /^ranked ai$/, /^seo agent$/];

function classify(kw) {
	const lower = kw.toLowerCase();
	for (const r of rejectPatterns) {
		if (r.test(lower)) return { status: 'Reject', priority: '-', notes: 'Too broad / navigational / ambiguous' };
	}
	for (const c of clusters) {
		if (c.terms.some((t) => t.test(lower))) {
			return { cluster: c.name, status: 'Candidate', priority: '-', notes: '' };
		}
	}
	return { cluster: 'Other', status: 'Candidate', priority: '-', notes: '' };
}

const all = new Map();
for (const file of files) {
	const buf = fs.readFileSync(path.join(dir, file));
	const isUtf16 = buf[0] === 0xff && buf[1] === 0xfe;
	const text = isUtf16 ? buf.toString('utf16le') : buf.toString('utf8');
	const lines = text.split(/\r?\n/);
	const data = lines.slice(3).filter((l) => l.trim());
	for (const line of data) {
		const cols = line.split('\t');
		const kw = (cols[0] || '').trim().replace(/^"|"$/g, '');
		if (!kw) continue;
		const vol = parseInt(cols[2] || '0', 10) || 0;
		const prev = all.get(kw);
		if (prev) {
			prev.volume = Math.max(prev.volume, vol);
			prev.files++;
		} else {
			const c = classify(kw);
			let target = '';
			let stage = 'Awareness';
			let intent = 'Informational';
			const l = kw.toLowerCase();
			if (P0.has(l)) {
				c.priority = 'P0';
				c.status = 'Add to plan';
				if (['seo services', 'search engine optimization services', 'seo optimisation services', 'search engine optimization agency', 'seo optimization agency', 'ai seo agency'].includes(l)) target = targetUrls['search-marketing'];
				else if (['ai optimization', 'ai optimisation', 'ai ranking'].includes(l)) target = targetUrls['ai-visibility-audit'];
				else if (l === 'geo seo') target = targetUrls['topics'];
				else target = targetUrls['search-marketing'];
				if (['ai seo services'].includes(l)) target = targetUrls['search-marketing'] + ' + ' + targetUrls['ai-visibility-audit'];
			} else if (P1.has(l)) {
				c.priority = 'P1';
				c.status = 'Content target';
				if (/ai seo tool|best ai/.test(l)) target = '/blog/ai-seo-tools-vs-ai-seo-services';
				else if (/ai search|perplexity/.test(l)) target = '/blog/google-ai-search-optimization';
				else if (/ai marketing|ai tools for marketing/.test(l)) target = '/blog/ai-marketing-tools';
				else if (l === 'ai monitoring tools') target = '/blog/ai-monitoring-tools';
				else if (l === 'seo aeo') target = '/blog/ai-seo-services';
				else if (l === 'geo agency') target = targetUrls['search-marketing'];
				else if (l === 'ai driven digital marketing') target = targetUrls['digital-marketing'];
				else target = '/blog/ai-seo-services';
			} else {
				const d = c.cluster;
				if (d === 'AI SEO / AEO / GEO') { target = targetUrls['ai-visibility-audit']; stage = 'Consideration'; intent = 'Commercial investigation'; }
				else if (d === 'SEO services / agency') { target = targetUrls['search-marketing']; stage = 'Consideration'; intent = 'Commercial'; }
				else if (d === 'AI search / search engine') { target = targetUrls['topics']; intent = 'Informational'; }
				else if (d === 'SEO tools / software') { target = '/blog/ai-seo-tools-vs-ai-seo-services'; stage = 'Consideration'; intent = 'Transactional investigation'; }
				else if (d === 'AI marketing') { target = targetUrls['digital-marketing']; intent = 'Informational'; }
				else if (d === 'Comparison / competitor') { target = targetUrls['blog-geo']; stage = 'Consideration'; intent = 'Comparison'; }
				else { target = targetUrls['topics']; }
			}
			all.set(kw, { keyword: kw, cluster: c.cluster, intent, stage, priority: c.priority, target: target, status: c.status, notes: c.notes, volume: vol, files: 1 });
		}
	}
}

const rows = [...all.values()].sort((a, b) => {
	const pa = a.priority === '-' ? 9 : parseInt(a.priority[1]);
	const pb = b.priority === '-' ? 9 : parseInt(b.priority[1]);
	if (pa !== pb) return pa - pb;
	return b.volume - a.volume;
});

const header = ['Keyword', 'Volume', 'Files', 'Cluster', 'Intent', 'Buyer Stage', 'Priority', 'Target URL', 'Status', 'Notes'];
const lines = [header.join('\t')];
for (const r of rows) {
	lines.push([r.keyword, r.volume, r.files, r.cluster, r.intent, r.stage, r.priority, r.target, r.status, r.notes].join('\t'));
}

const out = path.join(dir, 'keyword-master-sheet.csv');
fs.writeFileSync(out, lines.join('\n'), 'utf8');

const byCluster = {};
const byStatus = {};
for (const r of rows) {
	byCluster[r.cluster] = (byCluster[r.cluster] || 0) + 1;
	byStatus[r.status] = (byStatus[r.status] || 0) + 1;
}
console.log(`Files: ${files.length}`);
console.log(`Total unique keywords: ${rows.length}`);
console.log(`\nBy cluster:`);
console.log(byCluster);
console.log(`\nBy status:`);
console.log(byStatus);
console.log(`\nWritten: ${out}`);
