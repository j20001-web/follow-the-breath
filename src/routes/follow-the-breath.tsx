import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/follow-the-breath")({head:()=>makeHead("Follow the Breath","Follow one particle from city air through THEO₂ filtration and algae-based processing into a cleaner-air vision.","/follow-the-breath"),component:()=> <SitePage page="breath"/>});
