import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "@/components/theo/SiteShell";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <section className="not-found">
      <div className="lost-particle" />
      <span>ERROR 404</span>
      <h1>THIS AIRFLOW<br />DOESN'T EXIST.</h1>
      <p>Let's get you back to the THEO₂ journey.</p>
      <Link to="/">RETURN HOME</Link>
    </section>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="not-found">
      <span>SYSTEM NOTICE</span>
      <h1>THIS PAGE<br />DIDN'T LOAD.</h1>
      <p>Something interrupted the airflow. Try again or return to the start of the journey.</p>
      <div className="not-found-actions">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          TRY AGAIN
        </button>
        <a href="/">RETURN HOME</a>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "THEO₂ | Project Green | Next-Generation Clean-Air Infrastructure" },
      { name: "description", content: SITE.description },
      { name: "author", content: "THEO₂ / Project Green" },
      { property: "og:site_name", content: "THEO₂ / Project Green" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
