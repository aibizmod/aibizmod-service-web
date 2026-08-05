import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialMediaPageContent from "@/components/social/SocialMediaPageContent";
import StickyFooterLayout from "@/components/layout/StickyFooterLayout";

export const metadata: Metadata = {
  title: "Social Media Platforms | aibizmod",
  description:
    "A directory of all official and registered aibizmod social media accounts — find and follow us across every platform.",
  openGraph: {
    title: "Social Media Platforms | aibizmod",
    description:
      "A directory of all official and registered aibizmod social media accounts — find and follow us across every platform.",
    url: "/social-media-platforms",
  },
};

export default function SocialMediaPlatformsPage() {
  return (
    <>
      <Navbar />
      <StickyFooterLayout footer={<Footer />}>
        <main>
          <SocialMediaPageContent />
        </main>
      </StickyFooterLayout>
    </>
  );
}
