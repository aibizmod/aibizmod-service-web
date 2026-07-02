import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join aibizmod — explore career opportunities in technology consulting, software development, AI & automation, and digital growth.",
  alternates: { canonical: "https://aibizmod.com/careers" },
  openGraph: {
    title: "Careers | aibizmod",
    description:
      "Join aibizmod — explore career opportunities in technology consulting, software development, AI & automation, and digital growth.",
    url: "/careers",
  },
};

const careersSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers — aibizmod",
  description: "Career opportunities at aibizmod Ltd.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
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
                  <Briefcase size={14} aria-hidden="true" />
                  Careers
                </span>
                <h1
                  className="mt-7 font-display font-thin text-[#0F172A]"
                  style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.02 }}
                >
                  Join the{" "}
                  <span className="font-semibold text-[#0891B2]">Team</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  We are always looking for talented people who share our passion for technology and building great products.
                </p>
              </div>

              <div className="mt-16 text-center">
                <p className="text-base leading-7 text-slate-600 mb-8">
                  There are no open positions at the moment, but we would love to hear from you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1E293B] shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
