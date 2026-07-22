"use client";

import { useEffect, useRef, useCallback } from "react";
import { gql } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { useAibizmodAuth } from "@/components/providers/AibizmodAuthProvider";

const CREATE_SESSION = gql`
  mutation CreateAibizmodSession($input: CreateAibizmodSessionInput!) {
    createAibizmodSession(input: $input) {
      sessionId
      userId
      isLogined
      startedAt
      lastActivityAt
    }
  }
`;

const SESSION_HEARTBEAT = gql`
  mutation AibizmodSessionHeartbeat($input: AibizmodSessionHeartbeatInput!) {
    aibizmodSessionHeartbeat(input: $input) {
      sessionId
      lastActivityAt
      totalDurationSeconds
    }
  }
`;

const LINK_SESSION_TO_USER = gql`
  mutation LinkAibizmodSessionToUser($input: LinkAibizmodSessionInput!) {
    linkAibizmodSessionToUser(input: $input) {
      sessionId
      userId
      isLogined
    }
  }
`;

const CREATE_PAGE_VIEW = gql`
  mutation CreateAibizmodPageView($input: CreateAibizmodPageViewInput!) {
    createAibizmodPageView(input: $input) {
      viewId
      sessionId
      userId
      path
      enteredAt
    }
  }
`;

const UPDATE_PAGE_VIEW_DURATION = gql`
  mutation UpdateAibizmodPageViewDuration($input: UpdateAibizmodPageViewInput!) {
    updateAibizmodPageViewDuration(input: $input) {
      viewId
      durationSeconds
      scrollDepthPercent
    }
  }
`;

const CREATE_CLICK = gql`
  mutation CreateAibizmodClick($input: CreateAibizmodClickInput!) {
    createAibizmodClick(input: $input) {
      clickId
      sessionId
      userId
      path
      elementId
      elementText
      clickedAt
    }
  }
`;

const SESSION_KEY = "aibizmod_session_id";
const HEARTBEAT_INTERVAL_MS = 30_000;
const SESSION_DURATION_KEY = "aibizmod_session_duration";

function getSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

function setSessionId(id: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, id);
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  } as Record<string, string>;
}

function getReferrer(): string {
  if (typeof document === "undefined") return "";
  return document.referrer || "";
}

/**
 * Creates or restores a tracking session.
 * Call this once per app mount (e.g. in layout or page).
 */
export function useAibizmodSession() {
  const { isAuthenticated, user } = useAibizmodAuth();
  const sessionIdRef = useRef<string | null>(getSessionId());
  const durationRef = useRef<number>(0);

  // Initialize session
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      let sessionId = sessionIdRef.current;
      const savedDuration = localStorage.getItem(SESSION_DURATION_KEY);
      durationRef.current = savedDuration ? parseInt(savedDuration, 10) || 0 : 0;

      if (!sessionId) {
        try {
          const { data } = await client.mutate<{
            createAibizmodSession: { sessionId: string };
          }>({
            mutation: CREATE_SESSION,
            variables: {
              input: {
                isLogined: isAuthenticated,
                userId: user?.userId || undefined,
                ipAddress: undefined,
                userAgent: navigator.userAgent,
                referrer: getReferrer(),
                ...getUtmParams(),
              },
            },
          });
          sessionId = data?.createAibizmodSession?.sessionId || null;
          if (sessionId) {
            sessionIdRef.current = sessionId;
            setSessionId(sessionId);
          }
        } catch (err) {
          console.error("[AibizmodTracking] Failed to create session:", err);
        }
      }
    };

    init();
  }, [isAuthenticated, user?.userId]);

  // Heartbeat: update session duration every 30s
  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      const sessionId = sessionIdRef.current;
      if (!sessionId) return;

      durationRef.current += HEARTBEAT_INTERVAL_MS / 1000;
      localStorage.setItem(SESSION_DURATION_KEY, String(durationRef.current));

      client.mutate({
        mutation: SESSION_HEARTBEAT,
        variables: {
          input: {
            sessionId,
            totalDurationSeconds: Math.floor(durationRef.current),
          },
        },
      }).catch((err) => {
        console.error("[AibizmodTracking] Heartbeat failed:", err);
      });
    }, HEARTBEAT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  // Link session to user after login
  useEffect(() => {
    const sessionId = sessionIdRef.current;
    if (!isAuthenticated || !user?.userId || !sessionId) return;

    client.mutate({
      mutation: LINK_SESSION_TO_USER,
      variables: { input: { sessionId, userId: user.userId } },
    }).catch((err) => {
      console.error("[AibizmodTracking] Failed to link session:", err);
    });
  }, [isAuthenticated, user?.userId]);

  return { sessionId: sessionIdRef.current };
}

