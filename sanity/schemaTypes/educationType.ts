import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const educationType = defineType({
    name: "education",
    title: "Education",
    type: "document",
    icon: BookIcon,
    fields: [
        defineField({
            name: "institution",
            title: "Institution Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "degree",
            title: "Degree/Certification",
            type: "string",
            description: "e.g., Bachelor of Science, Master's, Certificate",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "field",
            title: "Field of Study",
            type: "string",
            description: "e.g., Computer Science, Web Development",
            validation: (Rule) => Rule.required(),
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
            description: "Leave empty if currently enrolled",
            validation: (Rule) =>
                Rule.custom((endDate, context) => {
                    const doc = (context as any).document;
                    const current = doc?.current;
                    const startDate = doc?.startDate;

                    if (!current && !endDate) {
                        return "Provide an end date or mark as currently enrolled.";
                    }

                    if (startDate && endDate && startDate > endDate) {
                        return "End date must be after start date.";
                    }

                    return true;
                }),
        }),
        defineField({
            name: "current",
            title: "Currently Enrolled",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            description:
                "Additional details, achievements, or relevant coursework",
        }),
        defineField({
            name: "grade",
            title: "Grade/GPA",
            type: "string",
            description: "e.g., 3.8 GPA, First Class Honours",
        }),
        defineField({
            name: "logo",
            title: "Institution Logo",
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
            title: "degree",
            subtitle: "institution",
            media: "logo",
        },
    },
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
        {
            title: "Start Date, New",
            name: "startDateDesc",
            by: [{ field: "startDate", direction: "desc" }],
        },
    ],
});
