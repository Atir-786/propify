import type { MetadataRoute } from "next";
import connectDB from "@/lib/db";
import { Property } from "@/models/Property";

export const revalidate = 3600;

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();
  const properties = await Property.find({}, { _id: 1, createdAt: 1 }).lean();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/login`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/register`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p: any) => ({
    url: `${baseUrl}/property/${p._id}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
