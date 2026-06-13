// Pure SVG/CSS app mockups. No images, no AI art. Each "screen" represents the
// kind of product a non-technical founder ships, rendered crisp at any size.

type Screen = "validate" | "gate" | "prompt" | "metrics";

function Bar({ w, c = "var(--line-strong)" }: { w: string; c?: string }) {
  return <div className="h-2 rounded-full" style={{ width: w, background: c }} />;
}

function ValidateScreen() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Verd AI</p>
      <div className="rounded-xl bg-[var(--mint)] p-3">
        <p className="text-[11px] font-semibold text-[var(--ink-strong)]">
          What do busy mothers actually struggle with at 6am?
        </p>
      </div>
      {[
        "Evidence from 1,240 real posts",
        "They do not lack recipes",
        "They lack 10 minutes of calm",
      ].map((t, i) => (
        <div key={i} className="flex items-start gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-2.5">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#22c55e]">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0b2615" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 12.5l5 5L19.5 7" /></svg>
          </span>
          <p className="text-[10px] leading-snug text-[var(--ink)]">{t}</p>
        </div>
      ))}
    </div>
  );
}

function GateScreen() {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Build Gate · your moat</p>
      {[
        ["Q1", "What makes this user keep coming back?"],
        ["Q2", "What makes them keep paying after 6 months?"],
      ].map(([q, t], i) => (
        <div key={i} className="rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-3">
          <span className="text-[9px] font-bold text-accent">{q}</span>
          <p className="mt-1 text-[11px] font-semibold leading-snug text-[var(--ink-strong)]">{t}</p>
        </div>
      ))}
      <div className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] p-3">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f4fbfb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 7-2.6" /></svg>
        <p className="text-[11px] font-bold text-[#f4fbfb]">Gate open</p>
      </div>
    </div>
  );
}

function PromptScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">System prompt</p>
      <div className="rounded-xl bg-[#0f1a1a] p-3">
        <Bar w="80%" c="rgba(20,188,186,0.6)" />
        <div className="mt-2 space-y-1.5">
          <Bar w="100%" c="rgba(232,244,244,0.25)" />
          <Bar w="92%" c="rgba(232,244,244,0.25)" />
          <Bar w="70%" c="rgba(232,244,244,0.25)" />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[var(--accent)] px-3 py-2">
          <p className="text-[10px] text-[#f4fbfb]">Make it warm, never clinical.</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[var(--mint)] px-3 py-2">
          <p className="text-[10px] text-[var(--ink-strong)]">Understood. Tone set across every reply.</p>
        </div>
      </div>
    </div>
  );
}

function MetricsScreen() {
  const bars = [38, 52, 49, 63, 71, 78, 86];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-accent">Month 12</p>
      <div>
        <p className="font-display text-2xl font-bold leading-none text-[var(--ink-strong)]">$12,400</p>
        <p className="text-[9px] font-semibold text-soft">MRR · still climbing</p>
      </div>
      <div className="flex h-20 items-end gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--bg-raised)] p-2.5">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === bars.length - 1 ? "var(--accent-bright)" : "rgba(20,188,186,0.35)" }} />
        ))}
      </div>
      <div className="rounded-xl bg-[var(--mint)] p-2.5">
        <p className="text-[10px] font-semibold text-[var(--ink-strong)]">71% still active</p>
        <p className="text-[9px] text-soft">vs 30% industry average</p>
      </div>
    </div>
  );
}

const screens: Record<Screen, () => JSX.Element> = {
  validate: ValidateScreen,
  gate: GateScreen,
  prompt: PromptScreen,
  metrics: MetricsScreen,
};

export default function PhoneMockup({ screen }: { screen: Screen }) {
  const Body = screens[screen];
  return (
    <div className="relative mx-auto w-[15rem] max-w-full">
      <div
        aria-hidden="true"
        className="glow-blob"
        style={{ inset: "14% -12%", background: "rgba(20,188,186,0.16)" }}
      />
      <div className="relative aspect-[9/19] rounded-[2rem] border-[6px] border-[var(--ink-strong)] bg-[var(--bg)] p-1 shadow-[0_30px_70px_-28px_rgba(8,28,27,0.5)]">
        <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-[var(--ink-strong)]" />
        <div className="h-full overflow-hidden rounded-[1.6rem] bg-[var(--bg)]">
          <Body />
        </div>
      </div>
    </div>
  );
}
