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
