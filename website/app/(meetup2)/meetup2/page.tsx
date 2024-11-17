import type { Metadata, NextPage } from "next";
import { generateSharedMetadata } from "../../../lib/generateSharedMetadata";
import { useEffect } from "react";
import { Main } from "./main";

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto meet-up vol.2",
});

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
