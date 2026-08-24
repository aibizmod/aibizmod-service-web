"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAibizmodAuth } from "@/components/providers/AibizmodAuthProvider";
import { SignInModal } from "@/components/aibizmod/SignInModal";

interface ReportGateProps {
  tool: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

export function ReportGate({
  tool,
  heading,
  description,
  ctaLabel = "Unlock Full Report",
  className,
  children,
}: ReportGateProps) {
  const { isAuthenticated, user, logout } = useAibizmodAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <div className={cn("mt-8", className)}>
      {isAuthenticated ? (
        <div className="flex items-center justify-center py-6">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-emerald-200 bg-white px-5 py-3 shadow-sm">
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {user?.firstName ? `Hi, ${user.firstName}` : "Welcome back"}
              </span>
              <span className="text-xs text-slate-500">{user?.email}</span>
            </div>
            <button
              onClick={logout}
              data-aibizmod-track={`${tool} Logout`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-600 transition"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-8">
          <button
            onClick={() => setShowSignInModal(true)}
            data-aibizmod-track={`${tool} Unlock Report`}
            className="group inline-flex items-center gap-3 h-14 px-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-base font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 hover:scale-[1.02]"
          >
            <Sparkles className="h-5 w-5 text-cyan-400 group-hover:rotate-12 transition-transform" aria-hidden="true" />
            {ctaLabel}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          <p className="text-sm text-slate-400 text-center max-w-sm">
            Sign in with your email to unlock the full report — it only takes a few seconds.
          </p>
        </div>
      )}

      <div className={cn(!isAuthenticated && "pointer-events-none select-none blur-sm")}>
        {children}
      </div>

      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        heading={heading}
        description={description}
      />
    </div>
  );
}