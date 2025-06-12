import { defineContentConfig, defineCollection } from "@nuxt/content";
import v from "./config/validate";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**/*.md",
    }),
  },
});
