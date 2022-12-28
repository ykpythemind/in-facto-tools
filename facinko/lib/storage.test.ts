import { describe, expect, test } from "@jest/globals";
import { parseSceneState } from "./storage";

test("parse", async () => {
  const result = await parseSceneState(
    `
    {
      "currentScene": {
        "scene": "1",
        "cut": "1",
        "take": "2",
        "id": 1
      },
      "records": []
    }
  `,
    true
  );

  expect(result).toStrictEqual({
    currentScene: {
      scene: "1",
      cut: "1",
      take: "2",
      id: 1,
    },
    records: [],
  });
});

test("parse fail", async () => {
  const result = await parseSceneState(
    `
    {
      "currentScene": {
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
