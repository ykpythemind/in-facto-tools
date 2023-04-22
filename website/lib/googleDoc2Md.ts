import { buffer } from "stream/consumers";
import { partialMarkdownToHtml } from "./markdownToHtml";

/* google docsで書いたオレオレmarkdown formatを正式なmarkdownにしつつ装飾する */
export const googleDoc2Md = async (
  doc: string,
  assetPrefix: string
): Promise<string> => {
  let pointer = 0;
  let annotationCounter = 1;
  let annotationMarkCounter = 1;

  const buf = new MarkdownBuffer();

  const lines = doc.split(/\r\n|\n/);

  while (lines.length > pointer) {
    let line = lines[pointer].trim();

    // 独自の注釈
    if (line.startsWith("<<*>>")) {
      const rest = line.slice(5);
      buf.appendLine('<div class="postAnnotation">');
      buf.appendLine(
        await partialMarkdownToHtml(
          `<span style="">※${annotationMarkCounter}</span> ${rest}`
        )
      );
      buf.appendLine("</div>");
      annotationMarkCounter++;
      pointer++;
      continue;
    }

    if (line.startsWith(":title:") || line.startsWith("//")) {
      pointer++;
      continue;
    }

    if (line.startsWith("<iframe")) {
      buf.appendLine('<div class="postIframeOuter">');
      buf.appendLine(line);
      buf.appendLine("</div>");
      pointer++;
      continue;
    }

    const match = line.match(/^(トモヒロツジ|ykpythemind|藤本薪|osd)(.?)/);
    if (match && match[1]) {
      const person = match[1];
      pointer++;

      buf.appendLine(`<p class='postBodyComment'>`);
      const capt = `<span class='postBodyCommentPerson'><strong>${person}</strong></span> <span class='postBodyCommentBody'>`;
      buf.appendLine(capt);

      let b = "";

      let nextLine = lines[pointer];
      while (nextLine && nextLine.trim() !== "") {
        b += nextLine;

        pointer++;
        nextLine = lines[pointer];
      }

      // 文中の注釈に色付け
      for (;;) {
        const r = b.match(/<<\*>>/);
        if (r && r.length > 0) {
          b = b.replace(
            "<<*>>",
            `<span style="color: gray; font-size: 0.9rem; ">※${annotationCounter}</span>`
          );
          annotationCounter++;
        } else {
          break;
        }
      }

      buf.appendLine(
        (await partialMarkdownToHtml(b)).replace("<p>", "").replace("</p>", "")
      );

      pointer++;
      buf.appendLine(`</span></p>`);
      buf.appendLine("");
      continue;
    }

    const match2 = line.match(/^:image: (.*)/);
    if (match2 && match2[1]) {
      const path = match2[1];
      pointer++;

      let caption: string | null = null;
      let alt: string | null = null;

      let nextLine = lines[pointer];

      while (nextLine && nextLine.trim() !== "") {
        if (nextLine.startsWith(":caption:")) {
          caption = nextLine.slice(10);
        }

        if (nextLine.startsWith(":alt:")) {
          alt = nextLine.slice(6);
        }

        pointer++;
        nextLine = lines[pointer];
      }

      const al = alt || caption || "";
      const b = `<div class="postSubContentOuter">\n\n<img src="/post_assets/${assetPrefix}${path}" alt="${al}" />`;
      buf.appendLine(b);

      if (caption) {
        buf.appendLine(`<div class="postSubContentCaption">${caption}</div>`);
      }
      if (!alt && !caption) {
        throw "no alt or caption";
      }

      buf.appendLine("</div>");

      pointer++;
      buf.appendLine("");
      continue;
    }

    pointer++;
    buf.appendLine(line);
  }

  return buf.toString();
};

class MarkdownBuffer {
  private buffer: string[] = [];

  public appendLine(line: string): void {
    this.buffer.push(line);
  }

  public toString(): string {
    return this.buffer.join("\n");
  }
}
