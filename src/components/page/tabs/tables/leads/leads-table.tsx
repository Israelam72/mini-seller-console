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
import { LeadsData } from "@/types/list-type"
import { useLeadsColumns } from "./leads-columns"
import { Table, TableHeader, TableBody } from "@/components/ui/table"
import DataTableRow from "./leads-table-row"
import DataTablePagination from "@/components/common/pagination"
import GeneralToolbar from "@/components/common/table-toolbar"
import LeadsTableHeader from "./leads-table-header"
import LeadDetailSheet from "./lead-detail-sheet"

const LeadsTable = () => {
  const columns = useLeadsColumns()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  })
  const [selectedLead, setSelectedLead] = useState<LeadsData | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [globalFilter, setGlobalFilter] = useQueryState(
    "leadsSearch",
    parseAsString.withDefault("")
  )
  const [statusFilter, setStatusFilter] = useQueryState(
    "leadsStatus",
    parseAsString.withDefault("")
  )
  const [sortBy, setSortBy] = useQueryState(
    "leadsSortBy",
    parseAsString.withDefault("score")
  )
  const [sortOrder, setSortOrder] = useQueryState(
    "leadsSortOrder", 
    parseAsString.withDefault("desc")
  )
  
  const statusArray = statusFilter ? statusFilter.split(',').filter(Boolean) : []
  const handleStatusChange = (statuses: string[]) => {
    setStatusFilter(statuses.join(','))
  }

  const debouncedSearch = useDebouncedValue(globalFilter, 500)

  const handleRowClick = (lead: LeadsData) => {
    setSelectedLead(lead)
    setIsSheetOpen(true)
  }

  const { data: leadsData, isLoading } = useQuery({
    queryKey: ["leadsTable", debouncedSearch, statusFilter, sortBy, sortOrder],
    queryFn: () => TableService.getLeads({ 
      leadsSearch: debouncedSearch, 
      statusFilter, 
      sortBy, 
      sortOrder: sortOrder as 'asc' | 'desc' 
    }),
  })

  const table: TanstackTable<LeadsData> = useReactTable({
    data: leadsData ?? [],
    columns,
    initialState: {
      sorting: [
        {
          id: sortBy,
          desc: sortOrder === "desc",
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
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater([{ id: sortBy, desc: sortOrder === "desc" }]) : updater
      if (newSorting.length > 0) {
        setSortBy(newSorting[0].id)
        setSortOrder(newSorting[0].desc ? "desc" : "asc")
      }
    },
    state: {
      pagination,
      globalFilter,
      sorting: [{ id: sortBy, desc: sortOrder === "desc" }],
    },
    manualPagination: false,
    manualFiltering: false,
    manualSorting: true,
    getColumnCanGlobalFilter: (column) => column.id === "id",
  })
  
  return (
    <div className="mb-8">
      <GeneralToolbar 
        table={table} 
        title={`Leads ${isLoading ? "Loading..." : (leadsData?.length ?? 0)}`} 
        leads={true}
        statusFilter={statusArray}
        onStatusFilterChange={handleStatusChange}
      />
      
      {isLoading ? (
        <div className="rounded-t-md border border-border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <tr>
                {Array.from({ length: 6 }).map((_, index) => (
                  <th key={index} className="border-r border-border last:border-r-0 h-12 p-4">
                    <div className="h-4 w-20 bg-muted"></div>
                  </th>
                ))}
              </tr>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border h-12">
                  {Array.from({ length: 6 }).map((_, colIndex) => (
                    <td key={colIndex} className="border-r border-border last:border-r-0 h-12 p-4">
                      <div className="h-4 w-16 bg-muted"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : leadsData?.length && leadsData.length > 0 ? (
        <>
          <div className="rounded-t-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted text-muted-foreground">
                {table.getHeaderGroups().map((headerGroup) => (
                  <LeadsTableHeader
                    key={headerGroup.id}
                    headerGroup={headerGroup}
                  />
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <DataTableRow 
                    key={row.id} 
                    row={row} 
                    onRowClick={() => handleRowClick(row.original)}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination
            meta={{
              page: pagination.pageIndex + 1,
              pages: Math.ceil((leadsData?.length ?? 0) / pagination.pageSize),
              count: leadsData?.length ?? 0,
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
          <p className="text-muted-foreground p-4">No leads found</p>
        </div>
      )}
      
      <LeadDetailSheet 
        lead={selectedLead}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </div>
  )
}

export default LeadsTable