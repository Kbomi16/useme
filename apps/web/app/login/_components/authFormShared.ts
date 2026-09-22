import axios from "axios"

export const fieldClassName = "h-11 rounded-lg"

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message
    }
  }

  return fallback
}

export const authLink = (path: "/login" | "/signup", nextPath: string) =>
  nextPath === "/" ? path : `${path}?next=${encodeURIComponent(nextPath)}`
