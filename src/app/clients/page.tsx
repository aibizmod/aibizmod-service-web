import type { Metadata } from 'next';
import ClientsPageContent from '@/components/clients/ClientsPageContent';

export const metadata: Metadata = {
	title: 'Client Showcase & Case Studies | aibizmod',
	description:
		'Explore our client success stories. See how aibizmod builds custom automated workflows, speeds up web rendering, and recovers organic search ranks for operations and web teams.',
	alternates: { canonical: 'https://aibizmod.com/clients' },
	openGraph: {
		title: 'Client Showcase & Case Studies | aibizmod',
		description:
			'Explore our client success stories. See how aibizmod builds custom automated workflows, speeds up web rendering, and recovers organic search ranks.',
		url: '/clients',
	},
};

export default function ClientsPage() {
	return <ClientsPageContent />;
}
