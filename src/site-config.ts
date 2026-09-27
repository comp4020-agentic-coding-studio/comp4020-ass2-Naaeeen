import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Change them to Studios, Tutorials, Expeditions, etc.
export const sessionLabels = {
  singular: "Seminar",
  plural: "Seminars",
} as const;

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: "Start here", href: "/start/" },
    { text: "Weekly plan", href: "/sessions/" },
    { text: "World atlas", href: "/atlas/" },
    { text: "Library", href: "/library/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
});
