"use client";

import { format, parseISO } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";

let done = false;

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
  useEffect(() => {
    if (done) return;
    (window as any).twttr = (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = (window as any).twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      (js as any).src = "https://platform.twitter.com/widgets.js";
      fjs?.parentNode?.insertBefore(js, fjs);

      t._e = [];
      t.ready = function (f: any) {
        t._e.push(f);
      };

      return t;
    })(document, "script", "twitter-wjs");
    done = true;
  }, [])

  return (
    <>
      <div className="mt-1 text-left mb-2 flex items-center gap-2">
        <span className="text-sm text-neutral-500">
          {format(parseISO(date), "yyyy/MM/dd")}
        </span>
      </div>
      <h2 className="text-[26px] font-bold leading-snug">{title}</h2>

      <article
        className="mb-12"
        id="postContent"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
      {withAllPostsLink && (
        <div className="mt-10 text-center">
          <Link
            href="/posts"
            className="mx-auto block w-[88%] rounded-full border border-black py-4 text-[17px] tracking-[0.2em] [text-indent:0.2em] transition-colors hover:bg-black hover:text-white"
          >
            全ての記事
          </Link>
        </div>
      )}
    </>
  );
};
