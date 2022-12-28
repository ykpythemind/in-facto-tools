import { SceneState, SceneStateSchema } from "./types";

export async function parseSceneState(
  data: string
): Promise<SceneState | null> {
  let obj: Object | null = null;
  try {
    obj = JSON.parse(data);
  } catch (e) {
    return null;
  }

  try {
    return SceneStateSchema.parse(obj);
  } catch (e) {
    return null;
  }
}
