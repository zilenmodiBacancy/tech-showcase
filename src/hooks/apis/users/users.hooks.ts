import { useMutation, useQuery } from '@tanstack/react-query'

import { usersKey } from '@/hooks/apis/users'

import {
  addUser,
  getUsers,
  IAddUserFn,
  IGetUsersFn,
} from '@/services/apis/users'

import { IError } from '@/types'

export const useGetUsers = () =>
  useQuery<Awaited<ReturnType<IGetUsersFn>>, IError>({
    queryKey: usersKey.users(),
    queryFn: getUsers,
    staleTime: 60 * 60 * 1000,
  })

export const useAddUser = () =>
  useMutation<
    Awaited<ReturnType<IAddUserFn>>,
    IError,
    Parameters<IAddUserFn>[0]
  >({ mutationFn: addUser })
