import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { isPreviewEnv } from "./env";
import { isAfter, isBefore } from "date-fns";
import * as csv from "csv-parse/sync";
import { notFound } from "next/navigation";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const isExists = fs.existsSync(fullPath);
  if (!isExists) {
    notFound();
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  let posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  // // NEXT_PUBLIC_IS_PREVIEW=trueのときは、公開日が未来の記事も表示する
  // if (!isPreviewEnv) {
  //   const now = new Date();
  //   posts = posts.filter((post) => {
  //     return isBefore(new Date(post.date), now);
  //   });
  // }

  return posts;
}

export function getAllVideos(fields: string[] = []) {
  const options = { columns: true };
  const content = fs.readFileSync(join(process.cwd(), `video.csv`)).toString();
  const records = csv.parse(content, options);
  const videos = records.reverse();

  // console.log(records);

  // // NEXT_PUBLIC_IS_PREVIEW=trueのときは、公開日が未来の記事も表示する
  // if (!isPreviewEnv) {
  //   const now = new Date();
  //   posts = posts.filter((post) => {
  //     return isBefore(new Date(post.date), now);
  //   });
  // }

  return videos;
}
