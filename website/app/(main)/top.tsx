"use client";
import { VideoEmbed } from "./components/VideoEmbed";

export const Hero = ({
  videoId,
  title,
  date,
}: {
  videoId: string;
  title: string;
  date: string;
}) => {
  return (
    <div>
      <VideoEmbed videoId={videoId} title={title} />
      <div className="mt-2 text-sm">
        {date}「{title}」
      </div>
    </div>
  );
};
