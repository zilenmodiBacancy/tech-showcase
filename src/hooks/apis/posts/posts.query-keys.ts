import { IPost } from '@/types'

export const postsKey = {
  posts: () => ['posts'] as const,
  postById: (postId: IPost['id']) => ['posts', postId] as const,
}
