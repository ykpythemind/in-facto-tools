import { Redirect } from "./redirect";

const siteUrl =
  "https://coubic.com/ifm/3262180/book/event_type/detail?express=true";

const Page = () => {
  return (
    <div className="text-center my-5">
      <Redirect url={siteUrl} />
      <a href={siteUrl}>予約申込みはこちら</a>
    </div>
  );
};

export default Page;
