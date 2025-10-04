import Link from "next/link";
import { PageTitle } from "../../components/PageTitle";
import { A } from "../../components/A";
import { Metadata } from "next";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";

const Page = () => {
  return (
    <div>
      <PageTitle title={"チーム"} />

      <div className="mt-5">
        <p className="align-middle">
          「おもしろいホラーをつくる」をコンセプトに、2022年から映像制作チームin-factoとして活動中。
        </p>
        <div className="mt-5">
          <ul className="list-inside list-disc">
            <li>
              <A
                href={"https://www.youtube.com/@in-facto"}
                target="_blank"
                rel={"noopener noreferrer"}
              >
                Youtube
              </A>
            </li>

            <li>
              <A
                href={"https://twitter.com/in_facto_jp"}
                target="_blank"
                rel={"noopener noreferrer"}
              >
                X
              </A>
            </li>
          </ul>
        </div>

        <div className="mt-16 pt-10 md:pt-5">
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
              "in-factoを設立し、代表を務める。撮影・編集・音声を担当。別プロジェクトで猫を堕ろすなどの音楽活動も。"
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

          <Member
            name={"osd"}
            imgSrc="https://github.com/osd-02.png"
            description={
              "ソフトウェアエンジニア。podcast番組 undrcastを配信。わからないものをこねくりまわすことが得意。"
            }
            twitter={"osd-02"}
            horror={"好きなホラー映画 「来る。」 「呪詛」"}
          />
          <Break />
        </div>
      </div>
    </div>
  );
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
              <a
                href={`https://x.com/${props.twitter}`}
                target={"_blank"}
                rel="noreferrer"
              >
                <X />
              </a>
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

const X = () => {
  return <img src={"/x.svg"} alt="" width={15} height={15} />;
};

export const metadata: Metadata = generateSharedMetadata({
  title: "チームについて",
});

export default Page;
