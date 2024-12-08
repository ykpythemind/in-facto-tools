"use client";

import Link from "next/link";
import { useEffect } from "react";

const Reserve = () => {
  return (
    <div className=" border-gray-500 border rounded-xl py-3 px-6 flex items-center">
      <div className="mr-auto">予約する</div>

      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>
    </div>
  );
};

export const Main = () => {
  useEffect(() => {
    document.body.classList.add("bg-black");

    return () => {
      document.body.classList.remove("bg-black");
    };
  }, []);

  return (
    <div className={"bg-black text-white"}>
      <main className={"flex items-center flex-col py-10"}>
        <div className="max-w-[80%] md:max-w-[600px]">
          <a href="in-facto-meetup-vol2.PNG">
            <img
              src="in-facto-meetup-vol2.jpeg"
              alt={"in-facto meet-up vol.2"}
            />
          </a>
        </div>

        <div className="max-w-[80%] md:max-w-[600px] w-full mt-10">
          <b>
            § in-facto 主催の交流イベント・2回目は学芸大学駅近辺にて開催決定！
          </b>
          <br />
          2024年12月14日(土) 18:00〜
          <br />
          参加費 2000円
          <br />
          <br />
          <div className="">
            <a
              href="https://coubic.com/ifm/3262180/book/event_type/detail?express=true"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Reserve />
            </a>
          </div>
          <br />
          <b>§ タイムスケジュール</b>
          <br />
          18:00 開場
          <br />
          18:20 in-facto トークショー
          <br />
          19:00 ゲストトーク (怒りくま)
          <br />
          19:10 「似顔絵」上映
          <br />
          19:50 ゲストトーク (楠本奈々瀬)
          <br />
          20:00 「逆廊」上映
          <br />
          20:50 エンディングトーク
          <br />
          21:00 コンテンツ終了 / 交流
          <br />
          22:00 閉場
          <br />
          <br />
          <b>§ ゲスト / トークテーマ作品</b>
          <br />
          <br />
          <b>怒りくま（映画ライター）/「似顔絵」</b>
          <img
            src="ikarikuma.jpeg"
            alt={'怒りくま 映画ライター'}
            className={'w-60'}
          />
          <br />
          アメブロにてブログ「怒りくまのブログ(仮)」を運営し、B級映画・ホラー映画を中心に、ジャンルを問わず様々な作品を紹介、レビューしている映画ブロガー。
          <br />
          <br />
          <b>楠本奈々瀬（俳優）/「逆廊」</b>
          <img
            src="kusumoto_nanase.jpeg"
            alt={'楠本奈々瀬 俳優'}
            className={'w-60'}
          />
          <br />
          神奈川県出身、フリーランス。近年は主にホラー作品に携わっており、in-facto作品では「椅子」「逆廊」に出演。ほか活動として「第七惑星放送局」(神宮前ラジオ)のパーソナリティを務める。はぁはぁしたい。
          <br />
          <br />
          <b>§ アクセス</b>
          <br />
          路地裏文化会館 C/NE (シーネ){" "}
          <span className="text-gray-400 text-sm">
            学芸大学駅正面口から徒歩5分
          </span>
          <br />
          <br />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3242.880344949493!2d139.6869769!3d35.63067619999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f55d0a352d8b%3A0x88cb6077dc850f1a!2z6Lev5Zyw6KOP5paH5YyW5Lya6aSoIEMvTkUgKOOCt-ODvOODjSk!5e0!3m2!1sja!2sjp!4v1731822713639!5m2!1sja!2sjp"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <br />
          <b>§ アンチハラスメントポリシー</b>
          <br />
          我々はすべての方々の人権と尊厳を尊重し、あらゆる形態のハラスメントを許容しません。ハラスメントを受けた場合、見かけた場合、もしくはハラスメントかどうかの判断に迷った場合は運営に
          <a
            className="underline"
            href="https://docs.google.com/forms/d/e/1FAIpQLSe7FGGsDNHsShnDhsiGV_VsTxxEncPAYZ1SR3JSK29oj4f6-Q/viewform"
          >
            お問い合わせください
          </a>
          。
          <br />
          <br />
          <br />
          <br />
          <div className="items-center justify-center">
            <Link href="/">
              <img
                src={"/in-facto-white.png"}
                alt={"in-facto"}
                className={"max-w-[100px] mx-auto"}
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
