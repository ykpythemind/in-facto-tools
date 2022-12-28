import { SceneConfig, SceneState } from "./types";

export const initialSceneState: SceneState = {
  workingScene: { cut: "1", scene: "1", take: "1", id: -1 },
  records: [],
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
        records: action.payload.records,
      };
    case "favorite": {
      const records = [...state.records];
      if (records[action.payload.sceneId]) {
        records[action.payload.sceneId].favorite = true;
        return { ...state, records };
      } else {
        return state;
      }
    }
    case "unfavorite": {
      const records = [...state.records];
      if (records[action.payload.sceneId]) {
        records[action.payload.sceneId].favorite = false;
        return { ...state, records };
      } else {
        return state;
      }
    }
    case "addNote": {
      const records = [...state.records];
      if (records[action.payload.sceneId]) {
        records[action.payload.sceneId].note = action.payload.note;
        return { ...state, records };
      } else {
        return state;
      }
    }
    case "newWorkingScene": {
      const lastId = state.records[state.records.length - 1]?.id ?? 0;
      const { scene, cut, take } = action.payload.newScene;
      const newScene: SceneConfig = {
        scene,
        cut,
        take,
        id: lastId + 1,
      };

      // push new records
      const records = [...state.records, state.workingScene];

      return { records, workingScene: newScene };
    }
    case "updateWorkingScene": {
      const currentId = state.workingScene.id;
      const { scene, cut, take } = action.payload.sceneConfig;

      return {
        workingScene: { scene, cut, take, id: currentId },
        records: state.records,
      };
    }
    default:
      const _exhaustiveCheck: never = action;
      return initialSceneState;
  }
}
