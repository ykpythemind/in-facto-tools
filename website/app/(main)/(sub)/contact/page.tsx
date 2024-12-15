import { A } from "../../components/A";
import { PageTitle } from "../../components/PageTitle";
import { generateSharedMetadata } from "../../../../lib/generateSharedMetadata";

const contactUrl = "https://forms.gle/vBwXbBzrsnfGx3qT9";

function Page() {
  return (
    <div>
      <PageTitle title={"問い合わせ"} />

      <div className="mt-6">
        お問い合わせは{" "}
        <A href={contactUrl} target="_blank" rel="noopener noreferrer">
          こちら
        </A>{" "}
        からお願いします。通常3,4日以内に返信いたします。
      </div>
    </div>
  );
}

export const metadata = generateSharedMetadata({ title: "問い合わせ" });

export default Page;
