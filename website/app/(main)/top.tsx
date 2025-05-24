"use client";
import YouTube from "react-youtube";
import { A } from "./components/A";

export const Component = () => {
  return (
    <>
      <div>
        <div className="iframeOuter">
          <YouTube videoId={"OrgGOeS5yBk"} opts={{}} />
        </div>
      </div>
      <div className="mt-2">
        2025/5/24更新
        <br />
        関連する記事：{" "}
        <A href="/posts/mindcrasher">
          おもしろいホラーとおもしろくないバラエティ
        </A>
        <h2 className="mt-6 font-bold mb-2">コンテンツ</h2>
        <ul className="list-disc ml-6">
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
