export type IError =
  | string
  | {
      errors?: {
        message?: string
      }[]
      message?: string
    }

export interface ISuccessResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccessResponse?: (...args: any[]) => void
}
