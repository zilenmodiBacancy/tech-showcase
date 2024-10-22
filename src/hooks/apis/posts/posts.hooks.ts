import { useMutation, useQuery } from '@tanstack/react-query'

import { postsKey } from '@/hooks/apis/posts'

import {
  addPost,
  getPosts,
  IAddPostFn,
  IGetPostsFn,
} from '@/services/apis/posts'

import { IError } from '@/types'

export const useGetPosts = () =>
  useQuery<Awaited<ReturnType<IGetPostsFn>>, IError>({
    queryKey: postsKey.posts(),
    queryFn: getPosts,
    staleTime: 60 * 60 * 1000,
  })

export const useAddPost = () =>
  useMutation<
    Awaited<ReturnType<IAddPostFn>>,
    IError,
    Parameters<IAddPostFn>[0]
  >({ mutationFn: addPost })
