import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/project-green")({head:()=>makeHead("Project Green","Project Green connects technology, nature, engineering and cities for a cleaner, greener, healthier tomorrow.","/project-green"),component:()=> <SitePage page="green"/>});
