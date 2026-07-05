export const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="pt-4">
      <h2 className="text-center text-[26px] font-bold tracking-[0.3em] [text-indent:0.3em]">
        {title}
      </h2>
      <div className="mt-7 border-t border-neutral-800" />
    </div>
  );
};
