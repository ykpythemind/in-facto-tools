"use client";

import Link from "next/link";
import { useEffect } from "react";

export const Main = () => {
  useEffect(() => {
    document.body.classList.add("bg-black");

    return () => {
      document.body.classList.remove("bg-black");
    };
  }, []);

  return (
    <div className="max-w-full md:max-w-lg mx-auto pb-10 tracking-tight">
      <div className="mt-0 md:mt-5">
        <a href="/in-facto-meetup-vol3.PNG">
          <img src="/in-facto-meetup-vol3.jpeg" />
        </a>
      </div>
      <div>
        <div className="text-sm p-2">
          <h2 className="font-bold text-3xl py-3">
            お久しぶりです。現地交流イベントを開催します。
          </h2>
          開催3回目となったin-facto
          meet-up。普段表に出ないin-factoのメンバーたちが集結。ゆかりのあるゲストとともに2025年の作品を振り返ります。
          <br />
          ここでしか聞けない裏話や、初出し映像、あります。
          <br />
          交流が得意な方も、不得意な方にもお楽しみいただけるイベントです。
          <div className="my-3">
            日時：
            <span className="font-bold">
              2026年1月10日(土) 18:00スタート{" "}
            </span>{" "}
            17:30受付開始
            <br />
            場所：
            <span className="font-bold">
              <a href="https://welcomecine.com" className="underline">
                路地裏文化会館 C/NE (シーネ)
              </a>
            </span>
            <br />
            参加費：<span className="font-bold">2000円</span>{" "}
            フリーフード・ドリンク付き
          </div>
        </div>

        <div className="mt-4 flex items-center self-center mx-auto w-full">
          <div className=" mx-auto ">
            <a
              href="https://coubic.com/ifm/1147026/book/event_type/detail?express=true"
              className="inline-block text-md font-bold rounded-sm border border-slate-300 p-4"
            >
              ご予約はこちら
            </a>
          </div>
        </div>

        <div className="text-sm p-2 mt-10">
          <h2 className="font-bold text-3xl py-3">
            もっとin-factoを楽しめるコンテンツ。
          </h2>
          <div className="mt-10">
            <Content title="§ ゲストと語る近年の ”ジャンプスケア” 論">
              近年日本のホラーはにわかに盛り上がりを見せていますが、ジャンプスケアという表現技法はあえて避けられているように思います。
              <br />
              ジャンプスケアの忌避感やその本質についてin-factoチームとゲストで議論します。
              <div className="flex my-5">
                <div>
                  <img src="muramatsu.jpg" className="max-w-48" />
                </div>
                <div className="px-2">
                  <h4 className="font-bold text-md">ゲスト：村松和輝</h4>
                  <div className="text-xs mt-3">
                    神奈川県出身。「釣りバカ日誌14」「DEATH
                    NOTE」からキャリアをスタート。映画を中心に出演作はメジャー・インディーズに関わらず100本を超える。
                    <br />
                    in-facto作品では「5movies」「プレゼント」に参加。
                  </div>
                </div>
              </div>
            </Content>
          </div>

          <div className="mt-10">
            <Content title="§ in-facto チームによる “in-facto シーズン3” 種明かし">
              2025年はシーズン３と題して、今までとは異なる作り方をしてきました。この作り方の詳細を、良かった点や苦しんだ点まですべてお話します。
            </Content>
          </div>

          <div className="mt-10">
            <Content title="§ シーズン３人気作上映">
              in-facto
              シーズン3の人気作を上映します。現地ならではの空気を感じながら、あらためてin-factoの作品を見直してみませんか。
            </Content>

            <div className="my-5 px-1">
              <div className="iframeOuter">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/FNUgobx2aOI?si=Av_NuBM0CuuipK0-"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Content title="§ 懇親タイム">
              軽食、ドリンク（アルコール・ソフトドリンク）とともに、in-facto
              メンバーやゲストとの歓談を楽しめます。我々は懇親会はあまり得意ではありませんし、不得意な方はお食事とドリンクのみを楽しんでいただくことも可能です。
            </Content>
          </div>
        </div>

        <div className="text-sm p-2 mt-10">
          <div className="text-center">
            <div className="text-center font-bold mb-10">◆◆◆</div>
            meetupの参加にはご予約が必要です。
            <div className="mt-4 flex items-center self-center mx-auto w-full">
              <div className="mx-auto mt-4">
                <a
                  href="https://coubic.com/ifm/1147026/book/event_type/detail?express=true"
                  className="inline-block text-md font-bold rounded-sm border border-slate-300 p-4"
                >
                  ご予約はこちら
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm p-2 mt-10">
          <h2 className="font-bold text-3xl py-3">
            アンチハラスメントポリシー
          </h2>
          <div className="mt-4">
            我々はすべての方々の人権と尊厳を尊重し、あらゆる形態のハラスメントを許容しません。ハラスメントを受けた場合、見かけた場合、もしくはハラスメントかどうかの判断に迷った場合は運営に
            <a
              className="underline"
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7FGGsDNHsShnDhsiGV_VsTxxEncPAYZ1SR3JSK29oj4f6-Q/viewform"
            >
              お問い合わせください。
            </a>
          </div>
        </div>
      </div>

      <div className="items-center justify-center mt-10">
        <Link href="/">
          <img
            src={"/in-facto-white.png"}
            alt={"in-facto"}
            className={"max-w-[80px] mx-auto"}
          />
        </Link>
      </div>
    </div>
  );
};

const Content = (props: { title: string; children: React.ReactNode }) => {
  return (
    <div>
      <h3 className="font-bold text-xl my-4">{props.title}</h3>
      {props.children}
    </div>
  );
};
