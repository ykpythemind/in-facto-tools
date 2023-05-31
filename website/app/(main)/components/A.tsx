"use client";

import clsx from "clsx";
import type { Route } from "next";
import Link from "next/link";
import { ComponentProps, forwardRef } from "react";

type PropsType = {
  href: string; //Route | URL;
  isInlineFlex?: boolean;
  target?: ComponentProps<typeof Link>["target"];
  rel?: ComponentProps<typeof Link>["rel"];
};

export const A = (props: PropsType & { children: React.ReactNode }) => {
  const { children, href, target, rel, isInlineFlex = false } = props;

  return (
    <Link
      href={href ?? ""}
      target={target}
      rel={rel}
      className={clsx(
        "underline hover:text-blue-400 text-sm md:text-md",
        isInlineFlex && "inline-flex"
      )}
    >
      {children}
    </Link>
  );
};
