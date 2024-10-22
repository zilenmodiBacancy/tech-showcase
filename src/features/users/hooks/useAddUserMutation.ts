import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAddUser, usersKey } from '@/hooks/apis/users'

import { errorToast, toastifyOptions } from '@/helpers/error-toast.helpers'

import { IUser } from '@/types'

const useAddUserMutation = () => {
  const queryClient = useQueryClient()
  const { mutate: addUserMutation, isPending } = useAddUser()

  const addUser = ({
    userData,
    onSuccessResponse = () => {},
  }: {
    userData: Partial<IUser>
    onSuccessResponse?: () => void
  }) => {
    addUserMutation(userData, {
      onSuccess: (res: IUser) => {
        toast.success('User is created', toastifyOptions)
        onSuccessResponse()

        queryClient.setQueryData(usersKey.users(), (prevUsers: IUser[]) => [
          res,
          ...(prevUsers || []),
        ])
      },
      onError: (error) => errorToast(error, toast),
    })
  }

  return { addUser, isPending }
}

export default useAddUserMutation
