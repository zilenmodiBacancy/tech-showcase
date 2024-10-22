import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Drawer from '@/components/common/Drawer'
import { Input } from '@/components/common/Input'

import useAddUserMutation from '@/features/users/hooks/useAddUserMutation'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormSchemaType = z.infer<typeof formSchema>

const defaultValues: FormSchemaType = {
  name: '',
  email: '',
  password: '',
}

interface PropsType {
  addPersonSlierOpen: boolean
  setAddPersonSlierOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FORMID = 'ADD_USER' as const

const AddUserSlider: FC<PropsType> = ({
  addPersonSlierOpen,
  setAddPersonSlierOpen,
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

  const { addUser, isPending } = useAddUserMutation()

  const onCancel = () => {
    setAddPersonSlierOpen(false)
    reset()
  }

  const onSubmit = (data: FormSchemaType) => {
    addUser({
      userData: data,
      onSuccessResponse: () => {
        setAddPersonSlierOpen(false)
        reset()
      },
    })
  }

  return (
    <Drawer
      isOpen={addPersonSlierOpen}
      onRequestClose={onCancel}
      title="New User"
      action=""
      buttonLabel="Save"
      onAction={() => {}}
      className="max-w-xl"
      isPending={isPending}
      buttonProps={{ form: FORMID, type: 'submit', disabled: isPending }}
    >
      <div className="p-6">
        <form
          noValidate
          id={FORMID}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-1"
        >
          <div className="h-20">
            <Input
              label="Name"
              name="name"
              register={register}
              error={errors.name?.message}
              required
            />
          </div>

          <div className="h-20">
            <Input
              label="Email"
              name="email"
              register={register}
              type="email"
              error={errors.email?.message}
              required
            />
          </div>

          <div className="h-20">
            <Input
              label="Password"
              name="password"
              register={register}
              type="password"
              error={errors.password?.message}
              required
            />
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddUserSlider
