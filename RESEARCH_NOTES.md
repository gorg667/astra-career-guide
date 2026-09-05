# Research notes and claim ledger

Research date: **2026-09-05**. These notes preserve findings and limitations for continuation. They are not private reasoning. Final recommendations will be editorial synthesis, not claimed statistical rankings.

## Critical source-retrieval discovery
Some ordinary crawler responses returned older BLS pages (May 2024 pay / 2024–2034 projections) while search indexes and other pages showed the August 27, 2026 update. Direct Python requests to BLS returned 403. Rendered crawling (`render_js: true`) successfully retrieved current summary pages. **Use May 2025 wages and 2025–2035 projections consistently. Do not reuse the older figures below search results.**

## Verified current BLS figures
All wages below are national occupational medians, not entry-level pay or total compensation. Openings are annual averages across 2025–2035, all experience levels, including replacements; not net new jobs or current vacancies.

| Occupation / scope | May 2025 median | 2025 employment | 2025–2035 growth | Annual openings | Source |
|---|---:|---:|---:|---:|---|
| Software developers + QA analysts/testers (combined) | $134,040 combined; developers alone $135,980; QA/testers alone $104,300 | 1,905,400 combined | 10% combined | 106,100 combined | https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm |
| Information security analysts | $129,180 | 192,900 | 21% | 14,100 | https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm |
| Computer hardware engineers | $161,740 | 76,100 | 9% | 4,100 | https://www.bls.gov/ooh/architecture-and-engineering/computer-hardware-engineers.htm |
| Data scientists | $120,230 | 275,600 | 35% | 24,800 | https://www.bls.gov/ooh/math/data-scientists.htm |
| Computer and information research scientists | $140,300 | 38,600 | 22% | 2,900 | https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm |

Security OOH lists related work experience, less than five years. Research scientist OOH typical entry education: master's degree; some federal jobs bachelor's sufficient. These are categories, not universal employer requirements. Hardware category is NOT all CE graduate employment. Applied ML, firmware, SRE, and data engineering do not have clean one-to-one mappings to these categories.

Search-only current indications needing full verification if included: electrical/electronics engineers 8% 2025–2035; network architects 8%, 9,600 openings; programmers -7%, 4,400 openings. Do not include exact unverified salaries for these yet.

## Graduate labor market
- https://www.newyorkfed.org/research/college-labor-market
- Ordinary crawler produced navigation only; direct Python requests + BeautifulSoup read full page successfully.
- 2026:Q2 quarterly highlights: recent college graduates unemployment about 5.6%; underemployment 42%.
- Recent/early-career population: ages 22–27; check detailed methodology and enrollment exclusion before final wording.
- Underemployment means a graduate works in an occupation that typically does not require a bachelor's, NOT unemployment or necessarily low wages. Do not add 5.6% and 42%.
- Aggregate data updates quarterly, major outcomes annually. Need inspect data links for major data; avoid repeating unsourced viral CS/CE unemployment rates.

## AI: latest and contrary evidence
1. Stanford Digital Economy Lab, Brynjolfsson, Chandar, Chen, revised August 12, 2026:
   - https://digitaleconomy.stanford.edu/news/canariesaug26/
   - https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/
   - Through June 2026, employment for ages 22–25 in highly AI-exposed occupations ~19% below counterfactual of keeping pace with less-exposed peers. NOT a 19% unemployment rate, NOT 19% layoffs, NOT a causal estimate.
   - Raw high-exposure employment fell ~11% since Nov 2022 versus ~10% growth for less exposed. Main mechanism appears reduced hiring, not separations. No widespread economy-wide displacement demonstrated.
   - Authors flag education controls, pre-trends, differences between ADP sample and national surveys, specification sensitivity. Older 13% headline is not the current estimate.
2. METR initial RCT, July 10, 2025:
   - https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
   - Experienced open-source developers on familiar repos took 19% longer with early-2025 AI. Need original sample details if included.
3. METR February 24, 2026 update (read in full):
   - https://metr.org/blog/2026-02-24-uplift-update/
   - Follow-up signals possible acceleration but severe selection/compliance/task-timing problems. Authors believe newer tools likely speed developers more, but cannot credibly estimate magnitude from this experiment.
   - Do NOT present original 19% slowdown as a timeless conclusion about current tools.
