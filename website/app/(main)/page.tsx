import type { Metadata, NextPage } from "next";
import { A } from "./components/A";
import { generateSharedMetadata } from "../../lib/generateSharedMetadata";
import Link from "next/link";
import YouTube from "react-youtube";
import { Component } from "./top";
import { getAllVideos } from "../../lib/api";
// import { getAllVideos } from "../../lib/api";

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto",
  isRoot: true,
});

const Page: NextPage = () => {
  const videos = getAllVideos();
  const latestVideo = videos[0];

  return (
    <div className="">
      <Component
        videoId={latestVideo["youtube"]}
        path={latestVideo["post_id"]}
        posttitle={latestVideo["post_title"]}
        date={latestVideo["published_at"]}
      />
    </div>
  );
};

export default Page;
