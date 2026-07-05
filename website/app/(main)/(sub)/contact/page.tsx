import { PageTitle } from "../../components/PageTitle";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";

const contactUrl = "https://forms.gle/vBwXbBzrsnfGx3qT9";

function Page() {
  return (
    <div>
      <PageTitle title={"お問い合わせ"} />

      <p className="mt-10 text-[16px] leading-[2]">
        お問い合わせは以下のフォームからお願いします。通常3,4日以内に返信いたします。
      </p>

      <div className="mt-10">
        <a
          href={contactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto block w-[88%] rounded-full border border-black py-4 text-center text-[17px] tracking-[0.2em] [text-indent:0.2em] transition-colors hover:bg-black hover:text-white"
        >
          お問い合わせフォーム
        </a>
      </div>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "問い合わせ" });

export default Page;
