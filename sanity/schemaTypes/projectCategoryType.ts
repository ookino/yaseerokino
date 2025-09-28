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
            options: {
                source: "title",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            description: "Brief description of this category",
        }),
        defineField({
            name: "color",
            title: "Category Color",
            type: "string",
            description: "Hex color code for category styling (e.g., #3B82F6)",
            validation: (Rule) =>
                Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                    name: "hex",
                    invert: false,
                }).error("Please enter a valid hex color code"),
        }),
        defineField({
            name: "icon",
            title: "Category Icon",
            type: "string",
            description: "Icon name or emoji to represent this category",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
            initialValue: 0,
        }),
        defineField({
            name: "featured",
            title: "Featured Category",
            type: "boolean",
            description: "Show this category prominently",
            initialValue: false,
        }),
        defineField({
            name: "parentCategory",
            title: "Parent Category",
            type: "reference",
            to: { type: "projectCategory" },
            description: "Optional: Create category hierarchy",
            options: {
                filter: "!defined($id) || _id != $id", // Prevent self-reference
            },
        }),
    ],
    preview: {
        select: {
            title: "title",
            description: "description",
            color: "color",
            icon: "icon",
            order: "order",
        },
        prepare(selection) {
            const { title, description, color, icon, order } = selection;
            const subtitle = description || `Order: ${order || 0}`;

            return {
                title: icon ? `${icon} ${title}` : title,
                subtitle: color ? `${subtitle} • ${color}` : subtitle,
                media: TagIcon,
            };
        },
    },
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
        {
            title: "Name A-Z",
            name: "titleAsc",
            by: [{ field: "title", direction: "asc" }],
        },
    ],
});
