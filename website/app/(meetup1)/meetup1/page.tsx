import type { Metadata, NextPage } from "next";
import { generateSharedMetadata } from "../../../lib/generateSharedMetadata";
import { useEffect } from "react";
import { C } from "./c";

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto meet-up 1",
});

const Page: NextPage = () => {
  return <C />;
};

export default Page;
