import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TableSkeletonProps {
  rows?: number
  columns?: number
  title?: string
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between rounded-md rounded-b-none p-4">
        <div className="flex items-center gap-4">
          <p className="text-md font-medium self-center text-center text-white">Loading...</p>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 bg-gray-700" />
        </div>
      </div>

      <div className="border border-border overflow-hidden">
        <Table>
          <TableHeader className="border-border bg-background">
            <TableRow>
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead key={index} className="border-r border-border last:border-r-0 h-12">
                  <Skeleton className="h-4 w-20 bg-gray-700" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                className="border-b border-border h-12"
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell 
                    key={colIndex} 
                    className="border-r border-border last:border-r-0 h-12"
                  >
                    {colIndex === 0 ? (
                      <Skeleton className="h-4 w-16 bg-gray-700" />
                    ) : colIndex === 1 ? (
                      <Skeleton className="h-4 w-16 bg-gray-700" />
                    ) : colIndex === columns - 1 ? (
                      <Skeleton className="h-4 w-16 bg-gray-700" />
                    ) : (
                      <Skeleton className="h-4 w-16 bg-gray-700" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between gap-8 rounded-md rounded-t-none border border-t-0 border-border p-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-20 bg-gray-700" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24 bg-gray-700" />
        </div>
      </div>
    </div>
  )
}
