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
    <div className="dark:bg-black dark:text-white min-h-screen">
      <Head>
        <title>facinko</title>
        <meta name="description" content="facinko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-3 px-2">
        <div className="flex items-center">
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
      </div>
    </div>
  );
}
