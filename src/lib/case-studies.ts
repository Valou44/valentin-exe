import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PROJECTS, type CaseStudy } from "./portfolio-content";

/** Études de cas triées de la plus récente à la plus ancienne. */
export const DEFAULT_CASE_STUDIES: CaseStudy[] = [...PROJECTS].sort(
  (a, b) => Number(b.year) - Number(a.year),
);

/** Récupère les études de cas depuis la base ; repli sur le contenu par défaut si vide. */
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from("case_studies")
    .select("content, position")
    .order("position", { ascending: true });

  if (error || !data || data.length === 0) {
    return DEFAULT_CASE_STUDIES;
  }
  return data.map((row) => {
    const cs = row.content as unknown as CaseStudy;
    return {
      ...cs,
      image: localizeAssetUrl(cs.image),
      gallery: cs.gallery?.map(localizeAssetUrl),
    };
  });
}

/**
 * Les images enregistrées en base pointent vers le proxy d'assets Lovable
 * (/__l5e/assets-v1/<id>/<fichier>), indisponible hors hébergement Lovable.
 * On les redirige vers la copie servie depuis public/assets/.
 */
function localizeAssetUrl(url: string): string {
  return url?.replace(/^\/__l5e\/assets-v1\/[^/]+\//, "/assets/") ?? url;
}

export const caseStudiesQueryOptions = queryOptions({
  queryKey: ["case-studies"],
  queryFn: fetchCaseStudies,
  staleTime: 60_000,
});