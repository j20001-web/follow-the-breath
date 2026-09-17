# THEO₂ Project Green — Production Build Plan

## Product direction
Build a light, cinematic, investor-grade climate-technology website around one continuous visual story: a polluted particle enters THEO₂, passes through filtration and an algae reactor, emerges as cleaner treated air, and expands into a proposed city-scale network.

Because no product or founder reference files were supplied, the first release will use one consistent, clearly conceptual THEO₂ tower visualization built from reusable web graphics. It will not invent product variants or alter a supplied design. Media and founder-image areas will show polished, explicitly labelled pending-asset states.

## Experience and pages
- Create a shared premium navigation, full-screen mobile menu, footer, short loading sequence, reduced-motion behavior, and custom 404.
- Build every requested route: home, THEO₂, how it works, technology, engineering, algae, vehicle air, applications, infrastructure, India, impact, follow the breath, Project Green, future, roadmap, investors, founder, media, gallery, contact, privacy, terms, disclaimer, admin, and `/404`.
- Give major routes distinct compositions rather than duplicating one template: cinematic scroll stories, interactive product modes, hotspots, maps, timelines, galleries, and editorial technical sections.
- Keep all claims labelled as Current, Prototype, Conceptual Target, Research Target, Validation in Progress, Proposed Network, or Future Vision where appropriate.

## Reusable visual system
- Define an ivory, mist, sage, botanical-green, sky, graphite, glass, and stainless-steel token system with premium sans-serif typography.
- Build centralized product components: `TheoProductHero`, `TheoProductViewer`, `TheoExplodedView`, `TheoAirflow`, `TheoXRay`, and `TheoInstallation`.
- Build a lightweight particle/canvas system for “Follow the Breath,” oxygen bubbles, algae motion, city/network reveals, and scroll-driven transitions.
- Use GPU-friendly transforms, lazy loading, mobile-specific compositions, and a complete reduced-motion fallback.

## Cloud data and security
- Create tables for contact submissions, investor requests, newsletter subscribers, media, gallery, roadmap, applications, technology sections, homepage content, investor content, and administrator roles.
- Add strict row-level security: anonymous visitors may only create validated public submissions and read published content; administrators manage content and private submissions.
- Add email/password and Google administrator sign-in, protected admin routes, server-side role checks, and no public admin data exposure.
- Implement working contact, investor, and newsletter forms with client/server validation, spam honeypots, clear loading/success/error states, and durable storage.

## Admin
- Create a secure dashboard for homepage, technology, applications, roadmap, media, gallery, investor content, and submissions.
- Provide practical editing forms, publish controls, submission status handling, and empty states.
- The first administrator will need to be assigned after an account is created; no credentials or privileged identity will be invented.

## SEO and reliability
- Add unique metadata, Open Graph, Twitter cards, canonical paths, Organization/WebSite/Product/Breadcrumb structured data where relevant, robots rules, and sitemap XML.
- Ensure every link and CTA resolves, no placeholder `#` links exist, and unknown paths render the branded 404.
- Verify desktop and mobile rendering, menu and interactive states, all public forms, authentication boundaries, protected admin access, and representative cross-page journeys.

## Delivery sequence
1. Foundation: design system, shared shell, product visualization, content model, database policies, and authentication.
2. Signature experiences: homepage, Follow the Breath, product, engineering, algae, vehicle, infrastructure, and India.
3. Supporting routes: applications, impact, future, roadmap, investors, founder, Project Green, media, gallery, legal, and contact.
4. Admin/CMS: protected editing and submissions dashboard.
5. Production pass: SEO, sitemap, accessibility, responsive layouts, performance, route/link/form validation, and security checks.
