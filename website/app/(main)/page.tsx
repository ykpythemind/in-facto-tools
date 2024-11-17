import type { Metadata, NextPage } from "next";
import { A } from "./components/A";
import { generateSharedMetadata } from "../../lib/generateSharedMetadata";
import Link from "next/link";
// import { ReactElement } from "react";
// import { AppSeo } from "./components/Header/AppSeo";
// import { getAllPosts } from "../lib/api";

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto",
  isRoot: true,
});

const Page: NextPage = () => {
  return (
    <div className={""}>
      <main
        className={"min-h-[100lvh] flex justify-center items-center flex-col"}
      >
        <img
          src={"/in-facto-black.png"}
          alt={"in-facto"}
          className={"max-w-[200px] md:max-w-md w-full"}
        />
        <div className="mt-5 max-w-[200px] md:max-w-md w-full">
          {/* <Youtube color="#222" size={36} /> */}
          <ul className="flex flex-col space-y-1">
            <li>
              <A href={"/about"}>About</A>
            </li>
            <li>
              <A href={"/videos"}>Videos</A>
            </li>
            <li>
              <A href={"/posts"}>Posts</A>
            </li>
          </ul>

          <div className="mt-5">
            <div className="inline-block bg-red-600 px-2">
              <Link href={"/meetup2"} className="text-white">
                in-facto meetup vol.2開催
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
