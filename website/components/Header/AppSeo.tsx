import NextHeadSeo from "next-head-seo";
import Head from "next/head";
import { Favicons } from "./Favicons";

const getBaseUrl = () => {
  return "https://www.in-facto.jp"; // preview環境でもこれになるので注意
};

// types
export type MyPageSeoProps = {
  path: string;
  title: string;
  description?: string;
  ogImagePath?: string;
  noindex?: boolean;
  noTitleTemplate?: boolean;
};

export const AppSeo: React.FC<MyPageSeoProps> = (props) => {
  const {
    path,
    title,
    description = "「真の楽しさを追求する」知的活動団体、in-factoの公式サイトです。",
    ogImagePath = "/in-facto-ogp.jpg",
    noindex,
    noTitleTemplate,
  } = props;

  const rootUrl = getBaseUrl();

  // Absolute page url
  const pageUrl = rootUrl + path;
  // Absolute og image url
  const ogImageUrl = rootUrl + ogImagePath;

  return (
    <>
      <Head>
        <Favicons />
      </Head>
      <NextHeadSeo
        title={noTitleTemplate ? title : `${title} - in-facto`}
        canonical={pageUrl}
        description={description}
        robots={noindex ? "noindex, nofollow" : undefined}
        og={{
          title,
          description,
          url: pageUrl,
          image: ogImageUrl,
          type: "article",
          siteName: "in-facto",
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
    </>
  );
};
