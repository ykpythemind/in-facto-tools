import type { Metadata, NextPage } from "next";
import { generateSharedMetadata } from "../../../lib/generateSharedMetadata";
import { Main } from "./main";

export const metadata: Metadata = generateSharedMetadata({
  title: "in-facto meet-up vol.3",
});

const Page: NextPage = () => {
  return <Main />;
};

export default Page;
