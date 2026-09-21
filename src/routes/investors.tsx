import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";
import { SitePage } from "@/components/theo/Page";
import { makeHead } from "@/lib/site";
import { submitInvestorRequest } from "@/lib/forms.functions";

export const Route = createFileRoute("/investors")({
  head: () => makeHead("THEO₂ Investors", "Explore the problem, technology, applications, scalability and development roadmap behind THEO₂ Project Green.", "/investors"),
  component: Investors,
});

function Investors() {
  const send = useServerFn(submitInvestorRequest);
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState('loading');
    const f = new FormData(form);
    try {
      await send({ data: {
        name: String(f.get('name') || ''),
        organization: String(f.get('organization') || ''),
        email: String(f.get('email') || ''),
        message: String(f.get('message') || ''),
        website: String(f.get('website') || ''),
      } });
      setState('success');
      form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <>
      <SitePage page="investors" />
      <section className="investor-form-section" id="investor-request">
        <div>
          <span className="eyebrow">INVESTOR RELATIONS</span>
          <h2>REQUEST THE<br />INVESTOR OVERVIEW.</h2>
          <p>
            The THEO₂ investor overview is <strong>IN PREPARATION</strong>. Share your details and we will
            reach out directly when it is released.
          </p>
          <p className="claim-note">
            Performance figures presented across this site are targets, concepts or prototype-stage
            indications and are subject to engineering testing and independent validation.
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <label>Name<input name="name" required maxLength={100} /></label>
          <label>Organization<input name="organization" maxLength={150} /></label>
          <label>Email<input name="email" type="email" required maxLength={255} /></label>
          <label>Message<textarea name="message" rows={4} maxLength={3000} /></label>
          <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
          <button disabled={state === 'loading' || state === 'success'}>
            {state === 'loading' ? <LoaderCircle className="spin" /> : state === 'success' ? <Check /> : <Send />}
            {state === 'loading' ? 'SENDING' : state === 'success' ? 'REQUEST RECEIVED' : 'REQUEST ACCESS'}
          </button>
          {state === 'success' && <p className="form-success">Thank you. Your message has been received.</p>}
          {state === 'error' && <p className="form-error">Something went wrong. Please try again or email us directly.</p>}
        </form>
      </section>
    </>
  );
}
