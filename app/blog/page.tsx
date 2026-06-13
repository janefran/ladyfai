import type { Metadata } from "next";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import { builtInPosts } from "@/lib/posts";
import { getSupabase } from "@/lib/supabase";
import { demoMode, demoPosts } from "@/lib/demo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Validation, system prompts, retention, and the real numbers. Written for non-technical founders building AI products without a team or an engineer.",
};

export const revalidate = 600;

type ListedPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  demo?: boolean;
};

async function getPosts(): Promise<ListedPost[]> {
  const posts: ListedPost[] = builtInPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
  }));

  const supabase = getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("slug,title,excerpt,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (data) {
      for (const row of data) {
        posts.unshift({
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt || "",
          date: row.published_at,
        });
      }
    }
  }

  if (demoMode) {
    posts.unshift(
      ...demoPosts.map((p) => ({ ...p, demo: true }))
    );
  }

  return posts;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <SiteFrame>
      <main className="container-site max-w-6xl pb-16 pt-36">
        <Reveal>
          <h1 className="display-xl">The written steps.</h1>
          <p className="mt-5 max-w-2xl text-lg text-soft">
            Validation, system prompts, retention, and the real numbers. For
            founders building without a team or an engineer.
          </p>
        </Reveal>

        {demoMode && (
          <p className="mt-6 inline-block rounded-full border border-amber-400 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">
            Preview mode: sample posts from your content plan. They disappear
            in production.
          </p>
        )}

        {featured && (
          <Reveal>
            <Link
              href={featured.demo ? "#" : `/blog/${featured.slug}`}
              className="card-raised mt-12 block overflow-hidden lg:grid lg:grid-cols-[1fr_1.2fr]"
            >
              <div className="relative flex min-h-[14rem] items-center justify-center bg-[var(--bg-drench)] p-10">
                <span className="font-display text-2xl font-bold leading-snug text-[#3dcfcc]">
                  Latest
                </span>
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 h-44 w-44 translate-x-1/3 translate-y-1/3 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(20,188,186,0.4), transparent 70%)" }}
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="text-sm font-semibold text-accent">
                  {formatDate(featured.date)}
                </p>
                <h2 className="display-md mt-3">{featured.title}</h2>
                <p className="mt-4 text-soft">{featured.excerpt}</p>
                <span className="mt-6 inline-block font-bold text-accent">
                  Read it
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 100}>
              <Link
                href={post.demo ? "#" : `/blog/${post.slug}`}
                className="card-raised flex h-full flex-col p-7"
              >
                <p className="text-sm font-semibold text-accent">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-[var(--ink-strong)]">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">
                  {post.excerpt}
                </p>
                <span className="mt-5 font-bold text-accent">Read it</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
    </SiteFrame>
  );
}
