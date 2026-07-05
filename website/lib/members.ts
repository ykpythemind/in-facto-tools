export type Member = {
  name: string;
  imgSrc: string;
  twitter?: string;
  description: string;
  horror: string;
};

export const members: Member[] = [
  {
    name: "トモヒロツジ",
    imgSrc: "/members/tomo_at2_mini.jpg",
    description:
      "ウェブディレクター。ディスクレビューサイトcllctv.の運営を行いつつ、たまにライブイベントを開催。主に演出と脚本、小道具を担当。",
    twitter: "Tomo_at",
    horror: "好きなホラー映画「輪廻」「怪談新耳袋 劇場版 幽霊マンション」",
  },
  {
    name: "ykpythemind",
    imgSrc: "/members/ykpythemind2.png",
    description:
      "in-factoを設立し、代表を務める。撮影・編集・音声を担当。別プロジェクトで猫を堕ろすなどの音楽活動も。",
    twitter: "ykpythemind",
    horror: "好きなホラー映画「グレイヴ・エンカウンターズ」「ノロイ」",
  },
  {
    name: "藤本薪",
    imgSrc: "/members/fujiphone.jpg",
    description: "新しいものがすき。音楽や小説を作る。主に出演と脚本を担当。",
    twitter: "fujiphone",
    horror: "好きなホラー映画「貞子VS伽耶子」「スペル」",
  },
  {
    name: "osd",
    imgSrc: "https://github.com/osd-02.png",
    description:
      "ソフトウェアエンジニア。podcast番組 undrcastを配信。わからないものをこねくりまわすことが得意。",
    twitter: "osd-02",
    horror: "好きなホラー映画 「来る。」 「呪詛」",
  },
];
