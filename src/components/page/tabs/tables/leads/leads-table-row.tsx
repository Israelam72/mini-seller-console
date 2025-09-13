import { flexRender, type Row } from "@tanstack/react-table"

import { LeadsData } from "@/types/list-type"
import { TableCell, TableRow } from "@/components/ui/table"

interface LeadsTableRowProps {
  row: Row<LeadsData>
  onRowClick?: () => void
}

export default function LeadsTableRow({ row, onRowClick }: LeadsTableRowProps) {
  return (
    <TableRow
      key={row.original.id}
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={onRowClick}
    >
      {row.getVisibleCells().map((cell, index) => (
        <TableCell key={cell.id} className={index === 0 ? "relative" : ""}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
