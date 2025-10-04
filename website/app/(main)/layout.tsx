"use client";

import { HiMiniBars3 } from "react-icons/hi2";

import Link from "next/link";
import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { A } from "./components/A";
import { BiDotsVerticalRounded, BiDotsHorizontalRounded } from "react-icons/bi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Layout = ({ children }: { children: React.ReactElement }) => {
  // const { ref, inView, entry } = useInView({
  //   fallbackInView: true,
  //   initialInView: true,
  // });

  const Sep = () => {
    return (
      <li className="mt-[0px]">
        <img src="/separator.svg" alt="" className="w-4 h-4" />
      </li>
    );
  };
  const HeaderLink = ({ href, text }: { href: string; text: string }) => {
    return (
      <a href={href} className=" hover:text-blue-400 font-bold tracking-tight">
        {text}
      </a>
    );
  };

  return (
    <div className="overflow-y-auto">
      <header
        className={clsx(
          /*sticky top-0 left-0 right-0 */
          "py-7 bg-white z-30 px-3 md:px-0 md:max-w-xl w-full flex items-center flex-col mx-auto",
          "transition-transform duration-300"
        )}
      >
        {/* backdrop-blur-sm */}
        <div className="flex items-center md:items-end w-full">
          <h1 className="">
            <Link href={"/"} passHref>
              <img
                src={"/in-facto-black.png"}
                alt={"in-facto"}
                className={"max-w-[120px]"}
              />
            </Link>
          </h1>
          <div className="hidden md:block mb-[-3px] w-full ml-auto">
            <ul className="gap-[2px] list-none break-keep text-md flex items-center justify-end w-full ml-auto">
              <li>
                <HeaderLink href="/about" text="チーム" />
              </li>
              <Sep />
              <li>
                <HeaderLink href="/videos" text="動画" />
              </li>
              <Sep />
              <li>
                <HeaderLink href="/posts" text="記事" />
              </li>
              <Sep />
              <li>
                <HeaderLink href="/archives" text="..." />
              </li>
            </ul>
          </div>
          <ul className="flex md:hidden ml-auto h-full gap-3 list-none text-md">
            <li className="">
              <Menu>
                <MenuButton className="transition-transform active:scale-90">
                  <HiMiniBars3 size={26} className="mb-[-4px]" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="flex flex-col text-right justify-end gap-2 bg-zinc-100 p-2 mt-2 rounded-sm shadow-md z-50"
                >
                  <MenuItem>
                    <Link
                      href="./about"
                      className="underline hover:text-blue-400 block"
                    >
                      チーム
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="./videos"
                      className="underline hover:text-blue-400 block"
                    >
                      動画
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="./posts"
                      className="underline hover:text-blue-400 block"
                    >
                      記事
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="./archives"
                      className="underline hover:text-blue-400 "
                    >
                      アーカイブ
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="./contact"
                      className="underline hover:text-blue-400 "
                    >
                      問い合わせ
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </li>
          </ul>
        </div>
        {/* <div>aa</div> */}
      </header>
      <div
        className={
          "px-3 md:px-0 md:max-w-xl w-full flex items-center flex-col mx-auto"
        }
      >
        <main className="w-full mt-5 pb-10">{children}</main>
      </div>
    </div>
  );
};

// const duration = 300;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// };

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 0 },
//   exited: { opacity: 0 },
//   unmounted: {},
// } as const;

// type PageState = "about" | "posts" | "videos" | "unknown";

export default Layout;
