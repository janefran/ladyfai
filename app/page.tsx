import SiteFrame from "@/components/SiteFrame";
import YearOneScrub from "@/components/YearOneScrub";
import RevenueScrub from "@/components/RevenueScrub";
import ProblemScrub from "@/components/ProblemScrub";
import MethodSteps from "@/components/MethodSteps";
import Reveal from "@/components/Reveal";
import PortraitStats from "@/components/PortraitStats";
import TestimonialWall from "@/components/TestimonialWall";
import { site } from "@/lib/site";
import { faqs } from "@/lib/faq";
import { getTestimonials } from "@/lib/testimonials";

export const revalidate = 600;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: "Janefrances Christopher",
      alternateName: "LadyF",
      jobTitle: "AI Product Strategist",
      description:
        "Janefrances Christopher, known as LadyF, is an AI product strategist with 13 years of background in scientific research methodology. She guides non-technical founders from their first idea to a product still winning a year after launch: validation before the build, clarity during it, and retention after it.",
      url: `${site.url}/about`,
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
        "System prompt engineering",
        "Product retention",
        "Research methodology",
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Verd AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Verd AI is a validation and problem-discovery tool built on 13 years of scientific research methodology. Bring a question about your idea or users and it returns a direct, evidence-backed answer from what people already say across the internet. Free tier available.",
      author: { "@id": `${site.url}/#person` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "DefinedTerm",
      name: "Build Gate",
      description:
        "Build Gate is a research-backed validation framework created by Janefrances Christopher (LadyF). It is a go or no-go gate a founder passes through before building: it pressure-tests an AI product idea against real user behaviour before any money is spent on development.",
    },
    {
      "@type": "DefinedTerm",
      name: "Aha Walk",
      description:
        "Aha Walk is LadyF's named term for the moment a founder walks from confusion to clarity: the breakthrough where a vague AI product idea becomes a clear direction with exact next steps.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default async function Home() {
  const testimonials = await getTestimonials();
  return (
    <SiteFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        {/* Hero: centered. Glows bleed up behind the floating nav for a seamless top. */}
        <section className="relative flex flex-col items-center overflow-hidden px-6 pb-16 pt-32 text-center lg:pt-40">
          <div
            className="glow-blob"
            style={{ top: "-24%", left: "4%", width: "34rem", height: "34rem", background: "rgba(20,188,186,0.18)" }}
          />
          <div
            className="glow-blob"
            style={{ top: "-18%", right: "2%", width: "32rem", height: "32rem", background: "rgba(244,213,141,0.2)" }}
          />
          <div
            className="glow-blob"
            style={{ top: "-30%", left: "38%", width: "26rem", height: "22rem", background: "rgba(61,207,204,0.14)" }}
          />
          <div className="entrance relative z-10 flex max-w-3xl flex-col items-center">
            <h1 className="display-xl">
              Go from &ldquo;I have an idea&rdquo; to success after 1 year.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-soft">
              Most people teach you to ship, then leave. I stay: the exact
              steps to validate, build right, and keep winning after launch.
              Without a team or an engineer.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href={site.verdAiUrl} className="btn-primary">
                Start with the real problem, free
              </a>
              <a href="#join" className="btn-ghost">
                Get the weekly steps
              </a>
            </div>
          </div>
        </section>

        {/* Year-one outcomes: pinned, cards scrub in on scroll */}
        <YearOneScrub />

        {/* Problem: pinned, one truth at a time */}
        <ProblemScrub />

        {/* Scroll-driven money moment */}
        <RevenueScrub />

        {/* Method: alternating text + app mockups */}
        <MethodSteps />

        {/* About short */}
        <section
          aria-labelledby="about-heading"
          className="container-site py-10 lg:py-16"
        >
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <Reveal>
              <div>
                <h2 id="about-heading" className="display-lg">
                  Hi, I am LadyF.
                </h2>
                <p className="mt-6 text-lg text-soft">
                  Thirteen years in medical research, where a bad study costs
                  lives, taught me to validate before I build. Now I bring that
                  rigor to non-technical founders, from idea to a product still
                  winning a year later.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="/about" className="btn-ghost">
                    The full story
                  </a>
                  <a href={site.social.youtube} className="btn-ghost">
                    Watch me build, weekly
                  </a>
                </div>
              </div>
            </Reveal>
            <PortraitStats
              src="/ladyf-building-ai-products-in-public.jpg"
              alt="LadyF, Janefrances Christopher, AI product strategist, close up"
            />
          </div>
        </section>

        {/* FAQ: centered */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="container-site py-20 lg:py-28"
        >
          <Reveal>
            <h2 id="faq-heading" className="display-lg mx-auto max-w-2xl text-center">
              The questions you are already asking.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="mx-auto mt-12 max-w-3xl">
              {faqs.map((f) => (
                <details key={f.q} className="faq-item border-t border-[var(--line)] py-5">
                  <summary className="flex items-center justify-between gap-6">
                    <span className="font-display text-xl font-semibold text-[var(--ink-strong)]">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line-strong)] text-lg text-[var(--accent)]"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-left text-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Testimonials: two rows drifting opposite on scroll */}
        <TestimonialWall items={testimonials} />
        <div id="join" aria-hidden="true" className="h-px" />
      </main>
    </SiteFrame>
  );
}
