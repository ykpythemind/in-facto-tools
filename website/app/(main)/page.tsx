import type { Metadata, NextPage } from "next";
import React from "react";
import { A } from "./components/A";
import { generateSharedMetadata } from "../../lib/generateSharedMetadata";
import { getAllPosts, getAllVideos } from "../../lib/api";
import { Hero } from "./top";
import { VideoEmbed } from "./components/VideoEmbed";
import { MoreButton } from "./components/MoreButton";
import { MemberCard } from "./components/MemberCard";
import { PostCard } from "./components/PostCard";
import { members } from "../../lib/members";

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto",
  isRoot: true,
});

type VideoType = {
  id: string;
  title: string;
  youtube?: string;
  summary?: string;
  published_at?: string;
  credit?: string;
  post_id?: string;
  post_title?: string;
};

// "2026/01/31" -> "2026.1.31"
const formatDate = (date: string) => date.split("/").map(Number).join(".");

const Page: NextPage = () => {
  const videos: VideoType[] = getAllVideos().filter(
    (v: VideoType) => !!v.published_at && !!v.youtube
  );
  const latestVideo = videos[0];
  const recentVideos = videos.slice(1, 4);

  // 記事欄は最新記事を3つ表示するが、meetup3のレポート記事は常に含める(固定枠)。
  // 新しい記事が増えてもmeetup3が3枠から押し出されないようにするための措置。
  const allPosts = getAllPosts(["title", "date", "slug", "content"]);
  const pinnedPost = allPosts.find((p) => p.slug === "meetup3");
  const recentPosts = [
    ...(pinnedPost ? [pinnedPost] : []),
    ...allPosts
      .filter((p) => p.slug !== "meetup3")
      .slice(0, pinnedPost ? 2 : 3),
  ].sort((a, b) => (a.date > b.date ? -1 : 1));

  // 記事に対応する動画のサムネイルを引く (post_id -> youtube id)
  const videoByPost = new Map<string, string>();
  for (const v of videos) {
    if (v.post_id && v.youtube && !videoByPost.has(v.post_id)) {
      videoByPost.set(v.post_id, v.youtube);
    }
  }

  return (
    <div className="font-serif">
      {/* ヒーロー */}
      <Hero
        videoId={latestVideo.youtube as string}
        title={latestVideo.title}
        date={formatDate(latestVideo.published_at as string)}
      />

      {/* コンセプト */}
      <div className="mt-14 text-center text-[17px] leading-[2.4] tracking-[0.1em]">
        <p>
          「おもしろいホラーをつくる」
          <br />
          がコンセプトの、映像制作チーム
          <br />
          in-facto（インファクト）
        </p>
      </div>

      <div className="mt-14 flex flex-col items-start gap-2.5 pb-16">
        <a
          href="https://x.com/in_facto_jp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black px-4 py-1.5 text-[15px] text-white"
        >
          @in_facto_jp
        </a>
        <a
          href="https://www.youtube.com/@in-facto"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-black bg-white px-4 py-1.5 text-[15px]"
        >
          Youtube Channel
        </a>
      </div>

      {/* セクション部分は薄グレー背景で画面幅いっぱいに広げる */}
      {/* スクロールバー幅で左右がずれないよう少し余分に広げ、html側のoverflow-x:hiddenでクリップする */}
      <div className="-mx-3 bg-[#f4f4f2] md:mx-[calc(50%-50vw-24px)]">
        <Section title="映像">
          <div className="divide-y divide-neutral-800">
            {recentVideos.map((v) => (
              <div key={v.id} className="py-10 first:pt-8">
                <VideoCard video={v} />
              </div>
            ))}
          </div>
          <MoreButton href="/videos">全ての映像</MoreButton>
        </Section>

        <Section title="記事">
          <div className="divide-y divide-neutral-300">
            {recentPosts.map((p) => (
              <div key={p.slug} className="py-8 first:pt-8">
                <PostCard
                  slug={p.slug}
                  title={p.title}
                  content={p.content}
                  youtubeId={videoByPost.get(p.slug)}
                />
              </div>
            ))}
          </div>
          <MoreButton href="/posts">全ての記事</MoreButton>
        </Section>

        <Section title="チーム">
          <div className="divide-y divide-neutral-800">
            {members.map((m) => (
              <div key={m.name} className="py-12 first:pt-8">
                <MemberCard member={m} />
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="border-t-2 border-black">
      <div className="mx-auto w-full max-w-xl px-3 py-14 md:px-0">
        <h2 className="text-center text-[26px] font-bold tracking-[0.3em] [text-indent:0.3em]">
          {title}
        </h2>
        <div className="mt-7 border-t border-neutral-800" />
        {children}
      </div>
    </section>
  );
};

const VideoCard = ({ video: v }: { video: VideoType }) => {
  return (
    <div>
      <h3 className="mb-3 text-xl font-bold">{v.title}</h3>
      <VideoEmbed videoId={v.youtube as string} title={v.title} />
      <div className="mt-4 text-[15px] leading-[1.9]">
        {v.post_title && v.post_id && (
          <div>
            関連する記事『<A href={`/posts/${v.post_id}`}>{v.post_title}</A>』
          </div>
        )}
        <div>{v.published_at}</div>
      </div>
    </div>
  );
};

export default Page;
