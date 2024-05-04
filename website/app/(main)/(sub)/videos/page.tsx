import { format, parseISO } from "date-fns";
import { A } from "../../components/A";
import { PageTitle } from "../../components/PageTitle";
import { getAllPosts, getAllVideos } from "../../../../lib/api";
import { Metadata } from "next";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";
import React from "react";
import { VideoComponent } from "./video";

export type VideoType = {
  id: string;
  title: string;
  youtube?: string;
  summary?: string;
  published_at?: string;
  credit?: string;
  post_id?: string;
  post_title?: string;
};

function Page() {
  const videos = getAllVideos();

  return (
    <div>
      <PageTitle title={"Videos"} />

      <div className="mt-2">
        <A
          href="https://www.youtube.com/@in-facto"
          target="_blank"
          rel="noopener noreferrer"
        >
          Youtube Channel
        </A>
      </div>

      <div className="mt-6">
        {videos
          .filter((v: VideoType) => !!v.youtube && !!v.published_at) // published_atがないものは表示しない.
          .map((v: VideoType) => (
            <div key={v.id} className="mb-7">
              <VideoComponent
                id={v.id}
                title={v.title}
                credit={v.credit}
                published_at={v.published_at ?? ""}
                youtube={v.youtube}
                summary={v.summary}
                postId={v.post_id}
                postTitle={v.post_title}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "Videos" });

export default Page;
