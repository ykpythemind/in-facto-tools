"use client";
import YouTube from "react-youtube";
import { A } from "./components/A";

export const Component = ({
  date,
  posttitle,
  path,
  videoId,
}: {
  videoId: string;
  date: string;
  posttitle: string;
  path: string;
}) => {
  return (
    <>
      <div className="mb-5">
        <div className="mx-auto text-center text-red-400 font-bold text-lg">
          <A href="./meetup3">
            2026/1/10(土) in-facto meet-up vol.3を開催します
          </A>
        </div>
      </div>
      <div>
        <div className="iframeOuter">
          <YouTube videoId={videoId} opts={{}} />
        </div>
      </div>
      <div className="mt-2">
        <div className="my-3">
          <div className="text-xs text-gray-500">{date}</div>
          <A href={`/posts/${path}`}>{posttitle}</A>
        </div>
        <ul className="list-disc mt-5 list-inside">
          <li>
            <A href="/about">チーム</A>
          </li>
          <li>
            <A href="/videos">動画</A>
          </li>
          <li>
            <A href="/posts">記事</A>
          </li>
          <li>
            <A href="/archives">アーカイブ</A>
          </li>
          <li>
            <A href="/contact">お問い合わせ</A>
          </li>
        </ul>
      </div>
    </>
  );
};
