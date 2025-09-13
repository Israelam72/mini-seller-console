import { useId } from "react"
import { Table } from "@tanstack/react-table"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import { Meta } from "@/types/pagination-type"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<TData> {
  meta: Meta | undefined
  page: number
  pageSize: number
  table: Table<TData>
  isLoading: boolean
  totalCount?: number
}

export default function DataTablePagination<TData>({
  meta,
  page,
  pageSize,
  table,
  isLoading,
  totalCount,
}: DataTablePaginationProps<TData>) {
  const id = useId()

  const actualCount = totalCount || meta?.count || 0
  const startItem = actualCount > 0 ? (page - 1) * pageSize + 1 : 0
  const endItem = Math.min(page * pageSize, actualCount)

  return (
    <div className="flex items-center justify-between gap-8 rounded-md rounded-t-none border border-t-0 border-border p-2">
      <div className="flex items-center gap-3">
        <Label className="max-sm:sr-only">
          Rows per page
        </Label>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
          disabled={isLoading}
        >
          <SelectTrigger id={id} className="w-fit whitespace-nowrap">
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-popover-foreground [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
            {[5, 15, 30, 50].map((size) => (
              <SelectItem 
                key={size} 
                value={size.toString()}
                className="text-popover-foreground hover:bg-accent focus:bg-accent focus:text-accent-foreground"
              >
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-muted-foreground flex grow justify-end whitespace-nowrap text-sm">
        <p
          className="text-muted-foreground whitespace-nowrap text-sm"
          aria-live="polite"
        >
          <span className="text-foreground">
            {startItem}-{endItem}
          </span>

          <span className="mx-2">of</span>

          <span className="text-foreground">{actualCount.toString()}</span>
        </p>
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage() || isLoading}
                aria-label="Go to first page"
              >
                <ChevronFirstIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={table.previousPage}
                disabled={!table.getCanPreviousPage() || isLoading}
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={table.nextPage}
                disabled={!table.getCanNextPage() || isLoading}
                aria-label="Go to next page"
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                size="sm"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage() || isLoading}
                aria-label="Go to last page"
              >
                <ChevronLastIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
