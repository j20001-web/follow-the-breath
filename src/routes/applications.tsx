import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/applications")({head:()=>makeHead("THEO₂ Applications","Explore potential THEO₂ applications across metro, highways, traffic corridors, industrial areas and public spaces.","/applications"),component:()=> <SitePage page="applications"/>});
