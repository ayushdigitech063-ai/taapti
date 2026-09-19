import { MetadataRoute } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_LIVE_API_URL || "https://taap-backend.onrender.com";
const baseUrl = "https://taapti.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic pages - fetch all slugs from the API
  let servicePages: MetadataRoute.Sitemap = [];
  let industryPages: MetadataRoute.Sitemap = [];
  let caseStudyPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    // Fetch Services
    const servicesRes = await fetch(`${API_BASE_URL}/api/services`, { next: { revalidate: 3600 } }).catch(() => null);
    if (servicesRes && servicesRes.ok) {
      const servicesData = await servicesRes.json();
      const services = servicesData?.data || servicesData || [];
      servicePages = services
        .filter((s: any) => s.slug)
        .map((s: any) => ({
          url: `${baseUrl}/services/${s.slug}`,
          lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
    }
  } catch { /* silent */ }

  try {
    // Fetch Industries
    const industriesRes = await fetch(`${API_BASE_URL}/api/industries`, { next: { revalidate: 3600 } }).catch(() => null);
    if (industriesRes && industriesRes.ok) {
      const industriesData = await industriesRes.json();
      const industries = industriesData?.data || industriesData || [];
      industryPages = industries
        .filter((i: any) => i.slug)
        .map((i: any) => ({
          url: `${baseUrl}/industries/${i.slug}`,
          lastModified: i.updatedAt ? new Date(i.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
    }
  } catch { /* silent */ }

  try {
    // Fetch Case Studies
    const csRes = await fetch(`${API_BASE_URL}/api/case-studies`, { next: { revalidate: 3600 } }).catch(() => null);
    if (csRes && csRes.ok) {
      const csData = await csRes.json();
      const caseStudies = csData?.data || csData || [];
      caseStudyPages = caseStudies
        .filter((cs: any) => cs.slug)
        .map((cs: any) => ({
          url: `${baseUrl}/case-studies/${cs.slug}`,
          lastModified: cs.updatedAt ? new Date(cs.updatedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
    }
  } catch { /* silent */ }

  try {
    // Fetch Blogs
    const blogsRes = await fetch(`${API_BASE_URL}/api/blogs`, { next: { revalidate: 3600 } }).catch(() => null);
    if (blogsRes && blogsRes.ok) {
      const blogsData = await blogsRes.json();
      const blogs = blogsData?.data || blogsData || [];
      blogPages = blogs
        .filter((b: any) => b.slug)
        .map((b: any) => ({
          url: `${baseUrl}/blog/${b.slug}`,
          lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }));
    }
  } catch { /* silent */ }

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...caseStudyPages,
    ...blogPages,
  ];
}
