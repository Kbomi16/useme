import { z } from "zod"

const requiredText = (emptyMessage: string, max: number, maxMessage: string) =>
  z.string().trim().min(1, emptyMessage).max(max, maxMessage)

const httpUrl = z
  .string()
  .trim()
  .min(1, "써 볼 주소를 입력해 주세요.")
  .refine((value) => {
    try {
      const url = new URL(value)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }, "http로 시작하는 주소여야 해요.")

export const uploadSchema = z.object({
  name: requiredText(
    "이름을 입력해 주세요.",
    40,
    "이름은 40자까지 쓸 수 있어요.",
  ),
  tagline: requiredText(
    "한 줄을 입력해 주세요.",
    80,
    "한 줄은 80자까지 쓸 수 있어요.",
  ),
  url: httpUrl,
  problem: requiredText(
    "왜 만들었는지 적어 주세요.",
    200,
    "왜는 200자까지 쓸 수 있어요.",
  ),
  action: requiredText(
    "뭘 했는지 적어 주세요.",
    200,
    "뭘 칸은 200자까지 쓸 수 있어요.",
  ),
  metric: requiredText(
    "얼마나 되는지 적어 주세요.",
    200,
    "얼마나 칸은 200자까지 쓸 수 있어요.",
  ),
  body: z
    .string()
    .trim()
    .min(1, "프로젝트 설명을 적어 주세요.")
    .max(20000, "설명은 2만 자까지 쓸 수 있어요."),
})

export type UploadValues = z.infer<typeof uploadSchema>

export const emptyUploadValues: UploadValues = {
  name: "",
  tagline: "",
  url: "",
  problem: "",
  action: "",
  metric: "",
  body: "",
}
