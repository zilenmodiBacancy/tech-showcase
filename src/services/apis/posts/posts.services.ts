import {
  IGetPostsFn,
  IAddPostFn,
} from '@/services/apis/posts/posts.services.types'
import axiosClient from '@/services/axios-config'

import { IPost } from '@/types'

const apiRoute = 'posts'

export const getPosts: IGetPostsFn = () => axiosClient.get(apiRoute)

export const addPost: IAddPostFn = (postData: Partial<IPost>) =>
  axiosClient.post(apiRoute, postData)
