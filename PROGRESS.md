# Career guide project — durable continuation log

## User request and deliverable
Produce a comprehensive, detailed, evidence-backed Markdown guide to the best careers for someone beginning a US computer science (CS) or computer engineering (CE) bachelor's degree in September 2027, likely graduating around 2031. Preserve work incrementally on GitHub across account changes and context loss.

**Final guide:** `CS_CE_Career_Guide_2027.md` — Edition 1.0, completed September 5, 2026; approximately 24,000 words, 23 numbered sections, 28 annotated reference entries, 45 external source/resource URLs.

**Repository:** https://github.com/gorg667/astra-career-guide  
**Working branch:** `genspark_ai_developer`  
**Pull request:** https://github.com/gorg667/astra-career-guide/pull/1

The main branch contains the initial baseline; the complete work is on the PR branch until the user merges it. Do not mistake an empty main checkout for lost work.

## Recovery procedure
1. Work only in `/home/user/webapp`; every Bash command begins `cd /home/user/webapp &&`; verify `pwd`.
2. Inspect `git status`, branches, and files before changes.
3. `git fetch origin`; if the working branch is absent, `git checkout -b genspark_ai_developer origin/genspark_ai_developer`.
4. Read this file, the guide, and `RESEARCH_NOTES.md`.
5. Preserve any existing user modifications. Commit substantive edits immediately, sync origin/main, keep one cumulative feature commit, push with `--force-with-lease` when squashing, and update the existing PR.
6. No application, server, or deployment is needed. Final delivery is the Markdown file plus the PR link.

## Completed work
- Primary research on BLS occupations, NY Fed graduate outcomes, NACE starting salaries, AI productivity/employment studies, cybersecurity/semiconductor reports, curriculum/accreditation, costs, immigration, clearance/export distinctions, and research eligibility.
- Career recommendations, CS/CE comparison, detailed software/hardware/AI/security/data/research/quant/adjacent-career dossiers.
- AI mechanisms and scenarios, financial stress tests, university selection, 2026–2031 roadmap, seven portfolio blueprints, recruiting/interviews, graduate study, personal constraints, profiles, worksheets, myths, long-run strategy, glossary, and annotated references.
- Multiple account switches restored successfully from GitHub. One unpushed hardware installment and one interrupted concluding installment were reconstructed from conversation context; no known substantive content remains missing.
- Draft marker removed; final edition metadata and reading routes added.

## Important evidence and editorial decisions
- Research cutoff: **September 5, 2026**. No 2031 forecast is described as observed fact.
- BLS main table: **May 2025 wages and 2025–2035 projections**. Ordinary retrieval sometimes returned stale pages; rendered retrieval established current figures. Keep combined categories separate from subgroup wages.
- BLS August 28, 2025 archived release is used ONLY for methodological caveats, not the newer numerical table. Technical Note discusses full-employment assumptions, no business-cycle forecasts, and unusually rapid technology change.
- NY Fed major outcomes: **2024 ACS data released February 4, 2026**, not 2026 Q2. Aggregate graduate series is a different survey/vintage. Exact populations are documented.
- NACE actual Class of 2025 starting base-pay means are not CS-only/CE-only medians, occupational medians, or total compensation.
- AI evidence includes **August 2026 Stanford revision** and **February 2026 METR update**. Descriptive employment gaps are not causal estimates; task productivity is not employment.
- DHS announced a September 15, 2026 transition, not effective at cutoff. Guide flags uncertainty and refers students to DSO/counsel; no individual legal advice.
- Rankings, fit assessments, projects, and scenarios are editorial synthesis, not a validated scoring model. No AI-proof promises, invented probabilities, or precise 2031 salary forecasts.
- Notes preserve evidence, decisions, and next actions—not private chain-of-thought.

## Validation performed
- All 23 planned numbered sections present.
- Internal citation and table-of-contents targets resolve; no duplicate explicit anchors; references 1–28 present.
- Markdown table column counts consistent.
- Every line containing dollar values or percentages reviewed against the claim ledger or clearly labeled illustrative assumptions.
- NY Fed CSV and metadata independently re-read during final audit; CS/CE/EE values and rounding matched.
- Loan arithmetic independently recalculated: at 7% over 120 months, balances $30,000/$80,000/$120,000 yield monthly payments approximately $348.33/$928.87/$1,393.30. Annual values and college-cost example matched.
- External URL pass found no 404/410 responses. Many government/industry sites returned bot-protection 403s to direct requests, despite successful research-tool retrieval. Two Federal Student Aid interactive resources timed out/returned Loading in non-rendered checks; they remain official resource links, not sources for numerical claims. Do not claim every URL passed an unrestricted live fetch.
- DCSA sponsoring-agency process, CPT rules, and the archived BLS methodology were additionally read during final review.

## Immediate final actions if interrupted
1. Re-run final structural assertions and check for draft markers.
2. Verify local and remote branch are synchronized and working tree clean.
3. Update PR description with final scope and validation limitations.
4. Upload `CS_CE_Career_Guide_2027.md` through UploadFileWrapper and give the user the download URL plus GitHub PR URL. If already delivered, no further work is required unless requested.
