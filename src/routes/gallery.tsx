import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/gallery")({head:()=>makeHead("THEO₂ Gallery","A visual archive of THEO₂ product, engineering, urban, vehicle, algae and Project Green imagery.","/gallery"),component:()=> <SitePage page="gallery"/>});
