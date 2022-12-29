import { forwardRef } from "react";

type FavProps = { isFav: boolean; onClick: () => void; disabled: boolean };

export const Fav = forwardRef<HTMLButtonElement, FavProps>((props, ref) => {
  const { isFav, onClick, disabled } = props;

  return (
    <button
      disabled={disabled}
      ref={ref}
      type={"button"}
      onClick={onClick}
      className={`${isFav ? "text-red-700" : "text-gray-700"} `}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
});
Fav.displayName = "Fav";
