"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLayout, FiSend, FiFileText, FiLogOut } from "react-icons/fi";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", icon: FiLayout },
  { href: "/admin/campaigns", label: "Campaigns", icon: FiSend },
  { href: "/admin/audits", label: "Audits", icon: FiFileText },
];

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
        <span className="admin-live text-sm text-slate-500">Loading</span>
      </div>
    );
  }

  // Not logged in — show nothing (redirect is in useEffect)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="admin-canvas">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <a href="/admin" className="flex items-baseline gap-1.5 font-display text-lg font-semibold tracking-tight text-ink">
              aibiz<span className="text-royal">mod</span>
              <span className="font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-slate-400">/admin</span>
            </a>
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-royal/10 text-royal"
                        : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden font-mono text-xs text-slate-500 md:inline">{adminEmail}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-royal"
            >
              <FiLogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="admin-aura mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
