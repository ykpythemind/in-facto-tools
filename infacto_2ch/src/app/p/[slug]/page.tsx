import { SlowImage } from "./SlowImage";

const Page = ({ params }: { params: { slug: string } }) => {
  let src = "";
  src = `/${params.slug}`;

  return (
    <div
      style={{ backgroundColor: "black", minHeight: "100vh" }}
      className="flex items-center justify-center"
    >
      <div className="max-w-[60%]">
        <SlowImage src={src} delay={100} />
      </div>
    </div>
  );
};

export default Page;
