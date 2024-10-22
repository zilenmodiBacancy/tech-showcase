import { createColumnHelper } from '@tanstack/react-table'
import React, { FC, useState } from 'react'

import Button from '@/components/common/Button/Button'
import { Table } from '@/components/common/Table/Table'

import { IPost } from '@/types'

const columnHelper = createColumnHelper<IPost>()

interface PropsType {
  posts: IPost[]
}

const PostsTable: FC<PropsType> = ({ posts }) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const MAX_TITLE_LENGTH = 50
  const MAX_BODY_LENGTH = 100

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text

  const columns = [
    columnHelper.accessor('title', {
      id: 'title',
      header: () => 'Title',
      cell: (info) => truncateText(info.getValue() || 'N/A', MAX_TITLE_LENGTH),
    }),
    columnHelper.accessor('body', {
      id: 'body',
      header: () => 'Body',
      cell: (info) => truncateText(info.getValue() || 'N/A', MAX_BODY_LENGTH),
    }),
    columnHelper.accessor('userId', {
      id: 'userId',
      header: () => 'User ID',
      cell: (info) => info.getValue() || 'N/A',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('id', {
      id: 'actionButton',
      header: '',
      enableColumnFilter: false,
      cell: () => (
        <div className="flex justify-end items-center gap-5 pr-6">
          <Button className="min-w-[5rem]" onClick={() => {}}>
            View
          </Button>
        </div>
      ),
    }),
  ]

  return (
    <Table<IPost>
      data={posts}
      columns={columns}
      globalFilterPlaceholder="Search all Posts..."
      showColumnSort
      showPaginatedRow
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}

export default PostsTable
