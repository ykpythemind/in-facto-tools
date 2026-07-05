import { PageTitle } from "../../components/PageTitle";
import { MemberCard } from "../../components/MemberCard";
import { Metadata } from "next";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";
import { members } from "../../../../lib/members";

const Page = () => {
  return (
    <div>
      <PageTitle title={"チーム"} />

      <p className="mt-10 text-[16px] leading-[2]">
        「おもしろいホラーをつくる」をコンセプトに、2022年から映像制作チームin-factoとして活動中。
      </p>

      <div className="mt-8 flex flex-col items-start gap-2.5">
        <a
          href="https://x.com/in_facto_jp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black px-4 py-1.5 text-[15px] text-white"
        >
          @in_facto_jp
        </a>
        <a
          href="https://www.youtube.com/@in-facto"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-black bg-white px-4 py-1.5 text-[15px]"
        >
          Youtube Channel
        </a>
      </div>

      <div className="mt-8 divide-y divide-neutral-800">
        {members.map((m) => (
          <div key={m.name} className="py-12">
            <MemberCard member={m} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const metadata: Metadata = generateSharedMetadata({
  title: "チームについて",
});

export default Page;
