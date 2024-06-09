import { expect, test } from "vitest";
import { googleDoc2Md } from "./googleDoc2Md";
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
