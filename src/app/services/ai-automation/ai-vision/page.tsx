import type { Metadata } from 'next';
import SubservicePageLayout, {
	type SubservicePageData,
} from '@/components/SubservicePageLayout';

export const metadata: Metadata = {
	title: 'AI Vision & Computer Vision Services | Image Recognition | aibizmod',
	description:
		'Computer vision and AI vision services. Image recognition, visual analysis, and machine vision systems for automated visual understanding.',
	keywords: [
		'computer vision',
		'AI vision',
		'image recognition',
		'object detection',
		'visual analysis',
		'machine vision',
		'image processing',
		'video analysis',
		'visual intelligence',
	],
	alternates: {
		canonical: 'https://aibizmod.com/services/ai-automation/ai-vision',
	},
	openGraph: {
		title: 'AI Vision & Image Recognition | Computer Vision | aibizmod',
		description:
			'Computer vision and AI vision systems that automatically understand and analyze images and video.',
		url: '/services/ai-automation/ai-vision',
	},
};

const data: SubservicePageData = {
	name: 'AI Vision',
	parentName: 'AI Automation',
	parentSlug: 'ai-automation',
	slug: 'ai-vision',
	tagline:
		'Automate visual inspection, document digitisation, and image-based data capture using computer vision models that replace manual review with scalable, accurate pipelines.',
	heroImage:
		'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=1000&q=80&auto=format&fit=crop',

	solves: {
		challenge:
			'Many operations contain visual inspection steps that require a person to look at something and make a judgement. Quality control checks, document reading, ID verification, and photo categorisation are examples. These steps create bottlenecks when volume increases because each one requires human attention at the point of inspection.',
		challengePoints: [
			'Quality inspectors spending time on repetitive visual checks that could be automated',
			'Documents arriving in image format that must be manually read and re-entered into systems',
			'ID and document verification adding friction and staff time to onboarding processes',
			'Photo content that is untagged and unsearchable because classification was never automated',
		],
		solution:
			'We build computer vision pipelines that handle the specific visual task in your process, whether that is reading a document, classifying an image, detecting a defect, or verifying an ID. The system scales with volume and produces structured data output that feeds directly into your downstream workflows.',
		solutionPoints: [
			'OCR pipelines that extract structured data from documents, forms, and invoices',
			'Object detection models trained on your specific defect types or categories',
			'Document verification workflows that flag anomalies for human review',
			'Vision APIs embedded into your existing application or workflow',
		],
	},

	capabilities: [
		{
			icon: 'eye',
			title: 'Computer Vision Pipelines',
			description:
				'Build object detection, image classification, and scene analysis pipelines trained on your specific use case and deployed as scalable inference APIs.',
			image: '/services/ai-automation/ai-vision-computer-vision-pipelines.jpg',
			imageAlt: 'AI Automation Computer Vision Pipelines capability illustration.',
		},
		{
			icon: 'fileText',
			title: 'OCR and Document Extraction',
			description:
				'Extract text, tables, form fields, and structured data from PDFs, scanned documents, and photographed forms with accuracy verification.',
			image: '/services/ai-automation/ai-vision-ocr-and-document-extraction.jpg',
			imageAlt: 'AI Automation OCR and Document Extraction capability illustration.',
		},
		{
			icon: 'search',
			title: 'Quality Control Inspection',
			description:
				'Train defect detection models on your specific product types and deploy them for automated visual quality checks in manufacturing or logistics workflows.',
			image: '/services/ai-automation/ai-vision-quality-control-inspection.jpg',
			imageAlt: 'AI Automation Quality Control Inspection capability illustration.',
		},
		{
			icon: 'shield',
			title: 'Document and ID Verification',
			description:
				'Automated KYC workflows that read identity documents, extract fields, check for tampering indicators, and flag anomalies for review.',
			image: '/services/ai-automation/ai-vision-document-and-id-verification.jpg',
			imageAlt: 'AI Automation Document and ID Verification capability illustration.',
		},
		{
			icon: 'monitor',
			title: 'Video Stream Analysis',
			description:
				'Frame-level analysis pipelines for security, retail foot traffic, or operational event detection using real-time or batch video processing.',
			image: '/services/ai-automation/ai-vision-video-stream-analysis.jpg',
			imageAlt: 'AI Automation Video Stream Analysis capability illustration.',
		},
		{
			icon: 'zap',
			title: 'Real-Time Vision APIs',
			description:
				'Deploy vision inference endpoints your existing applications can call at request time, with response times suited to interactive or near-real-time workflows.',
			image: '/services/ai-automation/ai-vision-realtime-vision-apis.jpg',
			imageAlt: 'AI Automation Real-time Vision APIs capability illustration.',
		}
	],

	useCases: [
		{
			industry: 'Logistics',
			title: 'Automated Parcel Label Reading',
			description:
				'Camera-captured parcel images are processed by an OCR pipeline that reads shipping labels, extracts destination data, and routes packages without manual scanning.',
		},
		{
			industry: 'Finance',
			title: 'Invoice Data Extraction',
			description:
				'Scanned and photographed invoices are processed by a document extraction pipeline that identifies vendor, date, line items, and totals, and writes them into the accounting system.',
		},
		{
			industry: 'Manufacturing',
			title: 'Surface Defect Detection',
			description:
				'A camera positioned at the end of a production line captures images of manufactured parts. A vision model trained on defect types flags non-conforming items for removal before packaging.',
		},
		{
			industry: 'Financial Services',
			title: 'KYC Document Processing',
			description:
				'Onboarding applicants upload passport or driving licence images. The system extracts personal details, checks document structure, and flags suspected anomalies for manual review.',
		},
		{
			industry: 'Property',
			title: 'Property Photo Classification',
			description:
				'Listing photos are automatically tagged by room type and quality rating, reducing the manual review time needed to organise listings for publication.',
		},
		{
			industry: 'Healthcare',
			title: 'Medical Form Digitisation',
			description:
				'Paper patient intake forms photographed at reception are processed by OCR, with extracted fields mapped to the relevant fields in the patient records system.',
		},
	],

	technologies: [
		'Python',
		'OpenCV',
		'TensorFlow',
		'PyTorch',
		'YOLO',
		'Tesseract OCR',
		'AWS Rekognition',
		'Google Vision API',
		'Azure Computer Vision',
		'FastAPI',
		'Docker',
		'ONNX Runtime',
	],

	benefits: [
		{
			title: 'Visual Tasks Removed from Human Queues',
			description:
				'Computer vision handles the inspection, reading, or classification step automatically, removing it as a bottleneck in your process without reducing quality standards.',
		},
		{
			title: 'Structured Data from Unstructured Input',
			description:
				'Documents, images, and scans that arrive as unstructured visual content are converted into structured, searchable data ready for downstream systems.',
		},
		{
			title: 'Scales with Volume',
			description:
				'Vision pipelines process images at the rate your infrastructure permits, not the rate your staff can manage, which removes volume as a constraint.',
		},
		{
			title: 'Consistent Inspection Standards',
			description:
				'Models apply the same criteria to every item inspected, without attention fatigue, shift handovers, or variation between individual inspectors.',
		},
		{
			title: 'Faster Onboarding and Intake',
			description:
				'Automating document reading at intake reduces turnaround time for onboarding, applications, and form processing from days to minutes.',
		},
		{
			title: 'Audit Trail for Every Inspection',
			description:
				'Every image processed generates a logged result, including the model confidence score, detected values, and any flags raised, creating a full inspection record.',
		},
	],

	faqs: [
		{
			q: 'What types of documents can your OCR system accurately process?',
			a: 'Our OCR pipelines work well with structured forms, invoices, receipts, and identity documents where the layout is consistent. For highly variable handwritten content, accuracy depends on handwriting quality. We test against sample documents during scoping to confirm accuracy benchmarks before committing to build.',
		},
		{
			q: 'How accurate is computer vision for manufacturing quality control?',
			a: 'Defect detection accuracy depends on the quality and volume of labelled training images. With 500 or more labelled examples per defect type and consistent lighting conditions, models typically achieve 90 to 97 percent detection accuracy. We conduct a pilot with your sample images before full deployment to establish baseline performance.',
		},
		{
			q: 'Can vision models be deployed to run locally on edge devices rather than in the cloud?',
			a: 'Yes. For applications requiring low latency or offline operation, we can optimise and deploy models to edge hardware using frameworks like ONNX Runtime or TensorRT. This is common for production line inspection where cloud round-trip latency is not acceptable.',
		},
		{
			q: 'What volume of images can the system process per minute?',
			a: 'Processing throughput depends on model size, hardware, and whether GPU acceleration is used. A lightweight classification model on a single GPU instance typically handles hundreds of images per minute. We design the infrastructure around your volume requirements during scoping and can scale horizontally if needed.',
		},
	],
	answerSummary:
		'UK and India organisations with visual inspection, document digitisation, or image-based data capture needs get computer vision pipelines that handle reading, classifying, detecting defects, and verifying documents at scale without manual review bottlenecks.',
};

export default function AIVisionPage() {
	return <SubservicePageLayout data={data} />;
}
