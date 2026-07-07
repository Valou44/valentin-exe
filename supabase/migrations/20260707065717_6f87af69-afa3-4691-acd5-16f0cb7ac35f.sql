DELETE FROM public.sim_scenarios WHERE id = 'cibli';
DELETE FROM public.case_studies WHERE content->>'slug' = 'cibli';