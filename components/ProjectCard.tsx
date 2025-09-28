// components/ProjectCard.tsx - Minimal project card without year
import Link from "next/link";
import type { FeaturedProject } from "@/sanity/lib/sanity-queries";

interface ProjectCardProps {
    project: FeaturedProject;
}

const getStatusBadgeStyle = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
        case "in-progress":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
        case "on-hold":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
        case "concept":
            return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
};

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug.current}`}>
            <div className="group gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border hover:border-border transition-colors duration-500 cursor-pointer">
                {/* Main Content */}
                <div className="space-y-4">
                    {/* Title and Status/Type */}
                    <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-medium group-hover:text-foreground transition-colors duration-500">
                            {project.title}
                        </h3>

                        <div className="flex items-center gap-4 text-sm flex-wrap">
                            {/* Categories */}
                            <span className="text-muted-foreground font-mono uppercase text-xs">
                                {project.categories
                                    .slice(0, 4)
                                    .map((cat) => cat.title)
                                    .join(" • ")}
                            </span>

                            {/* Status and Type side by side */}
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded font-mono uppercase transition-colors duration-500 ${getStatusBadgeStyle(project.status)}`}
                                >
                                    {project.status.replace("-", " ")}
                                </span>

                                {project.projectType && (
                                    <span className="px-2 py-1 text-xs font-medium rounded font-mono uppercase transition-colors duration-500 border text-muted-foreground">
                                        {project.projectType}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className=" leading-relaxed group-hover:text-foreground/80 transition-colors duration-500">
                        {project.shortDescription}
                    </p>

                    {/* Links Row */}
                    {/* <div className="flex items-center gap-4 text-sm pt-2">
                        {project.links.live && (
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                                Live Demo
                            </span>
                        )}
                        {project.links.github && (
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                                Source Code
                            </span>
                        )}
                        {project.links.design && (
                            <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                                Design Files
                            </span>
                        )}
                    </div> */}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-4 pt-1 font-mono uppercase text-xs">
                        {project.technologies
                            .slice(0, 10)
                            .map((tech, index) => (
                                <span
                                    key={project.slug.current}
                                    className="text-xs text-muted-foreground rounded group-hover:text-foreground/70 transition-colors duration-500"
                                >
                                    {tech.name}
                                </span>
                            ))}
                        {/* {project.technologies.length > 5 && (
                            <span className="text-xs text-muted-foreground rounded group-hover:text-foreground/70 transition-colors duration-500">
                                +{project.technologies.length - 5}
                            </span>
                        )} */}
                    </div>
                </div>
            </div>
        </Link>
    );
}
