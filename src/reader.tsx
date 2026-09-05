import { memo, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Clock3,
  Link2,
  Printer,
  Type,
} from 'lucide-react';
import { chapters, chapterNames, renderMarkdown, guideLink } from './content';
import type { Chapter } from './logic';
import { type StateProps, toggleList } from './state';
// Keep the article DOM stable while progress and the active TOC item update.
const MarkdownArticle = memo(function MarkdownArticle({
  html,
  largeText,
}: {
  html: string;
  largeText: boolean;
}) {
  return (
    <article
      className={`prose ${largeText ? 'large-text' : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
export function Reader({
  chapter,
  anchor,
  state,
  setState,
}: StateProps & { chapter: Chapter; anchor?: string }) {
  const html = useMemo(() => renderMarkdown(chapter.markdown), [chapter]);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const done = state.read.includes(chapter.id);
  const saved = state.saved.includes(chapter.id);
  useEffect(() => {
    if (anchor)
      requestAnimationFrame(() => {
        const target = document.getElementById(anchor);
        target?.scrollIntoView({ block: 'start' });
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
  }, [chapter.id, anchor]);
  useEffect(() => {
    setCopied(false);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-100px 0px -65% 0px' },
    );
    document
      .querySelectorAll('.prose h3')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapter.id]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      window.prompt('Copy this chapter link:', location.href);
    }
  }
  return (
    <div className="reader-layout">
      <div className="reader-body">
        <a href="#/guide" className="back-link">
          <ArrowLeft size={15} />
          All chapters
        </a>
        <div className="reader-header">
          <div className="eyebrow">
            CHAPTER {String(chapter.number).padStart(2, '0')} <span>OF 23</span>
          </div>
          <h1>{chapter.title}</h1>
          <div className="reader-meta">
            <span>
              <Clock3 size={15} />
              {chapter.minutes} min read
            </span>
            <span>Edition 2.0</span>
            <span>September 5, 2026</span>
          </div>
        </div>
        <div className="reader-toolbar">
          <button
            className={`button compact ${saved ? 'selected' : 'secondary'}`}
            onClick={() =>
              setState((s) => ({
                ...s,
                saved: toggleList(s.saved, chapter.id),
              }))
            }
            aria-pressed={saved}
          >
            <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} />
            {saved ? 'Saved' : 'Save chapter'}
          </button>
          <button
            className="button compact plain"
            onClick={() => setState((s) => ({ ...s, largeText: !s.largeText }))}
            aria-pressed={state.largeText}
          >
            <Type size={17} />
            Larger text
          </button>
          <button
            className="icon-button"
            onClick={copy}
            aria-label={copied ? 'Link copied' : 'Copy chapter link'}
          >
            {copied ? <Check size={17} /> : <Link2 size={17} />}
          </button>
          <button
            className="icon-button"
            aria-label="Print this chapter"
            onClick={() => window.print()}
          >
            <Printer size={17} />
          </button>
          <span className="copy-status" role="status">
            {copied ? 'Link copied' : ''}
          </span>
        </div>
        <details className="mobile-toc">
          <summary>
            In this chapter · {chapter.subsections.length} sections
          </summary>
          {chapter.subsections.map((s) => (
            <a key={s.id} href={guideLink(s.id)}>
              {s.title}
            </a>
          ))}
        </details>
        <MarkdownArticle html={html} largeText={state.largeText} />
        <div className="chapter-completion">
          <div>
            <strong>
              {done
                ? 'One more piece of the picture.'
                : 'Ready for the next piece?'}
            </strong>
            <p>
              {done
                ? 'This chapter is marked as read. You can revisit it anytime.'
                : 'Mark this chapter as read to track your progress.'}
            </p>
          </div>
          <button
            className={`button ${done ? 'secondary' : 'primary'}`}
            aria-pressed={done}
            onClick={() =>
              setState((s) => ({ ...s, read: toggleList(s.read, chapter.id) }))
            }
          >
            <Check size={17} />
            {done ? 'Completed' : 'Mark as read'}
          </button>
        </div>
        <div className="chapter-pagination">
          {chapter.number > 1 ? (
            <a href={`#/guide/${chapters[chapter.number - 2].id}`}>
              <ArrowLeft size={18} />
              <span>
                <small>PREVIOUS CHAPTER</small>
                {chapterNames[chapter.number - 2]}
              </span>
            </a>
          ) : (
            <span />
          )}
          {chapter.number < 23 && (
            <a href={`#/guide/${chapters[chapter.number].id}`}>
              <span>
                <small>NEXT CHAPTER</small>
                {chapterNames[chapter.number]}
              </span>
              <ArrowRight size={18} />
            </a>
          )}
        </div>
      </div>
      <aside className="reader-toc">
        <div className="eyebrow">IN THIS CHAPTER</div>
        {chapter.subsections.map((s) => (
          <a
            className={activeSection === s.id ? 'active' : ''}
            key={s.id}
            href={guideLink(s.id)}
          >
            {s.title.replace(/^\d+\.\d+ /, '')}
          </a>
        ))}
        <div className="toc-note">
          <strong>A note on the evidence</strong>
          <p>
            Observations, projections, and editorial judgments are different.
            Follow the citations to see what supports a claim.
          </p>
          <a href="#/guide/references">
            Sources & evidence notes
            <ArrowRight size={14} />
          </a>
        </div>
      </aside>
    </div>
  );
}
