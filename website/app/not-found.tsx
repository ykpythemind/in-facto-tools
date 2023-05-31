import { Metadata } from "next";
import Link from "next/link";

const Page = () => {
  return (
    <div className="text-center mt-11">
      <h3 className="text-lg">404 Not Found</h3>
      <div className="text-sm">ページが見つかりません</div>
      <div className="mt-5 text-sm">
        <Link href="/">in-facto.jp</Link>
      </div>
    </div>
  );
};

export const metadata: Metadata = { title: "404 - in-facto" };

export default Page;
