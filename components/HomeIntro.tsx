export const HomeIntro = () => {
    return (
        <section id="intro" className="relative ">
            <div className="min-h-screen relative p-6">
                <div>
                    <h1 className="text-[50px] lg:text-[100px] leading-tight font-doto uppercase font-bold tracking-tight">
                        Product Engineer / <br /> Solutions Architect
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 lg:mt-32 gap-8 md:gap-0">
                    <div />
                    <div className="text-muted-foreground"></div>
                    <div>
                        <p className="text-sm md:text-base md:text-justify lg:leading-relaxed max-w-4xl tracking-tight font-mono font-semibold uppercase">
                            End-to-end digital solutions architect crafting
                            complete experiences from initial concepts to live
                            systems, combining creative design expertise with
                            full-stack development and intelligent AI
                            integration.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-16 lg:mt-32 lg:gap-0">
                    <div className="text-muted-foreground">
                        <span className="font-semibold font-mono text-sm">
                            SCROLL DOWN
                        </span>
                    </div>
                    <div className="text-muted-foreground">
                        <span className="font-semibold font-mono text-sm">
                            AVAILABLE FOR FREELANCE
                        </span>
                    </div>

                    <div />
                </div>
            </div>
        </section>
    );
};
