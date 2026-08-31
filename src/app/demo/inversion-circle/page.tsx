import InversionCircleScrollAnimation from '@/components/ui/inversion-circle-scroll-animation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inversion Circle Scroll Animation Demo',
  description: 'Full-screen scroll-driven color inversion circle animation preview',
};

export default function InversionCircleDemoPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <InversionCircleScrollAnimation />
    </main>
  );
}
