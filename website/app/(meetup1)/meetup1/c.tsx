"use client";

import Link from "next/link";
import { useEffect } from "react";

export const C = () => {
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
          <a href="infacto-meetup-vol1-2.png">
            <img src="infacto-meetup-vol1-2.jpeg" alt={"in-facto meet-up 1"} />
          </a>
        </div>

        <div className="max-w-[80%] md:max-w-[600px] w-full mt-10">
          <b>
            § <Link href="/">in-facto</Link>初の現地交流イベントを開催
          </b>
          <br />
          2023年10月14日(土) 18:00〜 都内某所(西葛西駅近郊)
          <br />
          <br />
          <b>§ タイムスケジュール</b>
          <br />
          18:00 開場
          <br />
          18:30 新作「特殊清掃」先行上映
          <br />
          19:00 in-factoによるトークセッション
          <br />
          20:00 交流
          <br />
          21:30 解散
          <br />
          <br />
          <b>§ フードメニュー</b>
          <br />
          in-factoコラボメニュー{" "}
          <span className="text-gray-400 text-sm">※現時点のものです</span>{" "}
          <br />
          ・天使化：皆本家のローストビーフ ベリーソース仕立て
          <br />
          ・健康生活セラピーV：ニゴリ排出黒カレー
          <br />
          <br />
          <b>§ 参加者募集</b>
          <br />
          一般参加者のチケットを限定5枚で販売(3000円)。
          <a
            href="https://forms.gle/9ThBw2NFDfhe1kRp7"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-400 "
          >
            申込みはこちら
          </a>
          <br />
          <span className="text-gray-400 text-sm">
            ※ 規定枚数で締め切ります。参加確定後に開催場所をお伝えします
          </span>
        </div>
      </main>
    </div>
  );
};
