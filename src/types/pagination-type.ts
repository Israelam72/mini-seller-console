export type PaginatedResponse<T> = {
  results: T[]
  meta: Meta
}

export type Meta = {
  page: number
  pages: number
  count: number
  active_count?: number
  resolved_count?: number
  next: string | null
  previous: string | null
}

export type LimitOffSet<T> = {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}
