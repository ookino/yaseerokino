import { Doto, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const doto = Doto({
    subsets: ["latin"],
    weight: ["400", "500", "700"], // pick your required weights
    variable: "--font-doto", // optional CSS variable
});

export const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    variable: "--font-instrument-serif",
    weight: ["400"],
    display: "swap",
    preload: true,
});

// Utility to get all font variables as a single string
export const fontVariables = `${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${doto.variable}`;
