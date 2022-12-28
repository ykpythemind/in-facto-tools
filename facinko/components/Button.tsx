import { forwardRef } from "react";

export type ButtonProps = { text: string; onClick: () => void };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, text }, ref) => {
    return (
      <button
        className="w-full border-gray-200 border-[1px] rounded-xl py-3"
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
