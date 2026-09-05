# Career guide project — durable continuation log

## Deliverable and current status

**User request:** Improve the existing comprehensive Markdown guide to the best careers for someone entering a US computer science (CS) or computer engineering (CE) bachelor's degree in September 2027, likely graduating around 2031. Preserve work incrementally on GitHub across interruptions/account changes.

**Final guide:** `CS_CE_Career_Guide_2027.md` — **Edition 2.0**, revised September 5, 2026. Final measured size: **31,700 words, 2,678 lines, 23 numbered sections, 33 annotated reference entries, 29 tables, 12 curated learning resources, 67 distinct external URLs**. Net increase over Edition 1.0: 7,187 words. The aim was decision usefulness, not length alone.

**Status:** Substantive work and final structural/numerical validation complete. Final commit/push, PR update, and Markdown upload/delivery are the only remaining actions if this checkpoint is interrupted before they finish. Do not restart the research or expand the guide unnecessarily.

**Repository:** https://github.com/gorg667/astra-career-guide

**Working branch:** `genspark_ai_developer`

**Active revision PR:** https://github.com/gorg667/astra-career-guide/pull/2

**Edition 1.0 merged PR:** https://github.com/gorg667/astra-career-guide/pull/1

**Merged baseline:** `43e057c` on main. Edition 2.0 remains on the revision branch until PR #2 is merged.

## Recovery procedure

1. All writes stay in `/home/user/webapp`; begin every Bash command with `cd /home/user/webapp &&`; verify `pwd`.
2. Inspect `git status`, branches, and files before modifying anything. Account switches repeatedly recreated the sandbox on main, not on the revision branch.
3. `git fetch origin`; switch to the existing `genspark_ai_developer` branch, or create it tracking `origin/genspark_ai_developer` if absent. Do not overwrite uncommitted user work.
4. Read this log and `RESEARCH_NOTES.md`; inspect the relevant guide sections. The complete guide was read during the revision, and all substantive installments were pushed successfully before account changes.
5. Commit changes promptly. Fetch/merge current origin/main; squash only revision commits relative to that base; push with `--force-with-lease`; update PR #2. Never squash away the merged Edition 1.0 history.
6. No application, HTTP service, or deployment is needed. Deliver the `.md` file through UploadFileWrapper plus PR/GitHub links.

## What Edition 2.0 added

- Section 1.6: actionable decision brief; 2.5: hard constraints before weighted preferences.
- Section 3.6: why occupation openings, degree completions, and job-board applicant counts cannot yield personal hiring odds.
- Sections 5.1–5.2: eight practical readiness exercises and realistic specialty-transition costs.
- Section 8.9: employer funding/business-risk map; 9.8: AI-assisted engineering verification exercise; 9.9: correlated risks across supposed fallbacks.
- Sections 10.9–10.10: verified July 2026 borrowing changes and job-search/start-date cash runway.
- Section 11.2: NACE knowledge-rate versus outcomes-rate denominator example; entrant/completer distinction.
- Sections 11.8–11.9: twelve original learning resources with prerequisites/evidence and foundation troubleshooting.
- Sections 14.10–14.11: written-offer/internship due diligence, unpaid-work/scam safeguards, public-sector and laboratory discovery routes.
- Section 17.3: three fictional worked decisions; 18.6–18.7: accessible-opportunity audit and provisional decision memo.
- References 29–33, top-level practical-tool navigation, revision notes, and final edition metadata.

## Evidence decisions to preserve

- Cutoff is **September 5, 2026**; 2031 outcomes are not observed facts. Rankings, exercises, sample scopes, scenarios, and fictional cases are editorial tools, not a validated scoring model or representative posting survey.
- Main BLS table consistently uses **May 2025 wages / 2025–2035 projections**. Ordinary crawler responses sometimes return older 2024/2024–2034 pages. Fresh rendered checks of hardware, data science, and security confirmed the guide's newer values; software was also freshly checked. Do not replace them with older remembered figures.
- NY Fed major table: **2024 ACS, released February 4, 2026**. Separate aggregate series: **2026 Q2**, released August 6. Fresh direct CSV and metadata retrieval reconfirmed CS/CE/EE figures and populations.
- NACE Class of 2025 salaries are reported broad-category base-pay means, not CS-only/CE-only medians or total compensation. Fresh article read matched the baseline.
- Stanford August 2026 revision is descriptive, not causal; METR slowdown is paired with its February 2026 follow-up caveat. No single productivity result establishes employment effects.
- DHS fixed-period rule is scheduled for **September 15, 2026**, after the cutoff; fresh official quick facts matched. No individualized immigration instructions.
- New Parent PLUS caps were checked in the **complete official GovInfo May 1, 2026 final rule**, including operative 34 CFR 685.203(f)/(g), not merely search snippets or missing FSA accordions. Per-student caps apply across parents; transition exceptions and other eligibility limits matter. Graduate classification litigation is flagged, not resolved by this guide.
- Learning resources and job-search safeguards were checked on original-provider/official pages. Details and URLs are in the research ledger.
- Notes retain findings, sources, decisions, and next actions—not private chain-of-thought.

## Final validation results

- All 23 main sections, consecutive subsection numbers, and references 1–33 present; every reference cited.
- **62 unique explicit anchors, 86 internal links**, all resolving; **29 Markdown tables** have consistent column counts.
- No TODO/TBD, draft-validation markers, conflict markers, or malformed/bare external URLs in the final guide. `git diff --check` passed.
- Arithmetic independently recalculated: 7%/120-month loan balances $30k/$80k/$120k yield $348.33/$928.87/$1,393.30 monthly; annual rounded values match. Offer annualization and four-year cost difference match.
- New examples verified: $20k × 3 leaves $5k under a $65k cap; ($14k − $2k)/$2.4k = five months; six-month need $16.4k. Fictional NACE cohort sums to 80 known, outcomes 60/70 = 85.7%.
- External-link pass: **67 URLs, 41 HTTP 200 and 26 HTTP 403**, no 404/410 or timeouts in the final pass. Access-denied results often reflect bot protection; many corresponding pages were successfully read via research tools. HTTP 200 alone is not content verification. Do not claim every URL passed an unrestricted live fetch.
- Added numerical claims reviewed against the ledger or explicitly labeled illustrations. New recommendations do not invent hiring probabilities or 2031 salary forecasts.

## Final actions if interrupted

1. Check whether final changes are committed/pushed; finish only missing actions.
2. Verify local HEAD equals the remote revision branch and the working tree is clean.
3. Ensure PR #2 description reports the completed scope and validation limits.
4. Upload `CS_CE_Career_Guide_2027.md` and give the user the download URL plus https://github.com/gorg667/astra-career-guide/pull/2.
5. If delivery already occurred, no further action is needed unless requested.
