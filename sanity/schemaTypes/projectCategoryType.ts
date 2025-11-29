import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectCategoryType = defineType({
    name: "projectCategory",
    title: "Project Category",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            title: "Category Name",
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
    ],
    preview: {
        select: { title: "title" },
        prepare({ title }) {
            return {
                title,
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
