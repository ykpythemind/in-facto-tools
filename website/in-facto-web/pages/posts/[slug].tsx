import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { AppSeo } from "../../components/Header/AppSeo";
import { PageTitle } from "../../components/PageTitle";
import { NextPageWithLayout } from "../_app";
import { SubPageLayout } from "../../components/layouts/SubPageLayout";
import { ReactElement } from "react";
import { PostComponent } from "../../components/PostComponent";
import { googleDoc2Md } from "../../lib/googleDoc2Md";
import { A } from "../../components/A";

type Props = {
  post: PostType;
  beforePost: PostType | null;
  afterPost: PostType | null;
  preview?: boolean;
};

const Page: NextPageWithLayout<Props> = ({
  post,
  beforePost,
  afterPost,
  preview,
}) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <AppSeo path={`/posts/${post.slug}`} title={`${post.title}`} />

          {/* <PageTitle title={post.title} /> */}

          <PostComponent
            withAllPostsLink={true}
            content={post.content}
            title={post.title}
            date={post.date}
            slug={post.slug}
          />

          <div className="flex flex-col gap-3 justify-between w-full mt-5">
            {beforePost && (
              <A href={`/posts/${beforePost.slug}`}>&lt; {beforePost.title}</A>
            )}
            {afterPost && (
              <A href={`/posts/${afterPost.slug}`}>{afterPost.title} &gt;</A>
            )}
          </div>
        </>
      )}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <SubPageLayout>
      <>{page}</>
    </SubPageLayout>
  );
};

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
  const md = await googleDoc2Md(post.content || "", params.slug + "/");
  const content = await markdownToHtml(md || "");

  const allPosts = getAllPosts(["title", "date", "slug", "content"]);
  const postIndex = allPosts.findIndex((p) => p.slug === params.slug);

  const beforePost = allPosts[postIndex + 1] ?? null;
  const afterPost = allPosts[postIndex - 1] ?? null;

  return {
    props: {
      post: {
        ...post,
        content,
      },
      beforePost,
      afterPost,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Page;
