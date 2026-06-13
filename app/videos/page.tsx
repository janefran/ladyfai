import type { Metadata } from "next";
import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { getSupabase } from "@/lib/supabase";
import { demoMode, demoVideos } from "@/lib/demo";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Weekly videos for non-technical founders: validation, AI building tools, system prompts, and a real product built in public.",
};

export const revalidate = 600;

type Video = {
  id: string;
  title: string;
  youtube_id: string;
  description: string;
};

async function getVideos(): Promise<Video[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data } = await supabase
    .from("videos")
    .select("id,title,youtube_id,description")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data as Video[]) || [];
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <SiteFrame>
      <main className="container-site max-w-6xl pb-16 pt-36">
        <Reveal>
          <h1 className="display-xl">The whole process, on camera.</h1>
          <p className="mt-5 max-w-2xl text-lg text-soft">
            Validation, the tools, system prompts, and a real product built in
            public. One video a week, every week.
          </p>
        </Reveal>

        {demoMode && videos.length === 0 ? (
          <>
            <p className="mt-6 inline-block rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">
              Preview mode: sample videos from your content plan. They
              disappear in production.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {demoVideos.map((v, i) => (
                <Reveal key={v.title} delay={(i % 3) * 100}>
                  <article className="card-raised flex h-full flex-col overflow-hidden">
                    <div className="relative flex aspect-video items-center justify-center bg-[var(--bg-drench)]">
                      <div
                        aria-hidden="true"
                        className="absolute right-0 top-0 h-32 w-32 translate-x-1/3 -translate-y-1/3 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(20,188,186,0.35), transparent 70%)" }}
                      />
                      <Image
                        src="/logo-white.png"
                        alt=""
                        width={26}
                        height={48}
                        className="absolute left-4 top-4 h-8 w-auto opacity-80"
                      />
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#14bcba] shadow-[0_10px_30px_-8px_rgba(20,188,186,0.6)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#081c1b" aria-hidden="true">
                          <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                        </svg>
                      </span>
                      <span className="absolute bottom-3 right-3 rounded-md bg-[#081c1b]/80 px-2 py-0.5 text-xs font-bold text-[#e8f4f4]">
                        {v.duration}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="font-display text-lg font-semibold leading-snug text-[var(--ink-strong)]">
                        {v.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">
                        {v.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        ) : videos.length === 0 ? (
          <Reveal>
            <div className="card-raised mt-14 flex flex-col items-start gap-6 p-8 md:p-14">
              <h2 className="display-md max-w-xl">
                The first video is on its way. The whole build, in public.
              </h2>
              <p className="max-w-xl text-soft">
                Subscribe on YouTube so you catch it the day it drops.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={site.social.youtube} className="btn-primary">
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {videos.map((v) => (
              <article key={v.id} className="card-raised overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.youtube_id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="h-full w-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-lg font-semibold text-[var(--ink-strong)]">
                    {v.title}
                  </h2>
                  <p className="mt-2 text-sm text-soft">{v.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </SiteFrame>
  );
}
