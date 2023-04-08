import { SceneConfig, SceneState } from "./types";

export const fallbackScene: SceneConfig = {
  id: 0,
  scene: "1",
  cut: "1",
  take: "1",
  favorite: 0,
  shouldRecord: false,
};

export const initialSceneState: SceneState = {
  workingSceneId: 0,
  records: [fallbackScene],
};

type SceneAction =
  | { type: "init"; payload: SceneState }
  | { type: "reset" }
  | {
      type: "updateWorkingScene";
      payload: { sceneConfig: Omit<SceneConfig, "id"> };
    }
  | {
      type: "favorite";
      payload: { sceneId: number };
    }
  // | { type: "unfavorite"; payload: { sceneId: number } }
  | { type: "addNote"; payload: { sceneId: number; note: string } };

export function sceneReducer(
  state: SceneState,
  action: SceneAction
): SceneState {
  switch (action.type) {
    case "init":
      return {
        workingSceneId: action.payload.workingSceneId,
        records: action.payload.records,
      };
    case "favorite": {
      const records = [...state.records];
      const i = records.findIndex((r) => r.id === action.payload.sceneId);
      if (i !== -1) {
        if (records[i].favorite > 2) {
          records[i].favorite = 0;
        } else {
          records[i].favorite = records[i].favorite + 1;
        }
        console.log(records[i].favorite); // development mode cause multiple call
        records[i].shouldRecord = true;
        return { ...state, records };
      } else {
        console.warn("never");
        return state;
      }
    }
    case "addNote": {
      const records = [...state.records];
      const i = records.findIndex((r) => r.id === action.payload.sceneId);
      if (i !== -1) {
        records[i].note = action.payload.note;
        records[i].shouldRecord = true;
        return { ...state, records };
      } else {
        return state;
      }
    }
    case "updateWorkingScene": {
      const currentId = state.workingSceneId;
      const { scene, cut, take, favorite } = action.payload.sceneConfig;
      const i = state.records.findIndex((r) => {
        return r.scene === scene && r.cut === cut && r.take === take;
      });
      if (i !== -1) {
        // 同じシーンがあったら、そのシーンをworkingSceneにする
        const workingSceneId = state.records[i].id;
        return { ...state, workingSceneId };
      }

      const lastId = Math.max(...state.records.map((a) => a.id)) ?? 0;
      const newScene: SceneConfig = {
        scene,
        cut,
        take,
        id: lastId + 1,
        favorite: 0,
        shouldRecord: false,
      };

      // push new records
      const records = [...state.records, newScene];
      return { records, workingSceneId: newScene.id };
    }
    case "reset": {
      return initialSceneState;
    }
    default:
      const _exhaustiveCheck: never = action;
      return initialSceneState;
  }
}
