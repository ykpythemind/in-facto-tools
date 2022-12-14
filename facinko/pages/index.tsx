import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  if (theme === null) {
    return (
      <>
        <div>loading</div>
      </>
    );
  }

  return (
    <div className="dark:bg-black dark:text-white">
      <Head>
        <title>facinko</title>
        <meta name="description" content="facinko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-3 px-2 flex flex-col min-h-screen">
        <div className="grow-0 flex items-center">
          <div>
            <h1 className="text-lg">facinko</h1>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              onClick={() =>
                setTheme((b) => (b === "light" ? "dark" : "light"))
              }
            >
              <span className="text-cyan-700 dark:text-yellow-700">
                {theme === "dark" ? "[dark]" : "[light]"}
              </span>
            </button>
          </div>
        </div>

        <div className="py-10 grow flex flex-col px-6 justify-between">
          <Section name={"S"} status={"1"} />
          <Section name={"C"} status={"1"} />
          <Section name={"T"} status={"2"} />
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}

const Section = ({ name, status }: { name: string; status: string }) => {
  return (
    <div className={"border-4 border-black dark:border-white"}>
      <div className="flex items-center">
        <div className="border-r-[1px] border-black dark:border-white">
          <div className="text-[50px] font-bold px-5 py-10 min-w-[80px] text-center">
            {name}
          </div>
        </div>

        <div className="grow justify-center">
          <div className="text-center text-[75px] font-bold">{status}</div>
        </div>
      </div>
    </div>
  );
};
