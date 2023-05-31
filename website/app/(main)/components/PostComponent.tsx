// "use client";

import { format, parseISO } from "date-fns";
import Link from "next/link";
import { A } from "./A";

export const PostComponent = ({
  date,
  content,
  withAllPostsLink,
  slug,
  title,
  withPostLinkOnTop = true,
}: {
  date: string;
  title: string;
  content: string;
  withAllPostsLink: boolean;
  slug: string;
  withPostLinkOnTop?: boolean;
}) => {
  return (
    <>
      <div className="mt-1 text-left mb-2 text-sm flex items-center gap-2">
        <A href={`/posts/${slug}`}>{format(parseISO(date), "yyyy/MM/dd")}</A>

        {withPostLinkOnTop && (
          <div className="bg-white text-black border-gray-600 border-[1px] inline-block rounded-lg text-[11px] font-serif tracking-wider px-1">
            <Link href={"/posts"}>記事</Link>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-serif">{title}</h2>

      <article
        className="mb-12"
        id="postContent"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
      {withAllPostsLink && (
        <div>
          <A href="/posts">すべての記事を見る</A>
        </div>
      )}
    </>
  );
};
