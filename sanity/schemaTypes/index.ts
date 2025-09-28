import type { SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { postCategoryType } from "./postCategoryType";
import { postType } from "./postType";
import { projectCategoryType } from "./projectCategoryType";
import { projectType } from "./projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        blockContentType,
        postCategoryType,
        projectCategoryType,
        postType,
        projectType,
    ],
};
