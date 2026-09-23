import BrandAuditPage, { metadata } from "@/app/tools/brand-audit/page";

export { metadata };

export default function BrandAuditPageWrapper() {
  return (
    <>
      <link rel="canonical" href="https://aibizmod.com/tools/brand-audit" />
      <BrandAuditPage />
    </>
  );
}
