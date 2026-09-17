import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/impact")({head:()=>makeHead("Environmental Impact","Explore measured-impact principles, local atmospheric quality and the research targets behind THEO₂.","/impact"),component:()=> <SitePage page="impact"/>});
