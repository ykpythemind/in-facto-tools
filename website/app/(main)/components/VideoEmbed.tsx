"use client";

import { useState } from "react";

// サムネイル+円形再生ボタンを表示し、クリックでYouTube埋め込みに切り替える
export const VideoEmbed = ({
  videoId,
  title,
}: {
  videoId: string;
  title?: string;
}) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="iframeOuter">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full"
      aria-label={`${title ?? "動画"}を再生`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title ?? ""}
        className="aspect-video w-full object-cover"
        loading="lazy"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 transition-transform group-hover:scale-105">
          {/* 三角形はviewBox内でわずかに右寄り(+1.5)なので、そのまま中央配置すると光学的にちょうどよい */}
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white/90">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
};
