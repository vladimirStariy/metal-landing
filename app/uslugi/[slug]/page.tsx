import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "../../components/ServicePage";
import { findPage, pagesOf } from "../../content/pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return pagesOf("uslugi").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/uslugi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage("uslugi", slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/uslugi/${page.slug}` },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      title: page.h1,
      description: page.description,
      url: `/uslugi/${page.slug}`,
    },
  };
}

export default async function Page({ params }: PageProps<"/uslugi/[slug]">) {
  const { slug } = await params;
  const page = findPage("uslugi", slug);
  if (!page) notFound();

  return <ServicePage page={page} />;
}
