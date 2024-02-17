"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";
import { A } from "../components/A";
import { Transition } from "react-transition-group";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactElement }) => {
  // const { ref, inView, entry } = useInView({
  //   fallbackInView: true,
  //   initialInView: true,
  // });

  // const isNavigationVisible = !inView;
  const isNavigationVisible = true;

  return (
    <>
      <Navigation isVisible={isNavigationVisible} />

      <main
        className={
          "max-w-lg w-11/12 px-2 md:px-0 md:w-4/5 mx-auto grid min-h-full"
        }
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <div className="mt-8 pb-2 md:hidden">
          <div className="inline-block">
            <Link href={"/"} passHref>
              <img
                src={"/in-facto-black.png"}
                alt={"in-facto"}
                className={"w-[100px] md:w-[160px]"}
              />
            </Link>
          </div>
        </div>
        <div className="mt-5">{children}</div>

        <footer className="mt-10 mb-12 text-gray-600 text-sm font-serif font-light tracking-wider">
          <div className="flex">
            <div>
              <A href={"/"}>in-facto</A> (c) 2022-
            </div>

            <div className="ml-auto"></div>
          </div>
        </footer>
      </main>
    </>
  );
};

export const contactUrl = "https://forms.gle/vBwXbBzrsnfGx3qT9";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: {},
} as const;

type PageState = "about" | "posts" | "unknown";

const Navigation = (props: { isVisible: boolean }) => {
  const { isVisible } = props;
  const nodeRef = useRef(null);

  const path = usePathname();

  let page: PageState = "unknown";

  if (path && path.startsWith("/about")) {
    page = "about";
  }
  if (path && path.startsWith("/posts")) {
    page = "posts";
  }

  const currentArrow = "›";

  return (
    <Transition nodeRef={nodeRef} in={isVisible} timeout={5000} appear={false}>
      {(state) => {
        // not working now...

        // console.log(state);
        return (
          <div
            className={clsx("invisible md:visible", "fixed", "py-5", "pl-5")}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className="flex flex-col gap-1">
              <div>
                <A href={"/"}>
                  <img
                    src={"/in-facto-black.png"}
                    alt={"in-facto"}
                    className={"w-[100px]"}
                  />
                </A>
              </div>
              <div className={clsx("mt-3", page === "about" && "font-bold")}>
                <A href="/about">About</A>
                {page === "about" && ` ${currentArrow}`}
              </div>
              <div>
                <A
                  href="https://www.youtube.com/@in-facto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Youtube
                </A>
              </div>
              <div className={clsx(page === "posts" && "font-bold")}>
                <A href={"/posts"}>Posts</A>
                {page === "posts" && ` ${currentArrow}`}
              </div>
            </div>
          </div>
        );
      }}
    </Transition>
  );
};

export default Layout;
