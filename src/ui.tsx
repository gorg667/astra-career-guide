import {
  ArrowUpRight,
  Bot,
  Braces,
  ChartNoAxesCombined,
  CircuitBoard,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Network,
  Server,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { ReactNode } from 'react';
export function CareerIcon({
  name,
  size = 22,
}: {
  name: string;
  size?: number;
}) {
  const icons: Record<string, typeof Code2> = {
    code: Code2,
    server: Server,
    shield: ShieldCheck,
    database: Database,
    network: Network,
    cpu: Cpu,
    circuit: CircuitBoard,
    bot: Bot,
    flask: FlaskConical,
    chart: ChartNoAxesCombined,
    users: Users,
  };
  const Icon = icons[name] || Braces;
  return <Icon size={size} strokeWidth={1.7} />;
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="page-intro">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p>{children}</p>
    </div>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
export function BrandMark() {
  return (
    <svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true">
      <rect width="36" height="36" rx="9" fill="currentColor" />
      <path
        d="M10 26V10h17M10 18h13M18 10v8"
        fill="none"
        stroke="#f1f2e8"
        strokeWidth="2"
      />
      <circle cx="27" cy="10" r="2.3" fill="#b9cf9b" />
    </svg>
  );
}
export function PathDiagram() {
  return (
    <div
      className="path-diagram"
      aria-label="A broad foundation connects to software, hardware, and human-centered computing paths, then to one defensible specialty."
      role="img"
    >
      <div className="diagram-caption">
        <span className="tiny-dot" /> MANY PATHS. A STRONG FOUNDATION.
      </div>
      <svg viewBox="0 0 410 235" aria-hidden="true">
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".8" fill="#849c87" opacity=".22" />
          </pattern>
        </defs>
        <rect width="410" height="235" fill="url(#dots)" />
        <g stroke="#8ea38a" fill="none" strokeWidth="1.3">
          <path d="M58 120H100Q112 120 112 108V53Q112 41 124 41H165" />
          <path d="M58 120H165" />
          <path d="M58 120H100Q112 120 112 132V190Q112 202 124 202H165" />
          <path d="M272 41H297Q309 41 309 53V108Q309 120 321 120H351" />
          <path d="M272 120H351" />
          <path d="M272 202H297Q309 202 309 190V132Q309 120 321 120H351" />
        </g>
        <circle cx="58" cy="120" r="24" fill="#254d3f" />
        <path
          d="M48 131V109H68M48 120H62M59 109V120"
          fill="none"
          stroke="#e9efde"
          strokeWidth="2"
        />
        <g fill="#fafcf6" stroke="#becabb">
          <rect x="155" y="23" width="125" height="36" rx="6" />
          <rect x="155" y="102" width="125" height="36" rx="6" />
          <rect x="155" y="184" width="125" height="36" rx="6" />
        </g>
        <g
          fontFamily="Arial, sans-serif"
          fontSize="11"
          fill="#3d5448"
          textAnchor="middle"
        >
          <text x="217" y="46">
            Software &amp; systems
          </text>
          <text x="217" y="125">
            Hardware &amp; devices
          </text>
          <text x="217" y="207">
            People &amp; problems
          </text>
        </g>
        <circle cx="353" cy="120" r="12" fill="#b8cd92" stroke="#7e9966" />
        <path
          d="m348 120 3 3 6-6"
          fill="none"
          stroke="#375a3b"
          strokeWidth="1.5"
        />
      </svg>
      <div className="diagram-foot">
        <span>Build your core</span>
        <span>Find your depth</span>
      </div>
    </div>
  );
}
