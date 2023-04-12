import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Favicons } from "../components/Header/Favicons";
import { A } from "../components/A";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { AppSeo } from "../components/Header/AppSeo";
import { getAllPosts } from "../lib/api";

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPageWithLayout = () => {
  return (
    <div className={""}>
      <AppSeo path={"/"} title={"in-facto"} noTitleTemplate />

      <main
        className={
          "min-h-screen min-h-[100lvh] flex justify-center items-center"
        }
      >
        <div>
          <h1 className="">
            <img
              src={"/in-facto-black.png"}
              alt={"in-facto"}
              className={"max-w-[200px] md:max-w-md w-full"}
            />
          </h1>
          <div className="absolute">
            <div className="mt-5">
              {/* <Youtube color="#222" size={36} /> */}

              <ul className="flex flex-col space-y-1">
                <li>
                  <Link href={"/about"} passHref>
                    <A>About</A>
                  </Link>
                </li>
                <li>
                  <A
                    href="https://www.youtube.com/@in-facto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Youtube
                  </A>
                </li>
                <li>
                  <A href={"/posts"}>Posts</A>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/*
// トップに最新の記事を表示するやつ　
export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "content"]);

  const latestPost = allPosts[0]!;

  return {
    props: { latestPost },
  };
};

      <div className="absolute w-full flex items-center">
        <div className="max-w-md w-4/5 md:max-w-lg mx-auto border-gray-200 border-2 p-2 rounded-md mt-16">
          <div>
            <div className="flex">
              <div className="text-sm">最新の記事</div>
              <div className="text-sm ml-auto">2022/10/2</div>
            </div>
            <div className="">
              <Link href={"/posts"} passHref>
                <A>{latestPost.title}</A>
              </Link>
            </div>
          </div>
        </div>
      </div>

      */

Page.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Page;
