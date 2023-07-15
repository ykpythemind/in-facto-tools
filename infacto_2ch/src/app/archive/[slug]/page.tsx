import Image from "next/image";
import ThreadColumn from "../../component/threadColumn";
import SideThread from "../../component/sideThread";
import { ComponentType } from "react";
import { join } from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import Papa from "papaparse";

type Params = { slug: string };

const THREAD_TITLE: { [key: string]: string } = {
  j34LIHJio89fek: "やべえｗｗｗｗｗｗすごい発見したｗｗｗｗ",
  jLljfd889hO9kl: "庭師になる",
  o897sjhsiyOIYs: "最高の街挙げてけ",
};

type ThreadColumnType = ComponentType<typeof ThreadColumn>;

const threadDir = join(process.cwd(), "_csv");

function getThreadContentsBySlug(slug: string): Array<ThreadColumnType> {
  const fileName = `${slug}.csv`;
  const fullPath = join(threadDir, fileName);
  const isExists = fs.existsSync(fullPath);
  if (!isExists) {
    notFound();
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const result = Papa.parse(fileContents, {
    header: true,
  });
  // console.log(result);
  return result.data as Array<ThreadColumnType>;
}

const Page = async ({ params }: { params: Params }) => {
  const contents = getThreadContentsBySlug(params.slug);

  return (
    <main className="flex min-h-screen text-sm">
      <SideThread />
      <div className="bg-green-300 w-full">
        <div className="flex justify-center">
          <Image alt="aa" width={256} height={256} src="/title.png" />
        </div>
        <div className="flex justify-center">
          <div>
            現在のトップ魚拓:
            <a>【芸能】あの有名人が異次元から来たとしたら！？</a>&nbsp;
            <a>[芸能] 天才とバカの紙一重、芸能界の例は？</a>&nbsp;
            <a>[料理] 一番変な食材で料理する方法</a>&nbsp;
            <a>[経済] 1日で億万長者になる方法！？</a>&nbsp;
            <a>【経済】 リーマン・ショック2、ゾンビ経済学を考えよう</a>&nbsp;
            <a>[ゲーム] ポケモンを現実に持ってきたら、一番便利なポケモンは？</a>
            &nbsp;
            <a>[政治] アイドルが国会議員に！？</a>&nbsp;
            <a>【料理】 失敗したカレーレシピ、みんなで共有しよう</a>&nbsp;
          </div>
        </div>
        <div className="mx-4 mt-8 pt-8 border-t-2 text-3xl text-red-500">
          {THREAD_TITLE[params.slug]}
        </div>
        <div className="mx-4 mt-8">
          <div className="table-auto w-full border-spacing-y-4">
            {contents.map((content) => (
              <ThreadColumn
                slug={params.slug}
                no={content.no}
                date={content.date}
                time1={content.time1}
                time2={content.time2}
                name={content.name}
                body={content.body}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
