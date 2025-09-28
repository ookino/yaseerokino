import { CodeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
    name: "project",
    title: "Portfolio Project",
    type: "document",
    icon: CodeIcon,
    fields: [
        defineField({
            name: "title",
            title: "Project Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            description: "Brief project overview for cards and previews",
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: "caseStudy",
            title: "Case Study",
            type: "object",
            fields: [
                defineField({
                    name: "overview",
                    title: "Project Overview",
                    type: "blockContent",
                    description: "Brief overview of the project and its goals",
                }),
                defineField({
                    name: "problem",
                    title: "Problem Statement",
                    type: "blockContent",
                    description: "What problem were you solving?",
                }),
                defineField({
                    name: "solution",
                    title: "Solution Approach",
                    type: "blockContent",
                    description: "How did you approach solving the problem?",
                }),
                defineField({
                    name: "process",
                    title: "Design/Development Process",
                    type: "blockContent",
                    description: "Step-by-step breakdown of your methodology",
                }),
                defineField({
                    name: "results",
                    title: "Results & Impact",
                    type: "blockContent",
                    description: "Outcomes, metrics, and project impact",
                }),
                defineField({
                    name: "learnings",
                    title: "Key Learnings",
                    type: "blockContent",
                    description:
                        "What did you learn? What would you do differently?",
                }),
            ],
        }),
        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative text",
                }),
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "gallery",
            title: "Project Gallery",
            type: "array",
            of: [
                defineArrayMember({
                    type: "image",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        defineField({
                            name: "alt",
                            type: "string",
                            title: "Alternative text",
                        }),
                        defineField({
                            name: "caption",
                            type: "string",
                            title: "Caption",
                        }),
                    ],
                }),
            ],
        }),
        defineField({
            name: "categories",
            title: "Project Categories",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: { type: "projectCategory" },
                }),
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "technologies",
            title: "Technologies Used",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "name",
                            title: "Technology Name",
                            type: "string",
                        }),
                        defineField({
                            name: "category",
                            title: "Category",
                            type: "string",
                            options: {
                                list: [
                                    {
                                        title: "Frontend Framework",
                                        value: "frontend-framework",
                                    },
                                    {
                                        title: "Backend Framework",
                                        value: "backend-framework",
                                    },
                                    { title: "Database", value: "database" },
                                    {
                                        title: "AI/ML Framework",
                                        value: "ai-ml",
                                    },
                                    {
                                        title: "Testing Framework",
                                        value: "testing",
                                    },
                                    { title: "DevOps Tool", value: "devops" },
                                    {
                                        title: "Design Tool",
                                        value: "design-tool",
                                    },
                                    { title: "Cloud Service", value: "cloud" },
                                    {
                                        title: "Programming Language",
                                        value: "language",
                                    },
                                    { title: "Library", value: "library" },
                                    { title: "Tool", value: "tool" },
                                ],
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            title: "name",
                            subtitle: "category",
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "projectType",
            title: "Project Type",
            type: "string",
            options: {
                list: [
                    { title: "Client Work", value: "client" },
                    { title: "Personal Project", value: "personal" },
                    { title: "Open Source", value: "open-source" },
                    { title: "Freelance", value: "freelance" },
                    { title: "Team Project", value: "team" },
                    { title: "Experiment", value: "experiment" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "status",
            title: "Project Status",
            type: "string",
            options: {
                list: [
                    { title: "Completed", value: "completed" },
                    { title: "In Progress", value: "in-progress" },
                    { title: "On Hold", value: "on-hold" },
                    { title: "Concept", value: "concept" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "featured",
            title: "Featured Project",
            type: "boolean",
            description: "Show this project prominently on portfolio",
            initialValue: false,
        }),
        defineField({
            name: "links",
            title: "Project Links",
            type: "object",
            fields: [
                defineField({
                    name: "live",
                    title: "Live Demo URL",
                    type: "url",
                }),
                defineField({
                    name: "github",
                    title: "GitHub Repository",
                    type: "url",
                }),
                defineField({
                    name: "design",
                    title: "Design Files (Figma, etc.)",
                    type: "url",
                }),
                defineField({
                    name: "case_study",
                    title: "Case Study URL",
                    type: "url",
                }),
            ],
        }),
        defineField({
            name: "client",
            title: "Client Information",
            type: "object",
            fields: [
                defineField({
                    name: "name",
                    title: "Client Name",
                    type: "string",
                }),
                defineField({
                    name: "industry",
                    title: "Industry",
                    type: "string",
                }),
                defineField({
                    name: "testimonial",
                    title: "Client Testimonial",
                    type: "text",
                }),
            ],
        }),
        defineField({
            name: "timeline",
            title: "Project Timeline",
            type: "object",
            fields: [
                defineField({
                    name: "startDate",
                    title: "Start Date",
                    type: "date",
                }),
                defineField({
                    name: "endDate",
                    title: "End Date",
                    type: "date",
                }),
                defineField({
                    name: "duration",
                    title: "Duration",
                    type: "string",
                    description: "e.g., '3 months', '2 weeks'",
                }),
            ],
        }),
        defineField({
            name: "challenges",
            title: "Challenges & Solutions",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "challenge",
                            title: "Challenge",
                            type: "text",
                        }),
                        defineField({
                            name: "solution",
                            title: "Solution",
                            type: "text",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "challenge",
                        },
                        prepare(selection) {
                            return {
                                title:
                                    selection.title?.substring(0, 60) + "...",
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "specialFeatures",
            title: "Special Features",
            type: "array",
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Feature Title",
                            type: "string",
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                        }),
                        defineField({
                            name: "technology",
                            title: "Technology/Tool Used",
                            type: "string",
                        }),
                        defineField({
                            name: "category",
                            title: "Feature Category",
                            type: "string",
                            options: {
                                list: [
                                    {
                                        title: "AI/ML Integration",
                                        value: "ai-ml",
                                    },
                                    {
                                        title: "Performance Optimization",
                                        value: "performance",
                                    },
                                    {
                                        title: "Security Feature",
                                        value: "security",
                                    },
                                    {
                                        title: "Accessibility",
                                        value: "accessibility",
                                    },
                                    { title: "User Experience", value: "ux" },
                                    { title: "Data Processing", value: "data" },
                                    { title: "API Integration", value: "api" },
                                    {
                                        title: "Real-time Feature",
                                        value: "realtime",
                                    },
                                    {
                                        title: "Automation",
                                        value: "automation",
                                    },
                                    {
                                        title: "Custom Solution",
                                        value: "custom",
                                    },
                                ],
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "category",
                        },
                    },
                }),
            ],
            description:
                "Highlight any special or innovative features in this project",
        }),
        defineField({
            name: "metrics",
            title: "Project Metrics",
            type: "object",
            fields: [
                defineField({
                    name: "performance",
                    title: "Performance Improvements",
                    type: "string",
                    description:
                        "e.g., '50% faster loading', '30% increase in conversions'",
                }),
                defineField({
                    name: "users",
                    title: "User Impact",
                    type: "string",
                    description: "e.g., '10k+ users', 'Enterprise solution'",
                }),
                defineField({
                    name: "other",
                    title: "Other Metrics",
                    type: "text",
                }),
            ],
        }),
        defineField({
            name: "publishedAt",
            title: "Published Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "featuredImage",
            categories: "categories",
            status: "status",
        },
        prepare(selection) {
            const { title, media, categories, status } = selection;
            const categoryList = categories?.join(", ") || "No categories";
            return {
                title,
                subtitle: `${status} • ${categoryList}`,
                media,
            };
        },
    },
    orderings: [
        {
            title: "Published Date, New",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
        {
            title: "Published Date, Old",
            name: "publishedAtAsc",
            by: [{ field: "publishedAt", direction: "asc" }],
        },
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
