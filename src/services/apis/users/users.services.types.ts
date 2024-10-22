import { IUser } from '@/types'

export type IGetUsersFn = () => Promise<IUser[]>

export type IAddUserFn = (userData: Partial<IUser>) => Promise<IUser>
