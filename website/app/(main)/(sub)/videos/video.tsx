"use client";

import React from "react";
import { A } from "../../components/A";
import { VideoEmbed } from "../../components/VideoEmbed";

type Props = {
  id: string;
  title: string;
  youtube?: string;
  summary?: string;
  published_at: string;
  credit?: string;
  postTitle?: string;
  postId?: string;
  watchLink?: { label: string; url: string };
  isMembershipOnly?: boolean;
};

export const VideoComponent = (props: Props) => {
  const v = props;

  return (
    <div>
      <h3 className="mb-3 text-xl font-bold">
        {v.isMembershipOnly && <MembershipBadge />}
        {v.title}
      </h3>
      {v.youtube && <VideoEmbed videoId={v.youtube} title={v.title} />}
      <div className="mt-4 text-[15px] leading-[1.9]">
        {v.summary && v.summary !== "" && (
          <div className="mb-3">{nl2br(v.summary)}</div>
        )}
        {v.watchLink && (
          <div className="mb-3">
            視聴：
            <A href={v.watchLink.url} target="_blank" rel="noopener noreferrer">
              {v.watchLink.label}
            </A>
          </div>
        )}
        {v.credit && v.credit !== "" && <div>{nl2br(v.credit)}</div>}
        {v.postTitle && v.postId && (
          <div className="mt-4">
            関連する記事『<A href={`/posts/${v.postId}`}>{v.postTitle}</A>』
          </div>
        )}
        <div>
          {v.published_at}｜{v.id}
        </div>
      </div>
    </div>
  );
};

const MembershipBadge = () => (
  <span
    className="mr-2 inline-flex translate-y-[-2px] items-center gap-1 rounded-sm bg-black px-1.5 py-0.5 align-middle text-[11px] font-normal leading-none text-white"
    title="メンバーシップ限定"
  >
    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.6 1.4 6.8L12 17.8 5.9 21.5l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
    メンバー限定
  </span>
);

const nl2br = (text: string) => {
  const regex = /(\n)/g;

  return text.split(regex).map((line, index) => {
    if (line.match(regex)) {
      return React.createElement("br", { key: index });
    } else {
      return line;
    }
  });
};
