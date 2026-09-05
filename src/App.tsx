import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  ExternalLink,
  FileText,
  House,
  Menu,
  Route,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import { chapters, chapterNames, guideSource } from './content';
import { searchChapters } from './logic';
import { downloadFile, usePersonalState } from './state';
import { BrandMark } from './ui';
import { Home, GuideIndex, Saved } from './pages';
import { CareerExplorer, Calculator, Roadmap, MyPlan } from './tools';
import { Reader } from './reader';

const navItems = [
  { path: '/', label: 'Overview', icon: House },
  { path: '/careers', label: 'Explore careers', icon: Compass },
  { path: '/compare', label: 'Compare paths', icon: ArrowLeftRight },
  { path: '/guide', label: 'The complete guide', icon: BookOpen },
  { path: '/roadmap', label: 'Your college roadmap', icon: Route },
];
const toolItems = [
  { path: '/plan', label: 'My decision plan', icon: FileText },
  {
    path: '/calculator',
    label: 'Cost & debt calculator',
    icon: ArrowLeftRight,
  },
  { path: '/saved', label: 'Saved chapters', icon: Bookmark },
];
function getRoute() {
  try {
    return decodeURIComponent(location.hash.slice(1) || '/');
  } catch {
    return '/';
  }
}
export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { state, setState, storageError } = usePersonalState();
  const mainRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () =>
      Array.from(
        sidebarRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) || [],
      ).filter((el) => el.getClientRects().length > 0);
    focusable()[0]?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 760) setMobileOpen(false);
    };
    window.addEventListener('keydown', trap);
    window.addEventListener('resize', resize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', trap);
      window.removeEventListener('resize', resize);
      previous?.focus();
    };
  }, [mobileOpen]);
  useEffect(() => {
    const change = () => {
      setRoute(getRoute());
      setMobileOpen(false);
      setSearchOpen(false);
    };
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('hashchange', change);
    window.addEventListener('keydown', keydown);
    return () => {
      window.removeEventListener('hashchange', change);
      window.removeEventListener('keydown', keydown);
    };
  }, []);
  const [, page, chapterId, anchor] = route.split('/');
  const chapter = chapters.find((ch) => ch.id === chapterId);
  const pageName = chapter
    ? chapterNames[chapter.number - 1]
    : [...navItems, ...toolItems].find((n) => n.path === route)?.label ||
      'Overview';
  useEffect(() => {
    document.title = `${pageName} — Fieldguide`;
    if (!anchor) window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [route, pageName, anchor]);
  useEffect(() => {
    if (chapter)
      setState((prev) =>
        prev.lastChapter === chapter.id
          ? prev
          : { ...prev, lastChapter: chapter.id },
      );
  }, [chapter, setState]);
  const props = { state, setState };
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <button
        className={`sidebar-scrim ${mobileOpen ? 'visible' : ''}`}
        aria-label="Close navigation"
        onClick={() => setMobileOpen(false)}
        tabIndex={mobileOpen ? 0 : -1}
      />
      <aside
        ref={sidebarRef}
        className={`sidebar ${mobileOpen ? 'open' : ''}`}
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-label="Site navigation"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('a')) setMobileOpen(false);
        }}
      >
        <button
          className="icon-button sidebar-close"
          aria-label="Close site navigation"
          onClick={() => setMobileOpen(false)}
        >
          <X size={19} />
        </button>
        <a className="brand" href="#/" aria-label="Fieldguide home">
          <BrandMark />
          <span>
            Fieldguide<span className="brand-sub">COMPUTING CAREERS</span>
          </span>
        </a>
        <div className="edition-label">
          <span /> THE 2027 ENTRANT’S EDITION
        </div>
        <nav aria-label="Main navigation">
          <div className="nav-group-label">FIND YOUR DIRECTION</div>
          {navItems.map(({ path, label, icon: Icon }) => (
            <a
              key={path}
              href={`#${path}`}
              className={`nav-link ${route === path || (path === '/guide' && page === 'guide') ? 'active' : ''}`}
              aria-current={
                route === path || (path === '/guide' && page === 'guide')
                  ? 'page'
                  : undefined
              }
            >
              <Icon size={18} />
              <span>{label}</span>
              {path === '/guide' && <span className="nav-count">23</span>}
            </a>
          ))}
          <div className="nav-group-label second">MAKE IT YOURS</div>
          {toolItems.map(({ path, label, icon: Icon }) => (
            <a
              key={path}
              href={`#${path}`}
              className={`nav-link ${route === path ? 'active' : ''}`}
              aria-current={route === path ? 'page' : undefined}
            >
              <Icon size={18} />
              <span>{label}</span>
              {path === '/saved' && state.saved.length > 0 && (
                <span className="nav-count">{state.saved.length}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="reading-progress">
            <div>
              <BookOpen size={16} />
              <strong>Your reading progress</strong>
            </div>
            <div className="progress-track">
              <span style={{ width: `${(state.read.length / 23) * 100}%` }} />
            </div>
            <span>{state.read.length} of 23 chapters completed</span>
          </div>
          <button
            className="download-link"
            onClick={() =>
              downloadFile('CS_CE_Career_Guide_2027.md', guideSource)
            }
          >
            <ArrowDownToLine size={17} />
            Download the full guide
            <ExternalLink size={13} />
          </button>
          <div className="sidebar-fine">
            Independent thinking. Informed decisions.
          </div>
        </div>
      </aside>
      <div className="app-shell" inert={mobileOpen || undefined}>
        <header className="topbar">
          <div className="breadcrumbs">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={
                mobileOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <span className="breadcrumb-root">The career guide</span>
            <ChevronRight size={14} />
            <span>{pageName}</span>
          </div>
          <div className="topbar-right">
            <button
              className="search-trigger"
              aria-label="Search the guide"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={16} />
              <span>Search the guide</span>
              <kbd>⌘ K</kbd>
            </button>
            <span className="edition-chip">EDITION 2.0</span>
          </div>
        </header>
        {storageError && (
          <div className="storage-warning" role="alert">
            Browser storage is unavailable. Your changes are kept for this
            session only—export your plan before leaving.
          </div>
        )}
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className={page === 'guide' && chapter ? 'main reader-main' : 'main'}
        >
          {!page && <Home {...props} />}
          {page === 'guide' && !chapterId && <GuideIndex {...props} />}
          {page === 'guide' && chapter && (
            <Reader chapter={chapter} anchor={anchor} {...props} />
          )}
          {(page === 'careers' || page === 'compare') && (
            <CareerExplorer mode={page} {...props} />
          )}
          {page === 'roadmap' && <Roadmap {...props} />}
          {page === 'plan' && <MyPlan {...props} storageError={storageError} />}
          {page === 'calculator' && <Calculator />}
          {page === 'saved' && <Saved {...props} />}
          {((page === 'guide' && chapterId && !chapter) ||
            (page &&
              ![
                'guide',
                'careers',
                'compare',
                'roadmap',
                'plan',
                'calculator',
                'saved',
              ].includes(page))) && (
            <div className="empty-state">
              <Compass size={36} />
              <h1>This path doesn’t exist.</h1>
              <p>All 23 chapters are still here. Let’s find the right one.</p>
              <a href="#/guide" className="button primary">
                Browse the guide
                <ArrowRight size={16} />
              </a>
            </div>
          )}
        </main>
        <footer className="footer">
          <span>
            Fieldguide <span className="footer-dot">·</span> A clearer path into
            computing.
          </span>
          <div>
            <a href="#/guide/references">Sources & methodology</a>
            <a
              href="https://github.com/gorg667/astra-career-guide"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
              <ExternalLink size={12} />
            </a>
          </div>
        </footer>
      </div>
      {searchOpen && <SearchDialog close={() => setSearchOpen(false)} />}
    </>
  );
}
function SearchDialog({ close }: { close: () => void }) {
  const [query, setQuery] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const results = searchChapters(chapters, query);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    return () => {
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="search-dialog"
      aria-labelledby="search-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="search-dialog-inner">
        <div className="search-dialog-head">
          <Search size={22} />
          <h2 id="search-title" className="sr-only">
            Search all 23 chapters
          </h2>
          <input
            autoFocus
            aria-label="Search all 23 chapters"
            placeholder="What would you like to understand?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>
        <div className="search-results">
          {!query.trim() ? (
            <>
              <div className="eyebrow">A FEW GOOD PLACES TO START</div>
              {['CS versus CE', 'internships', 'embedded', 'AI', 'debt'].map(
                (term) => (
                  <button
                    className="suggestion"
                    onClick={() => setQuery(term)}
                    key={term}
                  >
                    <Search size={15} />
                    {term}
                    <ArrowRight size={15} />
                  </button>
                ),
              )}
              <p className="search-note">
                Search the full text—not just chapter titles.
              </p>
            </>
          ) : (
            <>
              <p className="search-note" role="status">
                {results.length} matching{' '}
                {results.length === 1 ? 'chapter' : 'chapters'}
              </p>
              {results.map(({ chapter: ch, excerpt, anchor, sectionTitle }) => (
                <a
                  className="search-result"
                  href={`#/guide/${ch.id}${anchor ? `/${anchor}` : ''}`}
                  onClick={close}
                  key={ch.id}
                >
                  <span className="eyebrow">
                    CHAPTER {ch.number.toString().padStart(2, '0')} ·{' '}
                    {chapterNames[ch.number - 1]}
                  </span>
                  <h3>{sectionTitle}</h3>
                  <p>{excerpt}</p>
                </a>
              ))}
              {!results.length && (
                <div className="empty-state small">
                  <Search size={28} />
                  <h3>No matching chapters</h3>
                  <p>
                    Try a broader term such as “software,” “cost,” or
                    “research.”
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="search-dialog-foot">
          <ShieldCheck size={14} /> Search stays in your browser.
          <span>
            <kbd>esc</kbd> to close
          </span>
        </div>
      </div>
    </dialog>
  );
}
