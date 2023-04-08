import { z } from "zod";

const sceneTypeEnumValues = ["scene", "cut", "take"] as const;

const SceneConfigSchemaBase = z.object({
  scene: z.string(),
  cut: z.string(),
  take: z.string(),
});
const HasID = z.object({
  id: z.number(),
  favorite: z.number().min(0).max(3),
  note: z.string().optional(),
  shouldRecord: z.boolean(),
  time: z.string().optional(),
});

const SceneConfigSchema = SceneConfigSchemaBase.merge(HasID);
export type SceneConfig = z.infer<typeof SceneConfigSchema>;

const sceneTypeEnum = z.enum(sceneTypeEnumValues);
export type SceneType = z.infer<typeof sceneTypeEnum>;

export const SceneStateSchema = z.object({
  workingSceneId: z.number(),
  records: z.array(SceneConfigSchema),
});
export type SceneState = z.infer<typeof SceneStateSchema>;
