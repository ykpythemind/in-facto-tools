"use client";
import YouTube from "react-youtube";
import { A } from "./components/A";

export const Component = () => {
  return (
    <>
      <div>
        <div className="iframeOuter">
          <YouTube videoId={"_KaEnHEIVw8"} opts={{}} />
        </div>
      </div>
      <div className="mt-2">
        2024/12/01更新 :{" "}
        <A
          href="https://www.youtube.com/watch?v=_KaEnHEIVw8"
          target="_blank"
          rel={"noopener noreferrer"}
        >
          虫を取り続ける
        </A>
        <br />
        関連する記事： <A href="/posts/musi">ホラーを撮り続ける</A>
      </div>
    </>
  );
};
