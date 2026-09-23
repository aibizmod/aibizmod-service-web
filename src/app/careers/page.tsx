import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";

export const metadata: Metadata = {
  title: "Careers | aibizmod",
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

          {/* ── Hero Section ──────────────────────────────────────────── */}
          <section className="relative overflow-hidden bg-[#0B1120] px-4 sm:px-6 py-24 md:py-36 min-h-[85vh] flex items-center">
            {/* Grid background */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            {/* Radial glow */}
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.15) 0%, transparent 70%)",
              }}
            />

            {/* Dot grid overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(6,182,212,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Floating accent lines */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -top-20 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
              <div className="absolute -top-10 right-1/3 w-px h-48 bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent" />
              <div className="absolute top-1/3 left-10 w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
              <div className="absolute bottom-1/4 right-16 w-40 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                <Briefcase size={14} aria-hidden="true" />
                Careers
              </span>

              <h1
                className="mt-8 font-display font-thin text-white"
                style={{ fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 1.05 }}
              >
                Join the{" "}
                <span className="font-semibold text-cyan-400">Team</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
                We are always looking for talented people who share our passion
                for technology and building great products.
              </p>

              {/* Empty state card */}
              <div className="mt-16 mx-auto max-w-lg">
                <div className="relative rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                  <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-cyan-500/50 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-cyan-500/50 to-transparent" />

                  <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="text-cyan-400" size={24} />
                  </div>

                  <h2 className="text-lg font-semibold text-white mb-3">
                    No Open Positions
                  </h2>
                  <p className="text-sm leading-6 text-slate-400 mb-8">
                    There are no open positions at the moment, but we would
                    love to hear from you. Send us your resume and we will keep
                    you in mind for future opportunities.
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </StickyFooterLayout>
    </>
  );
}
