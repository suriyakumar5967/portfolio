import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Check, List, Lock } from "lucide-react";
import { Reveal, useScrollSpy } from "./lib/motion";
import { PROFILE } from "./lib/content";

import zenDashboard from "@/assets/case-studies/zen-dashboard.jpg";
import zenTransactions from "@/assets/case-studies/zen-transactions.jpg";
import zenCustomer from "@/assets/case-studies/zen-customer.jpg";
import debtOverview from "@/assets/case-studies/debt-overview.png";
import debtPortal from "@/assets/case-studies/debt-portal.png";
import maxyfiPlanned from "@/assets/case-studies/maxyfi-planned.jpg";
import maxyfiUnplanned from "@/assets/case-studies/maxyfi-unplanned.jpg";
import maxyfiCompleted from "@/assets/case-studies/maxyfi-completed.jpg";
import creoUpload from "@/assets/case-studies/creo-upload.png";
import creoThinking from "@/assets/case-studies/creo-thinking.png";
import creoChart from "@/assets/case-studies/creo-chart.png";

// Card cover art — 1440×756 (40:21), matching the Work card's cover aspect exactly.
import coverNasdaq from "@/assets/case-studies/cover-nasdaq.webp";
import coverZenstatement from "@/assets/case-studies/cover-zenstatement.webp";
import coverCreo from "@/assets/case-studies/cover-creo.webp";
import coverDebtCollection from "@/assets/case-studies/cover-debt-collection.webp";
import coverMaxyfi from "@/assets/case-studies/cover-maxyfi.webp";

// Unified on Plus Jakarta Sans — `serif` kept as the display alias (no churn at call sites).
const serif = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", letterSpacing: "-0.02em" } as const;
const mono = { fontFamily: "'JetBrains Mono', monospace" } as const;

// ─── Card summaries (used in the "Selected work" grid) ───────────────────────

export const CASE_STUDIES = [
  {
    id: 0,
    slug: "nasdaq-calypso",
    title: "Nasdaq Calypso",
    subtitle: "Reporting service — capital markets",
    summary:
      "Modernising the reporting experience of a legacy capital-markets platform used by risk, operations, compliance, and finance teams — reducing friction for expert users without taking away the control they rely on.",
    industry: "Capital Markets · NDA",
    role: "Product Designer",
    timeline: "Confidential",
    team: "",
    outcomes: ["Modernised legacy UX", "Faster access to data", "Design system contributions"],
    skills: ["Information Architecture", "Enterprise UX", "Design Systems", "Data-Heavy UI"],
    image: coverNasdaq,
  },
  {
    id: 1,
    slug: "zenstatement",
    title: "ZenStatement",
    subtitle: "Reconciliation, in one clear view",
    summary:
      "Designed the reconciliation experience for an AI finance platform — turning spreadsheet matching of thousands of transactions into a dashboard that leads with the exceptions that matter.",
    industry: "Web App",
    role: "Product Designer",
    timeline: "2025 · ~4 weeks",
    team: "Sole designer · 8 eng",
    outcomes: ["Single source of truth", "Exceptions surfaced first", "Guided customer setup"],
    skills: ["User Research", "Information Architecture", "Data Tables", "Design System"],
    image: coverZenstatement,
  },
  {
    id: 2,
    slug: "creo",
    title: "Creo AI",
    subtitle: "ZenStatement — an assistant for reconciliation",
    summary:
      "An AI assistant built into a reconciliation platform, so finance teams can ask a question in plain language instead of digging through the app to find the answer.",
    industry: "AI Assistant · Fintech",
    role: "Product Designer",
    timeline: "5 weeks",
    team: "",
    outcomes: ["Ask instead of dig", "Context-aware answers", "Answers you can check"],
    skills: ["Conversation Design", "AI UX", "Interaction Design", "Data Visualisation"],
    image: coverCreo,
  },
  {
    id: 3,
    slug: "debt-collection",
    title: "Debt Collection Simplified",
    subtitle: "Maxyfi — collections & debtor payments",
    summary:
      "An enterprise B2B2C platform that gives collections teams one clear view of every debtor — and gives debtors an easy, self-serve way to pay.",
    industry: "Debt Collection · B2B2C",
    role: "Product Designer",
    timeline: "~4 months",
    team: "Sole designer · 1 PM · 5 eng",
    outcomes: ["One view of every debtor", "Self-serve debtor payments", "Compliance-aware workflows"],
    skills: ["Product Design", "Interaction Design", "Data Dashboards", "Payments UX"],
    image: coverDebtCollection,
  },
  {
    id: 4,
    slug: "maxyfi",
    title: "Maxyfi",
    subtitle: "Field Agent App for Debt Collection",
    summary:
      "Brought a dense desktop collections workflow to a mobile app built for agents in the field — fewer taps, a clear daily agenda, and real-time status managers can trust.",
    industry: "Mobile App",
    role: "Product Designer",
    timeline: "2024 · ~1 month",
    team: "Sole designer · 5 eng",
    outcomes: ["4 → 1 flows unified", "~35% fewer taps", "Field-ready mobile app"],
    skills: ["Mobile Design", "IA & Flows", "Interaction Design", "Design System"],
    image: coverMaxyfi,
  },
];

export type CaseStudySummary = (typeof CASE_STUDIES)[number];

// ─── Section anchors / TOC helpers ───────────────────────────────────────────

function slug(label: string) {
  return label
    .replace(/^\s*\d+\s*[·.]\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function tocLabel(label: string) {
  return label.replace(/^\s*\d+\s*[·.]\s*/, "");
}

// ─── Shared primitives (match the portfolio's design language) ───────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-primary" />
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary" style={mono}>
        {children}
      </span>
    </div>
  );
}

function Section({
  label, title, lead, children,
}: {
  label?: string; title?: React.ReactNode; lead?: React.ReactNode; children?: React.ReactNode;
}) {
  const id = label ? slug(label) : undefined;
  return (
    <section id={id} className="border-t border-border">
      <Reveal className="max-w-5xl mx-auto px-6 py-14 md:py-20" duration={700}>
        {label && <Eyebrow>{label}</Eyebrow>}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold leading-tight text-foreground" style={serif}>
            {title}
          </h2>
        )}
        {lead && <p className="text-lg text-muted-foreground leading-relaxed mt-5 max-w-3xl">{lead}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4 last:mb-0 max-w-3xl">{children}</p>;
}

function CardGrid({ cols = 2, children }: { cols?: 2 | 3 | 4; children: React.ReactNode }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
  return <div className={`grid grid-cols-1 ${map[cols]} gap-4`}>{children}</div>;
}

function InfoCard({
  num, tag, title, children,
}: {
  num?: string; tag?: string; title?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-2.5 transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5">
      {num && (
        <div
          className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0"
          style={mono}
        >
          {num}
        </div>
      )}
      {tag && (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>
          {tag}
        </span>
      )}
      {title && <h3 className="text-base font-bold text-foreground leading-snug">{title}</h3>}
      {children && <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>}
    </div>
  );
}

