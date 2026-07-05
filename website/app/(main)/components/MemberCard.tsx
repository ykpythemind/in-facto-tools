import { Member } from "../../../lib/members";

export const MemberCard = ({ member: m }: { member: Member }) => {
  // "好きなホラー映画「…」" をラベルと作品名の2行に分ける
  const horrorBody = m.horror.replace(/^好きなホラー映画\s*/, "");

  return (
    <div>
      <div className="mx-auto w-1/2 max-w-[240px]">
        <img src={m.imgSrc} alt={m.name} className="w-full object-cover" />
      </div>
      <div className="mt-8 text-[22px] font-bold">{m.name}</div>
      <div className="mt-3 text-[16px] leading-[1.9]">{m.description}</div>
      <div className="mt-4 text-[16px] italic leading-[1.9]">
        好きなホラー映画
        <br />
        {horrorBody}
      </div>
      {m.twitter && (
        <div className="mt-5">
          <a
            href={`https://x.com/${m.twitter}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-neutral-900 px-3 py-1.5 text-[15px] text-white"
          >
            https://x.com/{m.twitter}
          </a>
        </div>
      )}
    </div>
  );
};
