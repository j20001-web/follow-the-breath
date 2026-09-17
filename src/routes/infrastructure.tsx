import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/infrastructure")({head:()=>makeHead("Air Is Infrastructure","Discover the THEO₂ vision for measured clean-air infrastructure across cities and transport corridors.","/infrastructure"),component:()=> <SitePage page="infrastructure"/>});
