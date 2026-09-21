import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Check, LoaderCircle, ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/lib/forms.functions";

export function Newsletter() {
  const send = useServerFn(subscribeNewsletter);
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState('loading');
    const f = new FormData(form);
    try {
      await send({ data: { email: String(f.get('email') || ''), website: String(f.get('website') || '') } });
      setState('success');
      form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <form className="newsletter" onSubmit={onSubmit}>
      <label htmlFor="newsletter-email">FOLLOW THE PROJECT</label>
      <div>
        <input id="newsletter-email" name="email" type="email" required placeholder="you@example.com" maxLength={255} />
        <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
        <button aria-label="Subscribe" disabled={state === 'loading' || state === 'success'}>
          {state === 'loading' ? <LoaderCircle className="spin" /> : state === 'success' ? <Check /> : <ArrowRight />}
        </button>
      </div>
      {state === 'success' && <p className="form-success">Thank you. Your message has been received.</p>}
      {state === 'error' && <p className="form-error">Subscription failed. Please try again.</p>}
    </form>
  );
}
