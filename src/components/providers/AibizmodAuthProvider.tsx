"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { gql } from "@apollo/client";
import { client } from "@/lib/apollo-client";

const REQUEST_LOGIN_OTP = gql`
  mutation AibizmodRequestLoginOtp($email: String!) {
    aibizmodRequestLoginOtp(email: $email) {
      otpSent
      message
      email
    }
  }
`;

const VERIFY_LOGIN_OTP = gql`
  mutation AibizmodVerifyLoginOtp($email: String!, $otp: String!) {
    aibizmodVerifyLoginOtp(email: $email, otp: $otp) {
      token
      userId
      email
      firstName
      lastName
      role
      domain
    }
  }
`;

const GET_ME = gql`
  query AibizmodMe {
    aibizmodMe {
      userId
      email
      firstName
      lastName
      companyName
      domain
      role
      status
      emailVerified
      lastLoginAt
    }
  }
`;

export interface AibizmodUser {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  domain?: string;
  role?: string;
  status?: string;
  emailVerified?: boolean;
  lastLoginAt?: string;
}

interface AibizmodAuthContextValue {
  user: AibizmodUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  requestOtp: (email: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AibizmodAuthContext = createContext<AibizmodAuthContextValue | undefined>(
  undefined
);

const TOKEN_KEY = "aibizmod_token";
const USER_KEY = "aibizmod_user";

export function AibizmodAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AibizmodUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate auth state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const persist = useCallback((newToken: string, newUser: AibizmodUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    }
    setToken(newToken);
    setUser(newUser);
  }, []);

  const clear = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    setToken(null);
    setUser(null);
  }, []);

  const requestOtp = useCallback(
    async (email: string): Promise<{ success: boolean; message: string }> => {
      try {
        const { data } = await client.mutate<{ aibizmodRequestLoginOtp: { message: string } }>({
          mutation: REQUEST_LOGIN_OTP,
          variables: { email: email.toLowerCase().trim() },
        });
        return {
          success: true,
          message: data?.aibizmodRequestLoginOtp?.message || "OTP sent.",
        };
      } catch (err: unknown) {
        const graphQLError =
          err && typeof err === "object" && "graphQLErrors" in err
            ? (err.graphQLErrors as Array<{ message?: string }>)?.[0]?.message
            : undefined;
        const message =
          graphQLError ||
          (err instanceof Error ? err.message : "Failed to send OTP. Please try again.");
        return { success: false, message };
      }
    },
    []
  );

  const verifyOtp = useCallback(
    async (
      email: string,
      otp: string
    ): Promise<{ success: boolean; error?: string }> => {
      try {
        const { data } = await client.mutate<{
          aibizmodVerifyLoginOtp: {
            token: string;
            userId: string;
            email: string;
            firstName?: string;
            lastName?: string;
            role?: string;
            domain?: string;
          };
        }>({
          mutation: VERIFY_LOGIN_OTP,
          variables: {
            email: email.toLowerCase().trim(),
            otp: otp.trim(),
          },
        });

        const result = data?.aibizmodVerifyLoginOtp;
        if (!result?.token || !result?.userId) {
          return { success: false, error: "Invalid response from server." };
        }

        const userObj: AibizmodUser = {
          userId: result.userId,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          domain: result.domain,
          role: result.role,
        };

        persist(result.token, userObj);
        return { success: true };
      } catch (err: unknown) {
        const graphQLError =
          err && typeof err === "object" && "graphQLErrors" in err
            ? (err.graphQLErrors as Array<{ message?: string }>)?.[0]?.message
            : undefined;
        const error =
          graphQLError ||
          (err instanceof Error ? err.message : "Invalid or expired OTP.");
        return { success: false, error };
      }
    },
    [persist]
  );

  const logout = useCallback(() => {
    clear();
  }, [clear]);

  // Fetch full user profile when token changes (e.g. after login or page reload)
  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    client
      .query<{ aibizmodMe: AibizmodUser }>({ query: GET_ME })
      .then(({ data }) => {
        if (cancelled || !data?.aibizmodMe) return;
        const me = data.aibizmodMe;
        const updatedUser: AibizmodUser = {
          userId: me.userId,
          email: me.email,
          firstName: me.firstName,
          lastName: me.lastName,
          companyName: me.companyName,
          domain: me.domain,
          role: me.role,
          status: me.status,
          emailVerified: me.emailVerified,
          lastLoginAt: me.lastLoginAt,
        };
        setUser(updatedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        }
      })
      .catch((err) => {
        console.error("[AibizmodAuth] Failed to fetch /me:", err);
        // If token is invalid, log out
        const graphQLError =
          err && typeof err === "object" && "graphQLErrors" in err
            ? (err.graphQLErrors as Array<{ message?: string }>)?.[0]?.message
            : undefined;
        if (graphQLError?.toLowerCase().includes("unauthorized")) {
          clear();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, clear]);

  return (
    <AibizmodAuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        requestOtp,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AibizmodAuthContext.Provider>
  );
}

export function useAibizmodAuth(): AibizmodAuthContextValue {
  const context = useContext(AibizmodAuthContext);
  if (!context) {
    throw new Error(
      "useAibizmodAuth must be used within an AibizmodAuthProvider"
    );
  }
  return context;
}

export function getAibizmodToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAibizmodUser(): AibizmodUser | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(USER_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}
