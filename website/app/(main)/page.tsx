import type { Metadata, NextPage } from "next";
import { A } from "./components/A";
import { generateSharedMetadata } from "../../lib/generateSharedMetadata";
import Link from "next/link";
import YouTube from "react-youtube";
import { Component } from "./top";
// import { getAllVideos } from "../../lib/api";

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto",
  isRoot: true,
});

const Page: NextPage = () => {
  return (
    <div className="">
      <Component />
    </div>
  );
};

export default Page;
