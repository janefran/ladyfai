import type { Metadata } from "next";
import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import PanelScrub from "@/components/PanelScrub";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About LadyF",
  description:
    "Janefrances Christopher, known as LadyF, is an AI product strategist with 13 years of scientific research background. She guides non-technical founders from idea to a product still winning a year after launch.",
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Janefrances Christopher",
  alternateName: "LadyF",
  jobTitle: "AI Product Strategist",
  url: `${site.url}/about`,
  description:
    "Janefrances Christopher (LadyF) is an AI product strategist with 13 years of background in scientific and medical research methodology. Through LadyF AI she guides non-technical founders from their first idea to a product still winning a year after launch: validation with Verd AI and the Build Gate framework, clarity through strategic design and AI systems design, and retention after launch.",
  sameAs: [
    site.social.youtube,
    site.social.linkedin,
    site.social.twitter,
    site.social.medium,
  ],
  knowsAbout: [
    "AI product validation",
    "Build Gate framework",
    "Aha Walk",
    "Verd AI",
    "System prompt engineering",
    "Product retention",
    "UX design",
    "Research methodology",
  ],
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <main className="pb-16 pt-36">
        {/* Hero: text with image */}
        <section className="container-site grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              <h1 className="display-xl">Hi, I am LadyF.</h1>
              <p className="mt-5 text-xl text-soft">
                My formal name is Janefrances Christopher. Thirteen years in
                research, where a bad study costs lives, taught me to validate
                before I build. Now I bring that rigor to founders like you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={site.social.youtube} className="btn-primary">
                  Watch me build, weekly
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="group relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-3xl bg-[var(--bg-drench)] shadow-[0_30px_70px_-30px_var(--glow)] transition-transform duration-500 ease-out lg:rotate-2 lg:hover:rotate-0">
              <Image
                src="/ladyf-ai-product-strategist-janefrances-christopher.jpg"
                alt="Janefrances Christopher, LadyF, AI product strategist and founder of Verd AI"
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 22rem"
              />
            </div>
          </Reveal>
        </section>

        {/* Story: text + image alternating */}
        <section className="container-site mt-28 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="group relative mx-auto aspect-square w-full max-w-[22rem] overflow-hidden rounded-3xl bg-[var(--bg-drench)] shadow-[0_30px_70px_-30px_var(--glow)] transition-transform duration-500 ease-out lg:-rotate-2 lg:hover:rotate-0">
              <Image
                src="/ladyf-founder-portrait.jpg"
                alt="LadyF, Janefrances Christopher, founder portrait"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 22rem"
              />
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="max-w-xl space-y-6 text-lg leading-relaxed">
              <h2 className="display-md">Where the rigor comes from</h2>
              <p>
                For 13 years I worked in scientific and medical research. There,
                you do not ask a single question until you have designed the
                study: what you need to learn, how the data could mislead you,
                how to catch the gap between what people say and what they
                actually do. You do this because a bad study does not waste
                time. It costs lives.
              </p>
              <p>
                Then I moved into product as a UX designer, and watched founders
                do the opposite, again and again. Ask a friend &ldquo;would you
                use this?&rdquo;, hear yes, build. Six months later, nobody is
                paying. Not because the idea was bad. Because no one studied the
                problem.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Pull quote */}
        <section className="container-site mt-28">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center font-display text-3xl font-semibold leading-snug text-[var(--ink-strong)]">
              Nobody in the product space teaches research. So they teach
              &ldquo;build fast and iterate.&rdquo; I teach: validate the right
              way, build a strong foundation, and iterate on something solid.
            </p>
          </Reveal>
        </section>

        <div className="mt-28">
          <PanelScrub
            label="The three lenses, one at a time"
            kicker="The three lenses you get"
            items={[
              {
                lead: "The designer",
                body: "Obsesses over whether your product feels right and does not look AI-made. Just enough design to ship something people trust.",
              },
              {
                lead: "The founder",
                body: "Refuses to build before the evidence says it will make money. Watches retention and revenue, not vanity metrics.",
              },
              {
                lead: "The AI systems engineer",
                body: "Writes the system prompt that runs your product, so it behaves consistently and keeps users month after month.",
              },
            ]}
          />
        </div>

        <div className="container-site max-w-4xl">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-soft">
            You get the output of all three lenses. You never have to be any of
            them.
          </p>
        </Reveal>

        <Reveal>
          <h2 className="display-lg mt-20 text-center">What I have built for you</h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mx-auto mt-8 max-w-2xl space-y-6 text-lg">
            <p>
              <strong className="text-accent">Verd AI</strong> finds your real
              problem: bring a question, and it returns a direct,
              evidence-backed answer from what people already say across the
              internet. Free to start.
            </p>
            <p>
              <strong className="text-accent">Build Gate</strong> is the gate
              you pass before you build. A research-backed go or no-go that
              tells you whether the idea is worth building, and exactly what it
              is.
            </p>
            <p>
              <strong className="text-accent">The System-Prompt Build Stack</strong>{" "}
              turns your validated problem into a build plan and the system
              prompt that runs your product, so you walk into Lovable or Claude
              Code with clarity instead of vibes.
            </p>
            <p>
              And every week on{" "}
              <a className="text-accent underline underline-offset-4" href={site.social.youtube}>
                YouTube
              </a>{" "}
              I show the whole process in public: validation, tools, system
              prompts, and the real numbers as I build.
            </p>
          </div>
        </Reveal>
        </div>
      </main>
    </SiteFrame>
  );
}
