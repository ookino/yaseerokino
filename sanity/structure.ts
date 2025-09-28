import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
        .title("Portfolio & Blog")
        .items([
            // Portfolio Section
            S.listItem()
                .title("Portfolio")
                .child(
                    S.list()
                        .title("Portfolio Management")
                        .items([
                            S.documentTypeListItem("project")
                                .title("Projects")
                                .child(
                                    S.documentTypeList("project")
                                        .title("All Projects")
                                        .filter('_type == "project"')
                                        .defaultOrdering([
                                            {
                                                field: "publishedAt",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            S.documentTypeListItem("projectCategory")
                                .title("Project Categories")
                                .child(
                                    S.documentTypeList("projectCategory")
                                        .title("Project Categories")
                                        .filter('_type == "projectCategory"')
                                        .defaultOrdering([
                                            {
                                                field: "order",
                                                direction: "asc",
                                            },
                                        ]),
                                ),
                            S.divider(),
                            // Quick access to featured projects
                            S.listItem()
                                .title("Featured Projects")
                                .child(
                                    S.documentTypeList("project")
                                        .title("Featured Projects")
                                        .filter(
                                            '_type == "project" && featured == true',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "order",
                                                direction: "asc",
                                            },
                                        ]),
                                ),
                            // Projects by status
                            S.listItem()
                                .title("Projects by Status")
                                .child(
                                    S.list()
                                        .title("Project Status")
                                        .items([
                                            S.listItem()
                                                .title("Completed Projects")
                                                .child(
                                                    S.documentTypeList(
                                                        "project",
                                                    )
                                                        .title(
                                                            "Completed Projects",
                                                        )
                                                        .filter(
                                                            '_type == "project" && status == "completed"',
                                                        )
                                                        .defaultOrdering([
                                                            {
                                                                field: "publishedAt",
                                                                direction:
                                                                    "desc",
                                                            },
                                                        ]),
                                                ),
                                            S.listItem()
                                                .title("In Progress")
                                                .child(
                                                    S.documentTypeList(
                                                        "project",
                                                    )
                                                        .title(
                                                            "Projects in Progress",
                                                        )
                                                        .filter(
                                                            '_type == "project" && status == "in-progress"',
                                                        )
                                                        .defaultOrdering([
                                                            {
                                                                field: "publishedAt",
                                                                direction:
                                                                    "desc",
                                                            },
                                                        ]),
                                                ),
                                            S.listItem()
                                                .title("On Hold")
                                                .child(
                                                    S.documentTypeList(
                                                        "project",
                                                    )
                                                        .title(
                                                            "Projects on Hold",
                                                        )
                                                        .filter(
                                                            '_type == "project" && status == "on-hold"',
                                                        )
                                                        .defaultOrdering([
                                                            {
                                                                field: "publishedAt",
                                                                direction:
                                                                    "desc",
                                                            },
                                                        ]),
                                                ),
                                        ]),
                                ),
                        ]),
                ),

            S.divider(),

            // Blog Section
            S.listItem()
                .title("Blog")
                .child(
                    S.list()
                        .title("Blog Management")
                        .items([
                            S.documentTypeListItem("post")
                                .title("Blog Posts")
                                .child(
                                    S.documentTypeList("post")
                                        .title("All Blog Posts")
                                        .filter('_type == "post"')
                                        .defaultOrdering([
                                            {
                                                field: "publishedAt",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            S.documentTypeListItem("postCategory")
                                .title("Blog Categories")
                                .child(
                                    S.documentTypeList("postCategory")
                                        .title("Blog Categories")
                                        .filter('_type == "postCategory"')
                                        .defaultOrdering([
                                            {
                                                field: "title",
                                                direction: "asc",
                                            },
                                        ]),
                                ),
                            S.divider(),
                            // Quick access to draft posts
                            S.listItem()
                                .title("Draft Posts")
                                .child(
                                    S.documentTypeList("post")
                                        .title("Draft Posts")
                                        .filter(
                                            '_type == "post" && !defined(publishedAt)',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "_updatedAt",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                            // Recent posts
                            S.listItem()
                                .title("Recent Posts (Last 30 days)")
                                .child(
                                    S.documentTypeList("post")
                                        .title("Recent Posts")
                                        .filter(
                                            '_type == "post" && publishedAt > dateTime(now()) - 60*60*24*30',
                                        )
                                        .defaultOrdering([
                                            {
                                                field: "publishedAt",
                                                direction: "desc",
                                            },
                                        ]),
                                ),
                        ]),
                ),

            S.divider(),

            // Content Management Section
            S.listItem()
                .title("Content Management")
                .child(
                    S.list()
                        .title("Content & Settings")
                        .items([
                            // All other document types that aren't specifically organized above
                            ...S.documentTypeListItems().filter(
                                (item) =>
                                    item.getId() &&
                                    ![
                                        "post",
                                        "project",
                                        "postCategory",
                                        "projectCategory",
                                        "blockContent",
                                    ].includes(item.getId()!),
                            ),
                        ]),
                ),

            S.divider(),

            // Quick Actions Section
            S.listItem()
                .title("Quick Actions")
                .child(
                    S.list()
                        .title("Quick Actions")
                        .items([
                            S.listItem()
                                .title("Create New Project")
                                .child(
                                    S.documentWithInitialValueTemplate(
                                        "project",
                                        { projectType: "personal" },
                                    ),
                                ),
                            S.listItem()
                                .title("Create New Blog Post")
                                .child(
                                    S.documentWithInitialValueTemplate(
                                        "post",
                                        {},
                                    ),
                                ),
                            S.divider(),
                            S.listItem()
                                .title("All Documents")
                                .child(
                                    S.list()
                                        .title("All Documents by Type")
                                        .items(
                                            S.documentTypeListItems().map(
                                                (item) =>
                                                    item.child(
                                                        S.documentTypeList(
                                                            item.getId()!,
                                                        )
                                                            .title(
                                                                `All ${item.getTitle()}`,
                                                            )
                                                            .defaultOrdering([
                                                                {
                                                                    field: "_updatedAt",
                                                                    direction:
                                                                        "desc",
                                                                },
                                                            ]),
                                                    ),
                                            ),
                                        ),
                                ),
                        ]),
                ),
        ]);
