export interface Subsection {
  id: string;
  title: string;
}
export interface Chapter {
  id: string;
  number: number;
  title: string;
  markdown: string;
  text: string;
  minutes: number;
  anchors: string[];
  subsections: Subsection[];
}
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
export function parseGuide(source: string): Chapter[] {
  const starts = [
    ...source.matchAll(/<a id="([^"]+)"><\/a>\s*\n## (\d+)\. ([^\n]+)/g),
  ];
  return starts.map((match, index) => {
    const markdown = source
      .slice(
        match.index! + match[0].length,
        starts[index + 1]?.index ?? source.length,
      )
      .trim()
      .replace(/\n---\s*$/, '');
    const text = markdown
      .replace(/<[^>]*>/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#*_|>`]/g, '');
    return {
      id: match[1],
      number: Number(match[2]),
      title: match[3],
      markdown,
      text,
      minutes: Math.max(1, Math.ceil(text.split(/\s+/).length / 220)),
      anchors: [...markdown.matchAll(/<a id="([^"]+)"><\/a>/g)].map(
        (m) => m[1],
      ),
      subsections: [...markdown.matchAll(/^### (.+)$/gm)].map((m) => ({
        title: m[1],
        id: slugify(m[1]),
      })),
    };
  });
}
export function calculateLoan(
  balance: number,
  annualRate: number,
  years: number,
) {
  if (
    ![balance, annualRate, years].every(Number.isFinite) ||
    balance < 0 ||
    annualRate < 0 ||
    years <= 0
  )
    return null;
  const months = Math.round(years * 12);
  if (months < 1) return null;
  const rate = annualRate / 1200;
  const monthly =
    rate === 0
      ? balance / months
      : (balance * rate) / (1 - Math.pow(1 + rate, -months));
  const total = monthly * months;
  return { monthly, total, interest: Math.max(0, total - balance) };
}
export function searchChapters(chapters: Chapter[], query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return chapters
    .map((ch) => {
      const searchable = `${ch.title} ${ch.text}`.toLowerCase();
      const matches = terms.every((term) => searchable.includes(term));
      const sections = ch.markdown
        .split(/(?=^### )/m)
        .map((text) => {
          const title = text.match(/^### (.+)/)?.[1] || ch.title;
          const plain = text
            .replace(/<[^>]*>/g, '')
            .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
            .replace(/[#*_|>`]/g, '');
          const headingMatches = terms.filter((term) =>
            title.toLowerCase().includes(term),
          ).length;
          const bodyMatches = terms.filter((term) =>
            plain.toLowerCase().includes(term),
          ).length;
          return {
            title,
            plain,
            score: headingMatches * 3 + bodyMatches,
            anchor: title === ch.title ? '' : slugify(title),
          };
        })
        .sort((a, b) => b.score - a.score);
      const section = sections[0];
      const text = section?.plain || ch.text;
      const first = text.toLowerCase().indexOf(terms[0]);
      const begin = Math.max(0, first - 65);
      return {
        chapter: ch,
        matches,
        anchor: section?.anchor || '',
        sectionTitle: section?.title || ch.title,
        score: terms.filter((t) => ch.title.toLowerCase().includes(t)).length,
        excerpt: `${begin ? '…' : ''}${text.slice(begin, begin + 210).replace(/\s+/g, ' ')}…`,
      };
    })
    .filter((r) => r.matches)
    .sort((a, b) => b.score - a.score);
}
