import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { PaginationState, Table as TanstackTable } from "@tanstack/react-table"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useQueryState, parseAsString } from "nuqs"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import { TableService } from "@/lib/services/table-service"
import { OpportunitiesData } from "@/types/list-type"
import { useOpportunitiesColumns } from "./opportunities-columns"
import { Table, TableHeader, TableBody } from "@/components/ui/table"
import DataTablePagination from "@/components/common/pagination"
import GeneralToolbar from "@/components/common/table-toolbar"
import OpportunitiesTableHeader from "./opportunities-table-header"
import OpportunitiesTableRow from "./opportunities-table-row"

const OpportunitiesTable = () => {
  const columns = useOpportunitiesColumns()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  })
  const [globalFilter, setGlobalFilter] = useQueryState(
    "opportunitiesSearch",
    parseAsString.withDefault("")
  )

  const debouncedSearch = useDebouncedValue(globalFilter, 500)

  const { data: opportunitiesData, isLoading } = useQuery({
    queryKey: ["opportunitiesTable", debouncedSearch],
    queryFn: () => TableService.getOpportunities({ opportunitiesSearch: debouncedSearch }),
  })

  const table: TanstackTable<OpportunitiesData> = useReactTable({
    data: opportunitiesData ?? [],
    columns,
    initialState: {
      sorting: [
        {
          id: "score",
          desc: true,
        },
      ],
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination,
      globalFilter,
    },
    manualPagination: false,
    manualFiltering: false,
    getColumnCanGlobalFilter: (column) => column.id === "id",
  })
  
  return (
    <div className="mb-8">
      <GeneralToolbar 
        table={table} 
        title={`Opportunities ${isLoading ? "Loading..." : (opportunitiesData?.length ?? 0)}`} 
      />
      
      {isLoading ? (
        <div className="rounded-t-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted text-muted-foreground">
              <tr>
                {Array.from({ length: 6 }).map((_, index) => (
                  <th key={index} className="border-r border-border last:border-r-0 h-12 p-4">
                    <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border h-12">
                  {Array.from({ length: 6 }).map((_, colIndex) => (
                    <td key={colIndex} className="border-r border-border last:border-r-0 h-12 p-4">
                      <div className="h-4 w-16 bg-muted rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : opportunitiesData?.length && opportunitiesData.length > 0 ? (
        <>
          <div className="rounded-t-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted text-muted-foreground">
                {table.getHeaderGroups().map((headerGroup) => (
                  <OpportunitiesTableHeader
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                  />
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <OpportunitiesTableRow key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination
            meta={{
              page: pagination.pageIndex + 1,
              pages: Math.ceil((opportunitiesData?.length ?? 0) / pagination.pageSize),
              count: opportunitiesData?.length ?? 0,
              next: null,
              previous: null
            }}
            page={pagination.pageIndex + 1}
            pageSize={pagination.pageSize}
            table={table}
            isLoading={isLoading}
          />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-muted-foreground p-4">No opportunities found</p>
        </div>
      )}
    </div>
  )
}

export default OpportunitiesTable