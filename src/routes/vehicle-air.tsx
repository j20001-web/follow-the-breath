import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/vehicle-air")({head:()=>makeHead("Vehicle Air-Treatment Concept","Explore the THEO₂ vehicle air-treatment engineering concept and its proposed filtration pathway.","/vehicle-air"),component:()=> <SitePage page="vehicle"/>});
