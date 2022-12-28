import { SceneState, SceneStateSchema } from "./types";

export function parseSceneState(
  data: string | null,
  throwOnError = false
): SceneState | null {
  if (!data) {
    console.warn("No data");

    if (throwOnError) {
      throw new Error("No data");
    }
    return null;
  }

  let obj: Object | null = null;
  try {
    obj = JSON.parse(data);
  } catch (e) {
    console.warn("Failed to parse JSON", e);

    if (throwOnError) {
      throw e;
    }
    return null;
  }

  try {
    return SceneStateSchema.parse(obj);
  } catch (e) {
    console.warn("Schema mismatch", e);

    if (throwOnError) {
      throw e;
    }

    return null;
  }
}
