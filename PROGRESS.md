# Career guide project — durable continuation log

## Website phase — September 5, 2026 (current task)

The user now requests a polished, pragmatic, comprehensive website for the completed guide, with incremental GitHub checkpoints. Edition 2 was merged through PR #2; current website baseline is `b30949c` on main. The historical delivery instructions below refer to the earlier Markdown-only task and no longer constrain the website phase.

**Implementation plan:** React + TypeScript + Vite static site. Keep `CS_CE_Career_Guide_2027.md` as canonical content, parse its 23 chapters and all explicit citation anchors at build/runtime, and sanitize rendered Markdown. Add full-text search, chapter navigation, reading progress/bookmarks, career comparison, a roadmap/checklist, editable decision worksheet, and a transparent amortization calculator. Persist personal state only in the browser; support data export. Use a restrained editorial visual system (warm off-white, deep green, clear typography), responsive sidebar, keyboard navigation, and print styles. No paid media generation or new factual market forecasts needed.

## Website completion checkpoint — September 5, 2026

**Status:** Implementation and final production validation COMPLETE. Preserve the site; do not restart development or research. Active PR: https://github.com/gorg667/astra-career-guide/pull/3. The original Markdown is unchanged from merged Edition 2. Notes describe decisions and results, not private reasoning.

**Delivered interface:** Restrained off-white/green editorial design; responsive sidebar and keyboard-contained mobile navigation; unabridged 23-chapter reader with 150 subsections, 212 routable anchors, citation deep links, scroll-aware TOC, larger-text option, print styles, bookmarks, and explicit chapter completion; local full-text search that lands at the matching subsection; 12 career families with filtering and three-way comparison; five-stage/20-milestone college roadmap; nine-prompt decision worksheet with Markdown export; transparent fixed-rate amortization and net-cost comparison calculators. Downloaded guide is byte-identical to canonical Markdown. Personal notes/progress remain browser-local; unavailable storage displays a warning. No invented career scores, salary projections, or AI-proof claims.

**Final verified results:**
- `npm run build`: TypeScript and Vite production build PASS, no oversized-chunk warning. Assets split into app, source text, and vendor chunks; total JS approximately 188 KB gzip, CSS approximately 9 KB gzip.
- `npm run format:check`: PASS. All app, test, and configuration source formatted with Prettier.
- `npm test`: **7/7 PASS**, covering canonical chapter/subsection/table preservation, all explicit and curated anchor links, 33 references, loan arithmetic, invalid inputs, and deep-link search.
- `npm run test:e2e`: **11/11 PASS against production build** (2 workers, 22.9 seconds). Covers all chapter rendering, source download equality, filtering, bookmarks/read progress/text-size persistence, references/back navigation/printing, search, comparison limit and persistence, all roadmap stage links, checklist persistence, actual exported worksheet text, reset confirmation, calculator edge cases, mobile focus trap, storage failures, and page overflow across 320/390/768/1024/1440 px widths.
- Axe checks using WCAG 2 A/AA and 2.1 AA tags: **12/12 page/viewport audits with zero detected violations** (home, chapter 1, careers, roadmap, worksheet, calculator at 1440 and 390 px). Automated checks are not a claim of complete accessibility certification.
- Actual public sandbox production URL loaded in Playwright successfully. Local screenshot and audit report live under ignored `.cache/review/`; not required to rebuild.
- `npm ci` audit reported zero vulnerabilities at validation time.

**Bugs caught and fixed during validation:** Four roadmap anchor spelling mismatches; citation new-tab routing; search landing at chapter top rather than relevant text; mobile focus containment; article DOM replacement losing focused anchors; insufficient muted-text contrast. Reader article memoization also avoids needless long-document DOM updates.

**Hosting / CI permissions:** GitHub Pages creation returned **403 Resource not accessible by integration**. GitHub also rejected creation of `.github/workflows/website.yml` because the integration lacks `workflows` permission. No alternate-credential retry. The example was moved to **inactive** `website.workflow.example.yml`; source push then succeeded. It is a template, NOT active CI. The repository owner can COPY it to `.github/workflows/website.yml`, enable Pages with GitHub Actions as the source, set the repository Actions variable `ENABLE_PAGES=true`, and rerun the workflow. It checks format/unit/build/browser tests before deployment. New empty `github-pages` environment restricts deployment branches to `main` and `genspark_ai_developer`; no existing environment policy was changed. No permanent website deployment is claimed. Genspark-hosted deployment remains an option only after user confirmation (asked in chat).

**Temporary production preview (expires with sandbox):** https://3000-iqxtg996w7rtmn64oqv3l-18e660f9.sandbox.novita.ai . Started with `npm run preview -- --port 3000`. On a new account/sandbox: fetch and restore the development branch, run `npm ci`, `npm run build`, start preview, and obtain a NEW URL with GetServiceUrl. Do not reuse expired previews.

**Final delivery / recovery:** Final changes are to be squashed into one website commit relative to merged `origin/main`, then pushed with force-with-lease and PR #3 updated. Verify remote equality/clean status. Package `dist/` as a ZIP (serve through HTTP; ES modules do not support direct file opening), include original Markdown, upload it, and share preview, ZIP, PR links. If the chat already delivered these, only hosting permission remains outstanding. Local archives belong in ignored `.cache/`; all source and continuation notes are on GitHub.

**Commands:** `npm ci`; `npm run dev`; `npm run build`; `npm run preview -- --port 3000`; `npm test`; `npm run test:e2e`; `npm run format:check`. Browser tests launch an HTTP preview automatically if none exists. Native browser dependencies are normally installed with `npx playwright install --with-deps chromium`; use the workspace-only workaround below in this constrained sandbox.

**Browser testing recovery:** Sandbox lacks some Chromium libraries; do not install system packages outside workspace. Use `npm ci --cache /home/user/webapp/.npm`, `PLAYWRIGHT_BROWSERS_PATH=/home/user/webapp/.cache/ms-playwright npx playwright install chromium`. Download Debian packages with `apt-get download libatk1.0-0t64 libatk-bridge2.0-0t64 libxcomposite1 libxdamage1 libatspi2.0-0t64` into `.cache/browser-libs`, extract there with `dpkg-deb -x`. Run browser with `LD_LIBRARY_PATH=/home/user/webapp/.cache/browser-libs/usr/lib/x86_64-linux-gnu`, `TMPDIR=/home/user/webapp/.cache/tmp`, and the above PLAYWRIGHT_BROWSERS_PATH. This worked in the previous sandbox. Keep browser images/temp files under ignored `.cache/`.

**Resume:** Read this section first, then inspect git status/log and app files. Fetch remote before changes. Keep writes inside `/home/user/webapp`, use local npm cache, commit checkpoints immediately and update the active website PR. Do not recreate the old guide revision PR.

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
