import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/india")({head:()=>makeHead("India Clean-Air Infrastructure Vision","THEO₂'s proposed path from one measured installation to scalable clean-air infrastructure across India.","/india"),component:()=> <SitePage page="india"/>});
