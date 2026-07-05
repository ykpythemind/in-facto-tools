import Link from "next/link";

// ピル型の遷移ボタン (トップの「全ての映像」などで使う)
export const MoreButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-10 text-center">
      <Link
        href={href}
        className="mx-auto block w-[88%] rounded-full border border-black py-4 text-[17px] tracking-[0.2em] [text-indent:0.2em] transition-colors hover:bg-black hover:text-white"
      >
        {children}
      </Link>
    </div>
  );
};
