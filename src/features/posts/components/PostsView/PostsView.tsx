'use client'
import React, { useState } from 'react'

import { useGetPosts } from '@/hooks/apis/posts'

import Button from '@/components/common/Button/Button'

import PostsTable from '@/features/posts/components/PostsTable'
import AddPostSlider from '@/features/posts/sliders/AddPostSider'

const PostsView = () => {
  const { data: postsList, isFetching, isError } = useGetPosts()
  const [addPostSliderOpen, setAddPostSliderOpen] = useState(false)

  const renderFeedbackMessage = () => {
    if (isFetching) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="loader" />{' '}
          <span className="ml-2 text-lg">Loading posts...</span>
        </div>
      )
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
          <span className="material-icons">error</span>{' '}
          <span className="ml-2">
            Error loading posts. Please try again later.
          </span>
        </div>
      )
    }

    if (postsList && postsList.length === 0) {
      return (
        <div className="flex items-center justify-center p-4 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md">
          <span className="material-icons">warning</span>{' '}
          <span className="ml-2">No posts found.</span>
        </div>
      )
    }

    return null
  }

  return (
    <div className="grid grid-cols-12 bg-background text-foreground h-full">
      <div className="col-span-10 col-start-2 py-5">
        <div className="flex justify-between items-center px-2">
          <h1 className="text-xl font-bold">Posts</h1>
          <Button onClick={() => setAddPostSliderOpen(true)}>New Post</Button>
        </div>

        {renderFeedbackMessage()}

        {postsList && postsList.length > 0 && <PostsTable posts={postsList} />}

        <AddPostSlider
          addPostSliderOpen={addPostSliderOpen}
          setAddPostSliderOpen={setAddPostSliderOpen}
        />
      </div>
    </div>
  )
}

export default PostsView
