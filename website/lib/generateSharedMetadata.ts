import { Metadata } from "next";
import { TemplateString } from "next/dist/lib/metadata/types/metadata-types";

const description = "「真の楽しさを追求する」in-factoの公式サイトです。";

export const generateSharedMetadata = ({
  title,
  isRoot = false,
}: {
  title: string;
  isRoot?: boolean;
}): Metadata => {
  const titles: TemplateString = isRoot
    ? { absolute: "in-facto" }
    : { default: title, template: "%s - in-facto" };

  return {
    title: titles,
    description,
    openGraph: {
      title: titles,
      type: "article",
      description,
      images: "/in-facto-ogp.jpg",
      siteName: "in-facto",
    },
    twitter: {
      card: "summary_large_image",
      images: "/in-facto-ogp.jpg",
      description,
      title: titles,
    },
  };
};
