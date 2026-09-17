import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/future")({head:()=>makeHead("The Future of Clean-Air Infrastructure","A grounded future vision for THEO₂ from prototype and pilot to city network and future infrastructure.","/future"),component:()=> <SitePage page="future"/>});
