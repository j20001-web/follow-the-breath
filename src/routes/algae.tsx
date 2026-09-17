import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/algae")({head:()=>makeHead("The THEO₂ Algae System","Learn about established algae science and the controlled bioreactor research behind THEO₂ Project Green.","/algae"),component:()=> <SitePage page="algae"/>});
