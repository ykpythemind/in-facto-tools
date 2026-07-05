import { format, parseISO } from "date-fns";
import { PageTitle } from "../../components/PageTitle";
import { PostCard } from "../../components/PostCard";
import { getAllPosts, getAllVideos } from "../../../../lib/api";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";

type VideoType = {
  youtube?: string;
  post_id?: string;
};

function Page() {
  const allPosts = getAllPosts(["title", "date", "slug", "content"]);

  // 記事に対応する動画のサムネイルを引く (post_id -> youtube id)
  const videoByPost = new Map<string, string>();
  for (const v of getAllVideos() as VideoType[]) {
    if (v.post_id && v.youtube && !videoByPost.has(v.post_id)) {
      videoByPost.set(v.post_id, v.youtube);
    }
  }

  return (
    <div>
      <PageTitle title={"記事"} />

      <div className="divide-y divide-neutral-300">
        {allPosts.map((p) => (
          <div key={p.slug} className="py-8">
            <PostCard
              slug={p.slug}
              title={p.title}
              content={p.content}
              youtubeId={videoByPost.get(p.slug)}
              date={format(parseISO(p.date), "yyyy/MM/dd")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "記事" });

export default Page;
