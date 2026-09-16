import { notFound } from "next/navigation";
import ServiceTemplateRenderer from "@/components/services/templates/ServiceTemplateRenderer";
import { Metadata } from "next";

import { API_BASE_URL } from "@/utils/api";

async function fetchServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services/slug/${slug}`, {
      next: { revalidate: 10 },
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    /* silent */
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service || service.status === "Draft") {
    return {
      title: "Service Not Found | TaapTi Technologies",
    };
  }

  return {
    title: service.seoTitle || `${service.name} | TaapTi Technologies`,
    description: service.seoDescription || service.shortDescription,
  };
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);

  if (!service || service.status === "Draft") {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#FAFCFF" }}>
        <ServiceTemplateRenderer service={service} />
      </main>
      <Footer />
    </>
  );
}