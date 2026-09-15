import { notFound } from "next/navigation";
import ServiceTemplateRenderer from "@/components/services/templates/ServiceTemplateRenderer";
import { Metadata } from "next";

async function fetchServiceBySlug(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/services/slug/${slug}`, {
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

  return <ServiceTemplateRenderer service={service} />;
}