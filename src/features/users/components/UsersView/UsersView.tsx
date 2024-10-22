'use client'
import React, { useState } from 'react'

import { useGetUsers } from '@/hooks/apis/users'

import Button from '@/components/common/Button/Button'

import UsersTable from '@/features/users/components/UsersTable'
import AddUserSlider from '@/features/users/sliders/AddUserSlider'

const UsersView = () => {
  const { data: usersList, isFetching, isError } = useGetUsers()
  const [addPersonSliderOpen, setAddPersonSliderOpen] = useState(false)

  const renderFeedbackMessage = () => {
    if (isFetching) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="loader" />{' '}
          <span className="ml-2 text-lg">Loading users...</span>
        </div>
      )
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
          <span className="material-icons">error</span>{' '}
          <span className="ml-2">
            Error loading users. Please try again later.
          </span>
        </div>
      )
    }

    if (usersList && usersList.length === 0) {
      return (
        <div className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md">
          <span className="material-icons">warning</span>{' '}
          <span className="ml-2">No users found.</span>
        </div>
      )
    }

    return null
  }

  return (
    <div className="grid grid-cols-12 bg-background text-foreground h-full">
      <div className="col-span-10 col-start-2 py-5">
        <div className="flex justify-between items-center px-2">
          <h1 className="text-xl font-bold">Users</h1>
          <Button onClick={() => setAddPersonSliderOpen(true)}>New User</Button>
        </div>

        {renderFeedbackMessage()}

        {usersList && usersList.length > 0 && <UsersTable users={usersList} />}

        <AddUserSlider
          addPersonSlierOpen={addPersonSliderOpen}
          setAddPersonSlierOpen={setAddPersonSliderOpen}
        />
      </div>
    </div>
  )
}

export default UsersView