4. Cui et al., June 2025, three corporate field experiments:
   - https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/
   - 4,867 developers, pooled 26.08% increase in completed tasks, SE 10.3%; less experienced higher adoption/gains. Individual trials noisy. Corporate/vendor-linked setting and selected tasks; not a claim about whole-job replacement or 2031 labor demand.

## Sector and education leads
- ISC2 December 4, 2025 workforce study: https://www.isc2.org/Insights/2025/12/2025-ISC2-Cybersecurity-Workforce-Study . Search finds budget constraints and skills gaps; full read pending (ordinary crawler mostly footer).
- SIA/Oxford Economics July 25, 2023: https://www.semiconductors.org/chipping-away-assessing-and-addressing-the-labor-market-gap-facing-the-u-s-semiconductor-industry/ . Widely cited 115,000 added jobs / 67,000 potential unfilled by 2030 is an industry-sponsored conditional projection, not current job postings, not all bachelor's chip-design roles. Full read pending.
- ACM/IEEE-CS/AAAI CS2023: https://csed.acm.org/ ; endorsed 2024. https://www.acm.org/education/curricula-recommendations includes CE2016 too. Use to support foundational breadth, not a specific university course list.

## Additional verified findings recovered after account switch

### More current BLS summaries (rendered crawler verified)
- Electrical/electronics engineers: combined median $125,040, employment 297,900, growth 8%, annual openings 16,300. Electrical alone median $120,630; electronics except computer $130,220. https://www.bls.gov/ooh/architecture-and-engineering/electrical-and-electronics-engineers.htm
- Network architects: median $134,050, employment 181,800, growth 8%, annual openings 9,600; typical related experience five years or more. https://www.bls.gov/ooh/computer-and-information-technology/computer-network-architects.htm
- Computer programmers: median $100,390, employment 110,800, growth -7%, annual replacement openings 4,400. https://www.bls.gov/ooh/computer-and-information-technology/computer-programmers.htm
- All above use May 2025 pay / 2025–2035 projections. Earlier search-only uncertainty is resolved.

### NY Fed downloadable data verified directly
- CSV: https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/college-labor-outcomes-by-major-data.csv
- Metadata: https://www.newyorkfed.org/medialibrary/research/interactives/data/college-labor-market/college-labor-chart-meta.json
- Major outcomes release February 4, 2026, **underlying year 2024**, not 2026 Q2.
- CS: unemployment 6.992%, underemployment 19.127%, median early-career wage $87,000; mid-career $120,000.
- CE: unemployment 7.783%, underemployment 15.835%, early-career $90,000; mid-career $131,000.
- EE: unemployment 3.159%, underemployment 21.106%, early-career $82,000; mid-career $123,000.
- Round rates to one decimal; avoid ranking on noisy single-year subgroup estimates.
- Unemployment/underemployment: ages 22–27, bachelor's or higher. Major wages: full-time workers with bachelor's only, early ages 22–27 and mid 35–45. All exclude currently enrolled. Major outcomes use ACS (IPUMS); quarterly overall rates use CPS, seasonally adjusted and three-month smoothed. Do not directly compare the different vintages/populations as contemporaneous.
- Aggregate quarterly release August 6, 2026, 2026 Q2: 5.6% unemployment, 42% underemployment (all majors). Major rates are NOT conditional on having sought computing employment.

### Starting salaries — actual versus projection
- https://www.naceweb.org/job-market/compensation/starting-salaries-climb-for-the-class-of-2025 (September 2026 public summary, read full text)
- Summer 2026 Salary Survey, actual Class of 2025 reported starting base salaries: computer and information sciences broad category mean $91,517; engineering broad category $81,518; all bachelor's $67,983.
- Data through Dec 31, 2025, reported through May 31, 2026; about 373 institutions; analysis mainly >80,000 bachelor's graduates. Selection/reporting limits; NOT CS-only or CE-only, not all graduates, no bonuses/equity/benefits/overtime.
- https://www.naceweb.org/job-market/compensation/class-of-2026-salary-projections-are-promising (Jan 26, 2026): projected CS category mean $81,535 and engineering $81,198, based on 150 employer surveys, 20.3% response. Do not infer a pay decline by comparing this different survey to Class of 2025 actual data. Prefer actual data as main anchor.

