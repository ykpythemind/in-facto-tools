import { format, parseISO } from "date-fns";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ReactElement } from "react";
import { A } from "../../components/A";
import { AppSeo } from "../../components/Header/AppSeo";
import { SubPageLayout } from "../../components/layouts/SubPageLayout";
import { PageTitle } from "../../components/PageTitle";
import { getAllPosts } from "../../lib/api";
import { NextPageWithLayout } from "../_app";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPageWithLayout<Props> = (props) => {
  const { allPosts } = props;

  return (
    <div>
      <AppSeo path={"/posts"} title={"Posts"} />

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

      <Link href={`/posts/${slug}`} passHref>
        <A className="inline-flex">{title}</A>
      </Link>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <SubPageLayout>{page}</SubPageLayout>;
};

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug"]);

  return {
    props: { allPosts },
  };
};

export default Page;
