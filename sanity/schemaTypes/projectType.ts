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
            options: { source: "title" },
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
            name: "client",
            title: "Client",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "caseStudy",
            title: "Case Study",
            type: "blockContent",
            description:
                "Full project case study with problem, solution, process, and results",
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
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
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: { hotspot: true },
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
                    options: { hotspot: true },
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
            name: "technologies",
            title: "Technologies Used",
            type: "array",
            of: [
                defineArrayMember({
                    type: "string",
                    options: {
                        layout: "dropdown",
                        list: [
                            { title: "React", value: "react" },
                            { title: "Next.js", value: "nextjs" },
                            { title: "TypeScript", value: "typescript" },
                            { title: "Tailwind CSS", value: "tailwind" },
                            { title: "Node.js", value: "nodejs" },
                            { title: "Postgres", value: "postgresql" },
                            { title: "MongoDB", value: "mongodb" },
                            { title: "Sanity", value: "sanity" },
                            { title: "Figma", value: "figma" },
                            { title: "Vercel", value: "vercel" },
                            { title: "REST API", value: "rest-api" },
                            { title: "GraphQL", value: "graphql" },
                        ],
                    },
                }),
            ],
            description: "Select technologies, frameworks, and tools used",
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
            ],
            validation: (Rule) =>
                Rule.custom((links) =>
                    !links?.live && !links?.github
                        ? "Provide at least a Live Demo or GitHub link"
                        : true,
                ),
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
            projectType: "projectType",
        },
        prepare(selection) {
            const { title, media, projectType } = selection;
            return {
                title,
                subtitle: projectType,
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
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
