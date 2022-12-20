import Head from "next/head";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

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
  const ref: React.MutableRefObject<HTMLDialogElement | null> = useRef(null);

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

  const showModal = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    if (ref.current) {
      ref.current.close();
    }
  }, []);

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
          <div className="">
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

        <div className="pt-3 grow grid gap-10 grid-cols-1 grid-rows-3 landscape:grid-cols-3 landscape:grid-rows-1 px-6 ">
          <Section
            name={"S"}
            detailName={"Scene"}
            status={currentScene.scene}
            onNewStatus={(s) =>
              setCurrentScene((before) => ({ ...before!, scene: s }))
            }
            onClick={showModal}
          />
          <Section
            name={"C"}
            detailName={"Cut"}
            status={currentScene.cut}
            onNewStatus={(s) =>
              setCurrentScene((before) => ({ ...before!, cut: s }))
            }
            onClick={showModal}
          />
          <Section
            name={"T"}
            detailName={"Take"}
            status={currentScene.take}
            onNewStatus={(s) =>
              setCurrentScene((before) => ({ ...before!, take: s }))
            }
            onClick={showModal}
          />
          <div className="w-full"></div>
        </div>

        <div className="grow-0  pb-5 flex items-center">
          <div className="">-</div>
          <div className="ml-auto"></div>
        </div>
      </div>

      <Dialog ref={ref} onRequireClosing={closeModal} />
    </div>
  );
}

const Dialog = forwardRef<HTMLDialogElement, { onRequireClosing: () => void }>(
  (props, ref) => {
    const stopPropagation = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      },
      []
    );

    return (
      <dialog ref={ref} onClick={props.onRequireClosing}>
        <div className={"dialog-body"} onClick={stopPropagation}>
          hello
        </div>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";

const Section = ({
  name,
  detailName,
  status,
  onNewStatus,
  onClick,
}: {
  name: string;
  detailName: string;
  status: string;
  onNewStatus: (status: string) => void;
  onClick: () => void;
}) => {
  // const onClick = useCallback(() => {
  //   const r = prompt(`New status for ${detailName}`);
  //   if (!r) return;
  //   if (r === "") return;
  //
  //   onNewStatus(r);
  // }, [onNewStatus, detailName]);

  return (
    <div className={"w-full flex landscape:block"} onClick={onClick}>
      <div className="flex items-center landscape:flex-col w-full border-4 border-black dark:border-white cursor-pointer ">
        <div className="min-h-full flex items-center border-r-[1px] landscape:border-r-0 border-black dark:border-white">
          <div className="text-[50px] font-bold px-5 min-w-[80px] text-center">
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
