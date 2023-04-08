import { forwardRef } from "react";

export type ButtonProps = {
  text: string;
  onClick: () => void;
  hasPadding?: boolean;
  isPrimary?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, text, hasPadding = false, isPrimary = false }, ref) => {
    return (
      <button
        className={`w-full border-gray-200 border-[1px] rounded-xl py-3 ${
          isPrimary && "font-bold"
        }`}
        ref={ref}
        onClick={onClick}
        type="button"
      >
        {text}
      </button>
    );
  }
);
Button.displayName = "Button";
