import { Column, Table } from '@tanstack/react-table'
import { useMemo } from 'react'

import DebouncedInput from '@/components/common/DebouncedInput/DebouncedInput'

interface FilterProps<T> {
  column: Column<T, unknown>
  table: Table<T>
}

export default function Filter<T>({ column, table }: FilterProps<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  if (typeof firstValue === 'number') {
    return (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                value ? Number(value) : undefined,
                old?.[1],
              ])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            showXButton={false}
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                value ? Number(value) : undefined,
              ])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            showXButton={false}
          />
        </div>
        <div className="h-1" />
      </div>
    )
  }

  return (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues
          .slice(0, 5)
          ?.map((value) => <option value={value} key={value} />)}
      </datalist>
      <DebouncedInput
        className="mt-1 text-sm font-normal w-48 rounded-md"
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  )
}
