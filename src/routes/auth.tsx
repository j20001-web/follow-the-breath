import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { makeHead } from "@/lib/site";

export const Route = createFileRoute("/auth")({
  head: () => makeHead("THEO₂ Administrator Access", "Secure sign-in for THEO₂ Project Green administrators.", "/auth"),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get('email') || '');
    const password = String(f.get('password') || '');
    setBusy(true); setError(""); setNotice("");
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: '/admin', replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setNotice("Account created. If confirmation is required, check your email, then sign in.");
        setMode('signin');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">ADMINISTRATOR ACCESS</span>
        <h1>THEO<sub>2</sub> CONTROL</h1>
        <p>Secure access for THEO₂ / Project Green administrators.</p>
        <form onSubmit={onSubmit}>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Password<input name="password" type="password" required minLength={6} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /></label>
          <button disabled={busy}>{busy ? 'PLEASE WAIT' : mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}</button>
        </form>
        <button
          type="button"
          className="oauth-button"
          onClick={() => lovable.auth.signInWithOAuth('google', { redirect_uri: window.location.origin })}
        >
          CONTINUE WITH GOOGLE
        </button>
        <button type="button" className="link-button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
          {mode === 'signin' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
        </button>
        {error && <p className="form-error">{error}</p>}
        {notice && <p className="form-success">{notice}</p>}
      </div>
    </section>
  );
}
