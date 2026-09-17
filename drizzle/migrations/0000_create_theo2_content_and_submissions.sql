CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
CREATE TYPE public.content_status AS ENUM ('draft', 'published');
CREATE TYPE public.submission_status AS ENUM ('new', 'reviewing', 'closed');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users can read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  company text NOT NULL DEFAULT '' CHECK (char_length(company) <= 150),
  email text NOT NULL CHECK (char_length(email) <= 255),
  phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 30),
  interest text NOT NULL CHECK (interest IN ('Investment','Technology','Partnership','Deployment','Research','Media','General')),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 3000),
  status public.submission_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit contact requests" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Admins manage contact requests" ON public.contact_submissions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.investor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  organization text NOT NULL DEFAULT '' CHECK (char_length(organization) <= 150),
  email text NOT NULL CHECK (char_length(email) <= 255),
  message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
  status public.submission_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.investor_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.investor_requests TO authenticated;
GRANT ALL ON public.investor_requests TO service_role;
ALTER TABLE public.investor_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit investor requests" ON public.investor_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY "Admins manage investor requests" ON public.investor_requests FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE CHECK (char_length(email) <= 255),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can subscribe" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins manage subscribers" ON public.newsletter_subscribers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.homepage_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  eyebrow text NOT NULL DEFAULT '',
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.homepage_content TO authenticated;
GRANT ALL ON public.homepage_content TO service_role;
ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published homepage content is public" ON public.homepage_content FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read published homepage content" ON public.homepage_content FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage homepage content" ON public.homepage_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.technology_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  classification text NOT NULL DEFAULT 'PROTOTYPE',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.technology_sections TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.technology_sections TO authenticated;
GRANT ALL ON public.technology_sections TO service_role;
ALTER TABLE public.technology_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published technology is public" ON public.technology_sections FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read technology" ON public.technology_sections FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage technology" ON public.technology_sections FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  problem text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  opportunity text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.applications TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published applications are public" ON public.applications FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read applications" ON public.applications FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage applications" ON public.applications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.roadmap_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage text NOT NULL,
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  classification text NOT NULL DEFAULT 'FUTURE VISION',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.roadmap_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.roadmap_items TO authenticated;
GRANT ALL ON public.roadmap_items TO service_role;
ALTER TABLE public.roadmap_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published roadmap is public" ON public.roadmap_items FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read roadmap" ON public.roadmap_items FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roadmap" ON public.roadmap_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.media_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  media_type text NOT NULL DEFAULT 'placeholder',
  url text NOT NULL DEFAULT '',
  poster_url text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.media_items TO authenticated;
GRANT ALL ON public.media_items TO service_role;
ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published media is public" ON public.media_items FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read media" ON public.media_items FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage media" ON public.media_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL DEFAULT '',
  alt_text text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.gallery_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published gallery is public" ON public.gallery_items FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read gallery" ON public.gallery_items FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage gallery" ON public.gallery_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.investor_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  status public.content_status NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.investor_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.investor_content TO authenticated;
GRANT ALL ON public.investor_content TO service_role;
ALTER TABLE public.investor_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published investor content is public" ON public.investor_content FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "Authenticated can read investor content" ON public.investor_content FOR SELECT TO authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage investor content" ON public.investor_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
CREATE INDEX investor_requests_created_at_idx ON public.investor_requests (created_at DESC);
CREATE INDEX roadmap_items_sort_order_idx ON public.roadmap_items (sort_order);
CREATE INDEX applications_sort_order_idx ON public.applications (sort_order);