import { z } from "zod";

const sceneTypeEnumValues = ["scene", "cut", "take"] as const;

const SceneConfigSchemaBase = z.object({
  scene: z.string(),
  cut: z.string(),
  take: z.string(),
});
const HasID = z.object({
  id: z.number(),
  favorite: z.boolean().optional(),
  note: z.string().optional(),
});

const SceneConfigSchema = SceneConfigSchemaBase.merge(HasID);
export type SceneConfig = z.infer<typeof SceneConfigSchema>;

const sceneTypeEnum = z.enum(sceneTypeEnumValues);
export type SceneType = z.infer<typeof sceneTypeEnum>;

export const SceneStateSchema = z.object({
  workingScene: SceneConfigSchema,
  records: z.array(SceneConfigSchema),
});
export type SceneState = z.infer<typeof SceneStateSchema>;
