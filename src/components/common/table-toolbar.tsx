import { useEffect, useMemo, useState } from "react"
import { Table } from "@tanstack/react-table"
import { ListFilter, Undo2Icon, Check } from "lucide-react"

import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/common/search"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GeneralToolbarProps<TData> {
  table: Table<TData>
  title: string
  toolComponent?: React.ReactNode
  leads?: boolean
  statusFilter?: string[]
  onStatusFilterChange?: (status: string[]) => void
}

const GeneralToolbar = <TData,>({
  table,
  title,
  leads,
  statusFilter,
  onStatusFilterChange,
}: GeneralToolbarProps<TData>) => {
  const { globalFilter } = table.getState()
  const [searchValue, setSearchValue] = useState(globalFilter ?? "")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    setSearchValue(globalFilter ?? "")
  }, [globalFilter])

  const handleSearch = (value: string) => {
    setSearchValue(value)
    setIsTyping(true)
    table.setGlobalFilter(value)
    setIsTyping(false)
  }

  const handleReset = () => {
    setSearchValue("")
    table.setGlobalFilter("")
    table.resetSorting()
    table.setPageIndex(0)
    if (onStatusFilterChange) {
      onStatusFilterChange([])
    }
  }

  const isFiltered = useMemo(() => !!globalFilter || (statusFilter && statusFilter.length > 0), [globalFilter, statusFilter])

  return (
    <div className="flex items-center justify-between mb-2 gap-2">
      <div className="flex items-center gap-2">
        <h3 className="text-md font-medium">{title}</h3>  
      </div>
      <div className="flex items-center gap-2">
      {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleReset}
            className="h-8 px-2 lg:px-3"
          >
            Clear Filters
            <Undo2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {leads && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer px-2 pt-1.5 hover:bg-muted rounded-md">
              <Button
                variant="ghost"
                className="bg-transparent cursor-pointer border-none ring-0 p-0 h-auto hover:bg-transparent text-black dark:text-white"
              >
                <ListFilter className="h-4 w-4" />
              </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-popover border-border text-popover-foreground" align="end">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Filter by Status</h4>
                {['New', 'Contacted', 'Qualified', 'Unqualified'].map((status) => (
                  <div
                    key={status}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-muted p-1 rounded"
                    onClick={() => {
                      const currentFilters = statusFilter || []
                      const newFilters = currentFilters.includes(status)
                        ? currentFilters.filter(s => s !== status)
                        : [...currentFilters, status]
                      onStatusFilterChange?.(newFilters)
                    }}
                  >
                    <div className="w-4 h-4 border border-zinc-600 rounded flex items-center justify-center">
                      {statusFilter?.includes(status) && (
                        <Check className="h-3 w-3 text-black dark:text-white cursor-pointer" />
                      )}
                    </div>
                    <span className="text-sm cursor-pointer">{status}</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
        <SearchInput
          isLoading={isTyping}
          placeholder="Search"
          value={searchValue || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)}
          className={cn(
            "h-8 w-[200px] border pl-8 focus-visible:ring-0 focus-visible:ring-offset-0 bg-background hover:bg-muted ring-0 ring-offset-0"
          )}
        />
      </div>
    </div>
  )
}

export default GeneralToolbar
