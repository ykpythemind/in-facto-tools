import { partialMarkdownToHtml } from "./markdownToHtml";

/* google docsで書いたオレオレmarkdown formatを正式なmarkdownにしつつ装飾する */
export const googleDoc2Md = async (
  doc: string,
  assetPrefix: string
): Promise<string> => {
  let annotationCounter = 1;
  let annotationMarkCounter = 1;

  const buf = new MarkdownBuffer();

  const lines = doc.split(/\r\n|\n/);

  while (lines.length > buf.pointer) {
    if (lines[buf.pointer] && lines[buf.pointer].trim() === "") {
      buf.appendLine("");
      buf.next();
      continue;
    }

    // 独自の注釈
    if (lines[buf.pointer].startsWith("<<*>>")) {
      const rest = lines[buf.pointer].slice(5).trim();
      buf.appendLine('<div class="postAnnotation">');
      buf.appendLine(
        await partialMarkdownToHtml(
          `<span style="">※${annotationMarkCounter}</span> ${rest}`
        )
      );
      buf.appendLine("</div>");
      annotationMarkCounter++;
      buf.next();
      continue;
    }

    if (lines[buf.pointer].startsWith("//")) {
      buf.next();
      continue;
    }

    if (lines[buf.pointer].startsWith("<iframe")) {
      buf.appendLine('<div class="iii"><div class="postIframeOuter">');
      buf.appendLine(lines[buf.pointer]);
      buf.appendLine("</div>");
      buf.next();

      const info = lines[buf.pointer].match(/^:info: (.*)/);
      if (info && info[1]) {
        const infoText = info[1];
        buf.next();
        buf.appendLine(
          `<div style="margin-top: 0.4rem; text-align: center;"><div class="postInfo">${infoText}</div></div>`
        );
      }

      buf.appendLine("</div>"); // close iii
      continue;
    }

    const match = lines[buf.pointer].match(
      /^(トモヒロツジ|ykpythemind|藤本薪|osd)(.?)/
    );
    if (match && match[1]) {
      const person = match[1];
      buf.appendLine(`<p class='postBodyComment'>`);
      const capt = `<span class='postBodyCommentPerson'><strong>${person}</strong></span> <span class='postBodyCommentBody'>`;
      buf.appendLine(capt);

      let b = "";
      buf.next();

      a: {
        for (;;) {
          if (lines[buf.pointer] && lines[buf.pointer].trim() !== "") {
            const toAdd = lines[buf.pointer].trim();
            b += toAdd;

            buf.next();
          } else {
            buf.next();
            break a;
          }
        }
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

      buf.appendLine(`</span></p>`);
      buf.appendLine("");
      continue;
    }

    const info = lines[buf.pointer].match(/^:info: (.*)/);
    if (info && info[1]) {
      const infoText = info[1];
      buf.next();

      buf.appendLine(`<div class="postInfo">${infoText}</div>`);
      continue;
    }

    const match2 = lines[buf.pointer].match(/^:image: (.*)/);
    if (match2 && match2[1]) {
      const path = match2[1];
      buf.next();

      let caption: string | null = null;
      let alt: string | null = null;

      while (lines[buf.pointer] && lines[buf.pointer].trim() !== "") {
        if (lines[buf.pointer].startsWith(":caption:")) {
          caption = lines[buf.pointer].slice(10);
        }

        if (lines[buf.pointer].startsWith(":alt:")) {
          alt = lines[buf.pointer].slice(6);
        }

        buf.next();
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

      buf.next();
      buf.appendLine("");
      continue;
    }

    const toAdd = lines[buf.pointer];
    if (toAdd) {
      if (toAdd.startsWith("トモ")) {
        console.log("aaaaaaaaaaaaaaaa");
        console.log("pointer", buf.pointer);
        console.log(
          "lines",
          lines[buf.pointer - 1],
          "/",
          lines[buf.pointer],
          "/",
          lines[buf.pointer + 1]
        );
      }
      buf.appendLine(toAdd);
    }

    buf.next();
  }

  return buf.toString();
};

class MarkdownBuffer {
  private buffer: string[] = [];
  public pointer: number = 0;

  public appendLine(line: string): void {
    this.buffer.push(line);
  }

  public next() {
    this.pointer = this.pointer + 1;
  }

  public toString(): string {
    return this.buffer.join("\n");
  }
}
