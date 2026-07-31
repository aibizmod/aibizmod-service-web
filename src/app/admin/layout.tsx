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
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="text-ink/50 text-sm">Loading...</div>
      </div>
    );
  }

  // Not logged in — show nothing (redirect is in useEffect)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-border bg-surface sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/admin" className="font-display font-semibold text-ink text-lg">
              Aibizmod Admin
            </a>
            <nav className="hidden sm:flex items-center gap-1">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/campaigns", label: "Campaigns" },
                { href: "/admin/audits", label: "Audits" },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-royal/10 text-royal"
                      : "text-ink/50 hover:text-ink hover:bg-tint"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-ink/60">{adminEmail}</span>
            <button
              onClick={handleSignOut}
              className="text-sm text-royal-deep hover:text-royal font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

    </div>
  );
}
