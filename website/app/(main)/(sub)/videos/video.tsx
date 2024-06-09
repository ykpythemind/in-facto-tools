"use client";

import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { A } from "../../components/A";

type Props = {
  id: string;
  title: string;
  youtube?: string;
  summary?: string;
  published_at: string;
  credit?: string;
  postTitle?: string;
  postId?: string;
};

export const VideoComponent = (props: Props) => {
  const v = props;

  const opts: YouTubeProps["opts"] = {
    // height: "390",
    // width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

  return (
    <>
      <h4 className="font-bold my-2">{v.title}</h4>
      <div className="text-sm">
        {v.youtube && (
          <div className="mb-2">
            <div className="iframeOuter">
              <YouTube videoId={v.youtube} opts={opts} />
            </div>
          </div>
        )}

        {v.summary && v.summary !== "" && (
          <div className="mb-2">{nl2br(v.summary as string)}</div>
        )}

        {v.credit && v.credit !== "" && (
          <div className="mb-2">{nl2br(v.credit as string)}</div>
        )}

        {v.postTitle && v.postId && (
          <div className="mb-2">
            関連する記事『<A href={`/posts/${v.postId}`}>{v.postTitle}</A>』
          </div>
        )}

        <div className="text-gray-400 text-sm">
          {v.published_at} | {v.id}
        </div>
      </div>
    </>
  );
};

const nl2br = (summary: string) => {
  const regex = /(\n)/g;

  return summary.split(regex).map((line) => {
    if (line.match(regex)) {
      return React.createElement("br");
    } else {
      return line;
    }
  });
};
