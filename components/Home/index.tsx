import { getFeaturedProjects } from "@/sanity/lib/sanity-queries";

import { HomeIntro } from "./Intro";
import { SelectedWorks } from "./SelectedWorks";

export const HomeView = async () => {
    const featuredProjects = await getFeaturedProjects();
    console.log(featuredProjects);
    return (
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-16">
            <HomeIntro />
            <SelectedWorks projects={featuredProjects} />
        </div>
    );
};

// export const revalidate = 60;
