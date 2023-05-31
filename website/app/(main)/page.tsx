import type { Metadata, NextPage } from "next";
import { A } from "./components/A";
// import { ReactElement } from "react";
// import { AppSeo } from "./components/Header/AppSeo";
// import { getAllPosts } from "../lib/api";

// type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const metadata: Metadata = {
  title: { absolute: "in-facto" },
};

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
      </main>
    </div>
  );
};

export default Page;
