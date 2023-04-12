import { expect, test } from "@jest/globals";
import { googleDoc2Md } from "../lib/googleDoc2Md";
import * as fs from "fs";

test("googleDoc2Md", () => {
  const doc = fs.readFileSync("_posts/beginning_of_in_facto.md", "utf-8");
  console.info(googleDoc2Md(doc, "a/"));
});
