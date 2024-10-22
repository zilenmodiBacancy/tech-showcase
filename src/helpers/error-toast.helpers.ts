import { ToastOptions } from 'react-toastify'

import { IError } from '@/types'

export const toastifyOptions: ToastOptions = {
  position: 'bottom-left',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorToast = (error: IError, toast: any) => {
  if (typeof error === 'string') {
    toast.error(error, toastifyOptions)
  } else {
    if (error?.errors?.length) {
      {
        error?.errors?.map((currError) =>
          toast.error(currError?.message, toastifyOptions)
        )
      }
    } else if (typeof error?.message === 'string') {
      toast.error(error?.message, toastifyOptions)
    } else {
      toast.error('Something went wrong', toastifyOptions)
    }
  }
}
