import Link from "next/link";
import { extractExcerpt } from "../../../lib/postExcerpt";

// サムネイル+タイトル+抜粋の記事カード
export const PostCard = ({
  slug,
  title,
  content,
  youtubeId,
  date,
}: {
  slug: string;
  title: string;
  content: string;
  youtubeId?: string;
  date?: string;
}) => {
  const excerpt = extractExcerpt(content);
  const thumbnail = youtubeId
    ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
    : "/in-facto-ogp.jpg";

  return (
    <div>
      <Link href={`/posts/${slug}`} className="group flex items-center gap-4">
        <img
          src={thumbnail}
          alt=""
          className="aspect-video w-28 shrink-0 object-cover"
          loading="lazy"
        />
        <div className="text-lg font-bold leading-snug group-hover:text-blue-400">
          {title}
          <span className="ml-1.5 inline-block">›</span>
        </div>
      </Link>
      {excerpt && (
        <p className="mt-4 font-sans text-[15px] leading-[1.9] text-neutral-700">
          {excerpt}
        </p>
      )}
      {date && <div className="mt-2 text-sm text-neutral-500">{date}</div>}
    </div>
  );
};
