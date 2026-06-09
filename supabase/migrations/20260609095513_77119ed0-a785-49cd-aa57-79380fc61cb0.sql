CREATE TABLE public.sim_scenarios (
  id TEXT PRIMARY KEY,
  position INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.sim_scenarios TO anon;
GRANT SELECT ON public.sim_scenarios TO authenticated;
GRANT ALL ON public.sim_scenarios TO service_role;

ALTER TABLE public.sim_scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read simulator scenarios"
ON public.sim_scenarios
FOR SELECT
USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_sim_scenarios_updated_at
BEFORE UPDATE ON public.sim_scenarios
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();