import type { Metadata } from "next";
import { Scale } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for aibizmod Ltd. — terms governing the use of our website and the provision of technology services to clients.",
  alternates: { canonical: "https://aibizmod.com/terms" },
  openGraph: {
    title: "Terms of Service | aibizmod",
    description:
      "Terms of service for aibizmod Ltd. — terms governing the use of our website and the provision of technology services to clients.",
    url: "/terms",
  },
};

const sections = [
  {
    title: "1. Introduction",
    content:
      "These terms of service govern your use of the aibizmod website and the provision of services by aibizmod Ltd. By accessing our website or engaging our services, you agree to be bound by these terms. If you do not agree, please do not use our website or services.",
  },
  {
    title: "2. Services",
    content:
      "aibizmod Ltd. provides technology services including but not limited to web development, custom software development, mobile app development, digital marketing, cloud hosting and infrastructure, business process automation, customer experience management, and IT consulting. The specific scope, deliverables, timelines, and fees for each engagement will be defined in a separate statement of work or service agreement.",
  },
  {
    title: "3. Intellectual Property",
    content:
      "Upon full payment for services, all intellectual property rights in the custom deliverables (source code, designs, documentation) are transferred to the client. aibizmod retains the right to use general methodologies, tools, and libraries that were not specifically developed for the client. Website content and materials provided by aibizmod (including this site) are protected by copyright and may not be reproduced without permission.",
  },
  {
    title: "4. Client Responsibilities",
    content:
      "Clients agree to provide timely access to necessary information, resources, and decision-makers. Clients are responsible for reviewing and approving deliverables within agreed review periods. Delays caused by client inaction may affect project timelines and costs.",
  },
  {
    title: "5. Payment Terms",
    content:
      "Payment terms are specified in each statement of work or service agreement. Invoices are due within the period stated on the invoice. Late payments may incur interest at the rate permitted by law. Services may be suspended for overdue accounts.",
  },
  {
    title: "6. Confidentiality",
    content:
      "Both parties agree to maintain confidentiality of proprietary information shared during the engagement. This obligation survives the termination of the agreement. Confidential information does not include information that is publicly available or independently developed.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "To the maximum extent permitted by law, aibizmod Ltd.'s liability for any claim arising from the services is limited to the fees paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages, including lost profits or business interruption.",
  },
  {
    title: "8. Warranties",
    content:
      "We warrant that services will be performed in a professional manner consistent with industry standards. Our sole obligation for breach of warranty is to re-perform the non-conforming services. This warranty excludes issues caused by third-party modifications, improper use, or client-provided materials.",
  },
  {
    title: "9. Termination",
    content:
      "Either party may terminate an engagement with written notice as specified in the service agreement. Upon termination, the client pays for work completed up to the termination date. Provisions regarding confidentiality, intellectual property, and limitation of liability survive termination.",
  },
  {
    title: "10. Website Use",
    content:
      "Our website is provided for informational purposes. You agree not to misuse the website by introducing malware, attempting unauthorised access, or disrupting its operation. We reserve the right to restrict access to any part of the website without notice.",
  },
  {
    title: "11. Governing Law",
    content:
      "These terms are governed by the laws of England and Wales. Any disputes arising from these terms or related services shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    title: "12. Contact",
    content:
      "For questions about these terms, contact us at hello@aibizmod.com or +44 (0) 20 7946 0958.",
  },
];

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service — aibizmod",
  description: "Terms of service for aibizmod Ltd.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
          />
          <section className="relative overflow-hidden bg-white px-6 py-24 md:py-32">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(210,247,255,0.48),transparent_32%)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(15, 23, 42, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.055) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
              aria-hidden="true"
            />

            <div className="relative mx-auto max-w-3xl">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)]">
                  <Scale size={14} aria-hidden="true" />
                  Terms of Service
                </span>
                <h1
                  className="mt-7 font-display font-thin text-[#0F172A]"
                  style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.02 }}
                >
                  How We{" "}
                  <span className="font-semibold text-[#0891B2]">Work Together</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  These terms govern your use of our website and the services we provide.
                </p>
              </div>

              <div className="mt-16 space-y-10">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-lg font-semibold text-[#0F172A] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-base leading-7 text-slate-600">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
