import { useState } from "react";
import { Activity, CircleDot, Fan, Gauge, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductMode = "assembled" | "exploded" | "xray" | "airflow";
const parts = [
  { id: "intake", label: "AIR INTAKE", icon: Wind, copy: "A controlled pathway designed to draw ambient air into the treatment assembly." },
  { id: "filter", label: "FILTRATION", icon: Fan, copy: "A staged filtration concept intended to manage particulate matter before biological processing." },
  { id: "reactor", label: "ALGAE REACTOR", icon: CircleDot, copy: "A transparent, controlled chamber exploring algae-based air and carbon-related processes." },
  { id: "output", label: "CLEAN-AIR OUTPUT", icon: Activity, copy: "The designed outlet returns treated airflow to its local environment. Performance remains under validation." },
  { id: "monitor", label: "MONITORING", icon: Gauge, copy: "Sensors and controls are envisioned to track airflow, chamber conditions and system operation." },
];

export function TheoProduct({ mode = "assembled", interactive = false, className }: { mode?: ProductMode; interactive?: boolean; className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return <div className={cn("product-stage", `product-${mode}`, className)}>
    <div className="air-stream air-stream-in" aria-hidden />
    <div className="theo-machine" role="img" aria-label={`Conceptual THEO₂ clean-air tower in ${mode} view`}>
      <div className="machine-cap"><span>THEO₂</span></div>
      <div className="machine-glass"><div className="algae-liquid">{Array.from({length: 12},(_,i)=><i key={i} />)}</div><div className="reactor-core" /></div>
      <div className="machine-filter"><span /><span /><span /></div>
      <div className="machine-base"><b>PROJECT GREEN</b></div>
      {interactive && parts.map((part, i) => <button key={part.id} type="button" className={`hotspot hotspot-${i+1}`} aria-label={part.label} onClick={() => setActive(active === part.id ? null : part.id)}><span>{i+1}</span></button>)}
    </div>
    <div className="air-stream air-stream-out" aria-hidden />
    {active && <div className="hotspot-note animate-fade-in"><small>PROTOTYPE SYSTEM</small><strong>{parts.find(p=>p.id===active)?.label}</strong><p>{parts.find(p=>p.id===active)?.copy}</p></div>}
  </div>;
}

export function ProductViewer({ initial = "assembled" }: { initial?: ProductMode }) {
  const [mode, setMode] = useState<ProductMode>(initial);
  return <div className="viewer-shell">
    <div className="mode-switch" role="group" aria-label="Product view mode">
      {(["assembled","exploded","xray","airflow"] as ProductMode[]).map(item => <button type="button" key={item} onClick={()=>setMode(item)} aria-pressed={mode===item}>{item.toUpperCase()}</button>)}
    </div>
    <TheoProduct mode={mode} interactive />
  </div>;
}
