import {
  IGetUsersFn,
  IAddUserFn,
} from '@/services/apis/users/users.services.types'
import axiosClient from '@/services/axios-config'

import { IUser } from '@/types'

const apiRoute = 'users'

export const getUsers: IGetUsersFn = () => axiosClient.get(apiRoute)

export const addUser: IAddUserFn = (userData: Partial<IUser>) =>
  axiosClient.post(apiRoute, userData)
