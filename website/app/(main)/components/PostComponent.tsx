"use client";

import { format, parseISO } from "date-fns";
import { A } from "./A";
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
      <div className="mt-1 text-left mb-2 text-sm flex items-center gap-2">
        <span className="text-xs text-gray-500">
          {format(parseISO(date), "yyyy/MM/dd")}
        </span>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

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
