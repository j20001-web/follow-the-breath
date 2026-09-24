import genAlgae from "@/assets/theo/gen-algae.jpg";
import genCity from "@/assets/theo/gen-city.jpg";
import genLab from "@/assets/theo/gen-lab.jpg";
import genAir from "@/assets/theo/gen-airflow.jpg";
import founder from "@/assets/theo/jatin-gupta.png.asset.json";
import capsule from "@/assets/theo/capsule.jpeg.asset.json";
import engineering from "@/assets/theo/engineering.webp.asset.json";
import highway from "@/assets/theo/highway.jpeg.asset.json";
import india from "@/assets/theo/india.jpeg.asset.json";
import metro from "@/assets/theo/metro.jpeg.asset.json";
import roadNetwork from "@/assets/theo/road-network.webp.asset.json";
import vehicle from "@/assets/theo/vehicle.png.asset.json";

export type ProductImageKey = "capsule" | "engineering" | "highway" | "india" | "metro" | "road" | "vehicle" | "founder" | "algaeMacro" | "city" | "lab" | "air";

const images: Record<ProductImageKey, { src: string; alt: string }> = {
  capsule: { src: capsule.url, alt: "THEO₂ urban air purification capsule concept" },
  engineering: { src: engineering.url, alt: "THEO₂ vehicle air-treatment engineering prototype concept" },
  highway: { src: highway.url, alt: "Conceptual THEO₂ clean-air installations along an Indian highway" },
  india: { src: india.url, alt: "Conceptual THEO₂ installation in an Indian traffic corridor" },
  metro: { src: metro.url, alt: "Conceptual algae reactor installation at an urban metro station" },
  road: { src: roadNetwork.url, alt: "Conceptual network of THEO₂ towers on an urban roadway" },
  vehicle: { src: vehicle.url, alt: "THEO₂ compact vehicle air-treatment concept" },
  algaeMacro: { src: genAlgae, alt: "Microalgae cells and oxygen bubbles, illustrative" },
  city: { src: genCity, alt: "Green Indian city at sunrise, illustrative" },
  lab: { src: genLab, alt: "Algae photobioreactors in a research lab, illustrative" },
  air: { src: genAir, alt: "Flowing air currents, illustrative" },
  founder: { src: founder.url, alt: "Jatin Gupta, Founder of THEO₂ / Project Green" },
};

export function ProductImage({ image, label, priority = false, className = "" }: { image: ProductImageKey; label?: string; priority?: boolean; className?: string }) {
  const asset = images[image];
  return <figure className={`product-photo ${className}`}>
    <img src={asset.src} alt={asset.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
    <span className="photo-sheen" aria-hidden />
    {label && <figcaption><i />{label}</figcaption>}
  </figure>;
}