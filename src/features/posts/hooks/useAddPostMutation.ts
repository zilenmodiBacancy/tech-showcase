import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useAddPost, postsKey } from '@/hooks/apis/posts'

import { errorToast, toastifyOptions } from '@/helpers/error-toast.helpers'

import { IPost } from '@/types'

const useAddPostMutation = () => {
  const queryClient = useQueryClient()
  const { mutate: addPostMutation, isPending } = useAddPost()

  const addPost = ({
    postData,
    onSuccessResponse = () => {},
  }: {
    postData: Partial<IPost>
    onSuccessResponse?: () => void
  }) => {
    addPostMutation(postData, {
      onSuccess: (res: IPost) => {
        toast.success('Post is created', toastifyOptions)
        onSuccessResponse()

        queryClient.setQueryData(postsKey.posts(), (prevPosts: IPost[]) => [
          res,
          ...(prevPosts || []),
        ])
      },
      onError: (error) => errorToast(error, toast),
    })
  }

  return { addPost, isPending }
}

export default useAddPostMutation
