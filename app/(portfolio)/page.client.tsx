"use client";

import { useEffect, useRef, useState } from "react";
import { EducationCard } from "@/components/EducationCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { FeaturedProjectSection } from "@/components/FeaturedProjects";
import { HomeIntro } from "@/components/HomeIntro";
import { PostCard } from "@/components/PostCard";
import { ProjectSection } from "@/components/ProjectsSection";
import { getHome } from "@/sanity/lib/query-helpers";
import type {
    Certification,
    Education,
    Experience,
    PostCard as PostCardType,
    ProjectCard as ProjectCardType,
} from "@/sanity/lib/types";

type HomeData = {
    featuredProjects: ProjectCardType[];
    latestPosts: PostCardType[];
    experiencePreview: Experience[];
    educationPreview: Education[];
    certificationsPreview: Certification[];
};

export default function HomePageClient() {
    const [data, setData] = useState<HomeData | null>(null);
    const [progress, setProgress] = useState(0);
    const [showContent, setShowContent] = useState(false); // start crossfade
    const [hideLoader, setHideLoader] = useState(false); // unmount loader after fade

    const startTimeRef = useRef<number | null>(null);
    const minDuration = 1500; // minimum loader time in ms
    const fadeDuration = 1000; // crossfade duration in ms

    // Fetch data once on mount
    useEffect(() => {
        let isMounted = true;
        startTimeRef.current = performance.now();

        (async () => {
            const result = await getHome();
            if (!isMounted) return;
            setData(result);
        })();

        return () => {
            isMounted = false;
        };
    }, []);

    // Progress controller: speeds up / slows down based on data readiness
    useEffect(() => {
        if (showContent) return;

        const interval = window.setInterval(() => {
            setProgress((prev) => {
                // No data yet: quickly go to ~70, then slow towards 90, then hold
                if (!data) {
                    if (prev < 70) return Math.min(prev + 5, 70);
                    if (prev < 90) return Math.min(prev + 1, 90);
                    return prev; // clamp at 90 until data arrives
                }

                // Data is ready: smoothly go from current to 100
                if (prev < 100) {
                    return Math.min(prev + 5, 100);
                }

                return prev;
            });
        }, 80);

        return () => {
            window.clearInterval(interval);
        };
    }, [data, showContent]);

    // Decide when to start crossfade from loader to content
    useEffect(() => {
        if (!data) return;
        if (progress < 100) return;
        if (showContent) return;

        const start = startTimeRef.current ?? performance.now();
        const elapsed = performance.now() - start;
        const remaining = Math.max(minDuration - elapsed, 0);

        let showTimeout: number | undefined;
        let hideTimeout: number | undefined;

        showTimeout = window.setTimeout(() => {
            // Start crossfade: show content & fade out loader
            setShowContent(true);

            // After fade duration, actually unmount the loader
            hideTimeout = window.setTimeout(() => {
                setHideLoader(true);
            }, fadeDuration);
        }, remaining);

        return () => {
            if (showTimeout) window.clearTimeout(showTimeout);
            if (hideTimeout) window.clearTimeout(hideTimeout);
        };
    }, [data, progress, showContent]);

    const {
        featuredProjects = [],
        latestPosts = [],
        experiencePreview = [],
        educationPreview = [],
        certificationsPreview = [],
    } = data || {};
    console.log("FT PROJECTS", featuredProjects);
    return (
        <div className="relative">
            {/* Loader overlay (full screen, crossfades out) */}
            {!hideLoader && (
                <div
                    className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background transition-opacity duration-500 ${
                        showContent
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                    }`}
                >
                    <div className="text-[150px] md:text-[250px] lg:text-[350px] xl:text-[450px] font-semibold tabular-nums font-doto">
                        {progress}%
                    </div>

                    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent">
                        <div className="flex gap-[4px]">
                            {Array.from({ length: 30 }).map((_, i) => {
                                const filled = (progress / 100) * 30 > i;
                                return (
                                    <div
                                        /* biome-ignore lint/suspicious/noArrayIndexKey: static segmented loader, order never changes */
                                        key={i}
                                        className={`h-2 flex-1 transition-colors duration-150 ${
                                            filled
                                                ? "bg-foreground"
                                                : "bg-muted"
                                        }`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Main content (fades in when showContent = true) */}
            {showContent && data && (
                <div className="opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                    <HomeIntro />
                    <FeaturedProjectSection projects={featuredProjects} />
                    <ProjectSection projects={featuredProjects} />
                    {latestPosts.length > 0 && (
                        <section className="mt-16 space-y-6">
                            <header className="space-y-2">
                                <h2 className="text-lg font-semibold tracking-tight">
                                    Journal
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Notes on design, engineering, and things
                                    I&apos;m exploring.
                                </p>
                            </header>

                            <div className="divide-y divide-border">
                                {latestPosts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Background: Experience / Education / Certifications */}
                    {(experiencePreview.length > 0 ||
                        educationPreview.length > 0 ||
                        certificationsPreview.length > 0) && (
                        <section className="mt-16 space-y-10">
                            <header className="space-y-2">
                                <h2 className="text-lg font-semibold tracking-tight">
                                    Background
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    A snapshot of where I&apos;ve been learning
                                    and working recently.
                                </p>
                            </header>

                            <div className="grid gap-10 md:grid-cols-2">
                                {/* Experience column */}
                                {experiencePreview.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                            Experience
                                        </h3>
                                        <div className="divide-y divide-border">
                                            {experiencePreview.map((exp) => (
                                                <ExperienceCard
                                                    key={exp._id}
                                                    experience={exp}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-10">
                                    {/* Education */}
                                    {educationPreview.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                                Education
                                            </h3>
                                            <div className="divide-y divide-border">
                                                {educationPreview.map((edu) => (
                                                    <EducationCard
                                                        key={edu._id}
                                                        education={edu}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Certifications */}
                                    {certificationsPreview.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                                Certifications
                                            </h3>
                                            <ul className="space-y-3 text-sm">
                                                {certificationsPreview.map(
                                                    (cert) => (
                                                        <li
                                                            key={cert._id}
                                                            className="flex flex-col gap-1 border-b border-border/60 pb-3 last:border-none"
                                                        >
                                                            <span className="font-medium">
                                                                {cert.name}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {cert.issuer}
                                                            </span>
                                                            {cert.credentialUrl && (
                                                                <a
                                                                    href={
                                                                        cert.credentialUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                                                                >
                                                                    View
                                                                    credential
                                                                </a>
                                                            )}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