### AI study original sample
METR July 2025 RCT full page read: 16 experienced developers, 246 real issues on familiar substantial open-source repositories. 19% longer with early-2025 AI. Retain February 2026 update caveat prominently.

### Sector reports read fully
- ISC2 press summary (rendered): https://www.isc2.org/Insights/2025/12/ISC2-Publishes-2025-Cybersecurity-Workforce-Study
- Survey of 16,029 practitioners/decision makers, May–June 2025, global (NOT US-only). 33% insufficient staffing resources, 29% cannot afford needed skills; 36% budget cuts and 24% layoffs reported; workforce skills shortages do not equal funded vacancies. Do not represent these respondent reports as employer-population estimates.
- SIA/Oxford July 25, 2023 report summary: https://www.semiconductors.org/america-faces-significant-shortage-of-tech-workers-in-semiconductor-industry-and-throughout-u-s-economy/
- Projected workforce 345,000 to 460,000 by 2030, ~115,000 growth; potential 67,000 shortfall includes 26,400 technicians, 27,300 engineering, 13,400 CS (rounding). Industry-sponsored, conditional, dated 2023; not realized jobs or vacancies. Fab construction investment is not identical to chip-design headcount.

### Curriculum / accreditation / financial resources
- ACM curricula recommendations full page read: https://www.acm.org/education/curricula-recommendations ; CE2016 and CS2023 listed.
- ABET 2026–2027 engineering criteria read: https://www.abet.org/accreditation/accreditation-criteria/criteria-for-accrediting-engineering-programs-2026-2027/ . General 30 semester hours math/basic science, 45 engineering topics, culminating design; computer engineering program criteria include discrete math, probability/statistics, calculus and hardware/software systems. Distinguish program EAC vs CAC vs ETAC, not institutional accreditation. Need not quote credit counts in final.
- https://collegescorecard.ed.gov/data/ and https://collegescorecard.ed.gov/data/glossary/ ; field-of-study earnings cover federally aided completers with metric-specific exclusions, not causal school value-add. Search verified, inspect metric definition when applying.
- https://collegecost.ed.gov/net-price ; https://studentaid.gov/repayment-calculator ; https://studentaid.gov/aid-estimator . Resource links, not borrowed-rate predictions.
- https://www.nist.gov/itl/ai-risk-management-framework and https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence . Voluntary AI RMF / July 26, 2024 GenAI profile; relevance to evaluation, risk and governance, not mandated licensing or evidence of occupation size.

### Immigration and access — very time-sensitive
- USCIS STEM OPT full page read: https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-extension-for-stem-students-stem-opt . Eligible F-1 students can seek 24-month extension after regular OPT. E-Verify, bona fide employer relationship, I-983 training, relevant degree/program eligibility, reporting rules; no automatic authorization or permanent residence.
- Regular OPT official reference: https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students (up to 12 months; search verified).
- CPT official reference: https://studyinthestates.dhs.gov/sevis-help-hub/student-records/fm-student-employment/f-1-curricular-practical-training-cpt ; 12 months or more full-time CPT eliminates OPT eligibility; consult DSO before any work and when planning co-op. Part-time different.
- **New rule found and full official quick facts read:** https://studyinthestates.dhs.gov/final-rule-establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-quick . DHS says July 17, 2026 final rule effective September 15, 2026; fixed admission up to program length/max four years, extension-of-stay procedures, first-year undergraduate major/transfer restrictions with limited exceptions, graduate restrictions, 30-day departure period. Not yet effective at research cutoff; litigation/changes possible. Do not give rote old duration-of-status advice. Main final guide should flag this and send user to DSO/counsel; do not reproduce full procedural instructions.
- Corroborating Federal Register PDF found: https://www.govinfo.gov/content/pkg/FR-2026-07-17/pdf/2026-14439.pdf (search verified). DHS companion July announcement: https://studyinthestates.dhs.gov/2026/07/dhs-publishes-final-rule-establishing-a-fixed-time-period-of-admission-and-an-extension-of
- DCSA: https://www.dcsa.mil/Industrial-Security/International-Programs/Security-Assurances-for-Personnel-Facilities/ ; normal personnel clearance requires citizenship; rare Limited Access Authorization is not clearance. Employer sponsors, not personal purchase. Search verified.
- DOJ fact sheet full PDF read: https://www.justice.gov/crt/media/1287536/dl?inline (revised March 2024). U.S. persons include citizens, nationals, permanent residents, refugees, asylees. ITAR/EAR do not impose citizen-only hiring. Export access, legal work authorization, and security clearance are distinct. Some access may require authorization; lawful job restrictions can arise from other rules/contracts.
- NSF REU: https://www.nsf.gov/funding/initiatives/reu/students ; NSF-funded participants citizens, nationals, permanent residents; separately funded university research may differ.

