import { createFileRoute } from "@tanstack/react-router";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
export const Route=createFileRoute("/founder")({head:()=>makeHead("Jatin Gupta — Founder","Meet Jatin Gupta, founder of THEO₂ Project Green, building next-generation clean-air technology.","/founder"),component:()=> <SitePage page="founder"/>});
