import { IUser } from '@/types'

export const usersKey = {
  users: () => ['users'] as const,
  userById: (userId: IUser['id']) => ['users', userId] as const,
}
