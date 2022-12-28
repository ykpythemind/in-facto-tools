import { SceneState, SceneStateSchema } from "./types";

export function parseSceneState(
  data: string | null,
  throwOnError = false
): SceneState | null {
  if (!data) {
    if (throwOnError) {
      throw new Error("No data");
    }
    return null;
  }

  let obj: Object | null = null;
  try {
    obj = JSON.parse(data);
  } catch (e) {
    if (throwOnError) {
      throw e;
    }
    return null;
  }

  try {
    return SceneStateSchema.parse(obj);
  } catch (e) {
    if (throwOnError) {
      throw e;
    }

    return null;
  }
}
