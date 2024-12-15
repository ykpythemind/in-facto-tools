"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";
import { A } from "./components/A";
import { Transition } from "react-transition-group";
import { usePathname } from "next/navigation";

import { BiGridAlt } from "react-icons/bi";
import { SlGrid } from "react-icons/sl";
import { CiMenuKebab } from "react-icons/ci";
import { BiDotsVerticalRounded, BiDotsHorizontalRounded } from "react-icons/bi";
import { GoChevronDown } from "react-icons/go";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Layout = ({ children }: { children: React.ReactElement }) => {
  // const { ref, inView, entry } = useInView({
  //   fallbackInView: true,
  //   initialInView: true,
  // });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const isNavigationVisible = !inView;
  const isNavigationVisible = true;

  return (
    <div
      className={
        "px-3 md:px-0 md:max-w-xl w-full flex items-center flex-col mx-auto"
      }
    >
      <header className="w-full my-5 flex">
        <h1>
          <Link href={"/"} passHref>
            <img
              src={"/in-facto-black.png"}
              alt={"in-facto"}
              className={"max-w-[100px]"}
            />
          </Link>
        </h1>
        <ul className="flex ml-auto h-full items-end gap-3 list-none text-md">
          <li className="md:block hidden">
            <A href="./about">チーム</A>
          </li>
          <li className="md:block hidden">
            <A href="./videos">動画</A>
          </li>
          <li className="md:block hidden">
            <A href="./posts">記事</A>
          </li>
          <li className="">
            <Menu>
              <MenuButton className="data-[open]:scale-110">
                <BiDotsVerticalRounded size={20} className="mb-[-4px] " />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="flex flex-col gap-2 p-4 bg-slate-200 mt-2 rounded-sm"
              >
                <MenuItem>
                  <Link
                    href="./about"
                    className="underline hover:text-blue-400 block md:hidden"
                  >
                    チーム
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="./videos"
                    className="underline hover:text-blue-400 block md:hidden"
                  >
                    動画
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href="./posts"
                    className="underline hover:text-blue-400 block md:hidden"
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
      </header>
      <main className="w-full mt-5 pb-10">{children}</main>
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
