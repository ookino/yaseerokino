import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";
import { ProjectCard } from "./ProjectCard";

type FeaturedProjectsProps = {
    projects: ProjectCardType[];
};

export function FeaturedProjectSection(props: FeaturedProjectsProps) {
    const { projects } = props;

    return (
        <div className="mt-16 md:mt-32 p-6 min-h-[70vh] md:min-h-[80vh] lg:min-h-screen">
            <div>
                <h2 className="font-mono text-sm uppercase font-semibold tracking-tight">
                    Most recent takeoffs
                </h2>
            </div>
            <div className="grid md:grid-cols-2 mt-16 ">
                {projects.map((project) => (
                    <ProjectCard project={project} key={project._id} />
                ))}
            </div>
        </div>
    );
}
