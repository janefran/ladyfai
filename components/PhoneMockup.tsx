import Image from "next/image";

type Screen = "validate" | "gate" | "prompt" | "metrics";

const alts: Record<Screen, string> = {
  validate: "Verd AI app screen showing evidence of what real users struggle with",
  gate: "Build Gate app screen asking the two moat questions",
  prompt: "App screen configuring a product's behaviour with a system prompt",
  metrics: "Analytics dashboard showing 12,400 dollars MRR and 71 percent retention",
};

export default function PhoneMockup({ screen }: { screen: Screen }) {
  return (
    <div className="relative mx-auto w-full max-w-[27rem]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_36px_80px_-30px_rgba(8,28,27,0.45)]">
        <Image
          src={`/steps/${screen}.png`}
          alt={alts[screen]}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 27rem"
        />
      </div>
    </div>
  );
}
