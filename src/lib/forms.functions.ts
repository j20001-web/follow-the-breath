import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema=z.object({name:z.string().trim().min(1).max(100),company:z.string().trim().max(150),email:z.string().trim().email().max(255),phone:z.string().trim().max(30),interest:z.enum(["Investment","Technology","Partnership","Deployment","Research","Media","General"]),message:z.string().trim().min(10).max(3000),website:z.string().max(0)});
export const submitContact=createServerFn({method:"POST"}).inputValidator((input)=>contactSchema.parse(input)).handler(async({data})=>{const key=process.env['SUPABASE_PUBLISHABLE_KEY']!;const db=createClient<Database>(process.env['SUPABASE_URL']!,key,{auth:{persistSession:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(key.startsWith('sb_'))h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h})}}});const {error}=await db.from('contact_submissions').insert({name:data.name,company:data.company,email:data.email,phone:data.phone,interest:data.interest,message:data.message});if(error)throw new Error('Your message could not be saved. Please try again.');return {ok:true};});
