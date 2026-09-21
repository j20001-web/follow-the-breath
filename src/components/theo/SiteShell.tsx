import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, SITE } from "@/lib/site";
import { Newsletter } from "@/components/theo/Newsletter";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => setOpen(false), [pathname]);
  return <div className="site-shell">
    <header className="site-header"><Link to="/" className="brand" aria-label="THEO₂ home">THEO<sub>2</sub><small>PROJECT GREEN</small></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item=><Link key={item.to} to={item.to} activeProps={{className:"active"}}>{item.label}</Link>)}</nav>
      <Link to="/follow-the-breath" className="breath-cta">FOLLOW THE BREATH <ArrowUpRight /></Link>
      <button className="menu-button" type="button" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
    </header>
    {open && <div className="mobile-menu animate-fade-in"><nav>{nav.map((item,i)=><Link key={item.to} to={item.to}><span>0{i+1}</span>{item.label}</Link>)}<Link to="/follow-the-breath"><span>09</span>FOLLOW THE BREATH</Link></nav></div>}
    <main>{children}</main>
    <footer className="site-footer"><div className="footer-brand"><b>THEO<sub>2</sub></b><span>PROJECT GREEN</span><p>Building a cleaner, greener, healthier tomorrow.</p><Newsletter /></div><div className="footer-links">{[{l:"TheO₂",t:"/theo2"},{l:"Technology",t:"/technology"},{l:"How It Works",t:"/how-it-works"},{l:"Applications",t:"/applications"},{l:"Project Green",t:"/project-green"},{l:"Future",t:"/future"},{l:"Investors",t:"/investors"},{l:"Founder",t:"/founder"},{l:"Media",t:"/media"},{l:"Contact",t:"/contact"}].map(x=><Link key={x.t} to={x.t}>{x.l}</Link>)}</div><div className="footer-contact"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href={SITE.url}>www.TheO2.in</a></div><div className="footer-bottom"><span>© 2026 THEO₂ / SmartO2. All Rights Reserved.</span><div><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms</Link><Link to="/disclaimer">Disclaimer</Link></div></div></footer>
  </div>;
}
