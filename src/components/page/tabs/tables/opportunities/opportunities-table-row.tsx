import { flexRender, type Row } from "@tanstack/react-table"

import { OpportunitiesData } from "@/types/list-type"
import { TableCell, TableRow } from "@/components/ui/table"

interface OpportunitiesTableRowProps {
  row: Row<OpportunitiesData>
}

export default function OpportunitiesTableRow({ row }: OpportunitiesTableRowProps) {
  return (
    <TableRow
      key={row.original.id}
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableCell key={cell.id} className={index === 0 ? "relative" : ""}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
