import { describe, expect, test } from "@jest/globals";
import { parseSceneState } from "./storage";

test("parse", async () => {
  const result = await parseSceneState(
    `
    {
      "workingSceneId": 1,
      "records": [{ "scene": "1", "cut": "1", "take": "a", "favorite": 1, "shouldRecord": false, "id": 1 } ]
    }
  `,
    true
  );

  expect(result).toStrictEqual({
    workingSceneId: 1,
    records: [
      {
        scene: "1",
        cut: "1",
        take: "a",
        favorite: 1,
        shouldRecord: false,
        id: 1,
      },
    ],
  });
});

test("parse fail", async () => {
  const result = await parseSceneState(
    `
    {
      "workingScene": {
        "scene": "1",
        "cut": "1",
        "take": "2"
      }
    }
  `,
    false
  );

  expect(result).toEqual(null);
});