function Pill({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "primary" }) {
  const cls =
    tone === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-muted text-muted-foreground";
  return <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${cls}`}>{children}</span>;
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <Reveal as="figure" variant="fade-up" duration={800} className="max-w-6xl mx-auto px-6 my-4">
      <div className="group rounded-2xl md:rounded-3xl overflow-hidden border border-border bg-muted shadow-soft-lg">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
      </div>
      {caption && (
        <figcaption className="text-xs text-muted-foreground mt-3 text-center" style={mono}>
          {caption}
        </figcaption>
      )}
    </Reveal>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3 max-w-3xl">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
          <span className="mt-1.5 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Check size={10} className="text-primary" />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function StatGrid({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-1.5">
          <div className="text-4xl font-bold text-foreground" style={serif}>{s.value}</div>
          <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Case study hero ─────────────────────────────────────────────────────────

function CaseHero({
  eyebrow, title, lead, meta, image, imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  meta: { label: string; value: string; sub?: string }[];
  /** Optional — NDA work may have no publishable screen. */
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header className="pt-[60px]">
      <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-20 pb-10">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="font-bold text-foreground leading-[1.05] tracking-tight"
          style={{ ...serif, fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}
        >
          {title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6 max-w-3xl">{lead}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
          {meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" style={mono}>
                {m.label}
              </span>
              <span className="text-sm font-semibold text-foreground">{m.value}</span>
              {m.sub && <span className="text-xs text-muted-foreground">{m.sub}</span>}
            </div>
          ))}
        </div>
      </div>

      {image && <Figure src={image} alt={imageAlt ?? ""} />}
    </header>
  );
}

// ─── Maxyfi ──────────────────────────────────────────────────────────────────

function MaxyfiDetail() {
  return (
    <article>
      {/* Hero */}
      <header className="pt-[60px]">
        <div className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow>UX Case Study · Field Agent App · 2024</Eyebrow>
              <h1 className="font-bold text-foreground leading-[1.05] tracking-tight mt-1" style={{ ...serif, fontSize: "clamp(2.5rem, 5.5vw, 4rem)" }}>
                Collections, <em className="italic font-normal text-primary">built for the field.</em>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6 max-w-xl">
                A mobile app that puts a collection agent's whole day on one screen — who to visit, what to do next, and one tap to do it.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-border">
                {[
                  { label: "Role", value: "Product Designer", sub: "Sole UX designer" },
                  { label: "Timeline", value: "~1 month", sub: "2024" },
                  { label: "Platform", value: "Android app", sub: "Field agents" },
                  { label: "Contribution", value: "End-to-end", sub: "Concept → handoff" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" style={mono}>{m.label}</span>
                    <span className="text-sm font-semibold text-foreground">{m.value}</span>
                    <span className="text-xs text-muted-foreground">{m.sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <Reveal variant="scale" duration={900}>
              <Phone src={maxyfiPlanned} alt="Maxyfi field-agent app — an agent's planned visits for the day" />
            </Reveal>
          </div>
        </div>
      </header>

      {/* 01 Problem & context */}
      <Chapter label="01 · Problem & context" title="Field agents don't work at a desk.">
        <Wide>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 lg:order-1">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Agents move between visits, juggle unplanned stops, and run follow-ups across stages — all while staying
                compliant. The old desktop tools weren't built for that: a simple action took too many screens, and no
                one had a clear view of the day.
              </p>
              <Feature title="Who it's for">
                Maxyfi serves in-house collections teams, agencies, and debt buyers. Mobile keeps agents productive away
                from the desk while managers keep visibility into progress and KPIs.
              </Feature>
              <Feature title="A hard rule, not a nice-to-have">
                Every debtor interaction has to respect <strong className="text-foreground">FDCPA &amp; TCPA</strong> —
                compliance shaped what agents could do, and when.
              </Feature>
            </div>
            <div className="lg:order-2">
              <Phone src={maxyfiUnplanned} alt="Maxyfi — the agent's list of accounts needing action" />
            </div>
          </div>
        </Wide>
      </Chapter>

      {/* 02 Goals, users & constraints */}
      <Chapter label="02 · Goals, users & constraints" title="One month, real limits, clear goals.">
        <Mid>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-8">
            <LabeledList label="Goals" items={["Collect more on time", "Cut agent cognitive load", "Real-time visibility for managers", "Comfortable for every age group"]} />
            <LabeledList label="Users" items={["Field collection agents — primary, in the app all day", "Collection managers — watching recovery & KPIs", "Tech and non-tech-savvy alike"]} />
            <LabeledList label="Constraints" items={["FDCPA & TCPA compliance", "One-month timeline, small team", "A dense desktop workflow on a small screen"]} />
          </div>
        </Mid>
      </Chapter>

      {/* 03 Research & insights */}
      <Chapter
        label="03 · Research & insights"
        title="Three signals, straight from the floor."
        lead="No formal study fit the timeline — direction came from stakeholders and domain knowledge. Three things were clear, and I designed hard against them."
      >
        <Quotes
          items={[
            { quote: "Give me my day at a glance.", body: "Agents open the app to answer one question: who am I seeing, and what's next?" },
            { quote: "Real-time status beats depth.", body: "Payment, communication, and priority need to be current — not buried in reports." },
            { quote: "Fewer screens, fewer taps.", body: "Every extra step in the field is friction. The common action has to be immediate." },
          ]}
        />
      </Chapter>

      {/* 04 User flow */}
      <Chapter
        label="04 · User flow"
        title="An agent's day, in one loop."
        lead="A bottom bar splits the app into Home, Customers, Calendar, and Notifications — but the day lives in Customers."
      >
        <Flow steps={["Open app", "Planned list", "Pick an account", "Act — call · SMS · WhatsApp", "Log outcome", "Moves to Completed"]} />
        <div className="mt-10">
          <Mid>
            <p className="text-muted-foreground leading-relaxed">
              Customers splits into three tabs that mirror how the day goes — <strong className="text-foreground">Planned</strong>{" "}
              (today's visits), <strong className="text-foreground">Unplanned</strong> (stops that come up), and{" "}
              <strong className="text-foreground">Completed</strong> (done). Agents open straight into who they're meant to see.
            </p>
          </Mid>
        </div>
      </Chapter>

      {/* 05 Product walkthrough */}
      <Chapter
        label="05 · Product walkthrough"
        title="The whole day, one list."
        lead="Customers is the core of the app. Each tab is a scannable list where the next action and its urgency live on every row."
      >
        <PhoneAnnotated
          src={maxyfiPlanned}
          alt="Maxyfi Planned tab — today's scheduled visits"
          caption="Planned — today's visits, with the next action on every row."
          points={[
            { x: 50, y: 15, title: "Three tabs, one day", body: "Planned, Unplanned, Completed — the day is split the way an agent actually works it." },
            { x: 73, y: 36, title: "Action + urgency, inline", body: "Every row carries the next action and when — colour-coded from “in 7 days” to “Overdue”." },
            { x: 40, y: 54, title: "Expand to act", body: "Tap a row and the actions come to you — WhatsApp, SMS, View Map, Call. One tap, not five screens." },
          ]}
        />

        <div className="mt-16">
          <Callout eyebrow="The core interaction" title="One tap, not five screens.">
            The old flow buried a call or message several screens deep. Here the action lives on the row and expands in
            place — the single change that did the most to cut cognitive load in the field.
          </Callout>
        </div>

        <div className="mt-10">
          <Mid>
            <Crop src={maxyfiPlanned} alt="Zoom — the in-row actions: WhatsApp, SMS, View Map, Call" size="175%" posX={50} posY={53} className="aspect-square max-w-md mx-auto" />
            <figcaption className="text-xs text-muted-foreground mt-3 text-center" style={mono}>Zoomed — tap a row and the actions come to you.</figcaption>
          </Mid>
        </div>

        <div className="mt-16">
          <PhoneAnnotated
            reverse
            src={maxyfiUnplanned}
            alt="Maxyfi Unplanned tab — stops that come up"
            caption="Unplanned — stops that surface during the day, each with a single Take Action."
            points={[
              { x: 72, y: 27, title: "Surfaced, not searched", body: "Stops that come up appear here with a single “Take Action” — no digging." },
              { x: 69, y: 32, title: "Time since last contact", body: "“180 days ago” keeps aging visible, so nothing quietly slips." },
            ]}
          />
        </div>

        <div className="mt-16">
          <PhoneAnnotated
            src={maxyfiCompleted}
            alt="Maxyfi Completed tab — successful actions"
            caption="Completed — the day's wins, logged with channel and date."
            points={[
              { x: 72, y: 30, title: "Closed the loop", body: "Successful actions log with channel and date — the real-time signal managers watch for KPIs." },
            ]}
          />
        </div>
      </Chapter>

      {/* 06 Key UX decisions */}
      <Chapter label="06 · Key UX decisions" title="Five calls that shaped every screen.">
        <NumberList
          items={[
            { n: "01", title: "Fewer screens, faster actions", body: "Collapse steps so the common action takes the fewest taps possible." },
            { n: "02", title: "Show only what needs action", body: "Lead agents to accounts that need work — not to raw data." },
            { n: "03", title: "The day, at a glance", body: "One place that answers where to be and when." },
            { n: "04", title: "Real-time status everywhere", body: "Payment, communication, and priority update live so agents can adapt." },
            { n: "05", title: "Comfortable for every age", body: "Big targets, plain labels, predictable navigation." },
          ]}
        />
      </Chapter>

      {/* 07 Component highlights */}
      <Chapter
        label="07 · Component highlights"
        title="A small, consistent kit."
        lead="A handful of reusable patterns — status chips, list rows, primary actions — sized for quick scanning and easy tapping."
      >
        <Mid>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10 flex flex-col gap-9">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#1A73E8" }} />
                <span className="text-sm text-muted-foreground">Primary <span className="text-foreground font-medium">#1A73E8</span></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg border border-border" style={{ backgroundColor: "#16161A" }} />
                <span className="text-sm text-muted-foreground">Ink <span className="text-foreground font-medium">#16161A</span></span>
              </div>
              <span className="text-sm text-muted-foreground">Type <span className="text-foreground font-medium">Poppins</span> · 8-pt scale · 44px+ targets</span>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" style={mono}>Status chips</span>
              <div className="flex flex-wrap gap-2.5 mt-3">
                {[
                  { t: "Paid", c: "#16A34A" },
                  { t: "Due Today", c: "#E5484D" },
                  { t: "in 7 days", c: "#C77700" },
                  { t: "Overdue 2 days", c: "#E5484D" },
                  { t: "Successful", c: "#16A34A" },
                ].map((s) => (
                  <span key={s.t} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ color: s.c, backgroundColor: `${s.c}1F` }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.c }} />{s.t}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" style={mono}>List row</span>
                <div className="mt-3 rounded-xl border border-border bg-background px-4 py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-foreground">John Doe</div>
                    <div className="text-sm text-foreground/70">$1,2500.73</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium" style={{ color: "#1A73E8" }}>Call</div>
                    <div className="text-xs" style={{ color: "#C77700" }}>in 7 days</div>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground" style={mono}>Primary action</span>
                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: "#1A73E8" }}>Call now</span>
                  <span className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-medium border" style={{ color: "#1A73E8", borderColor: "#1A73E855" }}>WhatsApp</span>
                </div>
              </div>
            </div>
          </div>
        </Mid>
      </Chapter>

      {/* 08 Impact */}
      <Chapter
        label="08 · Impact"
        title="What the design aimed at."
        lead="The work moved into build with engineering. These are the design targets the work was built around — live metrics are tracked post-launch, so I won't dress them up as results."
      >
        <BigMetrics
          items={[
            { value: "4 → 1", label: "Separate flows unified into one field app" },
            { value: "~35%", label: "Fewer taps to complete a follow-up" },
            { value: "3", label: "Tabs to run the entire day" },
          ]}
        />
      </Chapter>

      {/* 09 Reflection */}
      <Chapter label="09 · Reflection" title="What I took away." center>
        <Statement>
          Cutting screens and surfacing the next action is what let agents move fast in the field — and real-time
          completion logging gave managers a live handle on KPIs. When research is thin, designing hard against a few
          clear signals still beats guessing.
        </Statement>
        <div className="mt-12 text-center">
          <a
            href={PROFILE.resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            See my full résumé
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Chapter>
    </article>
  );
}

// ─── Refined case-study layout primitives (varied, design-first) ─────────────

function Wide({ children }: { children: React.ReactNode }) { return <div className="max-w-6xl mx-auto px-6">{children}</div>; }
function Mid({ children }: { children: React.ReactNode }) { return <div className="max-w-5xl mx-auto px-6">{children}</div>; }
function Narrow({ children }: { children: React.ReactNode }) { return <div className="max-w-3xl mx-auto px-6">{children}</div>; }

function Chapter({ label, title, lead, center = false, children }: {
  label: string; title?: React.ReactNode; lead?: React.ReactNode; center?: boolean; children?: React.ReactNode;
}) {
  return (
    <section id={slug(label)} className="border-t border-border py-16 md:py-24">
      <Reveal className={`max-w-5xl mx-auto px-6 ${center ? "text-center" : ""}`}>
        <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
          <span className="w-8 h-px bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary" style={mono}>{tocLabel(label)}</span>
        </div>
        {title && <h2 className="text-3xl md:text-[2.5rem] font-bold leading-[1.12] text-foreground text-balance" style={serif}>{title}</h2>}
        {lead && <p className={`text-lg md:text-xl text-muted-foreground leading-relaxed mt-5 max-w-3xl ${center ? "mx-auto" : ""}`}>{lead}</p>}
      </Reveal>
      {children && <div className="mt-12 md:mt-14">{children}</div>}
    </section>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="max-w-4xl mx-auto px-6">
      <p className="font-serif text-2xl md:text-[2rem] leading-[1.35] text-foreground text-balance">{children}</p>
    </Reveal>
  );
}

function LabeledList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>{label}</span>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] text-muted-foreground leading-relaxed">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />{it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NumberList({ items }: { items: { n: string; title: string; body: React.ReactNode }[] }) {
  return (
    <Mid>
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 70} className="flex gap-4">
            <span className="font-serif text-2xl font-bold text-primary/30 leading-none w-7 shrink-0">{it.n}</span>
            <div>
              <div className="text-base font-bold text-foreground">{it.title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Mid>
  );
}

function Steps({ items }: { items: { n: string; title: string; body: React.ReactNode }[] }) {
  return (
    <Wide>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        <span aria-hidden className="hidden lg:block absolute left-5 right-5 top-5 h-px bg-border" />
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 90} variant="fade-up" className="relative">
            <span className="relative z-10 grid place-items-center w-10 h-10 rounded-full bg-background border border-primary text-primary text-sm font-bold" style={mono}>{it.n}</span>
            <div className="text-base font-bold text-foreground mt-4">{it.title}</div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{it.body}</p>
          </Reveal>
        ))}
      </div>
    </Wide>
  );
}

function Personas({ items }: { items: { tag: string; initials: string; title: string; body: React.ReactNode }[] }) {
  return (
    <Mid>
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((p, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md">
              <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-primary/10 text-primary font-serif font-bold text-sm">{p.initials}</span>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>{p.tag}</span>
                <div className="text-base font-bold text-foreground mt-0.5">{p.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Mid>
  );
}

function Quotes({ items }: { items: { quote: React.ReactNode; body: React.ReactNode }[] }) {
  return (
    <Wide>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((q, i) => (
          <Reveal key={i} delay={i * 90}>
            <blockquote className="relative h-full rounded-2xl border border-border bg-muted/30 p-6 pt-8">
              <span aria-hidden className="absolute top-1 left-4 font-serif text-6xl text-primary/20 leading-none">&ldquo;</span>
              <p className="relative font-serif text-lg font-medium text-foreground leading-snug">{q.quote}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{q.body}</p>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Wide>
  );
}

function AnnotatedFigure({ src, alt, points, caption, reverse = false }: {
  src: string; alt: string; caption?: string; reverse?: boolean;
  points: { x: number; y: number; title: string; body: React.ReactNode }[];
}) {
  return (
    <Reveal variant="fade-up" className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8 lg:gap-10 items-center">
        <figure className={`relative rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-soft-xl bg-muted ${reverse ? "lg:order-2" : ""}`}>
          <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
          {points.map((p, i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-[13px] font-bold shadow-lg ring-2 ring-background"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}>{i + 1}</span>
          ))}
        </figure>
        <ol className={`flex flex-col gap-5 ${reverse ? "lg:order-1" : ""}`}>
          {points.map((p, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-[11px] font-bold mt-0.5" style={mono}>{i + 1}</span>
              <div>
                <div className="text-[15px] font-bold text-foreground leading-snug">{p.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {caption && <figcaption className="text-xs text-muted-foreground mt-5 text-center" style={mono}>{caption}</figcaption>}
    </Reveal>
  );
}

function Split({ src, alt, reverse = false, children }: { src: string; alt: string; reverse?: boolean; children: React.ReactNode }) {
  return (
    <Reveal variant="fade-up" className="max-w-6xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <figure className={`rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-soft-xl bg-muted ${reverse ? "lg:order-2" : ""}`}>
          <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
        </figure>
        <div className={`flex flex-col gap-5 ${reverse ? "lg:order-1" : ""}`}>{children}</div>
      </div>
    </Reveal>
  );
}

function Feature({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-primary/25 pl-4">
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mt-1">{children}</p>
    </div>
  );
}

function Callout({ eyebrow = "Key decision", title, children }: { eyebrow?: string; title?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Reveal className="max-w-4xl mx-auto px-6">
      <div className="rounded-2xl md:rounded-3xl border border-primary/25 bg-primary/[0.06] p-6 md:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>{eyebrow}</span>
        {title && <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mt-2 mb-2">{title}</h3>}
        <div className="text-[15px] text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </Reveal>
  );
}

/** Two-column scope contrast — what a system does vs. what it deliberately doesn't. */
function DoesDont({ does, dont }: { does: string[]; dont: string[] }) {
  return (
    <Mid>
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { label: "What Creo does", items: does, tone: "yes" as const },
          { label: "What Creo doesn't do", items: dont, tone: "no" as const },
        ].map((col) => (
          <div key={col.label} className="rounded-2xl border border-border bg-card p-6 md:p-7">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>{col.label}</span>
            <ul className="mt-4 flex flex-col gap-3">
              {col.items.map((it, i) => (
                <li key={i} className="flex gap-3 text-[15px] text-muted-foreground leading-relaxed">
                  <span aria-hidden className={`mt-[7px] shrink-0 ${col.tone === "yes" ? "w-3.5 h-[2px] bg-primary" : "w-3.5 h-[2px] bg-muted-foreground/40"}`} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Mid>
  );
}

/**
 * Visible gap marker. Deliberately loud — an unfilled placeholder should be
 * impossible to publish by accident.
 */
function Ph({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded px-1.5 py-0.5 mx-0.5 text-[0.85em] font-semibold bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
      style={mono}
      title="Placeholder — replace with real detail"
    >
      {children}
    </span>
  );
}

/** Research finding → what it changed → what it would have cost to ignore. */
function Insight({ n, insight, implication, risk }: {
  n: string; insight: string; implication: string; risk: string;
}) {
  const rows = [
    { k: "Insight", v: insight, tone: "text-foreground" },
    { k: "Design implication", v: implication, tone: "text-muted-foreground" },
    { k: "Risk if ignored", v: risk, tone: "text-muted-foreground" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-7">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>{n}</span>
      <div className="mt-4 flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.k}>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70" style={mono}>{r.k}</span>
            <p className={`text-[15px] leading-relaxed mt-1 ${r.tone}`}>{r.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Edge case → what the system can determine → what still needs a person. */
function EdgeCases({ items }: { items: { c: string; sys: string; analyst: string }[] }) {
  return (
    <Wide>
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="hidden md:grid md:grid-cols-[1fr_1.4fr_1.4fr] gap-6 px-6 py-3 bg-muted/60 border-b border-border">
          {["Edge case", "What the system knows", "What the analyst does"].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground" style={mono}>{h}</span>
          ))}
        </div>
        {items.map((it, i) => (
          <div
            key={it.c}
            className={`grid md:grid-cols-[1fr_1.4fr_1.4fr] gap-1.5 md:gap-6 px-5 md:px-6 py-4 ${i % 2 ? "bg-muted/25" : "bg-card"} ${i ? "border-t border-border" : ""}`}
          >
            <span className="text-[13px] font-bold text-foreground">{it.c}</span>
            <span className="text-[14px] text-muted-foreground leading-relaxed">{it.sys}</span>
            <span className="text-[14px] text-muted-foreground leading-relaxed">{it.analyst}</span>
          </div>
        ))}
      </div>
    </Wide>
  );
}

/** State → response pairs. Kept to one line each so the set can be scanned, not read. */
function StateTable({ items }: { items: { state: string; res: string }[] }) {
  return (
    <Mid>
      <div className="rounded-2xl border border-border overflow-hidden">
        {items.map((it, i) => (
          <div
            key={it.state}
            className={`grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-1 sm:gap-6 px-5 sm:px-6 py-4 ${
              i % 2 ? "bg-muted/30" : "bg-card"
            } ${i ? "border-t border-border" : ""}`}
          >
            <span className="text-[13px] font-bold text-foreground leading-snug">{it.state}</span>
            <span className="text-[14px] text-muted-foreground leading-relaxed">{it.res}</span>
          </div>
        ))}
      </div>
    </Mid>
  );
}

/**
 * Closing note for NDA-restricted work. Deliberately quiet — it's a boundary,
 * not an apology — and ends on an invitation to talk.
 */
function NdaNote({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-16 md:py-24">
      <Reveal className="max-w-4xl mx-auto px-6">
        <div className="rounded-2xl md:rounded-3xl border border-border bg-muted/40 p-8 md:p-10">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/10 text-primary shrink-0">
              <Lock size={13} aria-hidden />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>
              Protected by NDA
            </span>
          </div>
          <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mt-4">{children}</p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-6 group"
          >
            Get in touch
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function KpiBand({ items }: { items: { label: string; sub: string }[] }) {
  return (
    <Wide>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Target KPI</span>
              <span className="font-serif text-xl md:text-2xl font-bold text-foreground leading-tight">{it.label}</span>
              <span className="text-sm text-muted-foreground leading-relaxed">{it.sub}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Wide>
  );
}

// ─── Mobile / interface-first primitives ────────────────────────────────────

function Crop({ src, alt, size = "220%", posX = 50, posY = 50, className = "aspect-[16/10]" }: {
  src: string; alt: string; size?: string; posX?: number; posY?: number; className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`rounded-2xl md:rounded-3xl border border-border shadow-soft-md bg-no-repeat bg-muted ${className}`}
      style={{ backgroundImage: `url(${src})`, backgroundSize: size, backgroundPosition: `${posX}% ${posY}%` }}
    />
  );
}

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-fit mx-auto ${className}`}>
      <div aria-hidden className="absolute -inset-8 rounded-[3rem] blur-2xl opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 30%, var(--accent-soft), transparent 66%)" }} />
      <img src={src} alt={alt} loading="lazy" className="relative w-[260px] sm:w-[288px] h-auto drop-shadow-2xl" />
    </div>
  );
}

function PhoneAnnotated({ src, alt, points, caption, reverse = false }: {
  src: string; alt: string; caption?: string; reverse?: boolean;
  points: { x: number; y: number; title: string; body: React.ReactNode }[];
}) {
  return (
    <Reveal variant="fade-up" className="max-w-5xl mx-auto px-6">
      <div className="grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
        <figure className={`relative w-fit mx-auto ${reverse ? "lg:order-2" : ""}`}>
          <div aria-hidden className="absolute -inset-8 rounded-[3rem] blur-2xl opacity-50 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 30%, var(--accent-soft), transparent 66%)" }} />
          <img src={src} alt={alt} loading="lazy" className="relative w-[248px] sm:w-[272px] h-auto drop-shadow-2xl" />
          {points.map((p, i) => (
            <span key={i}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-[12px] font-bold shadow-lg ring-2 ring-background"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}>{i + 1}</span>
          ))}
        </figure>
        <ol className={`flex flex-col gap-5 ${reverse ? "lg:order-1" : ""}`}>
          {points.map((p, i) => (
            <li key={i} className="flex gap-3.5">
              <span className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-primary/10 text-primary text-[11px] font-bold mt-0.5" style={mono}>{i + 1}</span>
              <div>
                <div className="text-[15px] font-bold text-foreground leading-snug">{p.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {caption && <figcaption className="text-xs text-muted-foreground mt-6 text-center" style={mono}>{caption}</figcaption>}
    </Reveal>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <Wide>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <Reveal delay={i * 60}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground">
                <span className="text-[11px] font-bold text-primary" style={mono}>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </span>
            </Reveal>
            {i < steps.length - 1 && <span aria-hidden className="text-muted-foreground/40 text-lg">→</span>}
          </div>
        ))}
      </div>
    </Wide>
  );
}

