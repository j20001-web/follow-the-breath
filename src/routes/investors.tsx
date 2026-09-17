import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/investors")({head:()=>makeHead("THEO₂ Investors","Explore the problem, technology, applications, scalability and development roadmap behind THEO₂ Project Green.","/investors"),component:()=> <SitePage page="investors"/>});
