import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/technology")({head:()=>makeHead("THEO₂ Product Technology","Explore the consistent THEO₂ tower form, modular product architecture and conceptual product views.","/technology"),component:()=> <SitePage page="technology"/>});
