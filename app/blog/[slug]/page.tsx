import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteFrame from "@/components/SiteFrame";
import { builtInPosts } from "@/lib/posts";
import { getSupabase } from "@/lib/supabase";

export const revalidate = 600;

type FullPost = {
  title: string;
  date: string;
  excerpt: string;
  paragraphs: string[];
};

async function getPost(slug: string): Promise<FullPost | null> {
  const builtIn = builtInPosts.find((p) => p.slug === slug);
  if (builtIn) {
    return {
      title: builtIn.title,
      date: builtIn.date,
      excerpt: builtIn.excerpt,
      paragraphs: builtIn.body,
    };
  }

  const supabase = getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from("posts")
      .select("title,excerpt,body,published_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (data) {
      return {
        title: data.title,
        date: data.published_at,
        excerpt: data.excerpt || "",
        paragraphs: String(data.body || "").split("\n\n"),
      };
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <SiteFrame>
      <main className="container-site max-w-3xl pb-16 pt-36">
        <p className="text-sm font-semibold text-accent">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h1 className="display-lg mt-3">{post.title}</h1>
        <div className="mt-10 space-y-6 text-lg leading-relaxed">
          {post.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </main>
    </SiteFrame>
  );
}
