import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_SCENARIOS, type Scenario } from "./sim-content";

/** Récupère les scénarios depuis la base ; repli sur le contenu par défaut si vide. */
export async function fetchScenarios(): Promise<Scenario[]> {
  const { data, error } = await supabase
    .from("sim_scenarios")
    .select("content, position")
    .order("position", { ascending: true });

  if (error || !data || data.length === 0) {
    return DEFAULT_SCENARIOS;
  }
  return data.map((row) => row.content as unknown as Scenario);
}

export const scenariosQueryOptions = queryOptions({
  queryKey: ["scenarios"],
  queryFn: fetchScenarios,
  staleTime: 60_000,
});
