import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/how-it-works")({head:()=>makeHead("How THEO₂ Works","Follow air through the conceptual THEO₂ intake, filtration, algae reactor and treated-air output.","/how-it-works"),component:()=> <SitePage page="how"/>});
