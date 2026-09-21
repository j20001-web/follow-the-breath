import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function publicDb() {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  return createClient<Database>(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith('sb_')) h.delete('Authorization');
        h.set('apikey', key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(150),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30),
  interest: z.enum(["Investment", "Technology", "Partnership", "Deployment", "Research", "Media", "General"]),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await publicDb().from('contact_submissions').insert({
      name: data.name, company: data.company, email: data.email,
      phone: data.phone, interest: data.interest, message: data.message,
    });
    if (error) throw new Error('Your message could not be saved. Please try again.');
    return { ok: true };
  });

const investorSchema = z.object({
  name: z.string().trim().min(1).max(100),
  organization: z.string().trim().max(150),
  email: z.string().trim().email().max(255),
  message: z.string().trim().max(3000),
  website: z.string().max(0),
});

export const submitInvestorRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => investorSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await publicDb().from('investor_requests').insert({
      name: data.name, organization: data.organization, email: data.email, message: data.message,
    });
    if (error) throw new Error('Your request could not be saved. Please try again.');
    return { ok: true };
  });

const newsletterSchema = z.object({
  email: z.string().trim().email().max(255),
  website: z.string().max(0),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input) => newsletterSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await publicDb().from('newsletter_subscribers').insert({ email: data.email });
    if (error) throw new Error('Subscription failed. Please try again.');
    return { ok: true };
  });

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!isAdmin) return { isAdmin: false as const, contacts: [], investors: [], subscribers: [] };
    const [contacts, investors, subscribers] = await Promise.all([
      supabase.from('contact_submissions').select('id,name,company,email,phone,interest,message,status,created_at').order('created_at', { ascending: false }).limit(100),
      supabase.from('investor_requests').select('id,name,organization,email,message,status,created_at').order('created_at', { ascending: false }).limit(100),
      supabase.from('newsletter_subscribers').select('id,email,created_at').order('created_at', { ascending: false }).limit(100),
    ]);
    return {
      isAdmin: true as const,
      contacts: contacts.data ?? [],
      investors: investors.data ?? [],
      subscribers: subscribers.data ?? [],
    };
  });

export const setSubmissionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { table: 'contact_submissions' | 'investor_requests'; id: string; status: 'new' | 'reviewing' | 'closed' }) =>
    z.object({
      table: z.enum(['contact_submissions', 'investor_requests']),
      id: z.string().uuid(),
      status: z.enum(['new', 'reviewing', 'closed']),
    }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
    if (!isAdmin) throw new Error('Forbidden');
    const { error } = await supabase.from(data.table).update({ status: data.status }).eq('id', data.id);
    if (error) throw new Error('Could not update status.');
    return { ok: true };
  });
