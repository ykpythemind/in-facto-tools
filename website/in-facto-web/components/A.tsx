import { forwardRef } from "react";

export const A = forwardRef(function _A(
  props: JSX.IntrinsicElements["a"] & { children: React.ReactNode },
  ref
) {
  const { children, ...rest } = props;

  return (
    <a
      {...rest}
      // @ts-expect-error // FIXME
      ref={ref}
      className={"underline hover:text-blue-400 text-sm md:text-md"}
    >
      {children}
    </a>
  );
});