### Concrete job-posting illustration (not market survey)
- NVIDIA SoC ASIC Verification Engineer, New College Grad 2026, JR2015202: https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/job/SoC-ASIC-Verification-Engineer---New-College-Grad-2026_JR2015202-1 . Rendered full read succeeded.
- Accepts BS/MS/PhD EE/CS/CE or equivalent; relevant ASIC verification, C++/OOP/UVM/SystemVerilog, testbenches, CPU/SoC architecture. Shows BS-accessible pathway but meaningful specialty skills required.
- Posting Level 1 base range $100,000–$166,750, Level 2 $116,000–$189,750; equity additional; location/experience vary. Do NOT use as representative national pay; original minimum application date Mar 28, 2026 does not prove still open at cutoff. Prefer skills example without salary.

## Edition 2.0 research — September 5, 2026

### Fresh baseline verification
Re-read BLS software OOH, Stanford `/news/canariesaug26/`, NACE actual Class of 2025 salary article, and DHS fixed-period quick facts. Their consequential claims match Edition 1.0. Do not replace them with older remembered data.

### Federal financing — verified, not search-only
- https://studentaid.gov/announcements-events/big-updates and `/definitions` rendered reads show August 24, 2026 update and June 24 preliminary stay affecting portions of professional-degree definition. Accordion contents are missing from retrieved text; do not rely on these retrievals alone for numerical limits.
- https://www.govinfo.gov/content/pkg/FR-2026-05-01/html/2026-08556.htm : complete official final rule retrieved directly with Python requests + BeautifulSoup (~951,073 text characters). Operative amendments to 34 CFR 685.203(f)(2)(i): all parents combined, per dependent student, $20,000 annual cap for periods beginning July 1, 2026 onward. Section (g)(2): $65,000 aggregate, disregarding repayments/forgiveness/cancellation/discharge; returned funds treated separately. Sections (f)(2)/(g)(3) give pre-July-2026 enrollment/borrowing exceptions, not ordinary first-time 2027 entrants. Section (j)(1) retains cost-of-attendance minus aid ceiling. Section (m) describes less-than-full-time student Direct Loan proration.
- Rule discussion at page 23817 explicitly says ordinary dependent-undergraduate aggregate remains $31,000; annual limits also apply. Do not describe the aggregate as the standard four-year amount or an annual allowance. No undergraduate annual numerical schedule added because not separately verified.
- Rule establishes Grad PLUS phaseout with transition exceptions; no promise that a 2031 CS/CE MS can borrow under old terms. Avoid predicting future loan rules or resolving litigated professional-degree classification.
- Guide reference 29 contains the above sources. Illustration $20k x 3 = $60k leaves $5k, not another $20k. Runway example ($14k-$2k)/$2.4k = 5 months; six-month cash need = $16.4k. No probability of unemployment implied.

### First-destination denominators
- https://www.naceweb.org/job-market/graduate-outcomes/first-destination/standards-and-protocols
- https://www.naceweb.org/job-market/graduate-outcomes/first-destination/first-destination-standards-and-protocols-key-questions-and-answers/
- Full reads establish knowledge rate (known/all graduates), not response rate; sources may extend beyond responses. Career outcomes include employment/service/military/continuing education; denominator excludes unknown and not seeking. Illustrative guide cohort: 100 grads, 80 known, 45 employed + 15 education + 10 seeking + 10 not seeking; outcomes60/70=85.7%, knowledge80%. No claim about any real program. Reference 30.

