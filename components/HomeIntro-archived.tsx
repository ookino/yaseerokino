export const HomeIntro = () => {
    return (
        <header
            id="intro"
            className="md:min-h-screen flex items-center pt-24 md:pt-0"
        >
            <div className="max-w-5xl mx-auto ">
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
                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl  font-medium font-doto uppercase tracking-tight leading-none">
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
                    </div>
                </div>
            </div>
        </header>
    );
};
