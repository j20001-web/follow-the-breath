import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getAdminOverview, setSubmissionStatus } from "@/lib/forms.functions";
import { makeHead } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => makeHead("THEO₂ Admin", "Private THEO₂ Project Green administration dashboard.", "/admin"),
  component: Admin,
});

const STATUSES = ['new', 'reviewing', 'closed'] as const;

function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const load = useServerFn(getAdminOverview);
  const update = useServerFn(setSubmissionStatus);
  const { data, isLoading, error } = useQuery({ queryKey: ['admin-overview'], queryFn: () => load() });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: '/auth', replace: true });
  }

  async function change(table: 'contact_submissions' | 'investor_requests', id: string, status: typeof STATUSES[number]) {
    await update({ data: { table, id, status } });
    queryClient.invalidateQueries({ queryKey: ['admin-overview'] });
  }

  return (
    <section className="admin-page">
      <header className="admin-head">
        <div><span className="eyebrow">ADMINISTRATION</span><h1>THEO<sub>2</sub> DASHBOARD</h1></div>
        <button type="button" onClick={signOut}>SIGN OUT</button>
      </header>

      {isLoading && <p className="admin-note">Loading secure data…</p>}
      {error && <p className="form-error">Could not load dashboard data.</p>}

      {data && !data.isAdmin && (
        <p className="admin-note">
          This account is signed in but has not been granted administrator access yet.
          An existing administrator must assign the admin role to this account.
        </p>
      )}

      {data?.isAdmin && (
        <div className="admin-grid">
          <div className="admin-panel">
            <h2>CONTACT SUBMISSIONS <small>{data.contacts.length}</small></h2>
            {data.contacts.length === 0 && <p className="admin-note">No submissions yet.</p>}
            {data.contacts.map((c) => (
              <article key={c.id}>
                <h3>{c.name} <small>{c.interest}</small></h3>
                <p className="admin-meta">{c.company || '—'} · {c.email} · {c.phone || '—'}</p>
                <p>{c.message}</p>
                <div className="admin-actions">
                  {STATUSES.map((s) => (
                    <button key={s} type="button" disabled={c.status === s} onClick={() => change('contact_submissions', c.id, s)}>
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="admin-panel">
            <h2>INVESTOR REQUESTS <small>{data.investors.length}</small></h2>
            {data.investors.length === 0 && <p className="admin-note">No requests yet.</p>}
            {data.investors.map((r) => (
              <article key={r.id}>
                <h3>{r.name}</h3>
                <p className="admin-meta">{r.organization || '—'} · {r.email}</p>
                <p>{r.message || '—'}</p>
                <div className="admin-actions">
                  {STATUSES.map((s) => (
                    <button key={s} type="button" disabled={r.status === s} onClick={() => change('investor_requests', r.id, s)}>
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="admin-panel">
            <h2>NEWSLETTER <small>{data.subscribers.length}</small></h2>
            {data.subscribers.length === 0 && <p className="admin-note">No subscribers yet.</p>}
            <ul className="admin-list">
              {data.subscribers.map((s) => <li key={s.id}>{s.email}</li>)}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