### Learning resource pages verified for planned resource section
- https://cs50.harvard.edu/x/ — free OpenCourseWare; intro C/Python/SQL; feedback may require account, paid certificate/credit separate.
- https://missing.csail.mit.edu/ — 2026 syllabus, shell/Git/debugging/profiling/shipping/agentic tools. No claim that all students need particular tools.
- https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/ — official OCW lectures/problems, algorithms/data structures.
- https://pages.cs.wisc.edu/~remzi/OSTEP/ — free chapter PDFs; virtualization/concurrency/persistence; bundled PDF/print can cost money.
- https://www.postgresql.org/docs/current/tutorial.html — introductory relational/SQL tutorial; not comprehensive; additional official docs available.
- https://www.statlearning.com/ — ISL author site, R and Python editions, labs and downloadable PDFs.
- https://www.nand2tetris.org/course — 12 projects hardware/software; educational HDL differs from industrial HDL/physical electronics.
- https://hdlbits.01xz.net/wiki/Main_Page — Verilog exercises with simulated reference tests; not full-chip signoff or UVM training.
- https://portswigger.net/web-security — free vendor-supported academy and authorized labs; commercial certification/tools separate; not employment evidence.
- https://sre.google/sre-book/table-of-contents/ — free online chapters on SLOs, toil, monitoring, incidents, postmortems, onboarding; Google practice is context-specific.

### Additional retrieval decisions
- https://help.usajobs.gov/working-in-government/unique-hiring-paths/students — paid Pathways Internship route verified. Completion may permit conversion, not guarantee it. Prefer this public resource to OPM practitioner page, which mixes inconsistent old/current hour requirements; omit numerical conversion hours.
- DORA 2025 pages returned only footer/partners even after rendered retry. No new DORA empirical claim added; existing randomized/productivity and employment evidence adequate.

### Final added sources and implementation
- https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/ and https://stat110.hsites.harvard.edu/ read fully for the math rows. Twelve learning resources now in section11.8/reference31; appropriate prerequisites and limitations noted.
- https://help.usajobs.gov/working-in-government/unique-hiring-paths/recent-graduates read fully: application within two years, veteran exception up to six, developmental appointments. Guide avoids unnecessary numerical procedural rules and directs readers to actual announcements. Reference32 includes both student and recent-graduate public pages.
- https://www.dol.gov/agencies/whd/fact-sheets/71-flsa-internships read fully: January2018 updated public fact sheet, for-profit primary-beneficiary test, no single factor determinative. No categorical claim that all unpaid internships are illegal; state rules/individual facts separate.
- https://consumer.ftc.gov/articles/job-scams read fully: job-promise fees and fake checks/forwarding funds/gift cards are major scam warnings; apparent bank clearance not proof check valid. Reference33 groups DOL/FTC safeguards, distinguishing added untrusted-code security advice.
- All planned substantive additions implemented, including three fictional decision cases. No data from a claimed representative job-posting sample, fabricated hiring probabilities, or unverified 2031 salaries added.

### Final revision audit
- Edition 2.0 completed: 31,700 words, 23 main sections, 33 reference groups, 29 tables, 62 unique anchors, 86 resolving internal links, 67 distinct external URLs. Subsection sequences and all reference uses validated; no draft/conflict markers; diff whitespace check passed.
- Fresh BLS ordinary retrieval again returned older 2024 data for hardware/security/data science. Rendered retrieval independently confirmed current guide rows: hardware $161,740 /76,100 /9% /4,100; data science $120,230 /275,600 /35% /24,800; security $129,180 /192,900 /21% /14,100. Do not silently mix vintages.
- Fresh NY Fed CSV and full metadata again confirmed the CS/CE/EE values and 2024 major-data year versus 2026Q2 aggregate series.
- Final external-link requests: 41 HTTP200, 26 HTTP403, zero404/410/timeouts across67 URLs. Many403 sources were read via research tools; successful status alone does not verify contents.
- Independently recalculated all new numeric illustrations and baseline loans/offer/school cost examples. Detailed results and continuation steps are in PROGRESS.md.
- Remaining delivery-only actions: final commit/push and PR#2 update if not already done, verify clean synchronized branch, upload final Markdown. No additional research or expansion needed.
