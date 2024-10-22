import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetUsers } from '@/hooks/apis/users'

import Drawer from '@/components/common/Drawer'
import Dropdown from '@/components/common/Dropdown/Dropdown'
import { Input } from '@/components/common/Input'

import useAddPostMutation from '@/features/posts/hooks/useAddPostMutation'

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  userId: z.coerce.number().min(1, 'User ID is required'),
})

type FormSchemaType = z.infer<typeof formSchema>

const defaultValues: FormSchemaType = {
  title: '',
  body: '',
  userId: 0,
}

interface PropsType {
  addPostSliderOpen: boolean
  setAddPostSliderOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FORMID = 'ADD_POST' as const

const AddPostSlider: FC<PropsType> = ({
  addPostSliderOpen,
  setAddPostSliderOpen,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    defaultValues,
    resolver: zodResolver(formSchema),
  })

  const { addPost, isPending: isAddPostPending } = useAddPostMutation()
  const { data: usersList, isPending: isUserFetching } = useGetUsers()

  const onCancel = () => {
    setAddPostSliderOpen(false)
    reset()
  }

  const onSubmit = (data: FormSchemaType) => {
    addPost({
      postData: data,
      onSuccessResponse: () => {
        setAddPostSliderOpen(false)
        reset()
      },
    })
  }

  return (
    <Drawer
      isOpen={addPostSliderOpen}
      onRequestClose={onCancel}
      title="New Post"
      action=""
      buttonLabel="Save"
      onAction={() => {}}
      className="max-w-xl"
      isPending={isAddPostPending}
      buttonProps={{
        form: FORMID,
        type: 'submit',
        disabled: isAddPostPending || isUserFetching,
      }}
    >
      <div className="p-6">
        {isUserFetching ? (
          <div>Loading users...</div>
        ) : (
          <form
            noValidate
            id={FORMID}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-1"
          >
            <div className="h-20">
              <Input
                label="Title"
                name="title"
                register={register}
                error={errors.title?.message}
                required
              />
            </div>

            <div className="h-20">
              <Input
                label="Body"
                name="body"
                register={register}
                error={errors.body?.message}
                required
              />
            </div>

            <div className="h-20">
              <Dropdown
                label="User ID"
                name="userId"
                list={
                  usersList?.map((user) => ({
                    id: String(user.id),
                    name: user.name,
                  })) || []
                }
                register={register}
                error={errors.userId?.message}
                required
              />
            </div>
          </form>
        )}
      </div>
    </Drawer>
  )
}

export default AddPostSlider
