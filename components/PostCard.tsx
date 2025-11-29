// components/PostCard.tsx
import Link from "next/link";
import type { PostCard as PostCardType } from "@/sanity/lib/types";

interface PostCardProps {
    post: PostCardType;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

export function PostCard({ post }: PostCardProps) {
    const hasCategories = post.categories && post.categories.length > 0;

    return (
        <Link href={`/journal/${post.slug}`}>
            <article className="group gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border hover:border-border transition-colors duration-500 cursor-pointer">
                <div className="space-y-3">
                    {/* Meta row: date, categories, featured */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-muted-foreground">
                        <span>{formatDate(post.publishedAt)}</span>

                        {hasCategories && (
                            <span className="hidden sm:inline">•</span>
                        )}

                        {hasCategories && (
                            <span>
                                {post
                                    .categories!.slice(0, 3)
                                    .map((cat) => cat.title)
                                    .join(" • ")}
                            </span>
                        )}

                        {post.featured && (
                            <span className="px-2 py-1 text-[0.65rem] font-semibold rounded border border-muted-foreground/40 text-muted-foreground group-hover:text-foreground group-hover:border-foreground/60 transition-colors duration-500">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-medium group-hover:text-foreground transition-colors duration-500">
                        {post.title}
                    </h3>

                    {/* Optional: if you later add an excerpt field to posts, render it here */}
                    {/* <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
            {post.excerpt}
          </p> */}
                </div>
            </article>
        </Link>
    );
}
