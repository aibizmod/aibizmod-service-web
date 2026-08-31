import type { Metadata } from "next";
import GlowyWavesDemo from "@/components/ui/glowy-waves-hero-demo";

export const metadata: Metadata = {
  title: "Glowy Waves Hero Demo | aibizmod",
  description: "Reactive canvas hero with interactive luminous glowing waves.",
};

export default function GlowyWavesDemoPage() {
  return <GlowyWavesDemo />;
}
