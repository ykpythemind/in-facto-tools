import { PageTitle } from "../../components/PageTitle";
import { getAllVideos } from "../../../../lib/api";
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
  is_membership_only?: string;
};

// YouTube以外で公開されている作品の視聴リンク
const watchLinks: Record<string, { label: string; url: string }> = {
  IFT_020: {
    label: "Amazon Prime Video",
    url: "https://www.amazon.co.jp/dp/B0GTMPHM4Z",
  },
};

function Page() {
  const videos = (getAllVideos() as VideoType[])
    .filter((v) => !!v.published_at) // published_atがないものは表示しない.
    // 行順ではなく公開日の降順で並べる。同日は本編→制作過程になるようid昇順を副キーに。
    .sort((a, b) => {
      if (a.published_at !== b.published_at) {
        return (a.published_at ?? "") > (b.published_at ?? "") ? -1 : 1;
      }
      return a.id > b.id ? 1 : -1;
    });

  return (
    <div>
      <PageTitle title={"映像"} />

      <div className="mt-8">
        <a
          href="https://www.youtube.com/@in-facto"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-black bg-white px-4 py-1.5 text-[15px]"
        >
          Youtube Channel
        </a>
      </div>

      <div className="mt-2 divide-y divide-neutral-300">
        {videos.map((v) => (
          <div key={v.id} className="py-10">
            <VideoComponent
              id={v.id}
              title={v.title}
              credit={v.credit}
              published_at={v.published_at ?? ""}
              youtube={v.youtube}
              summary={v.summary}
              postId={v.post_id}
              postTitle={v.post_title}
              watchLink={watchLinks[v.id]}
              isMembershipOnly={v.is_membership_only === "TRUE"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "映像" });

export default Page;
