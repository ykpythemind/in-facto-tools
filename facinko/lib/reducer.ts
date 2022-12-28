import { SceneStatus, SceneType } from "./types";

export function useSceneReducer() {}

type SceneStatusWithId = SceneStatus & { id: number };

type State = {
  currentScene: SceneStatusWithId;
  history: SceneStatusWithId[];
};

const initialState: State = {
  currentScene: { cut: "1", scene: "1", take: "1", id: -1 },
  history: [],
};

type Action =
  | { type: "init"; payload: State }
  | {
      type: "updateScene";
      payload: { sceneType: SceneType; value: string };
    }
  | { type: "favorite"; payload: { sceneId: number } };

function reducer(state: State, action: Action) {}
