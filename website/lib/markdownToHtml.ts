import remarkParse from "remark-parse";
import { unified } from "unified";
import remark2rehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  let rm = unified()
    .use(remarkParse) // markdown -> mdast の変換

  const wip = rm.use(remark2rehype, { allowDangerousHtml: true }) // mdast -> hast の変換
    .use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] })
    .use(rehypeStringify, { allowDangerousHtml: true }) // hast -> html の変換

  const result = await wip.process(markdown);

  return result.toString();
}

export async function partialMarkdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remark2rehype, { allowDangerousHtml: true }) // mdast -> hast の変換
    .use(rehypeExternalLinks, { target: "_blank", rel: ["nofollow"] })
    .use(rehypeStringify, { allowDangerousHtml: true }) // hast -> html の変換
    .process(markdown);

  return result.toString();
}
