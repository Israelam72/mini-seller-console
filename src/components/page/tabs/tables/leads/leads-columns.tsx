import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { ChevronUp, ChevronDown } from "lucide-react"

import { LeadsData } from "@/types/list-type"
import { getStatusColor } from "@/lib/utils/status-utils"

export const useLeadsColumns =
  (): ColumnDef<LeadsData>[] => {

    const columns: ColumnDef<LeadsData>[] = useMemo(
      () => [
        {
          accessorKey: "name",
          header: () => (
            <div className="text-[13px] font-medium">Name</div>
          ),
          cell: ({ row }) => (
            <div className="flex flex-col text-[13px] font-medium">
              <p>{row.original.name}</p>
              <p className="text-muted-foreground">{row.original.email}</p>
            </div>
          ),
          size: 200,
        },
        {
          accessorKey: "company",
          header: () => (
            <div className="text-[13px] font-medium">Company</div>
          ),
          cell: ({ row }) => (
            <div className="text-[13px] font-medium">
              {row.original.company}
            </div>
          ),
          size: 100,
        },
        {
          accessorKey: "status",
          header: () => (
            <div className="text-[13px] font-medium">Status</div>
          ),
          cell: ({ row }) => (
            <div className="dark:text-white text-black flex items-center gap-2">
              <span className={`${getStatusColor(row.original.status)} h-2 w-2 rounded-full`}/>
              {row.original.status}
            </div>
          ),
          size: 120,
        },
        {
          accessorKey: "score",
          header: ({ column }) => {
            const isSorted = column.getIsSorted()
            return (
              <button
                className="flex items-center text-[13px] font-medium hover:text-white transition-colors"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Score
                <div className="ml-1 flex flex-col">
                  <ChevronUp 
                    className={`w-3 h-3 ${isSorted === 'asc' ? 'text-white' : 'text-gray-500'}`}
                  />
                  <ChevronDown 
                    className={`w-3 h-3 -mt-1 ${isSorted === 'desc' ? 'text-white' : 'text-gray-500'}`}
                  />
                </div>
              </button>
            )
          },
          cell: ({ row }) => (
            <div className="text-[13px] font-medium">
              {row.original.score}
            </div>
          ),
          size: 120,
          enableSorting: true,
        },
      ],
      []
    )

    return columns
  }
