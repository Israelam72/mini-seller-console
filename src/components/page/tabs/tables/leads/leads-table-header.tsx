import { flexRender, type HeaderGroup } from "@tanstack/react-table"

import { LeadsData } from "@/types/list-type"
import { TableHead, TableRow } from "@/components/ui/table"

interface LeadsTableHeaderProps {
  headerGroup: HeaderGroup<LeadsData>
}
export default function LeadsTableHeader({
  headerGroup,
}: LeadsTableHeaderProps) {
  return (
    <TableRow>
      {headerGroup.headers.map((header) => (
        <TableHead
          key={header.id}
          style={{ width: `${header.getSize()}px` }}
          className="text-gray-600 dark:text-white font-bold"
        >
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </TableHead>
      ))}
    </TableRow>
  )
}
