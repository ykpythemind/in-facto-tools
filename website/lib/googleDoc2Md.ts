import { partialMarkdownToHtml } from "./markdownToHtml";

/* google docsで書いたオレオレmarkdown formatを正式なmarkdownにしつつ装飾する */
export const googleDoc2Md = async (
  doc: string,
  assetPrefix: string
): Promise<string> => {
  const lines = doc.split(/\r\n|\n/);
  const gen = new MarkdownGenerator(lines, assetPrefix);

  return gen.generate();
};

class MarkdownGenerator {
  private result: string[] = [];
  private pointer: number = 0;
  private originalLines: string[];
  private annotationCounter: number;
  private annotationMarkCounter: number;
  private assetPrefix: string;

  constructor(originalLines: string[], assetPrefix: string) {
    this.result = [];
    this.pointer = 0;
    this.annotationCounter = 1;
    this.annotationMarkCounter = 1;
    this.assetPrefix = assetPrefix;

    this.originalLines = originalLines;
  }

  public appendLine(line: string): void {
    this.result.push(line);
  }

  public currentLine() {
    return this.originalLines[this.pointer] ?? null;
  }

  public nextLine() {
    this.pointer = this.pointer + 1;
  }

  public async generate(): Promise<string> {
    while (this.originalLines.length > this.pointer) {
      if (this.currentLine() && this.currentLine().trim() === "") {
        this.appendLine("");
        this.nextLine();
        continue;
      }

      // 独自の注釈
      if (this.currentLine().startsWith("<<*>>")) {
        const rest = this.currentLine().slice(5).trim();
        this.appendLine('<div class="postAnnotation">');
        this.appendLine(
          await partialMarkdownToHtml(
            `<span style="">※${this.annotationMarkCounter}</span> ${rest}`
          )
        );
        this.appendLine("</div>");
        this.annotationMarkCounter++;
        this.nextLine();
        continue;
      }

      if (this.currentLine().startsWith("//")) {
        this.nextLine();
        continue;
      }

      if (this.currentLine().startsWith("<iframe")) {
        this.appendLine(
          '<div class="postAroundIframe"><div class="postIframeOuter">'
        );

        this.result.push(this.originalLines[this.pointer]);
        this.nextLine();
        this.appendLine("</div>");

        const info = this.currentLine().match(/^:info: (.*)/);
        if (info && info[1]) {
          const infoText = info[1];
          this.nextLine();
          this.appendLine(
            `<div style="margin-top: 0.4rem; text-align: center;"><div class="postInfo">${infoText}</div></div>`
          );
        }

        this.appendLine("</div>"); // close postAroundIframe
        continue;
      }

      const match = this.currentLine().match(
        /^(トモヒロツジ|ykpythemind|藤本薪|osd)(.?)/
      );
      if (match && match[1]) {
        const person = match[1];
        this.appendLine(`<p class='postBodyComment'>`);
        const capt = `<span class='postBodyCommentPerson'><strong>${person}</strong></span> <span class='postBodyCommentBody'>`;
        this.appendLine(capt);

        let b = "";
        this.nextLine();

        a: {
          for (;;) {
            if (this.currentLine() && this.currentLine().trim() !== "") {
              const toAdd = this.currentLine().trim();
              b += toAdd;

              this.nextLine();
            } else {
              this.nextLine();
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
              `<span style="color: gray; font-size: 0.9rem; ">※${this.annotationCounter}</span>`
            );
            this.annotationCounter++;
          } else {
            break;
          }
        }

        this.appendLine(
          (await partialMarkdownToHtml(b))
            .replace("<p>", "")
            .replace("</p>", "")
        );

        this.appendLine(`</span></p>`);
        this.appendLine("");
        continue;
      }

      const info = this.currentLine().match(/^:info: (.*)/);
      if (info && info[1]) {
        const infoText = info[1];
        this.nextLine();

        this.appendLine(`<div class="postInfo">${infoText}</div>`);
        continue;
      }

      const match2 = this.currentLine().match(/^:image: (.*)/);
      if (match2 && match2[1]) {
        const path = match2[1];
        this.nextLine();

        let caption: string | null = null;
        let alt: string | null = null;

        while (this.currentLine() && this.currentLine().trim() !== "") {
          if (this.currentLine().startsWith(":caption:")) {
            caption = this.currentLine().slice(10);
          }

          if (this.currentLine().startsWith(":alt:")) {
            alt = this.currentLine().slice(6);
          }

          this.nextLine();
        }

        const al = alt || caption || "";
        const b = `<div class="postSubContentOuter">\n\n<img src="/post_assets/${this.assetPrefix}${path}" alt="${al}" />`;
        this.appendLine(b);

        if (caption) {
          this.appendLine(
            `<div class="postSubContentCaption">${caption}</div>`
          );
        }
        if (!alt && !caption) {
          throw "no alt or caption";
        }

        this.appendLine("</div>");

        this.nextLine();
        this.appendLine("");
        continue;
      }

      if (this.currentLine()) {
        this.appendLine(this.currentLine());
      }

      this.nextLine();
    }

    return this.result.join("\n");
  }
}
