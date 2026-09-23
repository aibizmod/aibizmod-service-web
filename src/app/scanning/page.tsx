import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

import ScanningClient from "./ScanningClient";

export default function ScanningPage() {
  return <ScanningClient />;
}