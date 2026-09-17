import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/roadmap")({head:()=>makeHead("THEO₂ Roadmap","Follow the transparent THEO₂ development roadmap from concept and engineering through testing, pilot and future deployment.","/roadmap"),component:()=> <SitePage page="roadmap"/>});
