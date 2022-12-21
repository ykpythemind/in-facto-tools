import Head from "next/head";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

type SceneStatus = {
  scene: string;
  cut: string;
  take: string;
};

type SceneType = "scene" | "cut" | "take";

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

  const [modalType, setModalType] = useState<SceneType>("scene");
  let modalContentStatus = currentScene?.scene;

  if (modalType === "cut") {
    modalContentStatus = currentScene?.cut;
  }
  if (modalType === "take") {
    modalContentStatus = currentScene?.take;
  }

  const showModal = useCallback((modalType: SceneType) => {
    if (ref.current) {
      ref.current.showModal();
      setModalType(modalType);
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
            status={currentScene.scene}
            onClick={() => showModal("scene")}
          />
          <Section
            name={"C"}
            status={currentScene.cut}
            onClick={() => showModal(`cut`)}
          />
          <Section
            name={"T"}
            status={currentScene.take}
            onClick={() => showModal(`take`)}
          />
          <div className="w-full"></div>
        </div>

        <div className="grow-0  pb-5 flex items-center">
          <div className="">-</div>
          <div className="ml-auto"></div>
        </div>
      </div>

      <Dialog
        modalType={modalType}
        currentStatus={modalContentStatus}
        ref={ref}
        onRequireClosing={closeModal}
        onNewStatus={(status) => {
          // dirty
          switch (modalType) {
            case "scene":
              setCurrentScene((before) => ({ ...before!, scene: status }));
              break;
            case "take":
              setCurrentScene((before) => ({ ...before!, take: status }));
              break;
            case "cut":
              setCurrentScene((before) => ({ ...before!, cut: status }));
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
}

const Dialog = forwardRef<
  HTMLDialogElement,
  {
    modalType: SceneType;
    currentStatus: string | undefined;
    onRequireClosing: () => void;
    onNewStatus: (status: string) => void;
  }
>(({ onNewStatus, onRequireClosing, modalType, currentStatus }, ref) => {
  const stopPropagation = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    []
  );

  const clickEdit = () => {
    const r = prompt(`New status for ${modalType}`);
    if (!r) return;
    if (r === "") return;

    onNewStatus(r);
    onRequireClosing();
  };

  const clickReset = () => {
    onNewStatus("1");
    onRequireClosing();
  };

  const clickInc = () => {
    try {
      const parsed = parseInt(currentStatus || "0", 10);
      onNewStatus(String(parsed + 1));
    } catch {
      alert("current status is not number");
    }
    onRequireClosing();
  };

  const title = `${modalType} : ${currentStatus}`;

  return (
    <dialog
      className="portrait:w-full landscape:w-2/4"
      ref={ref}
      onClick={onRequireClosing}
    >
      <div className={"dialog-body"} onClick={stopPropagation}>
        <div className="flex">
          <h3 className="text-lg">{title}</h3>
          <div className="ml-auto">
            <button type="button" onClick={onRequireClosing}>
              x
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5">
          <Button onClick={clickInc} text={"+1"} />

          <Button onClick={clickEdit} text={"Edit"} />

          <Button onClick={clickReset} text={"Reset"} />
        </div>
      </div>
    </dialog>
  );
});
Dialog.displayName = "Dialog";

const Button = ({ onClick, text }: { text: string; onClick: () => void }) => {
  return (
    <button
      className="w-full border-gray-200 border-[1px] rounded-xl py-3"
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};

const Section = ({
  name,
  status,
  onClick,
}: {
  name: string;
  status: string;
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
