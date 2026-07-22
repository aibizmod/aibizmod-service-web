"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Loader2, Mail, Lock, XCircle } from "lucide-react";
import { useAibizmodAuth } from "@/components/providers/AibizmodAuthProvider";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { requestOtp, verifyOtp } = useAibizmodAuth();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const result = await requestOtp(email);
    setLoading(false);

    if (result.success) {
      setMessage(result.message);
      setStep("otp");
    } else {
      setError(result.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const result = await verifyOtp(email, otp);
    setLoading(false);

    if (result.success) {
      onClose();
      setStep("email");
      setEmail("");
      setOtp("");
      setMessage("");
    } else {
      setError(result.error || "Invalid OTP. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep("email");
      setEmail("");
      setOtp("");
      setMessage("");
      setError("");
    }, 200);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <XCircle className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-800 shadow-lg shadow-slate-200">
            <span
              className="relative text-2xl font-bold text-white"
              style={{ fontFamily: "Satoshi, sans-serif" }}
            >
              {"\u0131"}
              <span className="pointer-events-none absolute left-1/2 top-[0.15em] h-[0.2em] w-[0.2em] -translate-x-1/2 rounded-full bg-cyan-400" />
            </span>
          </div>
          <h3
            className="text-xl font-bold text-slate-900"
            style={{ fontFamily: "Satoshi, sans-serif" }}
          >
            {step === "email" ? "Sign in to your account" : "Enter your code"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {step === "email"
              ? "Unlock the full AI visibility report"
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label
                htmlFor="aibizmod-signin-email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Business email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="aibizmod-signin-email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Personal emails (Gmail, Yahoo, etc.) are not accepted.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {loading ? "Sending code..." : "Continue with email"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label
                htmlFor="aibizmod-signin-otp"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                6-digit code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="aibizmod-signin-otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition tracking-widest"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="inline-flex items-center justify-center gap-2 h-12 w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
              {loading ? "Verifying..." : "Verify & unlock report"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError("");
                setMessage("");
              }}
              className="w-full text-center text-sm text-slate-500 hover:text-cyan-600 transition"
            >
              Use a different email
            </button>
          </form>
        )}

        <p className="text-xs text-slate-400 text-center mt-5">
          No credit card required
        </p>
      </div>
    </div>,
    document.body
  );
}
