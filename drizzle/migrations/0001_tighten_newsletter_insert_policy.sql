DROP POLICY IF EXISTS "Public can subscribe" ON public.newsletter_subscribers;
CREATE POLICY "Public can subscribe"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);