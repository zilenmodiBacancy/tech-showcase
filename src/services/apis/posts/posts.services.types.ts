import { IPost } from '@/types'

export type IGetPostsFn = () => Promise<IPost[]>

export type IAddPostFn = (postData: Partial<IPost>) => Promise<IPost>
