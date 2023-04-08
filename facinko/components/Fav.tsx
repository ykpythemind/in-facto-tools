import { forwardRef } from "react";

type FavProps = { fav: number; onClick: () => void };

export const Fav = forwardRef<HTMLButtonElement, FavProps>((props, ref) => {
  const { fav, onClick } = props;

  const isFav = fav > 0;

  const favs: Array<React.ReactNode> = [];

  let favtext = "♡";
  if (isFav) {
    favtext = "";
    for (let i = 0; i < fav; i++) {
      favtext += "♥";
    }
  }

  for (let i = 0; i < 3; i++) {
    if (i < fav) {
      favs.push(<span className="text-red-700">♥</span>);
    } else {
      favs.push(<span className="text-gray-700">♡</span>);
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
    >
      {favs.reverse().map((f, i) => (
        <span key={i}>{f}</span>
      ))}
    </button>
  );
});
Fav.displayName = "Fav";
