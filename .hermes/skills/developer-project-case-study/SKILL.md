---
name: developer-project-case-study
description: Create or revise a `/blog/projects` post as a developer production case study. Use whenever a user asks to document a self-made product, game, app, project journey, technical retrospective, implementation story, or to add a Projects post. Ground every claim in inspected source code, tests, git history, issue records, or run artifacts; do not write a release note, marketing introduction, or feature list disguised as a case study.
created_by: agent
---

# Developer Project Case Study

`/blog/projects` is a developer's production record. Its value is the path from an engineering problem to a tested decision, not a product announcement. Use the bundled template at `templates/project-case-study.md`.

## Evidence first

1. Locate the product source repository before drafting. Read the project contract (`AGENTS.md`, `README`, or equivalent) and check its working tree without altering it.
2. Inspect the implementation behind the central product claim. Read the actual module(s), boundary/adaptor(s), and at least one focused test or runtime harness.
3. Inspect chronological history with `git log`; identify initial architecture, meaningful corrective iterations, and release/operational work separately.
4. Record evidence in a private drafting note: file paths + symbols, commit IDs/dates, and commands actually run. Do not claim a metric, device result, customer reaction, or cause that the evidence does not establish.
5. Use screenshots only as visual context. Do not infer system behavior from a screenshot alone.

## Required post shape

- **Problem and constraint** — the user interaction or product requirement that made a normal implementation insufficient.
- **Architecture decision** — explain the boundaries, data flow, and why they exist. Include a short, real code excerpt only when it clarifies the decision; redact secrets and omit copied boilerplate.
- **Hard problem(s) and iteration** — at least two concrete trade-offs, failure modes, or corrections, each tied to source/history evidence.
- **How correctness was made repeatable** — tests, deterministic simulation, replay/trace, proof harness, CI, or a clear limitation if none exists.
- **Timeline / change history** — concise milestones, distinguishing implementation work from release bookkeeping.
- **What changed in the developer's approach** — lessons grounded in the above evidence; avoid generic takeaways.
- **Current state** — a restrained pointer to the app/release only after the production narrative.

## Writing rules

- Korean by default when the blog is Korean.
- Start with the engineering problem, not Store links, version numbers, or a feature list.
- Prefer "the code does X" with path/symbol evidence over unsupported claims like "stable" or "optimized".
- Separate facts from interpretation. Label unresolved constraints or unverified device behavior candidly.
- Keep release notes in `/blog/releases`; link there rather than duplicating changelog prose.
- Do not include credentials, private paths outside the repository, user identifiers, or telemetry.

## Blog integration

1. Store the post under `content/blog/projects/<slug>.md` and use the standard frontmatter (`title`, `description`, `socialImage`, `tags`, `draft`, `lang`).
2. Keep `content/blog/projects/index.md` as the category index; add it only if absent.
3. Verify the Explorer exposes Blog → Projects → post. Verify the page at desktop and 390px mobile, and inspect its screenshot.
4. Run the blog's canonical checks (currently Prettier, `tsc --noEmit`, Quartz build, diff check, and tests) before committing.

## Completion report

Report evidence sources inspected, the article's central technical decisions, verification results, URL, commit/push state, and tool/model used. Do not frame a blog post as a product release.
