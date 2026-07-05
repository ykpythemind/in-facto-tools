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
      <div className="relative">
        <VideoEmbed videoId={videoId} title={title} />
        {/* 動画左下に重ねるキャプションの帯(白地に黒文字) */}
        <div className="pointer-events-none absolute bottom-0 left-0 bg-white px-3 py-1 text-[15px]">
          {date}「{title}」
        </div>
      </div>
    </div>
  );
};
