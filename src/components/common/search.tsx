import { useId } from "react"
import { RefreshCw, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils/utils"

import { Input } from "@/components/ui/input"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean
  placeholder?: string
  containerClassName?: string
}

export default function SearchInput({
  isLoading,
  placeholder,
  containerClassName,
  ...rest
}: SearchInputProps) {
  const id = useId()

  return (
    <div className={cn("relative", containerClassName)}>
      <Input
        id={id}
        className="peer pe-9 ps-9"
        placeholder={placeholder}
        type="search"
        {...rest}
      />

      {isLoading ? (
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <RefreshCw className="mr-2 w-4 animate-spin" />
        </div>
      ) : (
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      )}
    </div>
  )
}
