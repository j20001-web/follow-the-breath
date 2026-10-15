import genAlgae from "@/assets/theo/gen-algae.jpg";
import genCity from "@/assets/theo/gen-city.jpg";
import genLab from "@/assets/theo/gen-lab.jpg";
import genAir from "@/assets/theo/gen-airflow.jpg";
import founder from "@/assets/theo/jatin-gupta.png";
import capsule from "@/assets/theo/theo-capsule.jpeg";
import engineering from "@/assets/theo/theo-engineering.webp";
import highway from "@/assets/theo/theo-highway.jpeg";
import india from "@/assets/theo/theo-india.jpeg";
import metro from "@/assets/theo/theo-metro.jpeg";
import roadNetwork from "@/assets/theo/theo-road-network.webp";
import vehicle from "@/assets/theo/theo-vehicle.png";

export type ProductImageKey =
  | "capsule"
  | "engineering"
  | "highway"
  | "india"
  | "metro"
  | "road"
  | "vehicle"
  | "founder"
  | "algaeMacro"
  | "city"
  | "lab"
  | "air";

const images: Record<ProductImageKey, { src: string; alt: string }> = {
  capsule: { src: capsule, alt: "THEO₂ urban air purification capsule concept" },
  engineering: {
    src: engineering,
    alt: "THEO₂ vehicle air-treatment engineering prototype concept",
  },
  highway: {
    src: highway,
    alt: "Conceptual THEO₂ clean-air installations along an Indian highway",
  },
  india: {
    src: india,
    alt: "Conceptual THEO₂ installation in an Indian traffic corridor",
  },
  metro: {
    src: metro,
    alt: "Conceptual algae reactor installation at an urban metro station",
  },
  road: {
    src: roadNetwork,
    alt: "Conceptual network of THEO₂ towers on an urban roadway",
  },
  vehicle: { src: vehicle, alt: "THEO₂ compact vehicle air-treatment concept" },
  algaeMacro: { src: genAlgae, alt: "Microalgae cells and oxygen bubbles, illustrative" },
  city: { src: genCity, alt: "Green Indian city at sunrise, illustrative" },
  lab: { src: genLab, alt: "Algae photobioreactors in a research lab, illustrative" },
  air: { src: genAir, alt: "Flowing air currents, illustrative" },
  founder: { src: founder, alt: "Jatin Gupta, Founder of THEO₂ / Project Green" },
};

export function ProductImage({
  image,
  label,
  priority = false,
  className = "",
}: {
  image: ProductImageKey;
  label?: string;
  priority?: boolean;
  className?: string;
}) {
  const asset = images[image];
  return (
    <figure className={`product-photo ${className}`}>
      <img
        src={asset.src}
        alt={asset.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.triedFallback && target.src.includes("/__l5e/assets-v1/")) {
            target.dataset.triedFallback = "true";
            target.src = `https://follow-the-breath.lovable.app${new URL(target.src).pathname}`;
          }
        }}
      />
      <span className="photo-sheen" aria-hidden />
      {label && (
        <figcaption>
          <i />
          {label}
        </figcaption>
      )}
    </figure>
  );
}
