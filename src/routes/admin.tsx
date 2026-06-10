import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Backdrop } from "../components/Noise";
import {
  DEFAULT_SCENARIOS,
  type Scenario,
  type SimChapter,
  type SimOption,
} from "../lib/sim-content";
import { scenariosQueryOptions } from "../lib/scenarios";
import { caseStudiesQueryOptions, DEFAULT_CASE_STUDIES } from "../lib/case-studies";
import type { CaseStudy } from "../lib/portfolio-content";
import { verifyAdminCode, saveScenarios, saveCaseStudies } from "../lib/admin.functions";
import { RichTextEditor } from "../components/RichTextEditor";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Éditeur du simulateur" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

function isHtml(s: string): boolean {
  return /<[a-z][\s\S]*>/i.test(s);
}

/** Convert a stored revealBody (array of paragraphs OR a single HTML string) to HTML for the editor. */
function bodyToHtml(parts: string[]): string {
  if (parts.length === 1 && isHtml(parts[0])) return parts[0];
  return parts
    .filter((p) => p.trim() !== "")
    .map((p) => (isHtml(p) ? p : `<p>${p}</p>`))
    .join("");
}

function Admin() {
  const { data: scenarios = DEFAULT_SCENARIOS } = useQuery(scenariosQueryOptions);
  const { data: caseStudies = DEFAULT_CASE_STUDIES } = useQuery(caseStudiesQueryOptions);
  const verify = useServerFn(verifyAdminCode);
  const save = useServerFn(saveScenarios);
  const saveCs = useServerFn(saveCaseStudies);

  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Scenario[]>([]);
  const [savingCs, setSavingCs] = useState(false);
  const [csDraft, setCsDraft] = useState<CaseStudy[]>([]);
  const [tab, setTab] = useState<"sim" | "cases">("sim");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    try {
      const res = await verify({ data: { code } });
      if (res.ok) {
        setDraft(clone(scenarios));
        setCsDraft(clone(caseStudies));
        setUnlocked(true);
      } else {
        toast.error("Code d'accès invalide");
      }
    } catch {
      toast.error("Erreur de vérification");
    } finally {
      setChecking(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await save({ data: { code, scenarios: draft } });
      toast.success("Contenu enregistré ✓");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Échec de l'enregistrement");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveCaseStudies() {
    setSavingCs(true);
    try {
      await saveCs({ data: { code, caseStudies: csDraft } });
      toast.success("Études de cas enregistrées ✓");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Échec de l'enregistrement");
    } finally {
      setSavingCs(false);
    }
  }

  function updateCaseStudy(i: number, patch: Partial<CaseStudy>) {
    setCsDraft((d) => d.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  function updateScenario(i: number, patch: Partial<Scenario>) {
    setDraft((d) => d.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function updateChapter(si: number, ci: number, patch: Partial<SimChapter>) {
    setDraft((d) =>
      d.map((s, idx) =>
        idx === si
          ? { ...s, chapters: s.chapters.map((c, j) => (j === ci ? { ...c, ...patch } : c)) }
          : s,
      ),
    );
  }

  if (!unlocked) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <Backdrop />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">ESPACE ADMIN</p>
          <h1 className="mt-3 font-[var(--font-display)] text-3xl font-bold">Éditeur du simulateur</h1>
          <p className="mt-3 text-muted-foreground">
            Entrez le code d'accès pour modifier le contenu de chaque branche.
          </p>
          <form onSubmit={handleVerify} className="mt-8 space-y-4">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code d'accès"
              className="w-full rounded-xl border border-border bg-card/50 px-4 py-3 outline-none focus:border-foreground/40"
            />
            <button
              type="submit"
              disabled={checking || !code}
              className="w-full rounded-full bg-foreground px-6 py-3 font-mono text-sm font-semibold tracking-widest text-background disabled:opacity-50"
            >
              {checking ? "VÉRIFICATION…" : "ACCÉDER"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground">ÉDITEUR DU SIMULATEUR</p>
            <h1 className="font-[var(--font-display)] text-xl font-bold">Espace admin</h1>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setTab("sim")}
                className={`rounded-full px-3 py-1.5 font-mono text-xs tracking-widest ${tab === "sim" ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}
              >
                SIMULATEUR
              </button>
              <button
                onClick={() => setTab("cases")}
                className={`rounded-full px-3 py-1.5 font-mono text-xs tracking-widest ${tab === "cases" ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}
              >
                ÉTUDES DE CAS
              </button>
            </div>
          </div>
          {tab === "sim" ? (
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-full bg-foreground px-6 py-2.5 font-mono text-sm font-semibold tracking-widest text-background disabled:opacity-50"
            >
              {saving ? "ENREGISTREMENT…" : "ENREGISTRER"}
            </button>
          ) : (
            <button
              onClick={handleSaveCaseStudies}
              disabled={savingCs}
              className="rounded-full bg-foreground px-6 py-2.5 font-mono text-sm font-semibold tracking-widest text-background disabled:opacity-50"
            >
              {savingCs ? "ENREGISTREMENT…" : "ENREGISTRER"}
            </button>
          )}
        </div>
      </div>

      {tab === "sim" && (
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-10">
        {draft.map((s, si) => (
          <section key={s.id} className="glass rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[11px] uppercase tracking-widest ${s.accent}`}>
                branche : {s.id}
              </span>
            </div>

            <Field label="Problématique (titre du choix)">
              <textarea
                value={s.question}
                onChange={(e) => updateScenario(si, { question: e.target.value })}
                className={inputCls + " min-h-[60px]"}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Projet (nom affiché)">
                <input value={s.project} onChange={(e) => updateScenario(si, { project: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Mention d'inspiration">
                <input value={s.inspiration} onChange={(e) => updateScenario(si, { inspiration: e.target.value })} className={inputCls} />
              </Field>
            </div>
            <Field label="Intro (sous-titre du choix)">
              <textarea
                value={s.intro}
                onChange={(e) => updateScenario(si, { intro: e.target.value })}
                className={inputCls + " min-h-[60px]"}
              />
            </Field>

            <div className="mt-6 space-y-6">
              {s.chapters.map((c, ci) => (
                <ChapterEditor
                  key={c.id}
                  chapter={c}
                  onChange={(patch) => updateChapter(si, ci, patch)}
                />
              ))}
            </div>
          </section>
        ))}

        <div className="flex justify-end pb-16">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-foreground px-8 py-3 font-mono text-sm font-semibold tracking-widest text-background disabled:opacity-50"
          >
            {saving ? "ENREGISTREMENT…" : "ENREGISTRER LES MODIFICATIONS"}
          </button>
        </div>
      </div>
      )}

      {tab === "cases" && (
        <div className="mx-auto max-w-4xl space-y-10 px-6 py-10">
          {csDraft.map((c, ci) => (
            <CaseStudyEditor
              key={c.slug}
              cs={c}
              onChange={(patch) => updateCaseStudy(ci, patch)}
            />
          ))}
          <div className="flex justify-end pb-16">
            <button
              onClick={handleSaveCaseStudies}
              disabled={savingCs}
              className="rounded-full bg-foreground px-8 py-3 font-mono text-sm font-semibold tracking-widest text-background disabled:opacity-50"
            >
              {savingCs ? "ENREGISTREMENT…" : "ENREGISTRER LES MODIFICATIONS"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-card/40 px-3 py-2 text-sm outline-none focus:border-foreground/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-4">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) onChange(await fileToDataUrl(file));
            }}
            className="block w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-foreground file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-background"
          />
          <input
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…ou collez une URL d'image"
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );
}

function CaseStudyEditor({
  cs,
  onChange,
}: {
  cs: CaseStudy;
  onChange: (patch: Partial<CaseStudy>) => void;
}) {
  const [open, setOpen] = useState(false);

  function setGallery(i: number, v: string) {
    onChange({ gallery: (cs.gallery ?? []).map((g, idx) => (idx === i ? v : g)) });
  }

  return (
    <section className="glass rounded-2xl border border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-[var(--font-display)] font-semibold">
          {cs.name} <span className="font-mono text-xs text-muted-foreground">· {cs.year}</span>
        </span>
        <span className="font-mono text-muted-foreground">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-border px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom du projet">
              <input value={cs.name} onChange={(e) => onChange({ name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Année">
              <input value={cs.year} onChange={(e) => onChange({ year: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <Field label="Accroche (one-liner)">
            <textarea
              value={cs.oneLiner}
              onChange={(e) => onChange({ oneLiner: e.target.value })}
              className={inputCls + " min-h-[60px]"}
            />
          </Field>
          <Field label="Lien externe (optionnel)">
            <input value={cs.link ?? ""} onChange={(e) => onChange({ link: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Étiquettes (séparées par des virgules)">
            <input
              value={cs.tags.join(", ")}
              onChange={(e) => onChange({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
              className={inputCls}
            />
          </Field>

          <ImageField
            label="Image de couverture"
            value={cs.image}
            onChange={(v) => onChange({ image: v })}
          />

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Galerie d'images
              </span>
              <button
                onClick={() => onChange({ gallery: [...(cs.gallery ?? []), ""] })}
                className="font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                + ajouter une image
              </button>
            </div>
            {(cs.gallery ?? []).map((g, i) => (
              <div key={i} className="mt-2 flex items-start gap-2">
                <div className="flex-1">
                  <ImageField label={`Image ${i + 1}`} value={g} onChange={(v) => setGallery(i, v)} />
                </div>
                <button
                  onClick={() => onChange({ gallery: (cs.gallery ?? []).filter((_, idx) => idx !== i) })}
                  className="mt-8 font-mono text-xs text-rose-400/80 hover:text-rose-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <Field label="Le problème">
            <textarea value={cs.problem} onChange={(e) => onChange({ problem: e.target.value })} className={inputCls + " min-h-[80px]"} />
          </Field>
          <Field label="Discovery">
            <textarea value={cs.discovery} onChange={(e) => onChange({ discovery: e.target.value })} className={inputCls + " min-h-[80px]"} />
          </Field>
          <Field label="Prise de décision">
            <textarea value={cs.decision} onChange={(e) => onChange({ decision: e.target.value })} className={inputCls + " min-h-[80px]"} />
          </Field>
          <Field label="Solution">
            <textarea value={cs.solution} onChange={(e) => onChange({ solution: e.target.value })} className={inputCls + " min-h-[80px]"} />
          </Field>
          <Field label="Ce que j'en retiens">
            <textarea value={cs.lessons} onChange={(e) => onChange({ lessons: e.target.value })} className={inputCls + " min-h-[60px]"} />
          </Field>
          <Field label="Ce que je ferais différemment">
            <textarea value={cs.differently} onChange={(e) => onChange({ differently: e.target.value })} className={inputCls + " min-h-[60px]"} />
          </Field>

          <div className="mt-5">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Indicateurs d'impact — label : valeur
            </span>
            <div className="space-y-2">
              {cs.impact.map((m, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_32px] gap-2">
                  <input
                    value={m.label}
                    onChange={(e) =>
                      onChange({ impact: cs.impact.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)) })
                    }
                    placeholder="Label"
                    className={inputCls}
                  />
                  <input
                    value={m.value}
                    onChange={(e) =>
                      onChange({ impact: cs.impact.map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)) })
                    }
                    placeholder="Valeur"
                    className={inputCls}
                  />
                  <button
                    onClick={() => onChange({ impact: cs.impact.filter((_, idx) => idx !== i) })}
                    className="font-mono text-xs text-rose-400/80 hover:text-rose-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => onChange({ impact: [...cs.impact, { label: "", value: "" }] })}
                className="font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                + ajouter un indicateur
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ChapterEditor({
  chapter,
  onChange,
}: {
  chapter: SimChapter;
  onChange: (patch: Partial<SimChapter>) => void;
}) {
  const [open, setOpen] = useState(false);

  function setOption(i: number, patch: Partial<SimOption>) {
    onChange({ options: chapter.options.map((o, idx) => (idx === i ? { ...o, ...patch } : o)) });
  }
  function addOption() {
    onChange({ options: [...chapter.options, { label: "Nouvelle option", hint: "", points: 0 }] });
  }
  function removeOption(i: number) {
    const valentinChoice = Math.min(chapter.valentinChoice, chapter.options.length - 2);
    onChange({
      options: chapter.options.filter((_, idx) => idx !== i),
      valentinChoice: Math.max(0, valentinChoice),
    });
  }

  return (
    <div className="rounded-xl border border-border/70 bg-background/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium">
          <span className="font-mono text-xs text-muted-foreground">{chapter.index} — </span>
          {chapter.dimension} · {chapter.title}
        </span>
        <span className="font-mono text-muted-foreground">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-border/70 px-4 py-4">
          <Field label="Titre de l'étape">
            <input value={chapter.title} onChange={(e) => onChange({ title: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Situation">
            <textarea
              value={chapter.situation}
              onChange={(e) => onChange({ situation: e.target.value })}
              className={inputCls + " min-h-[90px]"}
            />
          </Field>
          <Field label="Question posée">
            <input value={chapter.prompt} onChange={(e) => onChange({ prompt: e.target.value })} className={inputCls} />
          </Field>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Choix proposés — cochez celui de Valentin
              </span>
              <button onClick={addOption} className="font-mono text-xs text-muted-foreground hover:text-foreground">
                + ajouter
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {chapter.options.map((o, i) => (
                <div key={i} className="rounded-lg border border-border/70 p-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name={`val-${chapter.id}`}
                      checked={chapter.valentinChoice === i}
                      onChange={() => onChange({ valentinChoice: i })}
                      className="h-4 w-4"
                      title="Choix de Valentin"
                    />
                    <input
                      value={o.label}
                      onChange={(e) => setOption(i, { label: e.target.value })}
                      placeholder="Libellé"
                      className={inputCls}
                    />
                    <button
                      onClick={() => removeOption(i)}
                      disabled={chapter.options.length <= 2}
                      className="font-mono text-xs text-rose-400/80 hover:text-rose-400 disabled:opacity-30"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-[1fr_90px] gap-2">
                    <input
                      value={o.hint ?? ""}
                      onChange={(e) => setOption(i, { hint: e.target.value })}
                      placeholder="Indice (optionnel)"
                      className={inputCls}
                    />
                    <input
                      type="number"
                      value={o.points}
                      onChange={(e) => setOption(i, { points: Number(e.target.value) })}
                      placeholder="Points"
                      className={inputCls}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Field label="Titre du résultat (reveal)">
            <input value={chapter.revealTitle} onChange={(e) => onChange({ revealTitle: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Texte du résultat — un paragraphe par ligne">
            <textarea
              value={chapter.revealBody.join("\n")}
              onChange={(e) => onChange({ revealBody: e.target.value.split("\n").filter((l) => l.trim() !== "") })}
              className={inputCls + " min-h-[110px]"}
            />
          </Field>

          <div className="mt-4">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Indicateurs (meta) — label : valeur
            </span>
            <div className="space-y-2">
              {(chapter.meta ?? []).map((m, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_32px] gap-2">
                  <input
                    value={m.label}
                    onChange={(e) =>
                      onChange({ meta: (chapter.meta ?? []).map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)) })
                    }
                    placeholder="Label"
                    className={inputCls}
                  />
                  <input
                    value={m.value}
                    onChange={(e) =>
                      onChange({ meta: (chapter.meta ?? []).map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)) })
                    }
                    placeholder="Valeur"
                    className={inputCls}
                  />
                  <button
                    onClick={() => onChange({ meta: (chapter.meta ?? []).filter((_, idx) => idx !== i) })}
                    className="font-mono text-xs text-rose-400/80 hover:text-rose-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => onChange({ meta: [...(chapter.meta ?? []), { label: "", value: "" }] })}
                className="font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                + ajouter un indicateur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
