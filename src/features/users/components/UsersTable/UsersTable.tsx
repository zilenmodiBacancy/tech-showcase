import { createColumnHelper } from '@tanstack/react-table'
import React, { FC, useState } from 'react'

import Button from '@/components/common/Button/Button'
import { Table } from '@/components/common/Table/Table'

import { IUser } from '@/types'

const columnHelper = createColumnHelper<IUser>()

interface PropsType {
  users: IUser[]
}

const UsersTable: FC<PropsType> = ({ users }) => {
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => 'Name',
      cell: (info) => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('username', {
      id: 'username',
      header: () => 'Username',
      cell: (info) => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => 'Email',
      cell: (info) => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('address.city', {
      id: 'city',
      header: () => 'City',
      cell: (info) => info.getValue() || 'N/A',
    }),
    columnHelper.accessor('company.name', {
      id: 'company',
      header: () => 'Company',
      cell: (info) => info.getValue() || 'N/A',
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
    <Table<IUser>
      data={users}
      columns={columns}
      globalFilterPlaceholder="Search all Users..."
      showColumnSort
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  )
}

export default UsersTable
