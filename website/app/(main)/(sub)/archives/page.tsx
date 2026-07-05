import { A } from "../../components/A";
import { PageTitle } from "../../components/PageTitle";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";

function Page() {
  return (
    <div>
      <PageTitle title={"アーカイブ"} />

      <ul className="mt-10 flex flex-col gap-5 text-[16px] leading-[1.9]">
        <li>
          <A href="/meetup3">in-facto meet-up vol.3</A>
        </li>
        <li>
          <A
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/presentation/d/1J7sBjifq_ZmhktXqs2VEih5ouVxa7I3upSLh-8StGpc/edit#slide=id.p"
          >
            in-facto meet-up vol.2 Closing Talk 資料
          </A>
        </li>
        <li>
          <A href="/meetup2">in-facto meet-up vol.2</A>
        </li>
        <li>
          <A href="/meetup1">in-facto meet-up vol.1</A>
        </li>
      </ul>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "アーカイブ" });

export default Page;
