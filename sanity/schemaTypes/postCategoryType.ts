import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const postCategoryType = defineType({
    name: "postCategory",
    title: "Category",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Category name",
            type: "string",
            validation: (Rule) => Rule.required().min(2),
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
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "description",
        },
        prepare({ title, subtitle }) {
            return {
                title: title || "Untitled category",
                subtitle,
                media: TagIcon,
            };
        },
    },
    orderings: [
        {
            title: "Name A–Z",
            name: "titleAsc",
            by: [{ field: "title", direction: "asc" }],
        },
    ],
});
