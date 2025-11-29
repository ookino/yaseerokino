import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type * as React from "react";
import { Button } from "./ui/button";

interface ProjectRowProps {
    projectInital?: string;
    year: string | number;
    clientLabel: string;
    techStack: string;
    dateFinished: string;
    index?: string | number;
    className?: string;
    showImage?: boolean;
    image: {
        url: string;
        height?: string;
        width?: string;
    };
}

export const ProjectRow: React.FC<ProjectRowProps> = ({
    projectInital = "T",
    year,
    clientLabel,
    techStack,
    dateFinished,
    index = 1,
    className = "",
    showImage = true,
    image,
}) => {
    return (
        <div className={` ${className} group`}>
            <div className="hidden md:grid md:grid-cols-10 border-b gap-4 py-4">
                <div className="m-0 p-0 leading-none font-doto text-8xl font-bold">
                    {projectInital}
                </div>

                <div className="text-xs font-mono">
                    <p>
                        <span className="text-muted-foreground">YR:</span>{" "}
                        <span className="font-bold"> {year}</span>
                    </p>
                </div>

                <div className=" md:col-span-3 lg:col-span-2 space-y-2 font-mono text-xs uppercase">
                    <p>
                        <span className="text-muted-foreground">CL:</span>{" "}
                        <span className="font-bold">{clientLabel}</span>
                    </p>

                    <p>
                        <span className="text-muted-foreground">TS:</span>{" "}
                        <span className="font-bold"> {techStack}</span>
                    </p>

                    <p>
                        <span className="text-muted-foreground">DF:</span>{" "}
                        <span className="font-bold"> {dateFinished}</span>
                    </p>
                </div>

                {/* Spacer columns to get the poster-style layout */}
                <div />
                <div />

                <div className="text-xs font-mono  flex flex-col gap-4 items-end">
                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        className="rounded-none uppercase text-[11px] font-bold w-fit"
                    >
                        view <ArrowUpRight />
                    </Button>

                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        className="rounded-none uppercase text-[11px] font-bold w-fit"
                    >
                        case <ArrowRight />
                    </Button>
                </div>

                {showImage && (
                    <div className="col-span-2 space-y-2 font-mono text-xs uppercase hidden lg:block">
                        <div className="group">
                            <div
                                className="
                                   relative overflow-hidden bg-stone-950 dark:bg-stone-300 rounded-xs
                                   transition-all duration-500 ease-out
                                   h-24 group-hover:h-[250px]
                                   flex items-center justify-center w-full
                                    "
                            >
                                <Image
                                    alt={clientLabel}
                                    className=" dark:invert h-4 md:h-6"
                                    width={
                                        image.width
                                            ? Number(image.width)
                                            : undefined
                                    }
                                    height={
                                        image.height
                                            ? Number(image.height)
                                            : undefined
                                    }
                                    src={image.url}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="font-doto text-8xl font-bold justify-end hidden lg:flex">
                    {index}
                </div>
            </div>

            {/* Mobile layout (<md) */}
            <div className="grid grid-cols-6 border-b gap-4 py-4 md:hidden">
                {/* Year */}
                <div className="text-xs font-mono col-span-2 font-bold">
                    <p>{year}</p>
                </div>

                {/* Meta block: client / tech stack / dateFinished */}
                <div className="col-span-4 space-y-2 font-mono text-xs uppercase">
                    <p>
                        <span className="text-muted-foreground">CL:</span>{" "}
                        <span className="font-bold">{clientLabel}</span>
                    </p>

                    <p>
                        <span className="text-muted-foreground">TS:</span>{" "}
                        <span className="font-bold"> {techStack}</span>
                    </p>

                    <p>
                        <span className="text-muted-foreground">DF:</span>{" "}
                        <span className="font-bold"> {dateFinished}</span>
                    </p>
                </div>

                {/* Small index */}
                <div className="text-xs font-mono  flex flex-col gap-4  col-span-2">
                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        className="rounded-none uppercase text-[11px] font-bold w-fit"
                    >
                        view <ArrowUpRight />
                    </Button>

                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        className="rounded-none uppercase text-[11px] font-bold w-fit"
                    >
                        case <ArrowRight />
                    </Button>
                </div>

                {/* Image box (mobile always shows it if showImage=true) */}
                {showImage && (
                    <div className="col-span-4 space-y-2 font-mono text-xs uppercase">
                        <div className="aspect-281/210 relative overflow-hidden bg-stone-950 dark:bg-stone-300 flex justify-center items-center  rounded-xs">
                            <Image
                                alt={clientLabel}
                                className=" dark:invert h-4"
                                width={
                                    image.width
                                        ? Number(image.width)
                                        : undefined
                                }
                                height={
                                    image.height
                                        ? Number(image.height)
                                        : undefined
                                }
                                src={image.url}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
