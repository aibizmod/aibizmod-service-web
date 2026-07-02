import type { Metadata } from "next";
import { Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for aibizmod Ltd. — how we collect, use, and protect your personal data in compliance with UK GDPR and Indian data protection laws.",
  alternates: { canonical: "https://aibizmod.com/privacy" },
  openGraph: {
    title: "Privacy Policy | aibizmod",
    description:
      "Privacy policy for aibizmod Ltd. — how we collect, use, and protect your personal data in compliance with UK GDPR and Indian data protection laws.",
    url: "/privacy",
  },
};

const sections = [
  {
    title: "1. Who We Are",
    content:
      "aibizmod Ltd. is a technology services company registered in the United Kingdom. This privacy policy explains how we collect, use, and protect your personal data when you visit our website or use our services.",
  },
  {
    title: "2. Data We Collect",
    content:
      "We may collect the following categories of personal data: contact information (name, email address, phone number, company name); technical data (IP address, browser type, device information, referring URLs); usage data (pages visited, time spent, interactions with forms and content); and communication data (messages you send via our contact form or email).",
  },
  {
    title: "3. How We Collect Data",
    content:
      "We collect data directly when you fill in forms on our website, correspond with us by email or phone, or subscribe to our newsletter. We also collect technical data automatically via cookies and similar tracking technologies, and we use Google Analytics 4 to understand site usage patterns.",
  },
  {
    title: "4. Legal Basis for Processing",
    content:
      "We process your personal data on the following legal bases: legitimate interests (to operate our website, communicate with prospects, and improve our services); consent (for newsletter subscriptions and non-essential cookies); and contractual necessity (to provide services you have requested). You may withdraw consent at any time.",
  },
  {
    title: "5. How We Use Your Data",
    content:
      "We use your data to: respond to inquiries and provide requested services; send relevant communications about our services and industry insights (with your consent); improve our website and service offerings; comply with legal and regulatory obligations; and protect our business against fraud or misuse.",
  },
  {
    title: "6. Data Sharing",
    content:
      "We do not sell your personal data to third parties. We may share data with trusted service providers who process data on our behalf (such as hosting providers, email delivery services, and analytics platforms). These providers are contractually bound to protect your data and may only process it for specified purposes.",
  },
  {
    title: "7. International Transfers",
    content:
      "Your data may be transferred to and processed in countries outside the UK and India, including the United States where our service providers are based. We ensure appropriate safeguards are in place, including Standard Contractual Clauses where required by UK GDPR.",
  },
  {
    title: "8. Data Retention",
    content:
      "We retain your personal data only as long as necessary to fulfil the purposes for which it was collected, or as required by law. Contact form inquiries are retained for 24 months. Newsletter subscription data is retained until you unsubscribe. Analytics data is retained for 26 months.",
  },
  {
    title: "9. Your Rights",
    content:
      "Under UK GDPR and Indian data protection law, you have the right to: access your personal data; correct inaccurate data; erase your data (right to be forgotten); restrict processing; data portability; object to processing; and withdraw consent at any time. To exercise these rights, contact us at hello@aibizmod.com.",
  },
  {
    title: "10. Cookies",
    content:
      "Our website uses essential cookies for functionality and non-essential cookies for analytics and performance (Google Analytics 4). You can control cookie preferences through your browser settings. Blocking certain cookies may affect site functionality.",
  },
  {
    title: "11. Security",
    content:
      "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include SSL encryption, access controls, and regular security reviews.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have any questions about this privacy policy or wish to exercise your data protection rights, please contact us at: hello@aibizmod.com or +44 (0) 20 7946 0958.",
  },
  {
    title: "13. Changes to This Policy",
    content:
      "We may update this privacy policy from time to time. Material changes will be notified on our website. This policy was last updated June 2026.",
  },
];

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy — aibizmod",
  description:
    "Privacy policy for aibizmod Ltd. — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
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
                  <Shield size={14} aria-hidden="true" />
                  Privacy Policy
                </span>
                <h1
                  className="mt-7 font-display font-thin text-[#0F172A]"
                  style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.02 }}
                >
                  How We Handle{" "}
                  <span className="font-semibold text-[#0891B2]">Your Data</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  Last updated: June 2026. This policy explains what data we collect, why we collect it, and what we do with it.
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
