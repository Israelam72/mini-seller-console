import { useState } from "react"
import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, getFacetedRowModel, getFacetedUniqueValues, type PaginationState, type ColumnDef, SortingState, OnChangeFn } from "@tanstack/react-table"

interface UseTableConfigProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  initialSorting?: { id: string; desc: boolean }[]
  onSortingChange?: (updater: SortingState) => void
  manualSorting?: boolean
}

export function useTableConfig<T>({
  data,
  columns,
  globalFilter,
  onGlobalFilterChange,
  initialSorting = [],
  onSortingChange,
  manualSorting = false
}: UseTableConfigProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  })

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      sorting: initialSorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    onGlobalFilterChange,
    onSortingChange: onSortingChange as OnChangeFn<SortingState>,
    state: {
      pagination,
      globalFilter,
      ...(initialSorting.length > 0 && { sorting: initialSorting }),
    },
    manualPagination: false,
    manualFiltering: false,
    manualSorting,
    getColumnCanGlobalFilter: (column) => 
      column.id === "name" || column.id === "company" || column.id === "email"
  })

  return { table, pagination }
}
