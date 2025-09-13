import { flexRender, type HeaderGroup } from "@tanstack/react-table"

import { OpportunitiesData } from "@/types/list-type"
import { TableHead, TableRow } from "@/components/ui/table"

interface OpportunitiesTableHeaderProps {
  headerGroup: HeaderGroup<OpportunitiesData>
}
export default function OpportunitiesTableHeader({
  headerGroup,
}: OpportunitiesTableHeaderProps) {
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
