import Link from "next/link";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { contactUrl, SubPageLayout } from "../components/layouts/SubPageLayout";
import { A } from "../components/A";
import Head from "next/head";

const Page: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>404 - in-facto</title>
      </Head>
      <h3 className="text-lg">404 Not Found</h3>
      <div className="text-sm">ページが見つかりません</div>
      <div className="mt-5 text-sm">
        <A href="/">in-facto.jp</A>
      </div>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <SubPageLayout>{page}</SubPageLayout>;
};

export default Page;
