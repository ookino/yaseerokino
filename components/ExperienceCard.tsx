// components/ExperienceCard.tsx
import type { Experience } from "@/sanity/lib/types";

interface ExperienceCardProps {
    experience: Experience;
}

const formatMonthYear = (iso: string | undefined | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
    });
};

const formatEmploymentType = (
    type: Experience["employmentType"],
): string | undefined => {
    if (!type) return undefined;
    return type
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
};

export function ExperienceCard({ experience }: ExperienceCardProps) {
    const {
        role,
        company,
        location,
        employmentType,
        startDate,
        endDate,
        current,
        description,
    } = experience;

    const start = formatMonthYear(startDate);
    const end = current ? "Present" : formatMonthYear(endDate);
    const dateRange = start && end ? `${start} — ${end}` : start || "";

    const employmentTypeLabel = formatEmploymentType(employmentType);

    return (
        <div className="group gap-4 sm:gap-6 py-6 sm:py-8 border-b border-border hover:border-border transition-colors duration-500">
            <div className="space-y-3">
                {/* Top row: role + company */}
                <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-medium group-hover:text-foreground transition-colors duration-500">
                        {role}
                    </h3>
                    {company && (
                        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                            {company}
                        </p>
                    )}
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-muted-foreground">
                    {dateRange && <span>{dateRange}</span>}

                    {(location || employmentTypeLabel) && (
                        <span className="hidden sm:inline">•</span>
                    )}

                    {location && <span>{location}</span>}

                    {employmentTypeLabel && (
                        <span className="px-2 py-1 text-[0.65rem] font-medium rounded border border-muted-foreground/40">
                            {employmentTypeLabel}
                        </span>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
