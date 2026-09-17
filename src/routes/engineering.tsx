import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/engineering")({head:()=>makeHead("THEO₂ Engineering","Inspect THEO₂ airflow, filtration, sensing, controls, structural design and modular engineering concepts.","/engineering"),component:()=> <SitePage page="engineering"/>});
