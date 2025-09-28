import { client } from "./client";
import { FEATURED_PROJECTS_QUERY } from "./queries";

export interface FeaturedProject {
    _id: string;
    title: string;
    slug: { current: string };
    shortDescription: string;
    featuredImage: {
        asset: {
            _id: string;
            url: string;
            metadata: {
                dimensions: {
                    width: number;
                    height: number;
                };
            };
        };
        alt: string;
    };
    categories: Array<{
        _id: string;
        title: string;
        slug: { current: string };
        color: string;
        icon: string;
    }>;
    status: string;
    projectType: string;
    links: {
        live?: string;
        github?: string;
        design?: string;
    };
    timeline: {
        duration?: string;
    };
    technologies: Array<{
        name: string;
        category: string;
    }>;
    publishedAt: string;
    order?: number;
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
    try {
        const projects = await client.fetch(FEATURED_PROJECTS_QUERY);
        return projects || [];
    } catch (error) {
        console.error("Error fetching featured projects:", error);
        return [];
    }
}
