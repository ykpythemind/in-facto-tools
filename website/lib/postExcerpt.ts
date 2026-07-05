// 記事本文(markdown)からトップページ表示用の情報を取り出す

import { members } from "./members";

// タイムスタンプなしの話者行 (メンバー名の単独行) 判定用
const speakerNames = new Set(members.map((m) => m.name));

// 最初のh2見出し (トークのテーマ) を取得する
export function extractFirstH2(content: string): string | null {
  const m = content.match(/^##\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

// 見出し・ディレクティブを除いた本文の冒頭を抜粋する
// 「話者 タイムスタンプ」の行は話者名だけ残し、発言を 名前「…」 の形にする
// 2〜3発言めの途中で「…」と切れるくらいの長さにする
export function extractExcerpt(content: string, maxLength = 130): string {
  let text = "";
  let inQuote = false;
  let cutAtSpeaker = false;

  for (const line of content.split("\n")) {
    let t = line.trim();
    if (!t) continue;
    if (t.startsWith("#")) continue;
    if (t.startsWith(":")) continue; // :image: / :caption: など
    if (t.startsWith("<")) continue; // iframeなどのhtml
    if (t.startsWith("//")) continue; // コメント行
    if (t.startsWith("**⚠")) continue; // ネタバレ注意書き

    const speakerWithTime = t.match(/^(\S+(?:\s+\S+)?)\s+\d{1,2}:\d{2}$/);
    const speakerName = speakerWithTime
      ? speakerWithTime[1]
      : speakerNames.has(t)
      ? t
      : null;
    if (speakerName) {
      if (inQuote) text += "」";
      // 話者名だけで切れてしまう場合のみ、直前の発言までで打ち切る
      if (text && text.length + speakerName.length + 15 > maxLength) {
        cutAtSpeaker = true;
        break;
      }
      text += `${text ? "　" : ""}${speakerName}「`;
      inQuote = true;
      continue;
    }

    t = t
      .replace(/<[^>]*>/g, "") // インラインのhtmlタグ
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"); // markdownリンクはテキストのみ残す
    if (!t) continue;

    text += t;
    if (text.length >= maxLength) break;
  }

  const truncated = text.length > maxLength;
  if (truncated) {
    text = text.slice(0, maxLength) + "…";
  }

  // 開きっぱなしの「」を末尾で閉じる
  const opens = (text.match(/「/g) ?? []).length;
  const closes = (text.match(/」/g) ?? []).length;
  if (opens > closes) {
    text += "」";
  }

  // 発言の手前で打ち切った場合も続きがあることを示す
  if (cutAtSpeaker) {
    text += "…";
  }

  return text;
}
