import Link from "next/link";
import { Twitter, Youtube } from "@icons-pack/react-simple-icons";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { contactUrl, SubPageLayout } from "../components/layouts/SubPageLayout";
import { PageTitle } from "../components/PageTitle";
import { AppSeo } from "../components/Header/AppSeo";
import { A } from "../components/A";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <AppSeo path={"/about"} title={"About"} />

      <PageTitle title={"About"} />

      <div className="mt-5">
        <p className="align-middle">
          「真の楽しさを追求する」知的活動団体、
          <img
            src={"/in-facto-black.png"}
            alt={"in-facto"}
            className={"w-[50px] inline align-middle -mt-1 ml-0.5 mr-0.5"}
          />
          から映像制作チームが発足。ホラー映画が好きなメンバーからなり、「自分たちのホラー」を追求するべく活動中。
        </p>
        <div className="mt-5 flex space-x-3">
          <A
            href={"https://www.youtube.com/@in-facto"}
            target="_blank"
            rel={"noopener noreferrer"}
          >
            Youtube
          </A>

          <A
            href={"https://twitter.com/in_facto_jp"}
            target="_blank"
            rel={"noopener noreferrer"}
          >
            Twitter
          </A>

          <A href={contactUrl} target="_blank" rel={"noopener noreferrer"}>
            Contact
          </A>
        </div>

        <div className="mt-16 pt-10 md:pt-5">
          <h3 className="text-lg font-serif mb-10">
            § Team &quot;in-facto&quot;
          </h3>

          <Member
            name={"トモヒロツジ"}
            imgSrc="/members/tomo_at_mini.jpg"
            description={
              "ウェブディレクター。ディスクレビューサイトcllctv.の運営を行いつつ、たまにライブイベントを開催。主に演出と脚本、小道具を担当。"
            }
            twitter={"Tomo_at"}
            horror={
              "好きなホラー映画「輪廻」「怪談新耳袋 劇場版 幽霊マンション」"
            }
          />
          <Break />

          <Member
            name={"ykpythemind"}
            imgSrc="/members/ykpythemind2.png"
            description={
              "猫を堕ろす/ソフトウェアエンジニア。in-factoを設立し、撮影・編集・音声を担当。"
            }
            twitter={"ykpythemind"}
            horror={"好きなホラー映画「グレイヴ・エンカウンターズ」「ノロイ」"}
          />
          <Break />

          <Member
            name={"藤本薪"}
            imgSrc="/members/fujiphone.jpg"
            description={
              "新しいものがすき。音楽や小説を作る。主に出演と脚本を担当。"
            }
            twitter={"fujiphone"}
            horror={"好きなホラー映画「貞子VS伽耶子」「スペル」"}
          />
          <Break />
        </div>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <SubPageLayout>{page}</SubPageLayout>;
};

const Break = () => {
  return <div className="mt-10"></div>;
};

const Member = (props: {
  imgSrc: string;
  name: string;
  twitter?: string;
  description: string;
  horror: string;
}) => {
  return (
    <div>
      <div className={"w-1/5 max-w-[40px] mr-2 mb-2"}>
        <img
          src={props.imgSrc}
          style={{ objectFit: "cover" /*, borderRadius: "50%" */ }}
        />
      </div>
      <div className={"flex items-end"}>
        <div className={"flex items-center"}>
          <div className={"font-bold"}>{props.name}</div>
          {props.twitter && (
            <div className={"ml-2"}>
              <Link passHref href={`https://twitter.com/${props.twitter}`}>
                <a target={"_blank"} rel="noreferrer">
                  <Twitter size={16} />
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={"mt-1"}>
        {props.description.split("\n").map((s, i) => {
          return <p key={i}>{s}</p>;
        })}
      </div>
      <div className={"mt-2 italic text-sm"}>{props.horror}</div>
    </div>
  );
};

export default Page;