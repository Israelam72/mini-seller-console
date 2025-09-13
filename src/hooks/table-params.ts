import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"

export type TableQueryParams = {
  page?: number
  page_size?: number
  search?: string
  order?: string
  id?: number | null
  active_filter?: string
  leadsSearch?: string
  opportunitiesSearch?: string
  statusFilter?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const tableQueryParamsParser = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(15),
  search: parseAsString.withDefault(""),
  order: parseAsString.withDefault("-discovered_at"),
  id: parseAsInteger,
  active_filter: parseAsString.withDefault("all"),
  leadsSearch: parseAsString.withDefault(""),
  opportunitiesSearch: parseAsString.withDefault(""),
  sortBy: parseAsString.withDefault("score"),
  sortOrder: parseAsString.withDefault("desc"),
}

export const TableQueryParamsCache = createSearchParamsCache(
  tableQueryParamsParser
)

export const defaultTableQueryParams = {
  page: 1,
  page_size: 15,
  search: "",
  active_filter: "all",
  leadsSearch: "",
  opportunitiesSearch: "",
  sortBy: "score",
  sortOrder: "desc" as const,
}