/**
 * Records page views and updates duration/scroll depth.
 * Call this in every page or layout.
 */
export function useAibizmodPageView(pageTitle?: string) {
  const { isAuthenticated, user } = useAibizmodAuth();
  const viewIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sessionId = getSessionId();
    if (!sessionId) return;

    startTimeRef.current = Date.now();

    client
      .mutate<{ createAibizmodPageView: { viewId: string } }>({
        mutation: CREATE_PAGE_VIEW,
        variables: {
          input: {
            sessionId,
            userId: user?.userId || undefined,
            isLogined: isAuthenticated,
            path: window.location.pathname + window.location.search,
            title: pageTitle || document.title,
            referrer: getReferrer(),
          },
        },
      })
      .then(({ data }) => {
        viewIdRef.current = data?.createAibizmodPageView?.viewId || null;
      })
      .catch((err) => {
        console.error("[AibizmodTracking] Failed to record page view:", err);
      });

    // Track scroll depth
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrolled = window.scrollY;
      const percent = Math.min(100, Math.round((scrolled / docHeight) * 100));
      if (percent > scrollDepthRef.current) {
        scrollDepthRef.current = percent;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Update duration on unmount / visibility change
    const updateDuration = () => {
      if (!viewIdRef.current) return;
      const durationSeconds = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      );
      client.mutate({
        mutation: UPDATE_PAGE_VIEW_DURATION,
        variables: {
          input: {
            viewId: viewIdRef.current,
            durationSeconds,
            scrollDepthPercent: scrollDepthRef.current,
          },
        },
      }).catch((err) => {
        console.error("[AibizmodTracking] Failed to update page view:", err);
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updateDuration();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      updateDuration();
    };
  }, [isAuthenticated, user?.userId, pageTitle]);
}

/**
 * Records a click event.
 */
export function useAibizmodClickTracker() {
  const { isAuthenticated, user } = useAibizmodAuth();

  const trackClick = useCallback(
    (payload: {
      elementId?: string;
      elementText?: string;
      elementSelector?: string;
      targetUrl?: string;
      path?: string;
    }) => {
      if (typeof window === "undefined") return;
      const sessionId = getSessionId();
      if (!sessionId) return;

      client
        .mutate({
          mutation: CREATE_CLICK,
          variables: {
            input: {
              sessionId,
              userId: user?.userId || undefined,
              isLogined: isAuthenticated,
              path: payload.path || window.location.pathname + window.location.search,
              elementId: payload.elementId,
              elementText: payload.elementText,
              elementSelector: payload.elementSelector,
              targetUrl: payload.targetUrl,
            },
          },
        })
        .catch((err) => {
          console.error("[AibizmodTracking] Failed to record click:", err);
        });
    },
    [isAuthenticated, user?.userId]
  );

  return { trackClick };
}

/**
 * Global click tracking via data attributes.
 * Add `data-aibizmod-track="button-text"` to any clickable element.
 * Call this once in your root layout or page wrapper.
 */
export function useAibizmodGlobalClickTracking() {
  const { trackClick } = useAibizmodClickTracker();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackable = target.closest<HTMLElement>("[data-aibizmod-track]");
      if (!trackable) return;

      const elementText =
        trackable.getAttribute("data-aibizmod-track") || trackable.innerText?.trim();
      const elementId = trackable.id || undefined;
      const targetUrl =
        trackable.getAttribute("href") || trackable.getAttribute("data-target-url") || undefined;

      trackClick({
        elementId,
        elementText,
        targetUrl,
      });
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [trackClick]);
}
