import { getPostBySlug, getAllPosts } from "../../../../../lib/api";
import markdownToHtml from "../../../../../lib/markdownToHtml";
import type PostType from "../../../../../interfaces/post";
import { PostComponent } from "../../../components/PostComponent";
import { googleDoc2Md } from "../../../../../lib/googleDoc2Md";
import { A } from "../../../components/A";
import { Metadata } from "next";

type Params = { slug: string };

const Page = async ({ params }: { params: Params }) => {
  const _post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
  ]) as PostType;
  const md = await googleDoc2Md(_post.content || "", params.slug + "/");
  const content = await markdownToHtml(md || "");

  const allPosts = getAllPosts(["title", "date", "slug", "content"]);
  const postIndex = allPosts.findIndex((p) => p.slug === params.slug);

  const beforePost = allPosts[postIndex + 1] ?? null;
  const afterPost = allPosts[postIndex - 1] ?? null;
  const post: PostType = { ..._post, content };

  return (
    <>
      <>
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
    </>
  );
};

export const generateStaticParams = async () => {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

// <AppSeo path={`/posts/${post.slug}`} title={`${post.title}`} />

export const generateMetadata = ({ params }: { params: Params }) => {
  const post = getPostBySlug(params.slug, ["title", "slug"]);

  const metadata: Metadata = {
    title: post.title,
  };

  return metadata;
};

export default Page;
