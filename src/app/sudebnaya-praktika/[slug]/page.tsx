import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | AndreevEgor.ru`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.content, { async: false }) as string;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 prose prose-neutral">
      <p className="text-sm text-brass not-prose mb-2">
        {formatDate(post.date)}
      </p>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
