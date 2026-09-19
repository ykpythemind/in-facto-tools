import { expect, test } from "vitest";
import { googleDoc2Md } from "./googleDoc2Md";
import markdownToHtml from "./markdownToHtml";
import * as fs from "fs";

const doc = `
---
title: in-facto始動と「いんのこ」について
date: '2022-10-09T10:00:00.000+09:00'
youtube: z2eawA8HnyU
---

## h2

トモヒロツジ aaaa
こんばんわ。
あれがたいへんでしたね <<*>>

<<*>> これは注釈です。

ykpythemind
こんばんわ。[Google](https://www.google.com)

// これはコメントです

osd
test <<*>>

<<*>> これは注釈2です。

<iframe src="https://www.youtube.com/embed/z2eawA8HnyU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## h2

<iframe src="https://www.youtube.com/embed/z2eawA8HnyU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:info: これはinfoです

ykpythemind
テスト

:image: test.png
:caption: これは画像です

ykpythemind
テスト

`;

test("googleDoc2Md", async () => {
  const result = await googleDoc2Md(doc, "a/");

  console.debug("---result---");
  console.debug(result);
  expect(result).toBe(fs.readFileSync("lib/__test__/expect.md", "utf-8"));
});

test("hideタグを折りたたみ要素に変換する", async () => {
  const markdown = await googleDoc2Md(
    `<hide message=”ここから本編のネタバレです”>\n\nosd\n秘密です。\n\n</hide>`,
    "a/"
  );
  const result = await markdownToHtml(markdown);

  expect(result).toContain('<details class="postHidden">');
  expect(result).toContain(
    '<span class="postHiddenLabelClosed">本編のネタバレがあります</span><span class="postHiddenLabelOpen">ネタバレを表示しています</span>'
  );
  expect(result).toContain("秘密です。");
  expect(result).toContain("</details>");
  expect(result).not.toContain("<hide");
});

test("ラベルなしのhideタグにはデフォルト文言を表示する", async () => {
  const result = await googleDoc2Md("<hide>\n秘密です。\n</hide>", "a/");

  expect(result).toContain(
    '<span class="postHiddenLabelClosed">本編のネタバレがあります</span><span class="postHiddenLabelOpen">ネタバレを表示しています</span>'
  );
});

test("画像のcaption内をMarkdownとして変換する", async () => {
  const result = await googleDoc2Md(
    ":image: test.png\n:caption: **強調**と[リンク](https://example.com)\n",
    "a/"
  );

  expect(result).toContain(
    '<div class="postSubContentCaption"><strong>強調</strong>と<a href="https://example.com" target="_blank" rel="nofollow">リンク</a></div>'
  );
});
