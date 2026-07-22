"use client";

import { useAibizmodSession, useAibizmodPageView, useAibizmodGlobalClickTracking } from "@/lib/aibizmod-tracking";

export function AibizmodTrackingInit() {
  useAibizmodSession();
  useAibizmodPageView();
  useAibizmodGlobalClickTracking();
  return null;
}
