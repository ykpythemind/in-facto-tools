import Head from "next/head";
import {
  forwardRef,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Button } from "../components/Button";
import { RecordsDialog } from "../components/RecordsDialog";
import { Dialog } from "../components/SectionDialog";
import { initialSceneState, sceneReducer } from "../lib/reducer";
import { parseSceneState } from "../lib/storage";
import { SceneConfig, SceneType } from "../lib/types";

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

    if (result) {
      dispatch({ type: "init", payload: result });
    } else {
      // do nothing
    }

    setIsLoaded(true);
  }, []);

  // dirty...
  const serializedState = JSON.stringify(state);
  console.log("render", serializedState);

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

  const workingScene = state.workingScene;

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

  const clickStart = useCallback(() => {
    if (!workingScene) return;

    dispatch({
      type: "addRecord",
      payload: {
        newScene: {
          scene: workingScene.scene,
          cut: workingScene.cut,
          take: workingScene.take,
          id: workingScene.id,
        },
      },
    });

    const { scene, cut, take } = workingScene;
    const uttr = new SpeechSynthesisUtterance(
      `scene ${scene}, cut ${cut}, take ${take}.`
    );
    uttr.rate = 0.8;
    speechSynthesis.speak(uttr);
  }, [workingScene]);

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
    dispatch({ type: "favorite", payload: { sceneId } });
  }, []);

  const onUnfavorite = useCallback((sceneId: number) => {
    dispatch({ type: "unfavorite", payload: { sceneId } });
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
    <div className="dark:bg-black dark:text-white">
      <Head>
        <title>facinko</title>
        <meta name="description" content="facinko" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="pt-3 px-2 flex flex-col h-screen"
        style={{ height: "100dvh" }}
      >
        <div className="grow-0 flex items-center">
          <div className="">
            <h1 className="text-lg">
              <a
                href="https://in-facto.jp"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                facinko
              </a>
            </h1>
          </div>
          <div className="ml-auto mr-4">
            <button type={"button"} onClick={showRecordsDialog}>
              Records 🎞️
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() =>
                setTheme((b) => (b === "light" ? "dark" : "light"))
              }
            >
              <span className="text-cyan-700 dark:text-yellow-700">
                {theme === "dark" ? "🌓" : "☀"}
              </span>
            </button>
          </div>
        </div>

        <div className="py-3 grow grid gap-5 grid-flow-row auto-rows-fr grid-cols-1 grid-rows-3 landscape:grid-cols-3 landscape:grid-rows-1 px-6">
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

        <div className="pb-5 py-3 px-6 w-full flex items-center">
          <div className="w-full">
            <Button text={"Start 🎥"} onClick={clickStart} />
          </div>
        </div>
      </div>

      <RecordsDialog
        ref={recordDialogRef}
        isOpen={isRecordsDialogOpen}
        onRequireClosing={closeRecordsDialog}
        records={state.records}
        onFavorite={onFavorite}
        onUnfavorite={onUnfavorite}
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
          const current = state.workingScene;

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
  return (
    <div className={"w-full flex landscape:block"} onClick={onClick}>
      <div className="flex items-center landscape:flex-col w-full border-4 border-black dark:border-white cursor-pointer ">
        <div className="min-h-full flex items-center border-r-[1px] landscape:border-r-0 border-black dark:border-white">
          <div className="text-[40px] font-bold px-5 min-w-[80px] text-center">
            {name}
          </div>
        </div>

        <div className="grow justify-center">
          <div className="text-center text-[70px] font-bold">{status}</div>
        </div>
      </div>
    </div>
  );
};
