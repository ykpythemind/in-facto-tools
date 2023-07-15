const IMAGE_URL: { [key: string]: string } = {
  j34LIHJio89fek: "7Ku9ulij8hj8.jpg",
  jLljfd889hO9kl: "jHkiI98U7ji3.jpg",
  o897sjhsiyOIYs: "ajdhUh34rFDD.jpg",
};

export default function ThreadColumn(props: {
  slug: string;
  no: number;
  date: string;
  time1: string;
  time2: string;
  name: string;
  body: string;
}) {
  const { slug, no, date, time1, time2, name, body } = props;

  return (
    <dl>
      <dt className="bg-slate-100 border-double border-t-2 border-b-2">
        {no} 名前：名無しさんゆっくりしていってね@真chan 日付 {date} {time1}
        {time2} ID {name}
      </dt>
      <dd className="mb-4 whitespace-pre-wrap">
        {body === "怪しげな画像が貼られる" ? (
          <a href={"/" + IMAGE_URL[slug]} target="_blank">
            {IMAGE_URL[slug]}
          </a>
        ) : (
          body
        )}
      </dd>
    </dl>
  );
}
