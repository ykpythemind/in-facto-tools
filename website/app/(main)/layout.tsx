"use client";

import { HiMiniBars3 } from "react-icons/hi2";

import Link from "next/link";
import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { A } from "./components/A";
import { BiDotsVerticalRounded, BiDotsHorizontalRounded } from "react-icons/bi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ScrollToTop } from "./components/ScrollToTop";

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
      <a
        href={href}
        className="font-serif tracking-wider hover:text-blue-400"
      >
        {text}
      </a>
    );
  };

  return (
    // overflow-x-clip: 横方向のはみ出し(トップの全幅セクション)はクリップしつつ、
    // overflow-yをvisibleのまま保ち、フッターのbox-shadow(下端の黒塗り)が縦に伸びるようにする。
    // (overflow-x-hiddenだとoverflow-yが暗黙的にautoになりbox-shadowが切れてしまう)
    <div className="overflow-x-clip">
      <ScrollToTop />
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
                className={"w-[140px] md:w-[200px]"}
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
                <HeaderLink href="/videos" text="映像" />
              </li>
              <Sep />
              <li>
                <HeaderLink href="/posts" text="記事" />
              </li>
              <Sep />
              <li>
                <HeaderLink href="/archives" text="アーカイブ" />
              </li>
            </ul>
          </div>
          <ul className="flex md:hidden ml-auto h-full gap-3 list-none text-md">
            <li className="">
              <Menu>
                <MenuButton className="bg-black px-5 py-2.5 text-white transition-transform active:scale-90">
                  <HiMiniBars3 size={22} className="block" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="z-50 mt-2 flex min-w-[200px] flex-col bg-black py-3 font-serif text-white shadow-xl outline-none"
                >
                  {[
                    { href: "/", label: "トップページ" },
                    { href: "/about", label: "チーム" },
                    { href: "/videos", label: "映像" },
                    { href: "/posts", label: "記事" },
                    { href: "/archives", label: "アーカイブ" },
                    { href: "/contact", label: "お問い合わせ" },
                  ].map((item) => (
                    <MenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-6 py-2.5 text-right text-[15px] tracking-[0.15em] data-[focus]:bg-white data-[focus]:text-black"
                      >
                        {item.label}
                      </Link>
                    </MenuItem>
                  ))}
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
        <main className="w-full mt-5">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    /* box-shadow: iOSのバウンススクロールでページ下端の外が見えたときも黒く塗る */
    <footer className="bg-black font-serif text-white [box-shadow:0_50vh_0_50vh_#000]">
      <div className="px-3 md:px-0 md:max-w-xl w-full mx-auto py-16">
        <Link href={"/"} passHref>
          <img
            src={"/in-facto-white.png"}
            alt={"in-facto"}
            className={"max-w-[150px]"}
          />
        </Link>
        <div className="mt-10 flex flex-col items-start gap-2.5">
          <a
            href="https://x.com/in_facto_jp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white px-4 py-1.5 text-[15px] transition-colors hover:bg-white hover:text-black"
          >
            @in_facto_jp
          </a>
          <a
            href="https://www.youtube.com/@in-facto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white px-4 py-1.5 text-[15px] text-black transition-colors hover:bg-neutral-200"
          >
            Youtube Channel
          </a>
        </div>
        <div className="mt-16">
          <Link
            href="/contact"
            className="mx-auto block w-[88%] rounded-full border border-white py-4 text-center text-[17px] tracking-[0.2em] [text-indent:0.2em] transition-colors hover:bg-white hover:text-black"
          >
            お問い合わせ
          </Link>
        </div>
        <div className="mt-16 text-center text-sm text-neutral-300">
          in-facto &copy; 2022-
        </div>
      </div>
    </footer>
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
