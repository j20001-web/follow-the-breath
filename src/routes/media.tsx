import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/media")({head:()=>makeHead("THEO₂ Films & Media","THEO₂ films, engineering reveals, Project Green stories and future India media.","/media"),component:()=> <SitePage page="media"/>});
