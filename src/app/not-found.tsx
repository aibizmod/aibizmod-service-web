import type { Metadata } from 'next';
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import StickyFooterLayout from "@/components/layout/StickyFooterLayout";

export const metadata: Metadata = {
	title: '404 - Page Not Found',
	description: 'The page you are looking for does not exist or has been moved.',
	robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main className="min-h-[calc(100vh-4rem)] flex flex-col bg-canvas">
          <div className="flex-1 relative flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden">
            {/* Ambient blobs */}
            <div
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none blur-3xl"
              aria-hidden="true"
              style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)" }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none blur-3xl"
              aria-hidden="true"
              style={{ background: "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)" }}
            />

            {/* Gold rule */}
            <span className="gold-rule mx-auto mb-6" aria-hidden="true" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0E7490] mb-4">
              404 Page Error
            </span>

            <h1
              className="font-display font-bold tracking-tight text-[#0F172A]"
              style={{ fontSize: "clamp(64px, 12vw, 150px)", lineHeight: 0.9 }}
            >
              Lost
            </h1>

            <p className="max-w-md mt-6 text-base leading-relaxed text-stone-600 md:text-lg">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link href="/" className="btn-primary">
                <Home size={15} aria-hidden="true" /> Back to Home
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact Support <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-16 flex items-center justify-center gap-6 text-xs text-stone-500">
              <span className="font-semibold uppercase tracking-widest text-[#0E7490]">
                Quick Links
              </span>
              {[
                { label: "Services", href: "/services" },
                { label: "Blog",     href: "/blog" },
                { label: "About",    href: "/about" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover:text-royal-deep transition-colors underline underline-offset-2"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </StickyFooterLayout>
    </>
  );
}
