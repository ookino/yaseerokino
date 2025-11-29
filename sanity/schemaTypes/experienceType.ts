import { PackageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const experienceType = defineType({
    name: "experience",
    title: "Experience",
    type: "document",
    icon: PackageIcon,
    fields: [
        defineField({
            name: "role",
            title: "Role / Job Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "company",
            title: "Company / Organization",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            description: "e.g., Dundee, Scotland (Remote)",
        }),
        defineField({
            name: "employmentType",
            title: "Employment Type",
            type: "string",
            options: {
                list: [
                    { title: "Full-time", value: "full-time" },
                    { title: "Part-time", value: "part-time" },
                    { title: "Contract", value: "contract" },
                    { title: "Freelance", value: "freelance" },
                    { title: "Internship", value: "internship" },
                ],
            },
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "date",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "date",
            description: "Leave empty if currently working here",
            validation: (Rule) =>
                Rule.custom((endDate, context) => {
                    const doc = (context as any).document;
                    const current = doc?.current;
                    const startDate = doc?.startDate;

                    if (!current && !endDate) {
                        return "Provide an end date or mark as current.";
                    }

                    if (startDate && endDate && startDate > endDate) {
                        return "End date must be after start date.";
                    }

                    return true;
                }),
        }),
        defineField({
            name: "current",
            title: "Currently Working Here",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            description:
                "Short summary, responsibilities, impact, key achievements",
        }),
        defineField({
            name: "logo",
            title: "Company Logo",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "role",
            company: "company",
            media: "logo",
            current: "current",
        },
        prepare({ title, company, media, current }) {
            return {
                title: title || "Untitled role",
                subtitle: company
                    ? current
                        ? `${company} • Current`
                        : company
                    : current
                      ? "Current"
                      : "",
                media,
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
            title: "Start Date, Newest first",
            name: "startDateDesc",
            by: [{ field: "startDate", direction: "desc" }],
        },
    ],
});
