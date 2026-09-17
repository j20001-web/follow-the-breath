import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/theo2")({head:()=>makeHead("What Is THEO₂?","Explore the THEO₂ clean-air infrastructure concept, its controlled airflow, filtration, algae reactor and monitoring system.","/theo2"),component:()=> <SitePage page="theo2"/>});
