import { MetadataRoute } from "next";
import { getProjects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://syeddawood.com";

    // Static Routes
    const routes = ["", "/about", "/projects", "/resume", "/contact"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic Routes
    const projects = getProjects().map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...routes, ...projects];
}
