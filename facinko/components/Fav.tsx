import { forwardRef } from "react";

type FavProps = { fav: number; onClick: () => void };

export const Fav = forwardRef<HTMLButtonElement, FavProps>((props, ref) => {
  const { fav, onClick } = props;

  const isFav = fav > 0;

  let favtext = "♡";
  if (isFav) {
    favtext = "";
    for (let i = 0; i < fav; i++) {
      favtext += "♥";
    }
  }

  return (
    <button
      ref={ref}
      type={"button"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("burn");
        onClick();
      }}
      className={`${isFav ? "text-red-700" : "text-gray-700"} `}
    >
      {favtext}
    </button>
  );
});
Fav.displayName = "Fav";
