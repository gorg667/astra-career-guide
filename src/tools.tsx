import { useState } from 'react';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { chapters, guideLink } from './content';
import { careers, phases, worksheetFields, type Career } from './data';
import { calculateLoan } from './logic';
import { downloadFile, type StateProps, toggleList } from './state';
import { CareerIcon, PageIntro, TextLink } from './ui';
export function CareerExplorer({
  state,
  setState,
  mode,
}: StateProps & { mode: string }) {
  const [category, setCategory] = useState('All paths');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(false);
  const selected = careers.filter((c) => state.selected.includes(c.id));
  const visible = careers.filter(
    (c) =>
      (category === 'All paths' || c.category === category) &&
      `${c.title} ${c.description} ${c.skills}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const toggle = (id: string) => {
    if (!state.selected.includes(id) && state.selected.length >= 3) {
      setLimit(true);
      return;
    }
    setLimit(false);
    setState((s) => ({ ...s, selected: toggleList(s.selected, id) }));
  };
  const comparison = mode === 'compare';
  return (
    <>
      <PageIntro
        eyebrow={
          comparison
            ? 'SIDE BY SIDE, WITHOUT THE HYPE'
            : '12 CAREER FAMILIES · MANY POSSIBLE ROUTES'
        }
        title={
          comparison
            ? 'Compare the trade-offs.'
            : 'Find work worth getting good at.'
        }
      >
        {comparison
          ? 'Choose two or three paths. Compare the preparation and constraints, not just a salary headline.'
          : 'Explore what the work involves, how graduates enter, and what makes each path a good—or difficult—fit.'}
      </PageIntro>
      <div className="callout">
        <Info size={20} />
        <p>
          These are <strong>editorial planning summaries</strong>, not hiring
          forecasts. “Bachelor’s accessible” means real entry routes exist—not
          that entry is easy.{' '}
          <a href="#/guide/comparison">Read the full comparison.</a>
        </p>
      </div>
      {comparison && (
        <>
          <div className="compare-pickers">
            {[0, 1, 2].map((i) => (
              <label key={i}>
                <span>
                  PATH {i + 1}
                  {i === 2 ? ' (OPTIONAL)' : ''}
                </span>
                <select
                  aria-label={`Comparison path ${i + 1}`}
                  value={state.selected[i] || ''}
                  onChange={(e) =>
                    setState((s) => {
                      const next = [...s.selected];
                      next[i] = e.target.value;
                      return { ...s, selected: next.filter(Boolean) };
                    })
                  }
                >
                  <option value="">Choose a career family</option>
                  {careers.map((c) => (
                    <option
                      disabled={
                        state.selected.includes(c.id) &&
                        state.selected[i] !== c.id
                      }
                      key={c.id}
                      value={c.id}
                    >
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          {selected.length >= 2 ? (
            <ComparisonTable
              list={state.selected
                .map((id) => careers.find((c) => c.id === id))
                .filter((c): c is Career => !!c)}
            />
          ) : (
            <div className="empty-state small">
              <ArrowLeftRight size={30} />
              <h2>
                {selected.length
                  ? 'Add one more path to compare.'
                  : 'Start with two possibilities.'}
              </h2>
              <p>
                Use the selectors above or add paths from the cards below. Your
                choices are saved in this browser.
              </p>
            </div>
          )}
          <div className="section-heading compare-browse">
            <h2>Explore other possibilities</h2>
            <button
              className="button plain compact"
              onClick={() => setState((s) => ({ ...s, selected: [] }))}
            >
              Clear comparison
            </button>
          </div>
        </>
      )}
      <div className="career-filter-bar">
        <div className="filter-tabs" aria-label="Filter by career family">
          {[
            'All paths',
            'Software & data',
            'Hardware & physical',
            'Specialized & adjacent',
          ].map((cat) => (
            <button
              key={cat}
              aria-pressed={category === cat}
              className={category === cat ? 'active' : ''}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="career-search">
          <span className="sr-only">Search career families</span>
          <input
            placeholder="Find a path or skill…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="career-result-count" role="status">
        {visible.length} career {visible.length === 1 ? 'family' : 'families'}
        {category !== 'All paths' ? ` · ${category}` : ''}
      </div>
      <div className="career-grid">
        {visible.map((c) => (
          <article
            className={`career-card ${state.selected.includes(c.id) ? 'chosen' : ''}`}
            key={c.id}
          >
            <div className="career-card-top">
              <span
                className={`career-icon ${c.category === 'Hardware & physical' ? 'ochre' : c.category === 'Specialized & adjacent' ? 'lavender' : ''}`}
              >
                <CareerIcon name={c.icon} />
              </span>
              <span>{c.category}</span>
            </div>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <span className="career-tag">{c.tag}</span>
            <dl>
              <dt>ROUTE IN</dt>
              <dd>{c.entry}</dd>
              <dt>THE TRADE-OFF</dt>
              <dd>{c.tradeoff}</dd>
            </dl>
            <div className="career-card-bottom">
              <TextLink href={guideLink(c.anchor)}>Read the dossier</TextLink>
              <button
                className={`button compact ${state.selected.includes(c.id) ? 'selected' : 'secondary'}`}
                onClick={() => toggle(c.id)}
                aria-pressed={state.selected.includes(c.id)}
                aria-label={`${state.selected.includes(c.id) ? 'Remove' : 'Add'} ${c.title} ${state.selected.includes(c.id) ? 'from' : 'to'} comparison`}
              >
                {state.selected.includes(c.id) ? (
                  <Check size={14} />
                ) : (
                  <Plus size={14} />
                )}
                Compare
              </button>
            </div>
          </article>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state">
          <h2>No paths match that search.</h2>
          <p>Try a broader skill or reset the filters.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery('');
              setCategory('All paths');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
      {state.selected.length > 0 && !comparison && (
        <div className="comparison-tray">
          <div>
            <ArrowLeftRight size={18} />
            <strong>{state.selected.length} of 3 paths selected</strong>
            <span>{selected.map((c) => c.title).join(' · ')}</span>
          </div>
          <button
            className="icon-button"
            aria-label="Clear selected paths"
            onClick={() => setState((s) => ({ ...s, selected: [] }))}
          >
            <X size={18} />
          </button>
          <a href="#/compare" className="button primary">
            Compare paths
            <ArrowRight size={16} />
          </a>
        </div>
      )}
      {limit && (
        <div className="limit-notice" role="alert">
          Compare up to three paths at a time. Remove one to add another.
          <button
            aria-label="Dismiss limit notice"
            className="icon-button"
            onClick={() => setLimit(false)}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
function ComparisonTable({ list }: { list: Career[] }) {
  const rows: { label: string; key: keyof Career }[] = [
    { label: 'The day-to-day work', key: 'description' },
    { label: 'Bachelor’s entry', key: 'entry' },
    { label: 'Usual degree fit', key: 'degree' },
    { label: 'What makes you credible', key: 'skills' },
    { label: 'The important trade-off', key: 'tradeoff' },
    { label: 'A useful bridge or fallback', key: 'bridge' },
  ];
  return (
    <>
      <div
        className="comparison-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Career comparison, scroll horizontally on small screens"
      >
        <table className="comparison-table">
          <caption className="sr-only">
            Comparison of selected career families
          </caption>
          <thead>
            <tr>
              <th scope="col">WHAT MATTERS</th>
              {list.map((c) => (
                <th scope="col" key={c.id}>
                  <CareerIcon name={c.icon} />
                  <span>{c.title}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {list.map((c) => (
                  <td key={c.id}>{c[row.key]}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row">Go deeper</th>
              {list.map((c) => (
                <td key={c.id}>
                  <TextLink href={guideLink(c.anchor)}>
                    Full career dossier
                  </TextLink>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="quiet-note">
        <Info size={16} />
        <span>
          Fallbacks have transition costs. Check which skills actually transfer
          in{' '}
          <a href={guideLink('52-fallbacks-have-transition-costs')}>
            section 5.2
          </a>
          .
        </span>
      </div>
      <a className="button secondary" href="#/plan">
        Capture your decision in a plan
        <ArrowRight size={16} />
      </a>
    </>
  );
}
export function Roadmap({ state, setState }: StateProps) {
  const [active, setActive] = useState(0);
  const phase = phases[active];
  const allTasks = phases.flatMap((p, i) => p.tasks.map((_, j) => `${i}-${j}`));
  const count = allTasks.filter((t) => state.tasks.includes(t)).length;
  return (
    <>
      <PageIntro
        eyebrow="FALL 2027 → APPROXIMATELY SPRING 2031"
        title="Build the next step, not the whole future."
      >
        A conventional four-year route with room to adapt. Co-ops, transfers,
        health, family, and course availability can change the timeline.
      </PageIntro>
      <div className="roadmap-summary">
        <div>
          <Check size={19} />
          <strong>
            {count} of {allTasks.length} milestones complete
          </strong>
        </div>
        <span>Saved on this device</span>
        <div className="progress-track">
          <span style={{ width: `${(count / allTasks.length) * 100}%` }} />
        </div>
      </div>
      <div className="phase-tabs" role="tablist" aria-label="College phase">
        {phases.map((p, i) => (
          <button
            key={p.year}
            className={active === i ? 'active' : ''}
            role="tab"
            aria-selected={active === i}
            aria-controls="phase-panel"
            id={`phase-tab-${i}`}
            onClick={() => setActive(i)}
          >
            <span className="phase-marker">
              {i === 0 ? <CompassSmall /> : i}
            </span>
            <strong>{p.year}</strong>
            <small>{p.date}</small>
          </button>
        ))}
      </div>
      <section
        className="phase-panel"
        id="phase-panel"
        role="tabpanel"
        aria-labelledby={`phase-tab-${active}`}
      >
        <div className="phase-panel-heading">
          <div className="eyebrow">
            {phase.year.toUpperCase()} · {phase.date}
          </div>
          <h2>{phase.title}</h2>
          <p>{phase.detail}</p>
        </div>
        <div className="milestone-list">
          {phase.tasks.map((task, i) => {
            const id = `${active}-${i}`;
            const checked = state.tasks.includes(id);
            return (
              <label key={id} className={checked ? 'checked' : ''}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setState((s) => ({ ...s, tasks: toggleList(s.tasks, id) }))
                  }
                />
                <span>{task}</span>
              </label>
            );
          })}
        </div>
        <div className="phase-panel-footer">
          <TextLink href={guideLink(phase.anchor)}>
            Read this stage in detail
          </TextLink>
          {active < 4 && (
            <button
              className="button secondary compact"
              onClick={() => setActive(active + 1)}
            >
              Next stage
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </section>
      <div className="two-up">
        <div className="info-card">
          <h3>Make room for the real world.</h3>
          <p>
            These are planning milestones—not admissions standards or a
            guarantee of employment. A credible local project or campus job can
            beat waiting for a prestigious internship.
          </p>
          <TextLink
            href={guideLink('1212-a-minimum-viable-plan-for-a-busy-student')}
          >
            The minimum viable plan
          </TextLink>
        </div>
        <div className="info-card">
          <h3>Start with the next 90 days.</h3>
          <p>
            Establish the facts. Produce a small piece of evidence. Make a
            provisional decision and set a review date.
          </p>
          <TextLink href={guideLink('184-a-practical-first-90-days')}>
            A practical first 90 days
          </TextLink>
        </div>
      </div>
    </>
  );
}
function CompassSmall() {
  return <span aria-hidden="true">0</span>;
}
export function MyPlan({
  state,
  setState,
  storageError,
}: StateProps & { storageError: boolean }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const filled = worksheetFields.filter(([id]) =>
    state.notes[id]?.trim(),
  ).length;
  function exportPlan() {
    const notes = worksheetFields
      .map(
        ([id, title]) =>
          `## ${title}\n\n${state.notes[id]?.trim() || '_Not yet answered._'}`,
      )
      .join('\n\n');
    const checklist = phases
      .map(
        (p, i) =>
          `### ${p.year} (${p.date})\n\n${p.tasks.map((task, j) => `- [${state.tasks.includes(`${i}-${j}`) ? 'x' : ' '}] ${task}`).join('\n')}`,
      )
      .join('\n\n');
    downloadFile(
      'My_Computing_Career_Plan.md',
      `# My computing career decision plan\n\nExported ${new Date().toISOString().slice(0, 10)} from Fieldguide, Edition 2.0. This is a provisional personal plan, not a forecast.\n\n${notes}\n\n## Paths in my comparison\n\n${
        careers
          .filter((c) => state.selected.includes(c.id))
          .map((c) => `- ${c.title}`)
          .join('\n') || '_None selected._'
      }\n\n## College milestones\n\n${checklist}\n\n## Saved chapters\n\n${
        chapters
          .filter((c) => state.saved.includes(c.id))
          .map((c) => `- Chapter ${c.number}: ${c.title}`)
          .join('\n') || '_None saved._'
      }\n`,
    );
  }
  return (
    <>
      <PageIntro
        eyebrow="A WORKING DOCUMENT, NOT A FINAL VERDICT"
        title="Make the plan yours."
      >
        Turn what you’ve learned into a provisional direction. Blank answers are
        a prompt to investigate—not a reason to guess.
      </PageIntro>
      <div className="plan-toolbar">
        <div>
          <ShieldCheck size={18} />
          <span>
            {storageError
              ? 'Session only—export to keep your work'
              : 'Auto-saved in this browser. No account needed.'}
          </span>
        </div>
        <button className="button primary" onClick={exportPlan}>
          <ArrowDownToLine size={16} />
          Export my plan (.md)
        </button>
      </div>
      <div className="worksheet-layout">
        <div className="worksheet-fields">
          {worksheetFields.map(([id, title, hint], i) => (
            <div className="worksheet-field" key={id}>
              <label htmlFor={`note-${id}`}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {title}
              </label>
              <p id={`hint-${id}`}>{hint}</p>
              <textarea
                id={`note-${id}`}
                aria-describedby={`hint-${id}`}
                value={state.notes[id] || ''}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    notes: { ...s.notes, [id]: e.target.value },
                  }))
                }
                rows={3}
                placeholder="Start with what you know…"
                maxLength={15000}
              />
            </div>
          ))}
        </div>
        <aside className="plan-aside">
          <div className="info-card">
            <div className="eyebrow">YOUR DECISION BRIEF</div>
            <h3>
              {filled} of {worksheetFields.length} prompts explored
            </h3>
            <div className="progress-track">
              <span
                style={{ width: `${(filled / worksheetFields.length) * 100}%` }}
              />
            </div>
            <p>
              Completeness is not certainty. A good plan names what you don’t
              yet know.
            </p>
            <TextLink href="#/guide/worksheets">
              Read the worksheet guidance
            </TextLink>
          </div>
          <div className="info-card">
            <h3>Before you commit</h3>
            <ul>
              <li>Apply hard constraints first.</li>
              <li>Test the daily work.</li>
              <li>Find actual entry routes.</li>
              <li>Write down the funding gap.</li>
              <li>Keep one credible adjacent path.</li>
            </ul>
            <TextLink href={guideLink('opportunity-audit')}>
              Run an opportunity audit
            </TextLink>
          </div>
          <p className="privacy-note">
            Your notes, saved chapters, selections, and checklist live only in
            this browser’s local storage. They do not sync between devices.
            Export before switching browsers or clearing site data. Avoid
            storing sensitive information on a shared device.
          </p>
        </aside>
      </div>
      <div className="plan-bottom">
        <button className="button secondary" onClick={exportPlan}>
          <ArrowDownToLine size={16} />
          Export my plan
        </button>
        {confirmReset ? (
          <div className="reset-confirm" role="alert">
            <span>Clear all worksheet answers? Your other progress stays.</span>
            <button
              className="button danger compact"
              onClick={() => {
                setState((s) => ({ ...s, notes: {} }));
                setConfirmReset(false);
              }}
            >
              Yes, clear answers
            </button>
            <button
              className="button secondary compact"
              onClick={() => setConfirmReset(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="button plain"
            onClick={() => setConfirmReset(true)}
          >
            <Trash2 size={15} />
            Clear worksheet answers
          </button>
        )}
      </div>
    </>
  );
}
const money = (n: number) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
export function Calculator() {
  const [balance, setBalance] = useState('30000');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');
  const [costA, setCostA] = useState('28000');
  const [costB, setCostB] = useState('60000');
  const [duration, setDuration] = useState('4');
  const result =
    balance !== '' &&
    rate !== '' &&
    years !== '' &&
    Number(rate) <= 100 &&
    Number(years) <= 50 &&
    Number(balance) <= 10000000
      ? calculateLoan(Number(balance), Number(rate), Number(years))
      : null;
  const costValid =
    [costA, costB, duration].every(
      (v) => v !== '' && Number.isFinite(Number(v)) && Number(v) >= 0,
    ) &&
    Number(duration) > 0 &&
    Number(duration) <= 15;
  return (
    <>
      <PageIntro
        eyebrow="A FINANCIAL STRESS TEST, NOT A SALARY FORECAST"
        title="Protect your freedom to choose."
      >
        See what borrowing would mean in monthly payments. Use a realistic
        balance and test a less optimistic scenario before committing.
      </PageIntro>
      <div className="callout">
        <Info size={20} />
        <p>
          <strong>Illustrative fixed-rate arithmetic only.</strong> Not
          financial advice, a loan offer, or an eligibility calculation. It
          excludes fees and in-school interest before your starting balance,
          assumes equal monthly payments, and does not model income-driven
          repayment.
        </p>
      </div>
      <div className="calculator-layout">
        <section className="calculator-inputs">
          <h2>What would your loan cost?</h2>
          <p>Use the balance you expect when repayment starts.</p>
          <label htmlFor="loan-balance">Starting repayment balance ($)</label>
          <input
            id="loan-balance"
            type="number"
            min="0"
            max="10000000"
            step="1000"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
          <div className="input-row">
            <div>
              <label htmlFor="loan-rate">Annual fixed rate (%)</label>
              <input
                id="loan-rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="loan-years">Repayment term (years)</label>
              <input
                id="loan-years"
                type="number"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>
          <div className="loan-presets">
            <span>Try a balance</span>
            {[30000, 80000, 120000].map((n) => (
              <button
                className={balance === String(n) ? 'active' : ''}
                key={n}
                onClick={() => setBalance(String(n))}
              >
                {money(n)}
              </button>
            ))}
          </div>
          <details className="formula">
            <summary>
              How the calculation works
              <ChevronDown size={15} />
            </summary>
            <p>
              Monthly payment = P × r ÷ (1 − (1 + r)<sup>−n</sup>), where P is
              the starting balance, r is the annual rate divided by 1,200, and n
              is the term in months (rounded). At 0% interest, payment is P ÷ n.
              Displayed totals are rounded; calculations use unrounded payments.
            </p>
          </details>
        </section>
        <section
          className="calculator-result"
          aria-live="polite"
          aria-atomic="true"
        >
          {result ? (
            <>
              <div className="eyebrow">ESTIMATED MONTHLY PAYMENT</div>
              <div className="payment-amount">
                {money(result.monthly)}
                <span>/ month</span>
              </div>
              <p>
                {money(result.monthly * 12)} a year, before your other living
                costs.
              </p>
              <div className="repayment-bar">
                <span
                  style={{
                    width: `${result.total ? (Number(balance) / result.total) * 100 : 100}%`,
                  }}
                />
              </div>
              <dl>
                <div>
                  <dt>
                    <span className="legend-dot principal" />
                    Starting balance
                  </dt>
                  <dd>{money(Number(balance))}</dd>
                </div>
                <div>
                  <dt>
                    <span className="legend-dot interest" />
                    Total interest
                  </dt>
                  <dd>{money(result.interest)}</dd>
                </div>
                <div className="total">
                  <dt>Total repaid</dt>
                  <dd>{money(result.total)}</dd>
                </div>
              </dl>
              <span className="result-footnote">
                No income, tax, or 2031 salary assumptions.
              </span>
            </>
          ) : (
            <div role="alert">
              <h3>Check your assumptions</h3>
              <p>
                Enter a nonnegative balance up to $10 million, a rate from
                0–100%, and a positive term up to 50 years.
              </p>
            </div>
          )}
        </section>
      </div>
      <section className="cost-comparison info-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LOOK AT THE WHOLE DEGREE</span>
            <h2>What does the cost difference add up to?</h2>
          </div>
        </div>
        <p>
          Use annual all-in net cost after grants and scholarships—not the
          amount billed after loans. Include housing, transport, and equipment.
        </p>
        <div className="cost-inputs">
          <label>
            Program A: annual net cost ($)
            <input
              aria-label="Program A annual net cost"
              type="number"
              min="0"
              value={costA}
              onChange={(e) => setCostA(e.target.value)}
            />
          </label>
          <label>
            Program B: annual net cost ($)
            <input
              aria-label="Program B annual net cost"
              type="number"
              min="0"
              value={costB}
              onChange={(e) => setCostB(e.target.value)}
            />
          </label>
          <label>
            Years of study
            <input
              aria-label="Years of study"
              type="number"
              min="1"
              max="15"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </label>
        </div>
        <div className="cost-answer" aria-live="polite">
          {costValid ? (
            <>
              <strong>
                {money(
                  Math.abs(Number(costB) - Number(costA)) * Number(duration),
                )}
              </strong>
              <span>
                {Number(costB) === Number(costA)
                  ? 'difference between the two programs'
                  : `more for Program ${Number(costB) > Number(costA) ? 'B' : 'A'} over ${duration} years`}
                <small>
                  Before interest, price changes, extra semesters, or foregone
                  income.
                </small>
              </span>
            </>
          ) : (
            <p>
              Enter nonnegative net costs and a study duration greater than 0
              and no more than 15 years.
            </p>
          )}
        </div>
      </section>
      <div className="two-up">
        <div className="info-card">
          <h3>Affordability is not borrowing eligibility.</h3>
          <p>
            This calculation does not show whether a lender will fund the
            balance. Get a year-by-year funding table and recheck current rules
            before enrollment.
          </p>
          <TextLink href={guideLink('borrowing-2027')}>
            Borrowing changes relevant to 2027
          </TextLink>
        </div>
        <div className="info-card">
          <h3>Stress-test more than the payment.</h3>
          <p>
            What happens if graduation is delayed, the first-job search takes
            longer, or a good learning opportunity pays less than you hoped?
          </p>
          <TextLink
            href={guideLink('1010-budget-for-the-transition-not-only-tuition')}
          >
            Budget for the transition
          </TextLink>
        </div>
      </div>
    </>
  );
}
