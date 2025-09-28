import { MapPin } from "lucide-react";

export const HomeIntro = () => {
    return (
        <header
            id="intro"
            className="md:min-h-screen flex items-center pt-24 md:pt-0"
        >
            <div className="">
                <div className="">
                    {/* Eyebrow text */}
                    <div className="mb-8 sm:mb-12">
                        <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider uppercase">
                            Solutions Architect | Portfolio - 2025
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="space-y-8 sm:space-y-12">
                        {/* Hero heading */}
                        <div className="space-y-6">
                            <h1 className="text-5xl sm:text-6xl  font-light tracking-tight leading-none">
                                Yaseer{" "}
                                <span className="text-muted-foreground">
                                    Okino
                                </span>
                            </h1>

                            <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-4xl">
                                End-to-end digital solutions architect crafting
                                complete experiences from{" "}
                                <span className="text-foreground font-medium">
                                    initial concepts
                                </span>{" "}
                                to{" "}
                                <span className="text-foreground font-medium">
                                    live systems
                                </span>
                                , combining{" "}
                                <span className="text-foreground font-medium">
                                    creative design expertise
                                </span>{" "}
                                with{" "}
                                <span className="text-foreground font-medium">
                                    full-stack development
                                </span>{" "}
                                and{" "}
                                <span className="text-foreground font-medium">
                                    intelligent AI integration
                                </span>
                                .
                            </p>
                        </div>

                        {/* Status badges */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-semibold">
                            <div className="flex items-center gap-2.5 border  rounded px-4 py-2 bg-background/50 backdrop-blur-sm">
                                <div className="size-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50" />
                                <span className="text-xs tracking-tight uppercase font-semibold">
                                    Available for work
                                </span>
                            </div>

                            <div className="flex items-center gap-2.5 border rounded px-4 py-2 bg-background/50 backdrop-blur-sm">
                                <MapPin className="size-3.5 animate-pulse fill-foreground" />
                                <span className="text-xs tracking-tight uppercase font-semibold">
                                    Scotland
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
