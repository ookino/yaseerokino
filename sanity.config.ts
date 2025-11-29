"use client";

import { theme } from "https://themer.sanity.build/api/hues?primary=101112";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
export default defineConfig({
    name: "Portfolio",
    title: "Yaseer Okino",
    basePath: "/studio",
    theme,
    projectId,
    dataset,
    schema,
    plugins: [
        structureTool({ structure }),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
});
