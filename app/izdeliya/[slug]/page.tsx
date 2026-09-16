import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "../../components/ServicePage";
import { findPage, pagesOf } from "../../content/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOf("izdeliya").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/izdeliya/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage("izdeliya", slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/izdeliya/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      title: page.h1,
      description: page.description,
      url: `/izdeliya/${page.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps<"/izdeliya/[slug]">) {
  const { slug } = await params;
  const page = findPage("izdeliya", slug);
  if (!page) notFound();

  return <ServicePage page={page} />;
}
