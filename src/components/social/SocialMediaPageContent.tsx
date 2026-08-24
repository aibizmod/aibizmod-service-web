"use client";

import { Share2, ArrowRight, Award, Camera, BookOpen, Tv, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { StarButton } from "@/components/ui/star-button";
import {
  FaLinkedinIn, FaInstagram, FaPinterestP,
  FaFacebookF, FaWhatsapp, FaYoutube,
  FaGithub, FaReddit, FaDiscord,
  FaHackerNews, FaGitlab, FaStackOverflow,
  FaProductHunt, FaTumblr,
} from "react-icons/fa";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import {
  SiBluesky, SiSubstack, SiMastodon,
  SiThreads, SiMedium, SiQuora,
  SiHashnode, SiLinktree, SiDribbble, SiBehance,
  SiGravatar, SiKaggle,
} from "react-icons/si";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/common/AnimatedSection";
import ShaderBackground from "@/components/ui/shader-background";
import { SocialGradientBlobCard } from "@/components/ui/gradient-bold-card";
import HighlightCard from "@/components/ui/highlight-card";
import { InteractiveCard } from "@/components/ui/interactive-card";

// ─── Data ──────────────────────────────────────────────────────────────────────

const officialPlatforms = [
  {
    name: "LinkedIn",
    handle: "linkedin.com/company/aibizmod",
    desc: "We share company updates, project reflections, and thoughts on the work we do.",
    href: "https://linkedin.com/company/aibizmod",
    gradient: "from-blue-700 via-blue-500 to-cyan-400",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    handle: "@aibizmod",
    desc: "A visual look at how we work, what we build, and the people behind it.",
    href: "https://www.instagram.com/aibizmod2026/",
    gradient: "from-purple-600 via-pink-500 to-orange-400",
    icon: <FaInstagram />,
  },
  {
    name: "Facebook",
    handle: "facebook.com/aibizmod",
    desc: "Updates on what we're working on and occasional announcements worth sharing.",
    href: "https://facebook.com/aibizmod",
    gradient: "from-blue-800 via-blue-600 to-blue-400",
    icon: <FaFacebookF />,
  },
  {
    name: "Pinterest",
    handle: "@aibizmod",
    desc: "Boards we've put together around design, technology ideas, and digital work.",
    href: "https://pinterest.com/aibizmod",
    gradient: "from-red-600 via-rose-500 to-pink-400",
    icon: <FaPinterestP />,
  },
  {
    name: "X (Twitter)",
    handle: "@aibizmod",
    desc: "Short posts and reactions to things happening in technology.",
    href: "https://x.com/aibizmod",
    gradient: "from-slate-700 via-slate-500 to-slate-300",
    icon: <FaXTwitter />,
  },
  {
    name: "YouTube",
    handle: "@aibizmod",
    desc: "Walkthroughs, demos, and recordings from sessions we've hosted.",
    href: "https://youtube.com/@aibizmod",
    gradient: "from-red-700 via-red-500 to-orange-400",
    icon: <FaYoutube />,
  },
  {
    name: "WhatsApp",
    handle: "+65 8611 1900",
    desc: "The fastest way to reach us directly with a quick question.",
    href: "https://wa.me/6586111900",
    gradient: "from-green-600 via-emerald-500 to-teal-400",
    icon: <FaWhatsapp />,
  },
];

const registeredPlatforms = [
  {
    name: "Medium",
    handle: "@aibizmod",
    desc: "Longer pieces on technology decisions, things we've learned, and how we think about the work.",
    href: "https://medium.com/@aibizmod_60676",
    gradient: "from-slate-800 via-slate-600 to-stone-400",
    icon: <SiMedium />,
  },
  {
    name: "GitHub",
    handle: "@aibizmod",
    desc: "Where we share code and open-source work from projects we're able to make public.",
    href: "https://github.com/aibizmod",
    gradient: "from-gray-800 via-gray-600 to-gray-400",
    icon: <FaGithub />,
  },
  {
    name: "Reddit",
    handle: "u/aibizmod",
    desc: "We join discussions on software and technology when we have something useful to add.",
    href: "https://reddit.com/u/aibizmod",
    gradient: "from-orange-600 via-orange-500 to-amber-400",
    icon: <FaReddit />,
  },
  {
    name: "Discord",
    handle: "aibizmod",
    desc: "A space for clients and partners to connect and follow what we're building.",
    href: "https://discord.gg/bS3zQjGa5",
    gradient: "from-indigo-600 via-violet-500 to-purple-400",
    icon: <FaDiscord />,
  },
  {
    name: "Telegram",
    handle: "@aibizmod",
    desc: "Announcements and quick updates when we have something worth sharing.",
    href: "https://t.me/aibizmod",
    gradient: "from-sky-600 via-sky-500 to-blue-400",
    icon: <FaTelegram />,
  },
  {
    name: "Bluesky",
    handle: "@aibizmod.bsky.social",
    desc: "We're here for the open web conversations.",
    href: "https://bsky.app/profile/aibizmod.bsky.social",
    gradient: "from-sky-500 via-blue-400 to-cyan-300",
    icon: <SiBluesky />,
  },
  {
    name: "Substack",
    handle: "aibizmod.substack.com",
    desc: "Our newsletter. When we have something worth reading, it goes here first.",
    href: "https://aibizmod.substack.com",
    gradient: "from-orange-500 via-amber-400 to-yellow-300",
    icon: <SiSubstack />,
  },
  {
    name: "Quora",
    handle: "aibizmod",
    desc: "We answer questions about software and technology when we can add something useful.",
    href: "https://www.quora.com/profile/Aibizmod",
    gradient: "from-red-700 via-red-500 to-rose-400",
    icon: <SiQuora />,
  },
  {
    name: "Mastodon",
    handle: "@aibizmod12@mastodon.social",
    desc: "Part of the open web. We're here if that's where you prefer to connect.",
    href: "https://mastodon.social/@aibizmod12",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400",
    icon: <SiMastodon />,
  },
  {
    name: "Threads",
    handle: "@aibizmod",
    desc: "Lighter posts and quick thoughts from the team.",
    href: "https://www.threads.com/@aibizmod",
    gradient: "from-slate-800 via-gray-700 to-zinc-500",
    icon: <SiThreads />,
  },
  {
    name: "Dribbble",
    handle: "@aibizmod",
    desc: "Design work and visual concepts we've shared publicly.",
    href: "https://dribbble.com/aibizmod",
    gradient: "from-pink-600 via-rose-500 to-pink-400",
    icon: <SiDribbble />,
  },
  {
    name: "Behance",
    handle: "@aibizmod",
    desc: "Our portfolio of creative and design work.",
    href: "https://www.behance.net/aibizmod",
    gradient: "from-blue-700 via-blue-500 to-blue-400",
    icon: <SiBehance />,
  },
  {
    name: "Hashnode",
    handle: "@aibizmod",
    desc: "Technical articles and development write-ups for the developer community.",
    href: "https://hashnode.com/@aibizmod",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    icon: <SiHashnode />,
  },
  {
    name: "GitLab",
    handle: "aibizmod-group",
    desc: "Source repositories and project work we've made available on GitLab.",
    href: "https://gitlab.com/aibizmod-group",
    gradient: "from-orange-600 via-orange-500 to-amber-400",
    icon: <FaGitlab />,
  },
  {
    name: "Stack Overflow",
    handle: "aibizmod",
    desc: "We contribute answers on software and development questions when we have something useful to share.",
    href: "https://stackoverflow.com/users/32858253/aibizmod",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    icon: <FaStackOverflow />,
  },
  {
    name: "Hacker News",
    handle: "aibizmod",
    desc: "We follow and occasionally participate in technology discussions on HN.",
    href: "https://news.ycombinator.com/user?id=aibizmod",
    gradient: "from-orange-700 via-orange-600 to-orange-400",
    icon: <FaHackerNews />,
  },
  {
    name: "Allmylinks",
    handle: "@aibizmod",
    desc: "A single page linking to all of our active profiles across the web.",
    href: "https://allmylinks.com/aibizmod",
    gradient: "from-purple-600 via-pink-500 to-fuchsia-400",
    icon: <SiLinktree />,
  },
  {
    name: "Product Hunt",
    handle: "@aibizmod",
    desc: "We track and support product launches in the software community.",
    href: "https://www.producthunt.com/@aibizmod",
    gradient: "from-orange-600 via-red-500 to-amber-500",
    icon: <FaProductHunt />,
  },
  {
    name: "Picturepush",
    handle: "aibizmod",
    desc: "Image hosting and photo sharing for our public graphics.",
    href: "https://aibizmod.picturepush.com/",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    icon: <Camera size={16} />,
  },
  {
    name: "Bio.site",
    handle: "aibizmod",
    desc: "Our curated quick link tree directory profile.",
    href: "https://bio.site/aibizmod",
    gradient: "from-fuchsia-600 via-purple-500 to-pink-500",
    icon: <SiLinktree />,
  },
  {
    name: "Beacons",
    handle: "aibizmod",
    desc: "Our beacons link directory page for quick access to all portals.",
    href: "https://beacons.ai/aibizmod",
    gradient: "from-purple-600 via-indigo-500 to-cyan-500",
    icon: <SiLinktree />,
  },
  {
    name: "MyNickname",
    handle: "id1845023",
    desc: "Our registered nickname certificate confirming our brand identifier ownership.",
    href: "https://mynickname.com/id1845023",
    gradient: "from-amber-600 via-orange-500 to-yellow-500",
    icon: <Award size={16} />,
  },
  {
    name: "Gram.social",
    handle: "aibizmod",
    desc: "A microblogging profile where we claim our namespace identifier.",
    href: "https://gram.social/aibizmod",
    gradient: "from-pink-500 via-rose-500 to-red-400",
    icon: <FaInstagram />,
  },
  {
    name: "Wattpad",
    handle: "aibizmod",
    desc: "Claimed brand handle on the publishing and reading platform.",
    href: "https://www.wattpad.com/user/aibizmod",
    gradient: "from-orange-500 via-amber-600 to-yellow-600",
    icon: <BookOpen size={16} />,
  },
  {
    name: "Gloria.tv",
    handle: "qweDJZPhrgKR2VojJGiJooc4R",
    desc: "Video portal handle reserved for our brand representation.",
    href: "https://gloria.tv/user/qweDJZPhrgKR2VojJGiJooc4R",
    gradient: "from-blue-600 via-slate-600 to-zinc-700",
    icon: <Tv size={16} />,
  },
  {
    name: "500px",
    handle: "aibizmod",
    desc: "Photography portfolio and public image gallery.",
    href: "https://500px.com/p/aibizmod",
    gradient: "from-slate-800 via-gray-700 to-zinc-600",
    icon: <ImageIcon size={16} />,
  },
  {
    name: "Gravatar",
    handle: "aibizmod",
    desc: "Global avatar profile tied to our brand email identity.",
    href: "https://gravatar.com/sensationallybeliever11a02f741e",
    gradient: "from-blue-700 via-cyan-600 to-teal-500",
    icon: <SiGravatar />,
  },
  {
    name: "Tumblr",
    handle: "aibizmod",
    desc: "A claimed microblogging handle for brand consistency.",
    href: "https://www.tumblr.com/blog/aibizmod",
    gradient: "from-indigo-900 via-blue-800 to-slate-700",
    icon: <FaTumblr />,
  },
  {
    name: "F6S",
    handle: "ai-bizmod",
    desc: "Startup and company profile listing on F6S.",
    href: "https://www.f6s.com/ai-bizmod",
    gradient: "from-orange-600 via-red-500 to-amber-500",
    icon: <Share2 size={16} />,
  },
  {
    name: "Kaggle",
    handle: "aibizmod",
    desc: "Where we participate in data science competitions, and share notebooks and datasets.",
    href: "http://kaggle.com/aibizmod",
    gradient: "from-sky-400 via-cyan-500 to-blue-500",
    icon: <SiKaggle />,
  },
  {
    name: "Web of Science",
    handle: "QOA-4053-2026",
    desc: "Our researcher profile and publication record on the citation indexing platform.",
    href: "https://www.webofscience.com/wos/author/record/QOA-4053-2026",
    gradient: "from-emerald-700 via-teal-600 to-cyan-700",
    icon: <Award size={16} />,
  },
  {
    name: "Scribd",
    handle: "998083706/aibizmod",
    desc: "A library of our shared documents, reports, and presentations.",
    href: "https://www.scribd.com/user/998083706/aibizmod",
    gradient: "from-teal-600 via-cyan-600 to-emerald-500",
    icon: <BookOpen size={16} />,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SocialMediaPageContent() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-white px-6 pb-20 pt-32 md:pt-36">
        <ShaderBackground className="absolute inset-0 z-0 h-full w-full opacity-80" />

        <div
          className="pointer-events-none absolute left-1/2 top-28 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-[0_12px_35px_rgba(59,130,246,0.10)] backdrop-blur-md">
                <Share2 size={14} aria-hidden="true" />
                Social Media
              </span>
              <h1
                className="mt-7 font-display font-thin text-[#0F172A] text-balance"
                style={{ fontSize: "clamp(38px, 6vw, 72px)", lineHeight: 1.02 }}
              >
                Find us{" "}
                <motion.span
                  className="font-normal inline-block"
                  style={{ color: "#0891B2" }}
                  animate={{
                    filter: [
                      "drop-shadow(0 0 0px rgba(8,145,178,0))",
                      "drop-shadow(0 0 12px rgba(8,145,178,0.55))",
                      "drop-shadow(0 0 0px rgba(8,145,178,0))",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Everywhere
                </motion.span>
              </h1>
              <p
                className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/70 bg-white/45 px-6 py-4 text-base leading-8 text-slate-600 shadow-[0_18px_55px_rgba(59,130,246,0.12)] backdrop-blur-md md:text-lg"
              >
                One place to find every account we use. If you&apos;re looking
                for us on social media, this is where to start.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Official Channels ──────────────────────────────────────────────── */}
      <section
        className="relative py-12 px-6 border-t border-border bg-white md:py-14"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.055) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(210,247,255,0.48),transparent_32%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "black",
              }}
            >
              Verified Accounts
            </span>
            <h2
              className="mt-4 font-display font-bold"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E7490" }}
            >
              Official Channels
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontSize: 15 }}>
              These are the accounts we actively post to and check regularly.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {officialPlatforms.map(({ name, handle, desc, href, icon }, i) => (
              <AnimatedSection key={name} delay={i * 0.06}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <HighlightCard
                    title={name}
                    description={[handle, desc]}
                    icon={<span className="text-xl text-[#0891B2]">{icon}</span>}
                  />
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registered Platforms ───────────────────────────────────────────── */}
      <section className="py-12 px-6 border-t border-border bg-canvas md:py-14">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "black",
              }}
            >
              Also On
            </span>
            <h2
              className="mt-4 font-display font-bold"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0E7490" }}
            >
              Registered Profiles
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed" style={{ fontSize: 15 }}>
              We hold accounts on these platforms. We don&apos;t post regularly, but the names are ours.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" style={{ perspective: "1000px" }}>
            {registeredPlatforms.map(({ name, handle, desc, href, gradient, icon }, i) => (
              <AnimatedSection key={name} delay={i * 0.05}>
                <InteractiveCard className="h-full">
                  <SocialGradientBlobCard
                    name={name}
                    handle={handle}
                    desc={desc}
                    href={href}
                    gradient={gradient}
                    socialIcon={icon}
                    category="registered"
                  />
                </InteractiveCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────────────── */}
      <section className="relative py-20 px-6 bg-canvas border-t border-[#E0F2FE] overflow-hidden">
        {/* Background glows — mirrors WhyChooseUs */}
        <div className="absolute top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-200/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-blue-200/10 blur-[120px] pointer-events-none" />

        <AnimatedSection>
          <div className="relative max-w-2xl mx-auto">
            <div className="rounded-2xl border border-[#BAE6FD] bg-[#ECFEFF]/70 backdrop-blur-sm
                            px-10 py-14 text-center shadow-[0_4px_24px_rgba(8,145,178,0.08)]">

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black">
                Get in Touch
              </span>

              <h2
                className="mt-4 font-display font-thin text-primary text-balance"
                style={{ fontSize: "clamp(26px, 4vw, 42px)", lineHeight: 1.1 }}
              >
                Don&apos;t see your favourite platform?
              </h2>

              <p className="mt-5 text-muted-foreground leading-relaxed max-w-md mx-auto" style={{ fontSize: 16 }}>
                Just ask. We&apos;ll tell you if we use that platform, or you can
                email us directly at hello@aibizmod.com
              </p>

              <div className="mt-8 flex justify-center">
                <Link
                  href="/contact"
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-3xl inline-flex"
                >
                  <StarButton
                    lightColor="#38bdf8"
                    backgroundColor="#0f172a"
                    className="font-sans font-semibold text-[11px] uppercase tracking-[0.2em]"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4 group-hover/star-button:translate-x-1 transition-transform duration-300" />
                  </StarButton>
                </Link>
              </div>

            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
