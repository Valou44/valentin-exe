CREATE TABLE public.case_studies (
  id TEXT NOT NULL PRIMARY KEY,
  position INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.case_studies TO anon;
GRANT SELECT ON public.case_studies TO authenticated;
GRANT ALL ON public.case_studies TO service_role;

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read case studies"
ON public.case_studies
FOR SELECT
TO public
USING (true);

CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();