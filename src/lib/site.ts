export const SITE = {
  name: "THEO₂",
  division: "PROJECT GREEN",
  email: "hello@theO2.in",
  url: "https://www.theo2.in",
  description: "THEO₂ Project Green is building next-generation algae-based air purification technology for cleaner air, smarter cities and a greener future.",
} as const;

export const nav = [
  { label: "THEO₂", to: "/theo2" },
  { label: "TECHNOLOGY", to: "/technology" },
  { label: "APPLICATIONS", to: "/applications" },
  { label: "PROJECT GREEN", to: "/project-green" },
  { label: "VISION", to: "/future" },
  { label: "INVESTORS", to: "/investors" },
  { label: "FOUNDER", to: "/founder" },
  { label: "CONTACT", to: "/contact" },
] as const;

export function makeHead(title: string, description: string, path: string, type = "website") {
  const fullTitle = title.includes("THEO₂") ? title : `${title} | THEO₂`;
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
