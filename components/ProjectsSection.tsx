"use client";

import { format } from "date-fns";
import { useState } from "react";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";
import { Switch } from "./ui/switch";

type Props = {
    projects: ProjectCardType[];
};

export function ProjectSection({ projects }: Props) {
    const [viewType, setViewType] = useState<"list" | "grid">("list");
    return (
        <div className="min-h-screen mt-16 px-6">
            <div>
                <h1 className="text-[50px] lg:text-[100px] leading-tight font-doto uppercase font-bold tracking-tight">
                    .Works
                </h1>
            </div>

            <div className="mt-32">
                <div className="flex justify-between items-center">
                    <h2 className="font-mono font-semibold text-sm uppercase tracking-tight">
                        Relevant Projects
                    </h2>

                    <div className="flex items-center gap-4">
                        <p className="text-xs text-muted-foreground font-semibold font-mono uppercase">
                            list view
                        </p>
                        <Switch
                            checked={viewType === "list"} // ON only when list
                            onCheckedChange={(checked) => {
                                setViewType(checked ? "list" : "grid");
                            }}
                        />
                    </div>
                </div>
                <div className="mt-16">
                    {viewType === "list" ? (
                        <div className="grid border-t">
                            {projects.map((project, _) => (
                                <ProjectRow
                                    key={project._id}
                                    projectInital={project.title.charAt(0)}
                                    year={format(
                                        new Date(project.publishedAt),
                                        "yyyy",
                                    )}
                                    clientLabel={project.title}
                                    techStack={
                                        project.technologies?.join(" / ") ?? ""
                                    }
                                    dateFinished={format(
                                        new Date(project.publishedAt),
                                        "MM / yy",
                                    )}
                                    index={_ + 1}
                                    showImage={true}
                                    image={{
                                        url: project.logo?.asset.url ?? "",
                                        width: project.logo?.asset.metadata
                                            .dimensions.width,
                                        height: project.logo?.asset.metadata
                                            .dimensions.width,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project._id}
                                    project={project}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
