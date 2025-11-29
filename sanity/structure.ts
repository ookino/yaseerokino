import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
    S.list()
        .title("Content")
        .items([
            // Projects
            S.documentTypeListItem("project").title("Projects"),

            S.divider(),

            // About section: Experience, Education, Certifications
            S.listItem()
                .title("About")
                .child(
                    S.list()
                        .title("About")
                        .items([
                            S.documentTypeListItem("experience").title(
                                "Experience",
                            ),
                            S.documentTypeListItem("education").title(
                                "Education",
                            ),
                            S.documentTypeListItem("certification").title(
                                "Certifications",
                            ),
                        ]),
                ),

            S.divider(),

            // Journal / Blog
            S.documentTypeListItem("post").title("Journal"),

            S.divider(),

            // Categories
            S.listItem()
                .title("Categories")
                .child(
                    S.list()
                        .title("Categories")
                        .items([
                            S.documentTypeListItem("projectCategory").title(
                                "Project Categories",
                            ),
                            S.documentTypeListItem("postCategory").title(
                                "Blog Categories",
                            ),
                        ]),
                ),

            // Everything else (settings, misc docs, etc.)
            ...S.documentTypeListItems().filter((item) => {
                const id = item.getId();
                return (
                    id &&
                    ![
                        "project",
                        "experience",
                        "education",
                        "certification",
                        "post",
                        "projectCategory",
                        "postCategory",
                    ].includes(id)
                );
            }),
        ]);
