import { z } from "zod";

const sceneTypeEnumValues = ["scene", "cut", "take"] as const;

const SceneStatusSchemaBase = z.object({
  scene: z.string(),
  cut: z.string(),
  take: z.string(),
});
const HasID = z.object({ id: z.number() });

const SceneStatusSchema = SceneStatusSchemaBase.merge(HasID);
export type SceneStatusWithId = z.infer<typeof SceneStatusSchema>;

const sceneTypeEnum = z.enum(sceneTypeEnumValues);
export type SceneType = z.infer<typeof sceneTypeEnum>;

export const SceneStateSchema = z.object({
  currentScene: SceneStatusSchema,
  history: z.array(SceneStatusSchema),
});
export type SceneState = z.infer<typeof SceneStateSchema>;
