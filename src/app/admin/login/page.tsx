"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gql } from "@apollo/client";
import { client } from "@/lib/apollo-client";

const ADMIN_LOGIN = gql`
  mutation AibizmodAdminLogin($email: String!, $password: String!) {
    aibizmodAdminLogin(email: $email, password: $password) {
      token
      userId
      email
      firstName
      role
    }
  }
`;

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, go straight to admin
  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session === "true") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Step 1: Check against frontend env vars first (fast local check)
    if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    try {
      // Step 2: Call backend mutation to get a real JWT
      const { data } = await client.mutate<{
        aibizmodAdminLogin: {
          token: string;
          userId: string;
          email: string;
          firstName?: string;
          role: string;
        };
      }>({
        mutation: ADMIN_LOGIN,
        variables: { email: email.trim(), password },
      });

      const result = data?.aibizmodAdminLogin;
      if (!result?.token) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Step 3: Store the real JWT so Apollo client sends it as Bearer token
      localStorage.setItem("aibizmod_token", result.token);
      localStorage.setItem("admin_session", "true");
      localStorage.setItem("admin_email", result.email);

      window.location.href = "/admin";
    } catch (err: unknown) {
      const graphQLError =
        err && typeof err === "object" && "graphQLErrors" in err
          ? (err.graphQLErrors as Array<{ message?: string }>)?.[0]?.message
          : undefined;
      setError(graphQLError || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-semibold text-2xl text-ink">Aibizmod Admin</h1>
          <p className="text-sm text-ink/50 mt-2">Sign in to access the admin panel</p>
        </div>

        <div className="bg-surface rounded-2xl border border-border shadow-card p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                required
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-canvas text-ink placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-royal text-white font-semibold text-sm hover:bg-royal-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
