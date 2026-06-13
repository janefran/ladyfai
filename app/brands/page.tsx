import type { Metadata } from "next";
import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import BrandForm from "@/components/BrandForm";
import Reveal from "@/components/Reveal";
import PanelScrub from "@/components/PanelScrub";
import Orbital from "@/components/Orbital";

export const metadata: Metadata = {
  title: "For brands",
  description:
    "Partner with LadyF AI. Weekly videos reaching non-technical founders who are actively choosing and paying for AI building tools.",
};

export default function BrandsPage() {
  return (
    <SiteFrame>
      <main className="pb-16 pt-36">
        {/* Hero with the orbital, centered */}
        <section className="container-site flex max-w-5xl flex-col items-center text-center">
          <Reveal>
            <h1 className="display-xl mx-auto max-w-3xl">
              Your tool, in front of the founders deciding what to build with.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-soft">
              I speak to one audience: non-technical founders building AI
              products without a team or an engineer. They are not browsing.
              They are choosing tools, buying credits, and shipping products,
              and they act on what I show them.
            </p>
          </Reveal>
          <div className="mt-16 w-full max-w-md">
            <Orbital
              center={["LadyF", "AI"]}
              inner={["Lovable", "Bolt", "Claude", "Cursor", "Replit"]}
              outer={["Supabase", "Stripe", "v0"]}
            />
          </div>
          <p className="mt-12 text-sm font-bold uppercase tracking-[0.22em] text-soft">
            The tools your audience is already searching for
          </p>
        </section>

        <PanelScrub
          label="Working with LadyF AI, one point at a time"
          kicker="Working with me"
          items={[
            {
              lead: "What I cover",
              body: "Honest tool reviews and real workflows: Lovable, Bolt, Claude, Cursor, Replit, v0, Supabase, Stripe and more. Always from a founder's point of view, never a developer's.",
            },
            {
              lead: "How integrations work",
              body: "Your product demonstrated inside a video these founders already search for, not a detached ad read. I verify every claim before filming.",
            },
            {
              lead: "Why they trust me",
              body: "13 years of research methodology, a designer's eye, and an AI systems engineer's rigor. When I say a tool is worth it, my audience knows I tested it on a real build.",
            },
          ]}
        />

        {/* Proof */}
        <section aria-labelledby="proof-heading" className="container-site mt-12 max-w-5xl">
          <Reveal>
            <h2 id="proof-heading" className="display-lg mx-auto max-w-2xl text-center">
              Where I have already shown up.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="card-raised relative flex aspect-[4/5] items-end overflow-hidden">
                <Image
                  src="/ladyf-ai-product-strategist-janefrances-christopher.jpg"
                  alt="Janefrances Christopher, LadyF, AI product strategist and founder of Verd AI"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="relative z-10 w-full bg-gradient-to-t from-[#081c1b]/85 to-transparent p-6">
                  <p className="font-display text-lg font-bold text-[#f4fbfb]">
                    Janefrances Christopher
                  </p>
                  <p className="text-sm text-[#9fd9d8]">LadyF, founder of Verd AI</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="flex flex-col gap-6">
                <div className="card-raised p-8">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-bold text-[var(--ink-strong)]">
                        Replit collaboration
                      </p>
                      <p className="text-xs text-soft">on LinkedIn</p>
                    </div>
                    <span className="ml-auto rounded-full border border-[var(--line-strong)] px-3 py-1 text-xs font-bold text-accent">
                      Replit
                    </span>
                  </div>
                  <p className="mt-5 leading-relaxed text-soft">
                    I partnered with Replit on LinkedIn, showing non-technical
                    founders what they could actually build with it. Honest
                    walkthrough, founder framing, real use case. That is the
                    shape of every collaboration I take: your product, my
                    audience, zero hype.
                  </p>
                </div>
                <div className="card-raised flex flex-col gap-4 p-8">
                  <p className="font-display text-lg font-semibold text-[var(--ink-strong)]">
                    Now expanding to where founders watch
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["YouTube", "TikTok", "Instagram", "LinkedIn"].map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-sm font-bold text-accent"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-soft">
                    The weekly video engine is launching now, with a 30-video
                    slate already mapped to what these founders search for.
                    Early partners get in before the noise does.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Form */}
        <section aria-labelledby="contact-heading" className="container-site mt-24 max-w-5xl">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 id="contact-heading" className="display-lg">
                Start the conversation
              </h2>
              <p className="mt-4 text-soft">
                Tell me what you have built and who it is for. If it fits my
                audience, you will hear from me directly.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-2xl">
              <BrandForm />
            </div>
          </Reveal>
        </section>
      </main>
    </SiteFrame>
  );
}
