import { useMemo } from "react"
import { type ColumnDef } from "@tanstack/react-table"

import { OpportunitiesData } from "@/types/list-type"

export const useOpportunitiesColumns =
  (): ColumnDef<OpportunitiesData>[] => {

    const columns: ColumnDef<OpportunitiesData>[] = useMemo(
      () => [
        {
          accessorKey: "name",
          header: () => (
            <div className="text-[13px] font-medium">Name</div>
          ),
          cell: ({ row }) => (
            <div className="flex flex-col text-[13px] font-medium">
              <p>{row.original.name}</p>
            </div>
          ),
          size: 200,
        },
        {
          accessorKey: "stage",
          header: () => (
            <div className="text-[13px] font-medium">Stage</div>
          ),
          cell: ({ row }) => (
            <div className="text-[13px] font-medium">
              {row.original.stage}
            </div>
          ),
          size: 100,
        },
        {
          accessorKey: "amount",
          header: () => (
            <div className="text-[13px] font-medium">Amount</div>
          ),
          cell: ({ row }) => (
            <div className="text-[13px] font-medium">
              ${row.original.amount}
            </div>
          ),
          size: 120,
        },
        {
          accessorKey: "account_name",
          header: () => (
            <div className="text-[13px] font-medium">Account Name</div>
          ),
          cell: ({ row }) => (
            <div className="text-[13px] font-medium">
              {row.original.account_name}
            </div>
          ),
          size: 120,
        },
      ],
      []
    )

    return columns
  }
