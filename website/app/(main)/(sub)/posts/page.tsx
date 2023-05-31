import { format, parseISO } from "date-fns";
import { A } from "../../components/A";
import { PageTitle } from "../../components/PageTitle";
import { getAllPosts } from "../../../../lib/api";
import { Metadata } from "next";

function Page() {
  const allPosts = getAllPosts(["title", "date", "slug"]);

  return (
    <div>
      <PageTitle title={"Posts"} />

      <div className="mt-6">
        {allPosts.map((p, i) => (
          <div key={p.slug} className="mb-3">
            <PostIndex
              title={p.title}
              slug={p.slug}
              date={p.date}
              isNew={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Posts",
};

const PostIndex = ({
  title,
  slug,
  date,
  isNew,
}: {
  title: string;
  slug: string;
  date: string;
  isNew: boolean;
}) => {
  return (
    <div className="inline-flex flex-col">
      {isNew && (
        <div className="inline-flex text-xs text-red-500">
          {format(parseISO(date), "yyyy/MM/dd")} 更新
        </div>
      )}

      <A isInlineFlex href={`/posts/${slug}`}>
        {title}
      </A>
    </div>
  );
};

export default Page;
