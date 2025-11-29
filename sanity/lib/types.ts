// lib/sanity/types.ts

// ---------- Shared basics ----------

export interface SanityImageAsset {
    _id: string;
    url?: string;
    metadata: {
        dimensions: {
            height: string;
            width: string;
        };
    };
    // keep open so you can pass through metadata if needed
    [key: string]: unknown;
}

export interface SanityImage {
    alt?: string | null;
    asset: SanityImageAsset;
}

export interface SlugValue {
    current: string;
}

// Generic pagination wrapper for list queries
export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ---------- Categories ----------

export interface ProjectCategory {
    _id: string;
    _type: "projectCategory";
    title: string;
    slug: string;
    description?: string;
    // if you kept the extended fields:
    color?: string;
    icon?: string;
    order?: number;
    featured?: boolean;
}

export interface PostCategory {
    _id: string;
    _type: "postCategory";
    title: string;
    slug: string;
    description?: string;
}

// ---------- Projects ----------

export type ProjectTypeValue =
    | "client"
    | "personal"
    | "open-source"
    | "freelance";

export type ProjectStatusValue = "completed" | "in-progress";

export interface ProjectLinks {
    live?: string | null;
    github?: string | null;
}

export interface ProjectCard {
    _id: string;
    _type: "project";
    title: string;
    slug: string; // from "slug": slug.current
    shortDescription: string;
    projectType: ProjectTypeValue;
    status?: ProjectStatusValue;
    featured?: boolean;
    order?: number | null;
    publishedAt: string; // ISO datetime string
    technologies?: string[];
    categories?: ProjectCategory[];
    logo: SanityImage | null;
    featuredImage?: SanityImage | null;
    links?: ProjectLinks;
}

export interface ProjectDetail extends ProjectCard {
    // caseStudy as Portable Text; if you use @portabletext/types, swap to that
    caseStudy?: unknown; // or PortableTextBlock[]
    // optional gallery if you project it in the detail query
    gallery?: {
        alt?: string;
        caption?: string;
        asset: SanityImageAsset;
    }[];
}

// Filters for the “all projects with filtering” query

export interface ProjectFilters {
    categorySlug?: string;
    projectType?: ProjectTypeValue;
    technology?: string;
    search?: string;
    page?: number;
    pageSize?: number;
}

// Result shape for getProjectsWithFilters

export type ProjectsWithFiltersResult = PaginatedResult<ProjectCard>;

// ---------- Posts / Journal ----------

export interface PostCard {
    _id: string;
    _type: "post";
    title: string;
    slug: string;
    publishedAt: string; // ISO datetime
    mainImage?: SanityImage | null;
    categories?: PostCategory[];
    featured?: boolean; // if you add this field in the schema
}

export interface PostDetail extends PostCard {
    body: unknown; // or PortableTextBlock[]
}

// Filters for “all blog posts with search + pagination”

export interface PostFilters {
    categorySlug?: string;
    search?: string;
    page?: number;
    pageSize?: number;
}

export type PostsWithSearchResult = PaginatedResult<PostCard>;

// ---------- Experience / Education / Certifications ----------

export interface Experience {
    _id: string;
    _type: "experience";
    role: string;
    company: string;
    location?: string;
    employmentType?:
        | "full-time"
        | "part-time"
        | "contract"
        | "freelance"
        | "internship";
    startDate: string; // ISO date
    endDate?: string | null; // ISO date
    current?: boolean;
    description?: string;
    logo?: SanityImage | null;
    order?: number | null;
}

export interface Education {
    _id: string;
    _type: "education";
    institution: string;
    degree: string;
    field: string;
    startDate: string; // ISO date
    endDate?: string | null; // ISO date
    current?: boolean;
    description?: string;
    grade?: string;
    logo?: SanityImage | null;
    order?: number | null;
}

export interface Certification {
    _id: string;
    _type: "certification";
    name: string;
    issuer: string;
    issueDate: string; // ISO date
    doesNotExpire?: boolean;
    expiryDate?: string | null; // ISO date
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
    logo?: SanityImage | null;
    order?: number | null;
}

// Convenience type for About page query

export interface AboutData {
    experience: Experience[];
    education: Education[];
    certifications: Certification[];
}
