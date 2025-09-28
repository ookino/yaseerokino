import type { FeaturedProject } from "@/sanity/lib/sanity-queries";
import { ProjectCard } from "../ProjectCard";

interface FeaturedWorksProps {
    projects: FeaturedProject[];
}

export const SelectedWorks = ({ projects }: FeaturedWorksProps) => {
    return (
        <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <h2 className="text-3xl sm:text-4xl font-light">
                    Selected Work
                </h2>
            </div>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))
            ) : (
                <div className="py-12 text-center">
                    <p className="text-muted-foreground">
                        No featured projects found. Check back soon!
                    </p>
                </div>
            )}
        </div>
    );
};
