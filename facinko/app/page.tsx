import Head from "next/head";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { RecordsDialog } from "./components/RecordsDialog";
import { Dialog } from "./components/SectionDialog";
import { fallbackScene, initialSceneState, sceneReducer } from "../lib/reducer";
import { parseSceneState } from "../lib/storage";
import { SceneType } from "../lib/types";

import { useElementSize } from "usehooks-ts";
import { Fav } from "./components/Fav";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [state, dispatch] = useReducer(sceneReducer, initialSceneState);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isRecordsDialogOpen, setIsRecordsDialogOpen] = useState(false);
  const dialogRef: React.MutableRefObject<HTMLDialogElement | null> =
    useRef(null);

  useEffect(() => {
    // load current scene...

    const item = localStorage.getItem("state");
    const result = parseSceneState(item);

    if (isLoaded) return;

    if (result) {
      dispatch({ type: "init", payload: result });
    } else {
      // do nothing
      dispatch({
        type: "init",
        payload: { records: [fallbackScene], workingSceneId: 0 },
      });
    }

    setIsLoaded(true);
  }, [isLoaded]);

  // dirty...
  const serializedState = JSON.stringify(state);
  // console.log("render", serializedState);

  useEffect(() => {
    if (!isLoaded) return;

    // save
    localStorage.setItem("state", serializedState);
  }, [isLoaded, serializedState]);

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

  const workingScene = state.records[state.workingSceneId] ?? fallbackScene;

  const [modalType, setModalType] = useState<SceneType>("scene");
  let modalContentStatus = workingScene?.scene;

  if (modalType === "cut") {
    modalContentStatus = workingScene?.cut;
  }
  if (modalType === "take") {
    modalContentStatus = workingScene?.take;
  }

  const showModal = useCallback((modalType: SceneType) => {
    if (dialogRef.current) {
      setIsDialogOpen(true);
      dialogRef.current.showModal();
      setModalType(modalType);
    }
  }, []);

  const closeModal = useCallback(() => {
    if (dialogRef.current) {
      setIsDialogOpen(false);
      dialogRef.current.close();
    }
  }, []);

  const clickFav = useCallback(() => {
    dispatch({
      type: "favorite",
      payload: {
        sceneId: state.workingSceneId,
        favoriteTime: new Date().toISOString(),
      },
    });
  }, [state.workingSceneId]);

  const recordDialogRef = useRef<HTMLDialogElement | null>(null);

  const showRecordsDialog = useCallback(() => {
    if (recordDialogRef.current) {
      setIsRecordsDialogOpen(true);
      recordDialogRef.current.showModal();
    }
  }, []);

  const closeRecordsDialog = useCallback(() => {
    if (recordDialogRef.current) {
      setIsRecordsDialogOpen(false);
      recordDialogRef.current.close();
    }
  }, []);

  const onFavorite = useCallback((sceneId: number) => {
    dispatch({
      type: "favorite",
      payload: { sceneId, favoriteTime: new Date().toISOString() },
    });
  }, []);

  const onUpdateNote = useCallback((sceneId: number, note: string) => {
    dispatch({ type: "addNote", payload: { sceneId, note } });
  }, []);

  const onRequireReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  if (theme === null || isLoaded === null) {
    return (
      <>
        <div>loading</div>
      </>
    );
  }

  return (
    <div
      className="dark:bg-black dark:text-white h-screen pt-3 pb-5 px-2 flex flex-col"
      style={{ height: "100dvh" }}
    >
      <Head>
        <title>facinko</title>
        <meta name="description" content="facinko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center pb-3 mx-4">
        <div className="">
          <h1 className="text-lg font-serif">
            <a
              href="https://in-facto.jp"
              target={"_blank"}
              rel="noopener noreferrer"
            >
              facinko
            </a>
          </h1>
        </div>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setTheme((b) => (b === "light" ? "dark" : "light"))}
          >
            <span className="text-cyan-700 dark:text-yellow-700">
              {theme === "dark" ? "🌓" : "☀"}
            </span>
          </button>
        </div>
      </div>

      <div className="grow grid gap-4 grid-cols-1 grid-rows-3 landscape:grid-cols-3 landscape:grid-rows-1 px-6 w-full">
        <Section
          name={"S"}
          status={workingScene.scene}
          onClick={() => showModal("scene")}
        />
        <Section
          name={"C"}
          status={workingScene.cut}
          onClick={() => showModal(`cut`)}
        />
        <Section
          name={"T"}
          status={workingScene.take}
          onClick={() => showModal(`take`)}
        />
      </div>

      <div className="flex w-full justify-end items-center pt-3 gap-5 px-4">
        <button
          type={"button"}
          onClick={showRecordsDialog}
          className="underline text-lg"
        >
          Menu
        </button>

        <div className="text-xl">
          <Fav fav={workingScene.favorite} onClick={() => clickFav()} />
        </div>
      </div>

      <RecordsDialog
        ref={recordDialogRef}
        isOpen={isRecordsDialogOpen}
        onRequireClosing={closeRecordsDialog}
        records={state.records}
        onFavorite={onFavorite}
        onUpdateNote={onUpdateNote}
        onRequireReset={onRequireReset}
      />

      <Dialog
        modalType={modalType}
        currentStatus={modalContentStatus}
        ref={dialogRef}
        onRequireClosing={closeModal}
        isOpen={isDialogOpen}
        onNewStatus={(newStatus) => {
          // dirty
          const current = workingScene;

          switch (modalType) {
            case "scene":
              dispatch({
                type: "updateWorkingScene",
                payload: { sceneConfig: { ...current, scene: newStatus } },
              });
              break;
            case "take":
              dispatch({
                type: "updateWorkingScene",
                payload: { sceneConfig: { ...current, take: newStatus } },
              });
              break;
            case "cut":
              dispatch({
                type: "updateWorkingScene",
                payload: { sceneConfig: { ...current, cut: newStatus } },
              });
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
}

const Section = ({
  name,
  status,
  onClick,
}: {
  name: string;
  status: string;
  onClick: () => void;
}) => {
  const [elemRef, { width, height }] = useElementSize();

  const size = useMemo(() => {
    if (width === null || height === null) {
      return 0;
    }

    return Math.round(Math.min(width, height) / 2); // 2 is magic number  // なんとなくいっぱいになる. <AutoTextSize>だとあふれてしまうため
  }, [width, height]);

  return (
    <div className={"h-full w-full flex"}>
      <div
        onClick={onClick}
        className="h-full flex landscape:flex-col items-center w-full border-4 border-black dark:border-white cursor-pointer "
        ref={elemRef}
      >
        <div className="grow-0 flex items-center  border-black dark:border-white">
          <div className="text-[40px] font-bold px-5 text-center">{name}</div>
        </div>

        <div className="grow justify-center flex h-full w-full">
          <div
            className="font-bold justify-center self-center"
            style={{ fontSize: `${size}px` }}
          >
            {/* text-[70px]  */}
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
