import { A } from "../../components/A";
import { PageTitle } from "../../components/PageTitle";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";

function Page() {
  return (
    <div>
      <PageTitle title={"アーカイブ"} />

      <ul className="mt-10 flex flex-col gap-5 text-[16px] leading-[1.9]">
        <li>
          <A
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.umdc-test.net/"
          >
            第四境界×都市伝説解体センター『都市伝説解体・センター試験』
          </A>
          <span className="ml-2 text-sm text-gray-400">作中動画制作</span>
          <span className="ml-2 text-sm text-gray-400">2026/03</span>
        </li>
        <li>
          <A href="/meetup3">in-facto meet-up vol.3</A>
          <span className="ml-2 text-sm text-gray-400">2026/01/10</span>
        </li>
        <li>
          <A
            target="_blank"
            rel="noopener noreferrer"
            href="https://event.daiyonkyokai.net/tokyoshinshoku2025/"
          >
            第四境界『東京侵蝕2025』事故物件鑑定士試験
          </A>
          <span className="ml-2 text-sm text-gray-400">作中動画制作</span>
          <span className="ml-2 text-sm text-gray-400">2025/04</span>
        </li>
        <li>
          <A
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/presentation/d/1J7sBjifq_ZmhktXqs2VEih5ouVxa7I3upSLh-8StGpc/edit#slide=id.p"
          >
            in-facto meet-up vol.2 Closing Talk 資料
          </A>
          <span className="ml-2 text-sm text-gray-400">2024/12/14</span>
        </li>
        <li>
          <A href="/meetup2">in-facto meet-up vol.2</A>
          <span className="ml-2 text-sm text-gray-400">2024/12/14</span>
        </li>
        <li>
          <A href="/meetup1">in-facto meet-up vol.1</A>
          <span className="ml-2 text-sm text-gray-400">2023/10/14</span>
        </li>
      </ul>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "アーカイブ" });

export default Page;
