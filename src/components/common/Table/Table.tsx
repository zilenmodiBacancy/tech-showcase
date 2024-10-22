/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  TableOptions,
  RowSelectionState,
} from '@tanstack/react-table'
import React, { useState } from 'react'

import Button from '@/components/common/Button/Button'
import Dropdown from '@/components/common/Dropdown/Dropdown'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import Filter from '@/components/common/Table/Filter'

interface ITable<T> {
  globalFilter: string
  setGlobalFilter: (e: string) => void
  globalFilterPlaceholder: string
  data: T[]
  columns: ColumnDef<T, any>[]
  showGlobalFilter?: boolean
  showColumnFilter?: boolean
  showPaginatedRow?: boolean
  showGlobalFooter?: boolean
  showColumnSort?: boolean
  getTableRowData?: (data: T[]) => void
  pagination?: PaginationState
  showRowSelection?: boolean
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>
  rowSelection?: RowSelectionState
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
  enableMultiRowSelection?: boolean
}

export function Table<T>({
  data,
  columns,
  globalFilterPlaceholder,
  globalFilter,
  setGlobalFilter,
  showGlobalFilter = true,
  showColumnFilter = true,
  showPaginatedRow = false,
  showGlobalFooter = false,
  showColumnSort = false,
  pagination,
  setPagination,
  showRowSelection = false,
  rowSelection,
  setRowSelection,
  enableMultiRowSelection = true,
}: ITable<T>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  let tableConfig: TableOptions<T> = {
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  }

  if (showRowSelection) {
    tableConfig = {
      ...tableConfig,
      state: { ...tableConfig.state, rowSelection },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      enableMultiRowSelection,
    }
  }

  if (showColumnSort) {
    tableConfig = {
      ...tableConfig,
      state: { ...tableConfig.state, sorting },
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
    }
  }

  if (showPaginatedRow) {
    tableConfig = {
      ...tableConfig,
      state: { ...tableConfig.state, pagination },
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
    }
  }

  const table = useReactTable(tableConfig)

  // TODO: Added Temporary solution to lift up table row's state to parent component using useEffect, Need to figure it out standard way to lift up table state to parent component.

  return (
    <div className="mt-4 flow-root">
      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block w-full min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="flex gap-4">
            {showGlobalFilter && (
              <SearchBar
                placeholder={globalFilterPlaceholder}
                onChangeHandler={(e) => setGlobalFilter(e.target.value)}
                inputClassName="mb-5"
              />
            )}
          </div>

          <div className="overflow-x-auto overflow-y-hidden shadow ring-1 ring-muted-ring ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-muted-border">
              <thead className="bg-accent">
                {table.getHeaderGroups()?.map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers?.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="px-3 py-3.5 text-left text-sm font-semibold text-foreground"
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            {header.column.getCanSort() && showColumnSort ? (
                              <div
                                className={`cursor-pointer select-none flex min-w-[36px] ${header.column.getCanSort() ? '' : ''}`}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: <span className="pl-2">↑</span>,
                                  desc: <span className="pl-2">↓</span>,
                                }[header.column.getIsSorted() as string] ??
                                  null}
                              </div>
                            ) : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            )}
                          </>
                        )}

                        {/* Column-wise filters */}
                        {header.column.getCanFilter() && showColumnFilter ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-muted-border bg-card">
                {table.getRowModel().rows?.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells()?.map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {showGlobalFooter && (
                <tfoot className="bg-accent">
                  {table.getFooterGroups()?.map((footerGroup) => (
                    <tr key={footerGroup.id}>
                      {footerGroup.headers?.map((footer) => (
                        <th
                          key={footer.id}
                          colSpan={footer.colSpan}
                          className="px-3 py-3.5 text-left text-sm font-semibold text-foreground"
                        >
                          {footer.isPlaceholder
                            ? null
                            : flexRender(
                                footer.column.columnDef.footer,
                                footer.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              )}
            </table>

            {/* Pagination */}
            {showPaginatedRow && (
              <div className="flex gap-8 py-4 px-6 w-full justify-end bg-accent text-foreground items-center">
                <div className="flex gap-4">
                  <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'<'}
                  </Button>
                  <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {'>'}
                  </Button>
                </div>

                <div className="font-medium">
                  Page {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </div>

                <div className="w-28">
                  <Dropdown
                    name="pagination"
                    value={String(table.getState().pagination.pageSize)}
                    onChangeHandler={(e) => {
                      table.setPageSize(Number(e.target.value))
                    }}
                    list={[
                      { id: '10', name: '10' },
                      { id: '25', name: '25' },
                      { id: '50', name: '50' },
                      { id: '100', name: '100' },
                    ]}
                  />
                </div>
              </div>
            )}
            {/* Pagination */}
          </div>
        </div>
      </div>
    </div>
  )
}
