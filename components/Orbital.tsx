const defaults = {
  center: ["Your", "product"],
  inner: ["Paying users", "Retention", "Revenue", "Referrals"],
  outer: ["Still growing at month 12", "Real reviews", "Signups climbing"],
};

export default function Orbital({
  center = defaults.center,
  inner = defaults.inner,
  outer = defaults.outer,
}: {
  center?: string[];
  inner?: string[];
  outer?: string[];
}) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-[82%] max-w-[24rem] select-none sm:w-full"
    >
      <div className="orbit-ring orbit-outer">
        {outer.map((label, i) => {
          const angle = (360 / outer.length) * i;
          return (
            <div
              key={label}
              className="absolute inset-0"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="orbit-node">
                <div style={{ transform: `rotate(${-angle}deg)` }}>
                  <div className="orbit-counter-outer">
                    <span className="orbit-chip">{label}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute inset-[17%]">
        <div className="orbit-ring orbit-inner">
          {inner.map((label, i) => {
            const angle = (360 / inner.length) * i;
            return (
              <div
                key={label}
                className="absolute inset-0"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className="orbit-node">
                  <div style={{ transform: `rotate(${-angle}deg)` }}>
                    <div className="orbit-counter-inner">
                      <span className="orbit-chip">{label}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-[38%] flex items-center justify-center">
        <div className="gate-core flex h-full w-full items-center justify-center rounded-full">
          <span className="px-3 text-center font-display text-sm font-bold leading-tight text-[#f4fbfb]">
            {center[0]}
            <br />
            {center[1]}
          </span>
        </div>
      </div>
    </div>
  );
}
