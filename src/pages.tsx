import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Compass,
  FileText,
  GraduationCap,
  Route,
  ShieldCheck,
} from 'lucide-react';
import { chapters, chapterNames, groups, guideLink } from './content';
import { careers, phases } from './data';
import { type StateProps, toggleList } from './state';
import { CareerIcon, PageIntro, PathDiagram, TextLink } from './ui';
export function Home({ state }: StateProps) {
  const resume = chapters.find((c) => c.id === state.lastChapter);
  return (
    <div className="home">
      <div className="overview-top">
        <span className="eyebrow">
          <span className="tiny-dot" /> FOR CS & COMPUTER ENGINEERING STUDENTS
        </span>
        <span className="updated">Updated September 5, 2026</span>
      </div>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            A clearer path
            <br />
            into <em>computing.</em>
          </h1>
          <p>
            Choose a direction, not just a job title.
            <br className="desktop-break" /> An evidence-based guide to careers,
            college, and the decisions that connect them.
          </p>
          <div className="hero-actions">
            <a
              href={resume ? `#/guide/${resume.id}` : '#/guide/verdict'}
              className="button primary"
            >
              {resume ? 'Continue reading' : 'Start with the short answer'}
              <ArrowRight size={17} />
            </a>
            <a href="#/careers" className="button plain">
              Explore careers
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-foot">
            <GraduationCap size={16} />
            <span>College entry: fall 2027</span>
            <span className="dot-separator">·</span>
            <span>Looking ahead to 2031</span>
          </div>
        </div>
        <PathDiagram />
      </section>
      <div className="facts-strip">
        <div>
          <BookOpen size={18} />
          <strong>23</strong>
          <span>in-depth chapters</span>
        </div>
        <div>
          <Compass size={18} />
          <strong>12</strong>
          <span>career families to compare</span>
        </div>
        <div>
          <FileText size={18} />
          <strong>33</strong>
          <span>annotated references</span>
        </div>
        <div>
          <ShieldCheck size={18} />
          <span>Evidence, not predictions</span>
        </div>
      </div>
      <section className="verdict-card">
        <div className="verdict-icon">
          <Compass size={22} />
        </div>
        <div>
          <div className="eyebrow">THE SHORT ANSWER</div>
          <h2>Build a broad foundation. Develop one defensible specialty.</h2>
          <p>
            For most undecided students, software engineering with systems,
            data, or security depth is a strong default. If you genuinely enjoy
            electronics, consider CE with embedded systems or semiconductor
            engineering. Keep your degree affordable—and your options open.
          </p>
          <TextLink href="#/guide/verdict">
            Read the recommendation and its caveats
          </TextLink>
        </div>
        <span className="judgment-badge">Editorial judgment</span>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR GUIDE, YOUR STARTING POINT</span>
            <h2>What are you figuring out?</h2>
          </div>
          <span className="section-subtle">
            You don’t have to read it all at once.
          </span>
        </div>
        <div className="starting-grid">
          {[
            {
              icon: Compass,
              n: '01',
              title: 'Which career fits me?',
              desc: 'Understand the work, entry routes, and trade-offs behind the titles.',
              href: '#/careers',
              action: 'Explore the paths',
            },
            {
              icon: GraduationCap,
              n: '02',
              title: 'Should I choose CS or CE?',
              desc: 'Compare the training—not the stereotypes—and try a small experiment.',
              href: '#/guide/degree',
              action: 'Compare the degrees',
            },
            {
              icon: Route,
              n: '03',
              title: 'How do I get there?',
              desc: 'Turn a direction into courses, projects, experience, and a realistic plan.',
              href: '#/roadmap',
              action: 'Build your roadmap',
            },
          ].map(({ icon: Icon, ...item }) => (
            <a className="starting-card" key={item.n} href={item.href}>
              <div className="starting-card-top">
                <Icon size={23} strokeWidth={1.6} />
                <span>{item.n}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="card-action">
                {item.action}
                <ArrowUpRight size={17} />
              </span>
            </a>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE WORK BEHIND THE TITLE</span>
            <h2>Explore the possibilities</h2>
          </div>
          <TextLink href="#/careers">All 12 career families</TextLink>
        </div>
        <div className="featured-careers">
          {[careers[0], careers[6], careers[2], careers[4]].map((c) => (
            <a
              className="featured-career"
              href={guideLink(c.anchor)}
              key={c.id}
            >
              <span
                className={`career-icon ${c.category === 'Hardware & physical' ? 'ochre' : ''}`}
              >
                <CareerIcon name={c.icon} />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.tag}</p>
              </div>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <div className="quiet-note">
          <ShieldCheck size={15} />
          <span>
            There is no universal “best.” Fit, affordability, access, and the
            work itself matter more than a ranking.
          </span>
        </div>
      </section>
      <section className="roadmap-preview">
        <div>
          <span className="eyebrow">A DIRECTION, NOT A CRYSTAL BALL</span>
          <h2>Think beyond your first semester.</h2>
          <p>
            Your plan should get more specific as your evidence gets better.
          </p>
          <TextLink href="#/roadmap">See your college roadmap</TextLink>
        </div>
        <div className="mini-timeline">
          {phases.slice(1).map((p, i) => (
            <a href="#/roadmap" key={p.year}>
              <span className="timeline-dot">{i + 1}</span>
              <strong>{p.year}</strong>
              <small>
                {['Foundations', 'Experience', 'Specialize', 'Transition'][i]}
              </small>
              <span>{p.date}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MAKE AN INFORMED COMMITMENT</span>
            <h2>The decisions around the career</h2>
          </div>
        </div>
        <div className="reading-list">
          {[
            {
              n: 9,
              label: 'AI is changing the work. What should you do?',
              desc: 'Mechanisms, conflicting evidence, and resilient preparation.',
              id: 'ai',
            },
            {
              n: 10,
              label: 'A good career should not require a bad financial bet.',
              desc: 'Net cost, debt, compensation, and realistic downside scenarios.',
              id: 'money',
            },
            {
              n: 18,
              label: 'Turn research into a decision you can revisit.',
              desc: 'Practical worksheets and a first-90-days plan.',
              id: 'worksheets',
            },
          ].map((item) => (
            <a href={`#/guide/${item.id}`} key={item.id}>
              <span className="chapter-number">
                {String(item.n).padStart(2, '0')}
              </span>
              <div>
                <h3>{item.label}</h3>
                <p>{item.desc}</p>
              </div>
              <ArrowUpRight size={19} />
            </a>
          ))}
        </div>
      </section>
      <div className="methodology-note">
        <ShieldCheck size={21} />
        <div>
          <strong>Built for decisions. Honest about uncertainty.</strong>
          <p>
            Research cutoff: September 5, 2026. The 2031 job market is not an
            observed fact. This guide separates evidence, projections, and
            editorial judgment—and shows its sources.
          </p>
        </div>
        <a href="#/guide/references" aria-label="Read sources and methodology">
          <ArrowUpRight size={22} />
        </a>
      </div>
    </div>
  );
}
export function GuideIndex({ state, setState }: StateProps) {
  const [filter, setFilter] = useState('');
  const [unread, setUnread] = useState(false);
  const matches = chapters.filter(
    (c) =>
      (!unread || !state.read.includes(c.id)) &&
      `${c.title} ${chapterNames[c.number - 1]}`
        .toLowerCase()
        .includes(filter.toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="THE COMPLETE GUIDE · EDITION 2.0"
        title="A reference, not a reading assignment."
      >
        All 23 chapters, without abridgment. Follow a reading route, jump to
        your question, or take it one chapter at a time.
      </PageIntro>
      <div className="reading-routes">
        {[
          {
            title: 'Give me the recommendation',
            label: 'Start with chapters 1, 3, 4 & 17',
            id: 'verdict',
          },
          {
            title: 'Before I commit money',
            label: 'Start with chapters 10, 11, 15 & 16',
            id: 'money',
          },
          {
            title: 'Help me build a plan',
            label: 'Start with chapters 12, 18 & 21',
            id: 'roadmap',
          },
        ].map((r) => (
          <a href={`#/guide/${r.id}`} key={r.id}>
            <BookOpen size={19} />
            <strong>{r.title}</strong>
            <span>{r.label}</span>
            <ArrowUpRight size={16} />
          </a>
        ))}
      </div>
      <div className="filter-bar">
        <label className="filter-input">
          <span className="sr-only">Filter chapter titles</span>
          <input
            placeholder="Filter chapter titles…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={unread}
            onChange={(e) => setUnread(e.target.checked)}
          />
          Unread only
        </label>
        <span className="result-count" role="status">
          {matches.length} chapters
        </span>
      </div>
      {groups.map((group) => {
        const list = matches.filter(
          (c) => c.number > group.start && c.number <= group.end,
        );
        return list.length ? (
          <section className="chapter-group" key={group.title}>
            <h2>{group.title}</h2>
            {list.map((c) => (
              <div className="chapter-row" key={c.id}>
                <span
                  className={`chapter-number ${state.read.includes(c.id) ? 'finished' : ''}`}
                >
                  {state.read.includes(c.id) ? (
                    <Check size={18} />
                  ) : (
                    String(c.number).padStart(2, '0')
                  )}
                </span>
                <a href={`#/guide/${c.id}`}>
                  <h3>{chapterNames[c.number - 1]}</h3>
                  <p>{c.title}</p>
                </a>
                <span className="read-time">
                  <Clock3 size={13} />
                  {c.minutes} min
                </span>
                <button
                  className={`icon-button ${state.saved.includes(c.id) ? 'is-saved' : ''}`}
                  aria-label={`${state.saved.includes(c.id) ? 'Unsave' : 'Save'} ${chapterNames[c.number - 1]}`}
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      saved: toggleList(s.saved, c.id),
                    }))
                  }
                >
                  <Bookmark
                    size={18}
                    fill={state.saved.includes(c.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            ))}
          </section>
        ) : null;
      })}
      {!matches.length && (
        <div className="empty-state">
          <BookOpen size={32} />
          <h2>No chapters match this filter.</h2>
          <button
            className="button secondary"
            onClick={() => {
              setFilter('');
              setUnread(false);
            }}
          >
            Show all chapters
          </button>
        </div>
      )}
    </>
  );
}
export function Saved({ state, setState }: StateProps) {
  const saved = chapters.filter((c) => state.saved.includes(c.id));
  return (
    <>
      <PageIntro
        eyebrow="YOUR PERSONAL READING SHELF"
        title="Keep the useful parts close."
      >
        Saved chapters stay in this browser. Use the bookmark button in any
        chapter to add or remove it from this list.
      </PageIntro>
      {saved.length ? (
        <div className="chapter-group">
          {saved.map((c) => (
            <div className="chapter-row" key={c.id}>
              <span className="chapter-number">
                {String(c.number).padStart(2, '0')}
              </span>
              <a href={`#/guide/${c.id}`}>
                <h3>{chapterNames[c.number - 1]}</h3>
                <p>{c.title}</p>
              </a>
              {state.read.includes(c.id) && (
                <CheckCircle2 size={18} className="is-saved" />
              )}
              <button
                className="icon-button"
                aria-label={`Remove ${chapterNames[c.number - 1]} from saved chapters`}
                onClick={() =>
                  setState((s) => ({ ...s, saved: toggleList(s.saved, c.id) }))
                }
              >
                <Bookmark size={18} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Bookmark size={34} />
          <h2>A small shelf for your big decisions.</h2>
          <p>
            No chapters saved yet. Bookmark a recommendation, a source, or
            something you want to revisit.
          </p>
          <a className="button primary" href="#/guide">
            Browse the guide
            <ArrowRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}
