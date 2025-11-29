// components/EducationCard.tsx
import type { Education } from "@/sanity/lib/types";

interface EducationCardProps {
    education: Education;
}

const formatMonthYear = (iso: string | undefined | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
    });
};

export function EducationCard({ education }: EducationCardProps) {
    const {
        institution,
        degree,
        field,
        startDate,
        endDate,
        current,
        grade,
        description,
    } = education;

    const start = formatMonthYear(startDate);
    const end = current ? "Present" : formatMonthYear(endDate);
    const dateRange = start && end ? `${start} — ${end}` : start || "";

    return (
        <div className="group gap-4 sm:gap-6 py-6 sm:py-8 border-b border-border hover:border-border transition-colors duration-500">
            <div className="space-y-3">
                {/* Degree + institution */}
                <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-medium group-hover:text-foreground transition-colors duration-500">
                        {degree}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
                        {field} • {institution}
                    </p>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-muted-foreground">
                    {dateRange && <span>{dateRange}</span>}

                    {grade && (
                        <>
                            <span className="hidden sm:inline">•</span>
                            <span>{grade}</span>
                        </>
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
