import { BookmarkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const certificationType = defineType({
    name: "certification",
    title: "Certification",
    type: "document",
    icon: BookmarkIcon,
    fields: [
        defineField({
            name: "name",
            title: "Certification Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "issuer",
            title: "Issuing Organization",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "issueDate",
            title: "Issue Date",
            type: "date",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "doesNotExpire",
            title: "Does Not Expire",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "expiryDate",
            title: "Expiry Date",
            type: "date",
            description: "Only if this certification expires",
            validation: (Rule) =>
                Rule.custom((expiryDate, context) => {
                    const doc = (context as any).document;
                    const doesNotExpire = doc?.doesNotExpire;
                    const issueDate = doc?.issueDate;

                    if (!doesNotExpire && !expiryDate) {
                        return "Provide an expiry date or mark as 'Does Not Expire'.";
                    }

                    if (issueDate && expiryDate && issueDate > expiryDate) {
                        return "Expiry date must be after the issue date.";
                    }

                    return true;
                }),
        }),
        defineField({
            name: "credentialId",
            title: "Credential ID",
            type: "string",
        }),
        defineField({
            name: "credentialUrl",
            title: "Credential URL",
            type: "url",
            description: "Verification link or badge URL",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            description: "Optional: context, skills, or topics covered",
        }),
        defineField({
            name: "logo",
            title: "Issuer Logo",
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
            title: "name",
            issuer: "issuer",
            media: "logo",
            doesNotExpire: "doesNotExpire",
            expiryDate: "expiryDate",
        },
        prepare({ title, issuer, media, doesNotExpire, expiryDate }) {
            const expiryLabel = doesNotExpire
                ? "No expiry"
                : expiryDate
                  ? `Expires ${expiryDate}`
                  : "";

            return {
                title: title || "Untitled certification",
                subtitle: issuer
                    ? expiryLabel
                        ? `${issuer} • ${expiryLabel}`
                        : issuer
                    : expiryLabel,
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
            title: "Issue Date, Newest first",
            name: "issueDateDesc",
            by: [{ field: "issueDate", direction: "desc" }],
        },
    ],
});
