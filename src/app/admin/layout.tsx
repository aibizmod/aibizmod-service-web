"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    const email = localStorage.getItem("admin_email") || "";
    if (session === "true") {
      setIsLoggedIn(true);
      setAdminEmail(email);
    } else {
      setIsLoggedIn(false);
    }
    setReady(true);
  }, [pathname]);

  // Redirect to login if not authenticated (but not on the login page)
  useEffect(() => {
    if (!ready) return;
    if (!isLoginPage && !isLoggedIn) {
      router.push("/admin/login");
    }
  }, [ready, isLoggedIn, isLoginPage, router]);

  const handleSignOut = () => {
    localStorage.removeItem("admin_session");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("aibizmod_token");
    window.location.href = "/admin/login";
  };

  // Always render login page directly without auth check
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Still loading localStorage
  if (!ready) {
    return (
      <div className="admin-canvas flex items-center justify-center">
        <span className="admin-live text-sm text-slate-400">Loading</span>
      </div>
    );
  }

  // Not logged in — show nothing (redirect is in useEffect)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="admin-canvas">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050a14]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <a href="/admin" className="flex items-baseline gap-1.5 font-display text-lg font-semibold tracking-tight text-white">
              aibiz<span className="text-cyan-400">mod</span>
              <span className="font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-slate-500">/admin</span>
            </a>
            <nav className="hidden items-center gap-1 sm:flex">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/campaigns", label: "Campaigns" },
                { href: "/admin/audits", label: "Audits" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-xs text-slate-500 md:inline">{adminEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-xs font-medium text-slate-400 transition-colors hover:text-cyan-300"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="admin-aura mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
