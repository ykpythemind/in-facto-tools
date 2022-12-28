import { SceneConfig, SceneState } from "./types";

export const initialSceneState: SceneState = {
  workingScene: { cut: "1", scene: "1", take: "1", id: -1 },
  history: [],
};

type SceneAction =
  | { type: "init"; payload: SceneState }
  | {
      type: "newWorkingScene";
      payload: { newScene: Omit<SceneConfig, "id"> };
    }
  | {
      type: "updateWorkingScene";
      payload: { sceneConfig: Omit<SceneConfig, "id"> };
    }
  | { type: "favorite"; payload: { sceneId: number } }
  | { type: "unfavorite"; payload: { sceneId: number } }
  | { type: "addNote"; payload: { sceneId: number; note: string } };

export function sceneReducer(
  state: SceneState,
  action: SceneAction
): SceneState {
  switch (action.type) {
    case "init":
      return {
        workingScene: action.payload.workingScene,
        history: action.payload.history,
      };
    case "favorite": {
      const history = [...state.history];
      if (history[action.payload.sceneId]) {
        history[action.payload.sceneId].favorite = true;
        return { ...state, history };
      } else {
        return state;
      }
    }
    case "unfavorite": {
      const history = [...state.history];
      if (history[action.payload.sceneId]) {
        history[action.payload.sceneId].favorite = false;
        return { ...state, history };
      } else {
        return state;
      }
    }
    case "addNote": {
      const history = [...state.history];
      if (history[action.payload.sceneId]) {
        history[action.payload.sceneId].note = action.payload.note;
        return { ...state, history };
      } else {
        return state;
      }
    }
    case "newWorkingScene": {
      const lastId = state.history[state.history.length - 1]?.id ?? 0;
      const { scene, cut, take } = action.payload.newScene;
      const newScene: SceneConfig = {
        scene,
        cut,
        take,
        id: lastId + 1,
      };

      return { ...state, workingScene: newScene };
    }
    case "updateWorkingScene": {
      const currentId = state.workingScene.id;
      const { scene, cut, take } = action.payload.sceneConfig;

      return {
        workingScene: { scene, cut, take, id: currentId },
        history: state.history,
      };
    }
    default:
      const _exhaustiveCheck: never = action;
      return initialSceneState;
  }
}
