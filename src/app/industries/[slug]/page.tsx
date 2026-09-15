import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IndustryTemplateRenderer from "@/components/industries/templates/IndustryTemplateRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getIndustryBySlug(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/industries/slug/${slug}`, {
      cache: "no-store",
    }).catch(() => null);

    if (!res || !res.ok) return null;
    const json = await res.json();
    if (json && json.success && json.data) {
      if (json.data.status !== "Published") return null;
      return json.data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const industry = await getIndustryBySlug(resolvedParams.slug);

  if (!industry) {
    return {
      title: "Industry Not Found | TaapTi Technologies",
    };
  }

  return {
    title: industry.seoTitle || `${industry.name} Software Engineering Solutions | TaapTi`,
    description: industry.seoDescription || industry.shortDescription,
  };
}

export default async function DynamicIndustryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const industry = await getIndustryBySlug(resolvedParams.slug);

  if (!industry) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main>
        <IndustryTemplateRenderer industry={industry} />
      </main>
      <Footer />
    </>
  );
}
