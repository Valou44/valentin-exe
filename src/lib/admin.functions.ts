import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const optionSchema = z.object({
  label: z.string(),
  hint: z.string().optional(),
  points: z.number(),
});

const chapterSchema = z.object({
  id: z.string(),
  index: z.number(),
  dimension: z.string(),
  tag: z.string(),
  title: z.string(),
  situation: z.string(),
  prompt: z.string(),
  options: z.array(optionSchema),
  valentinChoice: z.number(),
  revealTitle: z.string(),
  revealBody: z.array(z.string()),
  meta: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});

const scenarioSchema = z.object({
  id: z.string().min(1),
  question: z.string(),
  project: z.string(),
  inspiration: z.string(),
  accent: z.string(),
  intro: z.string(),
  chapters: z.array(chapterSchema),
});

export const verifyAdminCode = createServerFn({ method: "POST" })
  .inputValidator((input: { code: string }) => z.object({ code: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_ACCESS_CODE ?? "";
    return { ok: expected.length > 0 && data.code === expected };
  });

export const saveScenarios = createServerFn({ method: "POST" })
  .inputValidator((input: { code: string; scenarios: unknown }) =>
    z.object({ code: z.string(), scenarios: z.array(scenarioSchema).min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_ACCESS_CODE ?? "";
    if (!expected || data.code !== expected) {
      throw new Error("Code d'accès invalide");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const rows = data.scenarios.map((s, i) => ({
      id: s.id,
      position: i,
      content: s as unknown as Record<string, unknown>,
    }));

    const { error } = await supabaseAdmin
      .from("sim_scenarios")
      .upsert(rows as never, { onConflict: "id" });

    if (error) throw new Error(error.message);
    return { ok: true, count: rows.length };
  });

const caseStudySchema = z.object({
  slug: z.string().min(1),
  name: z.string(),
  oneLiner: z.string(),
  year: z.string(),
  tags: z.array(z.string()),
  image: z.string(),
  gallery: z.array(z.string()).optional(),
  problem: z.string(),
  discovery: z.string(),
  decision: z.string(),
  solution: z.string(),
  impact: z.array(z.object({ label: z.string(), value: z.string() })),
  lessons: z.string(),
  differently: z.string(),
  link: z.string().optional(),
});

export const saveCaseStudies = createServerFn({ method: "POST" })
  .inputValidator((input: { code: string; caseStudies: unknown }) =>
    z.object({ code: z.string(), caseStudies: z.array(caseStudySchema).min(1) }).parse(input),
  )
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_ACCESS_CODE ?? "";
    if (!expected || data.code !== expected) {
      throw new Error("Code d'accès invalide");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const rows = data.caseStudies.map((c, i) => ({
      id: c.slug,
      position: i,
      content: c as unknown as Record<string, unknown>,
    }));

    const { error } = await supabaseAdmin
      .from("case_studies")
      .upsert(rows as never, { onConflict: "id" });

    if (error) throw new Error(error.message);

    // Supprime les études de cas qui ne sont plus présentes dans le brouillon
    const keepIds = rows.map((r) => r.id);
    const { error: delError } = await supabaseAdmin
      .from("case_studies")
      .delete()
      .not("id", "in", `(${keepIds.map((id) => `"${id}"`).join(",")})`);
    if (delError) throw new Error(delError.message);

    return { ok: true, count: rows.length };
  });
