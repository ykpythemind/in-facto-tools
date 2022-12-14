import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

type SceneStatus = {
  scene: string;
  cut: string;
  take: string;
};

const defaultScene = (): SceneStatus => ({
  scene: "1",
  cut: "1",
  take: "1",
});

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  const [currentScene, setCurrentScene] = useState<SceneStatus | null>(null);

  useEffect(() => {
    // load current scene

    const l = localStorage.getItem("currentScene");
    if (l) {
      try {
        const parsed = JSON.parse(l);
        if (parsed.scene && parsed.cut && parsed.take) {
          setCurrentScene(parsed);
        } else {
          setCurrentScene(defaultScene());
        }
        return;
      } catch (e) {
        console.error("aaaa");
        console.error(e);
        setCurrentScene(defaultScene());
      }
    }

    setCurrentScene(defaultScene());
  }, []);

  useEffect(() => {
    if (!currentScene) return;

    // save
    localStorage.setItem("currentScene", JSON.stringify(currentScene));
  }, [currentScene]);

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

  if (theme === null || currentScene === null) {
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
        <div className="grow-0 mb-3 flex items-center">
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

        <div className="py-1 grow  flex flex-col px-6 justify-between">
          <Section
            name={"S"}
            detailName={"Scene"}
            status={currentScene.scene}
            onNewStatus={(s) =>
              setCurrentScene((before) => ({ ...before!, scene: s }))
            }
          />
          <Section
            name={"C"}
            detailName={"Cut"}
            status={currentScene.cut}
            onNewStatus={(s) =>
              setCurrentScene((before) => ({ ...before!, cut: s }))
            }
          />
          <Section
            name={"T"}
            detailName={"Take"}
            status={currentScene.take}
            onNewStatus={(s) =>
              setCurrentScene((before) => ({ ...before!, take: s }))
            }
          />
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}

const Section = ({
  name,
  detailName,
  status,
  onNewStatus,
}: {
  name: string;
  detailName: string;
  status: string;
  onNewStatus: (status: string) => void;
}) => {
  const onClick = useCallback(() => {
    const r = prompt(`New status for ${detailName}`);
    if (!r) return;
    if (r === "") return;

    onNewStatus(r);
  }, [onNewStatus, detailName]);

  return (
    <div
      className={"border-4 border-black dark:border-white cursor-pointer"}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="border-r-[1px] border-black dark:border-white">
          <div className="text-[50px] font-bold px-5 py-10 min-w-[80px] text-center">
            {name}
          </div>
        </div>

        <div className="grow justify-center">
          <div className="text-center text-[100px] font-bold">{status}</div>
        </div>
      </div>
    </div>
  );
};