function BigMetrics({ items }: { items: { value: string; label: string }[] }) {
  return (
    <Wide>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
        {items.map((m, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="flex flex-col gap-2 border-t-2 border-primary/25 pt-6">
              <span className="font-serif text-5xl md:text-6xl font-bold text-foreground leading-none tracking-tight">{m.value}</span>
              <span className="text-sm text-muted-foreground leading-relaxed">{m.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Wide>
  );
}

// ─── ZenStatement ────────────────────────────────────────────────────────────

function ZenStatementDetail() {
  return (
    <article>
      <CaseHero
        eyebrow="UX Case Study · FinOps · 2025"
        title={<>Turning spreadsheet reconciliation into <em className="italic font-normal text-primary">one clear view.</em></>}
        lead="Designing the reconciliation experience for ZenStatement — an AI finance platform that helps high-volume businesses match thousands of transactions automatically, and fix the ones that don't."
        meta={[
          { label: "Role", value: "Product Designer", sub: "Solo · end-to-end" },
          { label: "Timeline", value: "~4 weeks", sub: "2025" },
          { label: "Team", value: "1 PM · 2 FE", sub: "3 BE · 3 data eng" },
          { label: "Platform", value: "Web app", sub: "Desktop-first" },
        ]}
        image={zenDashboard}
        imageAlt="ZenStatement reconciliation dashboard"
      />

      <Chapter label="01 · Overview" title="Reconciliation, made legible.">
        <Narrow>
          <div className="flex flex-col gap-5">
            <p className="text-lg text-muted-foreground leading-relaxed">
              ZenStatement is an AI finance operating system for high-volume businesses. It pulls transaction data from
              every place a company sells and gets paid — payment gateways, marketplaces, banks — and{" "}
              <strong className="text-foreground">reconciles it automatically</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Reconciliation is simple to describe, painful to do: confirm what a business <em>expected</em> to receive
              matches what actually <em>settled</em>. At scale, that's hundreds of thousands of rows across systems that
              don't agree. I designed two parts — the reconciliation experience (this study) and the customer-master
              setup that feeds it clean data.
            </p>
          </div>
        </Narrow>
      </Chapter>

      <Chapter
        label="02 · My role"
        title="Owned the design end to end."
        lead="As the only designer, I took it from problem framing to developer handoff — with one PM and an eight-person engineering team."
      >
        <Mid>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <LabeledList label="I led" items={["User interviews with finance teams", "Information architecture & flows", "Wireframes & interaction design", "Final UI & component patterns", "Developer handoff & QA"]} />
            <LabeledList label="I collaborated on" items={["Priorities with the PM", "The data model with data engineers", "Feasibility with front & back end", "Client expectations & validation"]} />
          </div>
        </Mid>
      </Chapter>

      <Chapter label="03 · The problem" title="Reconciliation lived in a spreadsheet.">
        <Statement>
          Finance teams exported statements from each system, lined them up in Excel, and matched transactions by hand —
          row after row, every day. Slow, easy to get wrong, and impossible to trust at volume. When a number didn't
          match, no one could quickly say <em className="text-primary not-italic font-semibold">which side</em> was wrong.
        </Statement>
        <Mid>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border rounded-2xl border border-border bg-card overflow-hidden">
            {[
              { k: "Manual", v: "Matching, row by row." },
              { k: "Multi-source", v: "Gateways · banks · marketplaces." },
              { k: "Low trust", v: "Mismatches with no explanation." },
            ].map((c) => (
              <div key={c.k} className="p-6">
                <div className="font-serif text-lg font-bold text-foreground">{c.k}</div>
                <p className="text-sm text-muted-foreground mt-1">{c.v}</p>
              </div>
            ))}
          </div>
        </Mid>
      </Chapter>

      <Chapter
        label="04 · Goals & users"
        title="Clear goals, for two very different people."
        lead="The design had four jobs — and had to serve both the analyst who lives in the tool and the controller who just wants confidence the books can close."
      >
        <Steps
          items={[
            { n: "G1", title: "Health in one glance", body: "Show reconciliation health at the top, instantly." },
            { n: "G2", title: "Get to exceptions fast", body: "Lead users to the transactions that don't match." },
            { n: "G3", title: "Explain every mismatch", body: "Make each mismatch understandable, not a dead end." },
            { n: "G4", title: "Guide heavy setup", body: "Turn dense customer onboarding into a guided flow." },
          ]}
        />
        <div className="mt-14">
          <Personas
            items={[
              { tag: "Primary", initials: "RA", title: "Reconciliation / finance-ops analyst", body: "Lives in the tool daily. Cares about one thing: finding and clearing the transactions that don't match — fast, and with enough context to fix the right side." },
              { tag: "Secondary", initials: "FC", title: "Finance controller", body: "Wants oversight, not detail — the reconciliation rate, the total exposure, and confidence the books can close on time." },
            ]}
          />
        </div>
      </Chapter>

      <Chapter
        label="05 · Research & approach"
        title="Three signals, one way of working."
        lead="From interviews with the finance teams already using ZenStatement — a small, qualitative sample I treated as signals to design against, not statistics."
      >
        <Quotes
          items={[
            { quote: "I don't need every number — I need the exceptions.", body: "Most transactions match on their own. The work is the small share that doesn't — so the design leads with mismatches, not totals." },
            { quote: "Trust is the product.", body: "If a user can't see why two records don't match, they don't trust the tool — and go straight back to Excel to check by hand." },
            { quote: "Setup is a cliff.", body: "One long onboarding form made people lose track of what was done and what was left." },
          ]}
        />
        <div className="mt-14">
          <Steps
            items={[
              { n: "01", title: "Understand the mess", body: "Sat with finance teams and their spreadsheets to see how they actually match transactions." },
              { n: "02", title: "Map the states", body: "Worked with data engineers to define every reconciliation state before drawing a screen." },
              { n: "03", title: "Dashboard → details", body: "A summary that answers “are we ok?” and a drill-down that answers “what's wrong?”" },
              { n: "04", title: "Validate & hand off", body: "Checked designs against real client data, then handed off patterns to engineering." },
            ]}
          />
        </div>
      </Chapter>

      <Chapter
        label="06 · Solution — Dashboard"
        title="A dashboard that answers one question first."
        lead="“Are we reconciled today?” The top row carries the health metrics; the mismatch card pulls problems forward with a direct way to act on them."
      >
        <AnnotatedFigure
          src={zenDashboard}
          alt="ZenStatement reconciliation dashboard with annotations"
          caption="Reconciliation dashboard — the one-glance answer to “are we reconciled today?”"
          points={[
            { x: 38, y: 15, title: "Health up top", body: "Volume, reconciliation rate and receivables sit first — the numbers a controller checks in seconds." },
            { x: 83, y: 27, title: "Mismatches pull forward", body: "The problem count is broken down by type, with a direct “Resolve Issues” action." },
            { x: 57, y: 29, title: "Expected vs received", body: "The money variance in plain terms — the gap between what was owed and what settled." },
            { x: 50, y: 74, title: "Summary by source", body: "A breakdown per platform (Shopify, Razorpay, Amazon…) so teams see which channel is off." },
          ]}
        />
      </Chapter>

      <Chapter
        label="07 · Solution — Transaction Details"
        title="The drill-down: one row, one clear status."
        lead="From the dashboard, a user drops into the transaction table to work the exceptions. The key move was separating two ideas users kept confusing — and naming which side of a mismatch broke."
      >
        <Callout title="Two statuses, not one.">
          A transaction can be <strong className="text-foreground">complete</strong> yet still{" "}
          <strong className="text-foreground">not reconciled</strong>. Merging those hid problems — so I split them:{" "}
          <em>Status</em> (where the payment is) and <em>Recon Status</em> (whether it matches, and which system to
          chase when it doesn't).
        </Callout>
        <div className="mt-14">
          <AnnotatedFigure
            reverse
            src={zenTransactions}
            alt="ZenStatement transaction details table with annotations"
            caption="Transaction details — two statuses separate where the payment is from whether it matches"
            points={[
              { x: 51, y: 27, title: "Status", body: "Where the payment is — Completed or Pending." },
              { x: 60, y: 27, title: "Recon Status", body: "Whether it matches — and which side broke: “Not Matched”, “Partial”, or “Not Found in Sys A/B” turns a dead-end flag into a next step." },
              { x: 90, y: 20, title: "Money, right-aligned", body: "Net, fees and net settled line up for fast scanning — the numbers a reconciler actually compares." },
              { x: 42, y: 16, title: "Search & filters", body: "Isolate the exceptions — e.g. everything “Not Matched” — instead of scrolling the whole ledger." },
            ]}
          />
        </div>
      </Chapter>

      <Chapter
        label="08 · Customer Master"
        title="Setting up a customer, without the cliff."
        lead="A “customer” here is a business firm — onboarding one means capturing contacts, hierarchy, tax, custom attributes, and billing. One giant form overwhelmed people, so I broke it into a guided, resumable flow."
      >
        <Split src={zenCustomer} alt="ZenStatement customer master setup">
          <Feature title="Chunked into steps">Six focused sections instead of one endless form — each a small, finishable task.</Feature>
          <Feature title="Progress always visible">A stepper marks what's completed vs pending, so users never wonder if they're done.</Feature>
          <Feature title="Resumable, non-linear">Accordions let people jump to any section and come back — setup doesn't have to happen in one sitting.</Feature>
        </Split>
      </Chapter>

      <Chapter
        label="09 · Impact"
        title="Honest about what shipped — and what we'll measure."
        lead="This is an early-stage product with a small client base, so I won't invent metrics. Here's what I can stand behind, and the numbers we set up to track next."
      >
        <Mid>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <LabeledList
              label="What we can stand behind"
              items={[
                "Replaced manual Excel reconciliation with a single source of truth.",
                "Exceptions now surface directly, instead of being hunted for.",
                "Mismatches name which system to fix — not just that one exists.",
                "Customer setup became a guided, resumable flow.",
              ]}
            />
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>What we're measuring next</span>
              <div className="flex flex-wrap gap-2 mt-3">
                <Pill>Time to reconcile a period</Pill>
                <Pill>Exception resolution time</Pill>
                <Pill>Setup completion rate</Pill>
                <Pill>Auto-match rate</Pill>
              </div>
            </div>
          </div>
        </Mid>
      </Chapter>
    </article>
  );
}

// ─── Debt Collection Simplified ──────────────────────────────────────────────

function DebtCollectionDetail() {
  return (
    <article>
      <CaseHero
        eyebrow="UX Case Study · Debt Collection · B2B2C"
        title={<>Debt collection, <em className="italic font-normal text-primary">simplified.</em></>}
        lead="Maxyfi is a SaaS platform for recovering overdue payments. I designed two connected sides of it — the dashboard collections teams use to manage every debtor, and the portal debtors use to actually pay."
        meta={[
          { label: "Role", value: "Product Designer", sub: "Sole designer" },
          { label: "Timeline", value: "~4 months" },
          { label: "Team", value: "1 PM · 5 eng", sub: "2 FE · 3 BE" },
          { label: "Platform", value: "Web + Mobile", sub: "Business + debtor" },
          { label: "Industry", value: "Debt Collection", sub: "B2B2C" },
          { label: "Contribution", value: "End-to-end", sub: "Framing → handoff" },
        ]}
        image={debtOverview}
        imageAlt="Maxyfi debtor overview dashboard"
      />

      <Chapter label="01 · Overview" title="One platform for two sides of a debt.">
        <Narrow>
          <div className="flex flex-col gap-5">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Maxyfi is a SaaS debt-collection and accounts-receivable platform — it automates collections, manages
              debtor accounts, communicates across channels, and tracks recoveries and compliance. This work covered two
              connected experiences: <strong className="text-foreground">the business dashboard</strong> collections
              teams use to run accounts end-to-end, and <strong className="text-foreground">the debtor portal</strong>{" "}
              people use to understand and pay what they owe.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              On the business side are in-house collections teams, AR departments, agencies, debt buyers, and collections
              law firms. On the other side are the debtors — consumers and businesses with unpaid loans, invoices,
              medical, utility, or telecom bills.
            </p>
          </div>
        </Narrow>
      </Chapter>

      <Chapter
        label="02 · Problem & objectives"
        title="Recovering money was slow, manual, and hard to see."
        lead="Recovering overdue payments is slow: the work is manual, communication is fragmented, and performance is hard to see — which raises cost, lowers recovery, and adds compliance risk."
      >
        <Personas
          items={[
            { tag: "Collection specialists", initials: "CS", title: "Buried in busywork", body: "Switching between tools, chasing debtors by hand, and manually tracking who promised to pay and when." },
            { tag: "Managers", initials: "MG", title: "Flying blind", body: "No real-time view of team performance or recovery progress, so problems surface late." },
            { tag: "Debtors", initials: "DB", title: "Nowhere clear to pay", body: "Collection notices arrive from every direction, with no single place to see the full balance and settle it." },
          ]}
        />
        <div className="mt-16">
          <Mid>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>What the product had to do</span>
          </Mid>
          <div className="mt-6">
            <NumberList
              items={[
                { n: "01", title: "Automate the manual work", body: "Follow-ups and workflows run themselves, so agents spend time on decisions, not admin." },
                { n: "02", title: "One place to manage debtors", body: "Accounts, communication, and status live in a single view instead of scattered tools." },
                { n: "03", title: "Real-time visibility", body: "Managers see recovery and team performance at a glance." },
                { n: "04", title: "Effortless to pay", body: "Debtors get one clear balance and a self-serve, flexible way to clear it." },
                { n: "05", title: "Compliant by design", body: "Build the rules — FDCPA, TCPA, FCRA, regional privacy law — into the workflow, not around it." },
              ]}
            />
          </div>
        </div>
      </Chapter>

      <Chapter
        label="03 · Approach"
        title="Solo, end-to-end, and honest about the gaps."
        lead="I owned the design from problem framing to developer handoff with one PM and a five-person engineering team — and no formal user research to lean on."
      >
        <Mid>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Who I designed for</span>
          <dl className="mt-4 grid sm:grid-cols-2 gap-x-10 gap-y-4">
            {[
              { r: "Collections Agent", g: "Business", d: "Manages debtor accounts, follows up on payments, records activity." },
              { r: "Collections / Ops Manager", g: "Business", d: "Monitors performance, recovery rates, workflows, and compliance." },
              { r: "AR / Finance Manager", g: "Business", d: "Oversees outstanding invoices, reconciliation, and cash flow." },
              { r: "Compliance Officer", g: "Business", d: "Ensures collection practices follow regulations and policy." },
              { r: "Debtor — consumer or business", g: "Debtor", d: "Receives reminders, views balances, negotiates plans, and pays." },
            ].map((x) => (
              <div key={x.r}>
                <dt className="text-sm font-bold text-foreground">
                  {x.r} <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-primary/80" style={mono}>{x.g}</span>
                </dt>
                <dd className="text-sm text-muted-foreground leading-relaxed mt-0.5">{x.d}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>How I understood them</span>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              No formal user research was available. I built understanding from product docs, feature specs, customer
              testimonials, and industry best practice, then pressure-tested assumptions with stakeholders and domain
              knowledge rather than direct interviews. I'd rather be honest about that than dress it up.
            </p>
          </div>
        </Mid>

        <div className="mt-16">
          <Mid><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Process</span></Mid>
          <div className="mt-6">
            <Steps
              items={[
                { n: "01", title: "Understand", body: "Docs, testimonials, stakeholder input, and domain knowledge to frame the real workflow." },
                { n: "02", title: "Map", body: "Every role, state, and both sides of the flow — before drawing a screen." },
                { n: "03", title: "Design", body: "The business dashboard, the debtor portal, and the shared patterns between them." },
                { n: "04", title: "Hand off", body: "Specs and a small system handed cleanly to engineering." },
              ]}
            />
          </div>
        </div>

        <div className="mt-16">
          <Mid><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Key challenges</span></Mid>
          <div className="mt-6">
            <NumberList
              items={[
                { n: "01", title: "Two very different users, one platform", body: "A power tool for professionals and a dead-simple portal for stressed debtors — held together by one system." },
                { n: "02", title: "Density without overwhelm", body: "Collections work is data-heavy; the business view had to stay scannable, not become a spreadsheet." },
                { n: "03", title: "Compliance as a constraint", body: "Actions like Legal Hold and “no contact” had to be obvious and hard to get wrong." },
                { n: "04", title: "Designing without direct research", body: "Turning secondhand signals into confident decisions, and staying honest about the gaps." },
              ]}
            />
          </div>
        </div>
      </Chapter>

      <Chapter
        label="04 · Solution — Debtor Overview"
        title="The whole account, at a glance."
        lead="The business dashboard gives a collection specialist end-to-end data on any debtor in one place — so they can read the state of an account in seconds and act on it."
      >
        <AnnotatedFigure
          src={debtOverview}
          alt="Maxyfi debtor overview dashboard with annotations"
          caption="Debtor Overview — one account's full picture: balances, aging, actions, relationship, and activity."
          points={[
            { x: 70, y: 9, title: "Leads with what matters", body: "Risk, total AR, overdue and credit use sit up top — the numbers that decide what to do next." },
            { x: 38, y: 46, title: "Data → next action", body: "Every invoice carries its aging and status, with the next step — Promise to Pay, Dispute — inline. The screen leads to action, not just reading." },
            { x: 88, y: 48, title: "Relationship in context", body: "Contacts, relationship manager, next action and the active workflow (Legal Hold) sit beside the numbers — so decisions stay compliant." },
            { x: 88, y: 80, title: "One honest timeline", body: "Calls, notes, system events and payments made through the debtor portal all land in a single feed — nothing is a surprise." },
          ]}
        />
      </Chapter>

      <Chapter
        label="05 · Solution — Debtor Portal"
        title="An easy way to pay."
        lead="The debtor-facing portal is where people actually settle what they owe — so its whole job is to remove friction and reduce anxiety."
      >
        <AnnotatedFigure
          reverse
          src={debtPortal}
          alt="Maxyfi debtor payment portal with annotations"
          caption="Debtor Portal — every payable in one place, with Pay Now and Pay in Installments."
          points={[
            { x: 22, y: 11, title: "One balance, across providers", body: "A debtor often owes several credit providers. The portal pulls every payable into one list with a single total." },
            { x: 45, y: 38, title: "Clarity over pressure", body: "Plain descriptions and clear due/overdue framing (“16 days ago”) so debtors understand what they owe without a call." },
            { x: 92, y: 38, title: "Pay Now, per invoice", body: "Settle any single item on the spot — self-serve, no phone queue." },
            { x: 68, y: 95, title: "Pay in Installments", body: "For people who can't clear it at once — repayment bends to the debtor's reality." },
          ]}
        />
      </Chapter>

      <Chapter
        label="06 · Impact"
        title="What the work aims to move."
        lead="This is an ongoing product, so I won't invent results. These are the target KPIs the design is built to improve — to be measured with real data post-launch, not claimed as outcomes."
      >
        <KpiBand
          items={[
            { label: "Higher recovery rate", sub: "More of what's owed actually collected." },
            { label: "Lower DSO", sub: "Faster time from overdue to paid." },
            { label: "Less manual effort", sub: "Fewer tools and hand-offs per agent." },
            { label: "Faster workflows", sub: "Fewer steps to the next right action." },
          ]}
        />
      </Chapter>
    </article>
  );
}

// ─── Creo AI (ZenStatement) ──────────────────────────────────────────────────
// NDA-restricted: this page stays deliberately high-level. No prompts, business
// logic, workflows, or architecture — intent and interface only.

function CreoDetail() {
  return (
    <article>
      <CaseHero
        eyebrow="UX Case Study · ZenStatement · NDA-limited"
        title={<>Reconciliation you can just <em className="italic font-normal text-primary">ask.</em></>}
        lead="Creo is an AI assistant built into ZenStatement. Instead of digging through the platform to find out what happened to a transaction, finance teams ask in plain language — and get an answer backed by their own data."
        meta={[
          { label: "Role", value: "Product Designer" },
          { label: "Timeline", value: "5 weeks" },
          { label: "Project", value: "ZenStatement", sub: "Creo AI feature" },
          { label: "Platform", value: "Web" },
          { label: "Domain", value: "Reconciliation", sub: "Finance ops" },
          { label: "Disclosure", value: "NDA-limited", sub: "~20% shown" },
        ]}
        image={creoUpload}
        imageAlt="Creo AI — the assistant's starting screen inside ZenStatement"
      />

      <Chapter label="01 · Summary" title="The data was there. Reaching it required knowing the product.">
        <Mid>
          <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              {
                t: "Business problem",
                d: "Finance teams already had the data. Retrieving an answer meant knowing the product's navigation, its filters, and its terminology — so product fluency, not financial expertise, decided who could get an answer.",
              },
              {
                t: "My role",
                d: "Product Designer — conversation design, AI interaction patterns, the trust model, interface design, and the working relationship with product and engineering.",
              },
              {
                t: "Core decision",
                d: "Scope the assistant's context to the active customer or subject, rather than to the entire conversation.",
              },
              {
                t: "Value",
                d: "Finance users can ask operational questions directly, with a lower risk of confident answers built on the wrong context.",
              },
            ].map((x) => (
              <div key={x.t}>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>{x.t}</dt>
                <dd className="text-[15px] text-muted-foreground leading-relaxed mt-2.5">{x.d}</dd>
              </div>
            ))}
          </dl>
        </Mid>
        <div className="mt-14">
          <Statement>
            Every question meant navigating the product first and thinking about the finance second — so the people who
            most needed answers were the least likely to go get them.
          </Statement>
        </div>
      </Chapter>

      <Chapter
        label="02 · Background"
        title="Where this started."
        lead="ZenStatement matches thousands of transactions across systems every day. The numbers were all there — but getting one specific answer out meant opening the right screen, setting the right filters, and knowing what the product called things."
      >
        {/* Mid (not Narrow) so the body's left edge lines up with the title and lead. */}
        <Mid>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            So the people who understood the finance best were often not the people who could get an answer fastest.
            Questions queued behind whoever knew the tool.
          </p>
        </Mid>
      </Chapter>

      <Chapter
        label="03 · Goals & people"
        title="Who it's for, and what it had to do for them."
      >
        <Personas
          items={[
            {
              tag: "Finance & ops teams",
              initials: "FO",
              title: "Know the money, not the menus",
              body: "They read a reconciliation instantly but don't use the platform daily — so they wait on someone else for answers they could interpret themselves.",
            },
            {
              tag: "Platform power users",
              initials: "PU",
              title: "The bottleneck by default",
              body: "Fluent in the product, so every question routes to them. Their time goes on fetching data rather than judging it.",
            },
          ]}
        />

        <div className="mt-16">
          <Mid>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <LabeledList
                label="What was getting in the way"
                items={[
                  "Answers required knowing the product's menus, filters, and wording",
                  "Simple questions became requests to another person, and waited",
                  "Comparing two systems meant building the view by hand each time",
                  "No quick way to sanity-check a number",
                ]}
              />
              <LabeledList
                label="What it had to do"
                items={[
                  "Take a question in plain English — no filters, no menu paths",
                  "Show the data behind every answer, so it can be checked",
                  "Ask when the customer or period is unclear, never guess",
                  "Live inside ZenStatement, next to the data",
                ]}
              />
            </div>
          </Mid>
        </div>

        <div className="mt-16">
          <Mid>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Three things that shaped it</span>
          </Mid>
          <div className="mt-6">
            <NumberList
              items={[
                {
                  n: "01",
                  title: "The barrier was vocabulary, not data",
                  body: "People weren't missing information. They were missing the words the product wanted. That pointed at plain language as the interface — not better filters.",
                },
                {
                  n: "02",
                  title: "A wrong answer costs more than a slow one",
                  body: "A confident answer about the wrong customer is worse than no answer. So: show your source, or say you don't have one.",
                },
                {
                  n: "03",
                  title: "People switch subjects mid-conversation",
                  body: "Real questions jump between customers and periods without warning. Designing for a tidy single-topic chat would have broken on day one.",
                },
              ]}
            />
          </div>
          <Mid>
            <p className="text-sm text-muted-foreground leading-relaxed mt-10 pt-6 border-t border-border">
              <strong className="text-foreground">Where this came from:</strong> no formal user study was run for this
              feature. These came from the reconciliation workflow itself, how the product was already used, and
              conversations with product and engineering — not from research I didn't do.
            </p>
          </Mid>
        </div>
      </Chapter>

      <Chapter
        label="04 · What it does"
        title="And what it deliberately doesn't."
        lead="An assistant that tries anything is one nobody can rely on. Naming the limits was a design decision, not an apology."
      >
        <DoesDont
          does={[
            "Answers questions about reconciliation data in plain language",
            "Compares figures across systems and periods",
            "Builds charts and summaries a person can read and check",
          ]}
          dont={[
            "Make the final financial decision",
            "Answer without evidence behind it",
            "Quietly assume which customer or period you meant",
          ]}
        />
        <div className="mt-12">
          <Callout eyebrow="Where the human stays" title="Review is part of the job, not a disclaimer.">
            Creo helps you decide; it doesn't decide. Anything that closes a book or goes to an auditor stays with the
            person accountable for it — and the product says so on screen, telling users plainly that it can make
            mistakes and asking them to check before acting.
          </Callout>
        </div>
      </Chapter>

      <Chapter
        label="05 · Asking"
        title="Start with data, not a blank box."
        lead="The entry point pairs the files in question with a plain-language prompt — and offers suggested starting actions for the people who don't yet know what to ask."
      >
        <AnnotatedFigure
          src={creoUpload}
          alt="Creo AI starting screen with annotations"
          caption="The assistant's entry point — attached data, a plain-language prompt, and suggested ways in."
          points={[
            { x: 4.5, y: 19, title: "Inside the product, not beside it", body: "Creo sits in the platform's own navigation, alongside the tools it's answering about. It's another way to use ZenStatement, not a separate tool to learn." },
            { x: 44, y: 55, title: "The data comes with the question", body: "Files are attached to the prompt itself, so the assistant is always answering about something specific rather than in the abstract." },
            { x: 45, y: 61, title: "Plain language in", body: "No query syntax, no filter builder. The user writes the sentence they'd say out loud." },
            { x: 61, y: 67, title: "A way in for the blank page", body: "Suggested actions give first-time users a starting move — the hardest part of any prompt box is knowing what it can do." },
          ]}
        />
      </Chapter>

      <Chapter
        label="06 · The context decision"
        title="Knowing which customer you're talking about."
        lead="This was the hardest problem in the project, and the one that decided whether people would trust the output."
      >
        <Mid>
          <div className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>The risky scenario</span>
            <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mt-3">
              A user asks about one customer. Satisfied, they ask a follow-up — but about a different customer, without
              restating it. A thread that keeps everything said so far will quietly fold the first customer's figures
              into the second customer's answer. The reply looks confident, reads correctly, and is wrong.
            </p>
          </div>
        </Mid>

        <div className="mt-14">
          <Mid><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Options considered</span></Mid>
          <div className="mt-6">
            <NumberList
              items={[
                {
                  n: "A",
                  title: "Persistent thread context",
                  body: "Everything in the conversation stays available. Follow-ups feel natural and the user repeats less — but the blast radius of a wrong assumption grows with every message, and it fails silently.",
                },
                {
                  n: "B",
                  title: "Subject-scoped context",
                  body: "Context is bound to the customer or subject under discussion. When the subject changes, what no longer applies is dropped. Slightly more restating; far less silent contamination.",
                },
              ]}
            />
          </div>
        </div>

        <div className="mt-14">
          <Callout eyebrow="Decision" title="Subject-scoped context — B.">
            The two options fail differently, and that asymmetry decided it. Option A fails <em>invisibly</em>: nothing
            in the interface tells you the answer was built on the previous customer. Option B fails <em>visibly</em>:
            at worst the user restates something the assistant should have inferred, and they can see that it did.
            <br /><br />
            In reconciliation, an answer that looks right but isn't is more expensive than a small amount of friction.
            I optimised for the failure a person can catch.
          </Callout>
        </div>

        <div className="mt-16">
          <Mid><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>How the interface carries it</span></Mid>
        </div>
        <div className="mt-6">
        <AnnotatedFigure
          reverse
          src={creoThinking}
          alt="Creo AI working on a reconciliation question, with annotations"
          caption="The thread keeps a question, its data, and its answer together — and its context bounded."
          points={[
            { x: 34, y: 14, title: "One question, one thread", body: "Each conversation is named and kept, so a question and everything it produced stay together." },
            { x: 88, y: 30, title: "The data stays pinned", body: "The files sit with the question in the thread, so there's never ambiguity about what an answer is based on." },
            { x: 32, y: 46, title: "Honest about the wait", body: "Reconciliation isn't instant. A visible working state is better than a frozen screen pretending otherwise." },
            { x: 61, y: 94, title: "Limits stated plainly", body: "The assistant says it can make mistakes and asks to be reviewed. Under-promising is what makes the rest credible." },
          ]}
        />
        </div>
      </Chapter>

      <Chapter
        label="07 · Answers"
        title="Explain it, then show it."
        lead="Answers lead with a plain sentence about what's being shown, then the artifact itself — so the user reads the conclusion before interpreting the picture."
      >
        <AnnotatedFigure
          src={creoChart}
          alt="Creo AI returning a comparison chart, with annotations"
          caption="A follow-up question, answered as a chart the user can read, keep, and check."
          points={[
            { x: 78, y: 24, title: "Follow-ups build on the thread", body: "The next question refines the last one. Users don't restate what they've already established." },
            { x: 40, y: 34, title: "Says what it's showing first", body: "A sentence of plain language before the visual — the user knows what they're looking at before they look." },
            { x: 75, y: 51, title: "Two systems, one picture", body: "Reconciliation is a comparison. Showing both sources on one axis is the whole point of the answer." },
            { x: 52, y: 65, title: "Answers as artifacts", body: "Output is a real chart, not a paragraph describing one — something a user can read, keep, and act on." },
          ]}
        />
      </Chapter>

      <Chapter
        label="08 · Beyond the happy path"
        title="Most of the design is what happens when it can't answer."
        lead="A demo only shows the good case. These are the states I specified the assistant has to handle — and what it does in each. The rule throughout: say what's wrong, say what's missing, hand control back."
      >
        <StateTable
          items={[
            { state: "Missing or invalid source data", res: "Name the file or field that's unusable and stop. No partial answer built on a broken input." },
            { state: "Ambiguous question", res: "Ask one clarifying question — usually which customer or period — instead of guessing and sounding certain." },
            { state: "Unsupported request", res: "Say it's out of scope plainly, and point to where in the product it can be done." },
            { state: "Slow processing", res: "Show a visible working state. Reconciliation isn't instant, and a frozen screen reads as broken." },
            { state: "No result", res: "\"Nothing matched\" is an answer. Show the filters applied so the user can widen them." },
            { state: "Conflicting sources", res: "Surface the disagreement rather than silently picking a winner — the conflict is often the actual finding." },
            { state: "Wrong output", res: "Every answer keeps its source attached, so a user can check it and see where it went wrong." },
            { state: "Correction path", res: "The user can narrow the subject or restart clean without losing the thread." },
          ]}
        />
        <div className="mt-10">
          <Narrow>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These are design specifications from my work on the feature, not screens — the error and empty states
              themselves sit outside what I can publish.
            </p>
          </Narrow>
        </div>
      </Chapter>

      <Chapter
        label="09 · Evaluation"
        title="How I'd know if it worked."
        lead="A conversational feature can't be judged on clicks. These are the measures I'd hold it to — split honestly by what they'd tell you: quality of the answers, and behaviour of the people using them."
      >
        <Mid>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <LabeledList
              label="Answer quality"
              items={[
                "Wrong-context answer rate — replies built on the wrong customer, file, or period",
                "Unsupported-answer rate — replies produced without evidence behind them",
                "Correction or escalation rate — how often a user has to intervene",
              ]}
            />
            <LabeledList
              label="User behaviour"
              items={[
                "Answers completed without navigation — the question resolved without falling back to the UI",
                "Source-inspection rate — how often users check the data behind an answer",
                "Time to insight — question asked to answer trusted",
                "Repeat usage by non-expert users — whether it reached beyond the platform experts",
              ]}
            />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-10 pt-6 border-t border-border">
            <strong className="text-foreground">Status:</strong> proposed. These are the metrics the design was built
            to move, not results I'm reporting. Creo is live under NDA and I don't have published numbers to stand
            behind — so I'd rather show you the measurement thinking than quote a figure I can't evidence.
          </p>
        </Mid>
      </Chapter>

      <Chapter
        label="10 · My AI workflow"
        title="I used AI to design an AI feature."
        lead="Worth stating plainly, since it's the same trust problem I was designing around."
      >
        <Mid>
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-8">
            <Feature title="Explore">
              Claude and Gemini for pressure-testing the conversation model and generating edge cases I hadn't
              considered — the list in the previous section started this way.
            </Feature>
            <Feature title="Prototype">
              v0, Replit and Bolt for standing up throwaway interactions quickly, to feel a pattern before committing
              to it in Figma.
            </Feature>
            <Feature title="Organise">
              Notion for synthesis and keeping decisions traceable; Canva and HeyGen for communicating the work.
            </Feature>
          </div>
          <div className="mt-10 rounded-2xl border border-primary/25 bg-primary/[0.06] p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary" style={mono}>The review rule</span>
            <p className="text-[15px] text-muted-foreground leading-relaxed mt-2.5">
              Generated output was a starting point, never a deliverable. Every edge case was checked against the real
              product before it earned a place in the spec, and anything I couldn't verify got cut. The same standard I
              was asking Creo to meet.
            </p>
          </div>
        </Mid>
      </Chapter>

      <NdaNote>
        This case study showcases only a limited portion of the work due to a strict NDA. If you'd like to learn more
        about my role, process, or design decisions, feel free to connect.
      </NdaNote>
    </article>
  );
}

// ─── Nasdaq Calypso (NDA) ────────────────────────────────────────────────────
// No screens, no client detail, no internal metrics. Role, approach, and
// challenges only — everything here is safe to publish.

function NasdaqDetail() {
  return (
    <article>
      <CaseHero
        eyebrow="UX Case Study · Capital Markets · NDA"
        title={<>Making a complex platform <em className="italic font-normal text-primary">easier to work in.</em></>}
        lead="Calypso is a long-standing capital-markets platform used by expert teams in risk, operations, compliance, and finance. I worked on modernising its reporting experience — so people could find and trust the data they needed without fighting the interface."
        meta={[
          { label: "Role", value: "Product Designer" },
          { label: "Domain", value: "Capital Markets", sub: "Risk · Ops · Compliance" },
          { label: "Platform", value: "Web", sub: "Enterprise" },
          { label: "Focus", value: "Reporting", sub: "Legacy modernisation" },
          { label: "Team", value: "PM · Eng · BA · QA" },
          { label: "Disclosure", value: "Under NDA", sub: "No screens shown" },
        ]}
      />

      <Chapter label="01 · A note on confidentiality" title="What I can and can't show.">
        <Mid>
          <div className="rounded-2xl border border-border bg-muted/40 p-6 md:p-8">
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-primary/10 text-primary shrink-0">
                <Lock size={13} aria-hidden />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>
                Confidential project
              </span>
            </div>
            <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mt-4">
              This work is covered by a strict NDA. There are no product screens, client details, internal workflows,
              performance figures, or technical architecture on this page — and there won't be.
            </p>
            <p className="text-[15px] md:text-base text-muted-foreground leading-relaxed mt-4">
              What follows is limited to my own role, how I approached the problem, the constraints I designed within,
              and what I took away from it. Happy to talk through the thinking in more depth in conversation.
            </p>
          </div>
        </Mid>
      </Chapter>

      <Chapter label="02 · Overview" title="A specialist tool, used all day, by people who know it well.">
        <Narrow>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Calypso is a legacy platform used across capital markets. The people using it are experts — risk analysts,
            operations teams, compliance officers, finance staff — and they work with very large, connected sets of
            data where being accurate matters more than anything.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-5">
            These aren't casual users. They know the domain deeply and often know the product's quirks by heart. The
            problem wasn't that the software was too advanced for them. It was that everyday tasks took more effort
            than they should — finding the right report, narrowing a large dataset, moving between related records.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-5">
            The goal was never to simplify the domain. Financial reporting is genuinely complex, and hiding that would
            make the product worse. The goal was to remove the friction sitting on top of it.
          </p>
        </Narrow>
      </Chapter>

      <Chapter label="03 · My role" title="Product Designer on the reporting experience.">
        <Mid>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>What I owned</span>
              <p className="text-[15px] text-muted-foreground leading-relaxed mt-3">
                The end-to-end design of reporting experiences — from understanding how a task actually worked today,
                through to the detailed screens engineering built from.
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Who I worked with</span>
              <p className="text-[15px] text-muted-foreground leading-relaxed mt-3">
                A product manager, engineers, business analysts, QA, and business stakeholders — with the analysts and
                stakeholders as my main route to understanding how the work is really done.
              </p>
            </div>
          </div>
        </Mid>
      </Chapter>

      <Chapter label="04 · What I worked on" title="The main areas of the work.">
        <Mid>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-7">
            <Feature title="Modernising a legacy experience">
              Bringing an older interface up to current standards without disrupting the way experienced users already
              work.
            </Feature>
            <Feature title="Improving reporting workflows">
              Reworking existing reporting journeys, and designing new capability where something was missing.
            </Feature>
            <Feature title="Information architecture">
              Reorganising how information is grouped and labelled, so people can predict where things live.
            </Feature>
            <Feature title="Navigation, filtering & search">
              Making it faster to narrow down a large dataset and move between connected records.
            </Feature>
            <Feature title="Design system collaboration">
              Working closely with the design system team — using existing components, and feeding back where reporting
              needed something the library didn't yet cover.
            </Feature>
            <Feature title="Reviews & implementation support">
              Design reviews, usability discussions, and staying close to engineering through build.
            </Feature>
          </div>
        </Mid>
      </Chapter>

      <Chapter
        label="05 · Design challenges"
        title="The constraints that shaped every decision."
        lead="Most of the difficulty here wasn't visual. It came from designing inside real limits that couldn't be wished away."
      >
        <Mid>
          <NumberList
            items={[
              {
                n: "01",
                title: "Complexity that has to stay",
                body: "Regulated financial work needs detail, precision, and an audit trail. Stripping things back to look cleaner would have removed something people depend on.",
              },
              {
                n: "02",
                title: "Very large, connected datasets",
                body: "Screens have to stay readable and quick when the underlying data is huge and every record links to others.",
              },
              {
                n: "03",
                title: "Several different user roles",
                body: "Risk, operations, compliance, and finance all need different things from the same product — without it fragmenting into four products.",
              },
              {
                n: "04",
                title: "Legacy technical limits",
                body: "Some ideas simply weren't feasible in an established system. Designs had to be realistic about what could actually ship.",
              },
              {
                n: "05",
                title: "Experts don't want to relearn",
                body: "For daily users, an unfamiliar interface is a cost, not a gift. Changes had to feel like an improvement, not a reset.",
              },
            ]}
          />
        </Mid>
      </Chapter>

      <Chapter label="06 · Approach & collaboration" title="Understand the work first, then design.">
        <Mid>
          <Steps
            items={[
              { n: "01", title: "Learn the real workflow", body: "Time with business analysts and stakeholders to understand how tasks are genuinely performed — including the workarounds people had built." },
              { n: "02", title: "Find the friction", body: "Separating what was hard because finance is hard from what was hard because of the interface. Only the second kind was mine to fix." },
              { n: "03", title: "Design and review", body: "Working through flows and screens with the PM and engineering, testing ideas against real constraints early rather than late." },
              { n: "04", title: "Systematise", body: "Turning repeated solutions into shared patterns, so the product stayed consistent as more of it was modernised." },
              { n: "05", title: "Support the build", body: "Staying available through implementation and QA to resolve the details that only surface once something is real." },
            ]}
          />

          <div className="mt-16">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>Working with the design system team</span>
            <div className="mt-5 flex flex-col gap-5">
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                A lot of this work happened alongside the design system team rather than separately from it. Reporting
                touches a huge amount of the product, so almost every screen was an opportunity to either reuse
                something that already existed or improve it for everyone.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                In practice that meant three things: building from the existing component library wherever it fit,
                raising cases where a reporting need wasn't covered yet, and helping shape those components so they
                worked beyond my own screens. Data-heavy interfaces put real pressure on a design system — tables,
                filters, and dense layouts expose gaps that simpler pages never do.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Designing <em>with</em> the system instead of around it kept the product coherent, avoided one-off
                solutions that quietly become debt, and meant improvements made for reporting were available to every
                other team too.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Callout eyebrow="The principle" title="Reduce friction, not capability.">
              The people using Calypso are experts doing precise work. My job wasn't to make the product look simple —
              it was to make the path to the right answer shorter, while keeping the accuracy, speed, and control they
              rely on completely intact.
            </Callout>
          </div>
        </Mid>
      </Chapter>

      <Chapter label="07 · Impact & learnings" title="What changed, and what I took from it.">
        <Mid>
          <LabeledList
            label="At a high level"
            items={[
              "A more modern, consistent reporting experience within a long-established platform",
              "Clearer structure and navigation for finding data across large, connected sets",
              "Contributions back to the shared design system, benefiting teams beyond reporting",
              "Design decisions grounded in how expert users actually work, not assumptions about them",
            ]}
          />
          <div className="mt-14">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary" style={mono}>What I learned</span>
            <div className="mt-5 flex flex-col gap-5">
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Expert users change the brief.</strong> The usual instinct — fewer
                options, less on screen — can actively harm people who need density and control. The better question is
                whether the complexity is <em>doing work</em> for them, or just sitting in the way.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Legacy constraints are part of the design problem.</strong> A
                solution that can't be built in the system that exists isn't a solution. Working closely with engineers
                early made the designs better, not smaller.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Consistency compounds.</strong> In a product this large, a reusable
                pattern is worth more than a perfect one-off screen.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-12 pt-6 border-t border-border">
            <strong className="text-foreground">On results:</strong> this is confidential, ongoing work, so there are no
            published metrics here. I've described the design intent and what shaped it rather than claiming outcomes I
            can't evidence.
          </p>
        </Mid>
      </Chapter>

      <NdaNote>
        This project is protected under a strict NDA, so only a limited, high-level view of the work is shown. If
        you'd like to learn more about my role, process, or design decisions, feel free to connect.
      </NdaNote>
    </article>
  );
}

// ─── Page wrapper ────────────────────────────────────────────────────────────

const DETAILS: Record<string, () => JSX.Element> = {
  maxyfi: MaxyfiDetail,
  zenstatement: ZenStatementDetail,
  "debt-collection": DebtCollectionDetail,
  creo: CreoDetail,
  "nasdaq-calypso": NasdaqDetail,
};

const SECTION_LABELS: Record<string, string[]> = {
  "nasdaq-calypso": [
    "01 · A note on confidentiality", "02 · Overview", "03 · My role", "04 · What I worked on",
    "05 · Design challenges", "06 · Approach & collaboration", "07 · Impact & learnings",
  ],
  maxyfi: [
    "01 · Problem & context", "02 · Goals, users & constraints", "03 · Research & insights",
    "04 · User flow", "05 · Product walkthrough", "06 · Key UX decisions",
    "07 · Component highlights", "08 · Impact", "09 · Reflection",
  ],
  zenstatement: [
    "01 · Overview", "02 · My role", "03 · The problem", "04 · Goals & users",
    "05 · Research & approach", "06 · Solution — Dashboard", "07 · Solution — Transaction Details",
    "08 · Customer Master", "09 · Impact",
  ],
  "debt-collection": [
    "01 · Overview", "02 · Problem & objectives", "03 · Approach",
    "04 · Solution — Debtor Overview", "05 · Solution — Debtor Portal", "06 · Impact",
  ],
  creo: [
    "01 · Summary", "02 · Background", "03 · Goals & people", "04 · What it does",
    "05 · Asking", "06 · The context decision", "07 · Answers",
    "08 · Beyond the happy path", "09 · Evaluation", "10 · My AI workflow",
  ],
};

function buildToc(key: string) {
  return (SECTION_LABELS[key] ?? []).map((l) => ({ id: slug(l), label: tocLabel(l) }));
}

function Toc({ items, activeId, onJump }: {
  items: { id: string; label: string }[]; activeId: string; onJump: (id: string) => void;
}) {
  return (
    <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-4 pl-4" style={mono}>
        On this page
      </div>
      <ul className="flex flex-col border-l border-border">
        {items.map((it, i) => {
          const active = it.id === activeId;
          return (
            <li key={it.id}>
              <button
                onClick={() => onJump(it.id)}
                aria-current={active ? "true" : undefined}
                className={`flex items-center gap-2.5 w-full text-left -ml-px border-l-2 pl-4 pr-2 py-1.5 text-[13px] leading-snug transition-colors ${
                  active
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <span className="text-[10px] tabular-nums opacity-50" style={mono}>{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate">{it.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CaseStudyPage({ slug: key, onBack, onOpenCase }: {
  slug: string; onBack: () => void; onOpenCase?: (slug: string) => void;
}) {
  const Detail = DETAILS[key];
  const cs = CASE_STUDIES.find((c) => c.slug === key);
  const others = CASE_STUDIES.filter((c) => c.slug !== key);
  const toc = buildToc(key);
  const activeId = useScrollSpy(toc.map((t) => t.id));

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const openOther = (s: string) => (onOpenCase ? onOpenCase(s) : (window.location.hash = `case/${s}`));

  // Esc returns to the work grid.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onBack(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack]);

  if (!Detail || !cs) return null;

  return (
    <div className="mx-auto max-w-[1500px] lg:grid lg:grid-cols-[minmax(0,1fr)_232px] lg:gap-6 xl:gap-10">
      {/* Content column */}
      <div className="min-w-0">
        {/* Back bar */}
        <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-28 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to work
          </button>
          <span className="hidden sm:inline text-xs text-muted-foreground/60" style={mono}>Esc to exit</span>
        </div>

        {/* Mobile: on this page */}
        <div className="lg:hidden max-w-5xl mx-auto px-6 mt-6">
          <details className="rounded-2xl border border-border bg-card px-4 py-3">
            <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground marker:content-['']">
              <List size={15} className="text-primary" /> On this page
            </summary>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {toc.map((it, i) => (
                <li key={it.id}>
                  <a href={`#${it.id}`} className="block text-[13px] text-muted-foreground hover:text-primary py-0.5">
                    <span className="opacity-50 tabular-nums mr-1.5" style={mono}>{String(i + 1).padStart(2, "0")}</span>
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <Detail />

        {/* Next case study */}
        {others.length > 0 && (
          <section className="border-t border-border">
            <div className="max-w-5xl mx-auto px-6 py-16">
              <Eyebrow>Next case study</Eyebrow>
              <div className="flex flex-col gap-4">
                {others.map((o) => (
                  <button
                    key={o.slug}
                    onClick={() => openOther(o.slug)}
                    className="group flex items-center justify-between gap-6 bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-primary/50 hover:-translate-y-0.5"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-foreground" style={serif}>{o.title}</h3>
                      <p className="text-sm text-primary font-medium mt-0.5">{o.subtitle}</p>
                    </div>
                    <span className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Desktop TOC rail */}
      <aside className="hidden lg:block pt-28 pb-16">
        <Toc items={toc} activeId={activeId} onJump={jump} />
      </aside>
    </div>
  );
}
