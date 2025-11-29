import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Post",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().min(3),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "mainImage",
            title: "Main Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    type: "string",
                    title: "Alternative text",
                    description: "Describe the image for accessibility",
                }),
            ],
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [
                defineArrayMember({
                    type: "reference",
                    to: { type: "postCategory" },
                }),
            ],
        }),
        defineField({
            name: "featured",
            title: "Featured post",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            validation: (Rule) => Rule.required(),
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "blockContent",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "mainImage",
            publishedAt: "publishedAt",
        },
        prepare({ title, media, publishedAt }) {
            return {
                title: title || "Untitled post",
                subtitle: publishedAt
                    ? new Date(publishedAt).toLocaleDateString()
                    : "Draft",
                media,
            };
        },
    },
    orderings: [
        {
            title: "Published date, Newest first",
            name: "publishedAtDesc",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
        {
            title: "Published date, Oldest first",
            name: "publishedAtAsc",
            by: [{ field: "publishedAt", direction: "asc" }],
        },
    ],
});
