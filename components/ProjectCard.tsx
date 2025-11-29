// components/ProjectCard.tsx - Minimal project card

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";
import { Button } from "./ui/button";

interface ProjectCardProps {
    project: ProjectCardType;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <div key={project.title}>
                <div className="aspect-[281/210]  relative overflow-hidden bg-stone-950 dark:bg-stone-300 flex justify-center items-center">
                    {project.logo?.asset.url ? (
                        <Image
                            alt={project.logo.alt || project.title}
                            className=" dark:invert h-6 md:h-8 lg:h-10"
                            width={
                                project.logo.asset.metadata.dimensions.width
                                    ? Number(
                                          project.logo.asset.metadata.dimensions
                                              .width,
                                      )
                                    : undefined
                            }
                            height={
                                project.logo.asset.metadata.dimensions.height
                                    ? Number(
                                          project.logo.asset.metadata.dimensions
                                              .height,
                                      )
                                    : undefined
                            }
                            src={project.logo.asset.url}
                        />
                    ) : null}
                </div>
                <div className="flex items-center gap-8 md:gap-6 lg:gap-20 font-mono text-sm uppercase  py-4 border-b">
                    <span className="text-sm font-semibold tracking-tight">
                        2023
                    </span>

                    <span className="flex-1 text-sm font-semibold tracking-tight ">
                        {project.title}
                    </span>

                    <div className="gap-2 flex">
                        <Button
                            variant={"secondary"}
                            size={"icon"}
                            className="rounded-none uppercase text-xs font-medium"
                        >
                            <ArrowUpRight />
                        </Button>
                    </div>
                    {/* Right: pill button */}
                </div>
            </div>
        </Link>
    );
}
