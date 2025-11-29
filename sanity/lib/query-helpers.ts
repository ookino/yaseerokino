import { client } from "./client"; // your configured Sanity client
import {
    CERTIFICATIONS_QUERY,
    EDUCATION_QUERY,
    EXPERIENCE_QUERY,
    FEATURED_POSTS_QUERY,
    FEATURED_PROJECTS_QUERY,
    FILTERED_POSTS_COUNT_QUERY,
    FILTERED_POSTS_QUERY,
    FILTERED_PROJECTS_COUNT_QUERY,
    FILTERED_PROJECTS_QUERY,
    HOME_QUERY,
    POST_BY_SLUG_QUERY,
    PROJECT_BY_SLUG_QUERY,
} from "./queries";
import type {
    Certification,
    Education,
    Experience,
    PostCard,
    ProjectCard,
} from "./types";

export async function getFeaturedProjects(limit = 4) {
    return client.fetch(FEATURED_PROJECTS_QUERY, { limit });
}

type ProjectFilters = {
    categorySlug?: string;
    projectType?: string;
    technology?: string;
    search?: string;
    page?: number;
    pageSize?: number;
};

export async function getProjectsWithFilters({
    categorySlug,
    projectType,
    technology,
    search,
    page = 1,
    pageSize = 9,
}: ProjectFilters) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const searchParam = search ? `${search}*` : undefined;

    const params = {
        categorySlug,
        projectType,
        technology,
        search: searchParam,
        offset,
        limit,
    };

    const [items, total] = await Promise.all([
        client.fetch(FILTERED_PROJECTS_QUERY, params),
        client.fetch(FILTERED_PROJECTS_COUNT_QUERY, params),
    ]);

    return {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };
}

export async function getFeaturedPosts(limit = 3) {
    return client.fetch(FEATURED_POSTS_QUERY, { limit });
}

type PostFilters = {
    categorySlug?: string;
    search?: string;
    page?: number;
    pageSize?: number;
};

export async function getPostsWithSearch({
    categorySlug,
    search,
    page = 1,
    pageSize = 10,
}: PostFilters) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
    const searchParam = search ? `${search}*` : undefined;

    const params = {
        categorySlug,
        search: searchParam,
        offset,
        limit,
    };

    const [items, total] = await Promise.all([
        client.fetch(FILTERED_POSTS_QUERY, params),
        client.fetch(FILTERED_POSTS_COUNT_QUERY, params),
    ]);

    return {
        items,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
    };
}

export async function getProjectBySlug(slug: string) {
    return client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
}

export async function getPostBySlug(slug: string) {
    return client.fetch(POST_BY_SLUG_QUERY, { slug });
}

export async function getAboutData() {
    const [experience, education, certifications] = await Promise.all([
        client.fetch(EXPERIENCE_QUERY),
        client.fetch(EDUCATION_QUERY),
        client.fetch(CERTIFICATIONS_QUERY),
    ]);

    return { experience, education, certifications };
}

export async function getHome() {
    const data = await client.fetch<{
        featuredProjects: ProjectCard[];
        latestPosts: PostCard[];
        experiencePreview: Experience[];
        educationPreview: Education[];
        certificationsPreview: Certification[];
    }>(HOME_QUERY);

    return data;
}
