import { TableQueryParams } from "@/hooks/table-params"
import { LeadsData, OpportunitiesData } from "@/types/list-type"
import { LocalStorageService } from "./localstorage-service"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function getLeads(params: TableQueryParams): Promise<LeadsData[]> {
  await delay(500)
  
  await LocalStorageService.initializeLeadsData()
    
  let filteredData = [...LocalStorageService.getLeads()]
  
  if (params.statusFilter && params.statusFilter) {
    const statuses = params.statusFilter.split(',').filter(Boolean)
    if (statuses.length > 0) {
      filteredData = filteredData.filter(lead => statuses.includes(lead.status))
    }
  }
  
  const searchTerm = params.leadsSearch || params.search || ""
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase()
    filteredData = filteredData.filter(lead => 
      lead.name.toLowerCase().includes(searchLower) ||
      lead.company.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.source.toLowerCase().includes(searchLower)
    )
  }
  
  if (params.sortBy && params.sortOrder) {
    filteredData.sort((a, b) => {
      const sortBy = params.sortBy as keyof LeadsData
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return params.sortOrder === 'desc' ? bValue - aValue : aValue - bValue
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return params.sortOrder === 'desc' 
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue)
      }
      
      return 0
    })
  } else {
    filteredData.sort((a, b) => b.score - a.score)
  }
  
  return filteredData
}

async function getOpportunities(params: TableQueryParams): Promise<OpportunitiesData[]> {
  await delay(500)
  
  let filteredData = [...LocalStorageService.getOpportunities()]
  
  const searchTerm = params.opportunitiesSearch || params.search || ""
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase()
    filteredData = filteredData.filter(opportunity => 
      opportunity.name.toLowerCase().includes(searchLower) ||
      opportunity.stage.toLowerCase().includes(searchLower) ||
      opportunity.amount.toString().toLowerCase().includes(searchLower) ||
      opportunity.account_name.toLowerCase().includes(searchLower)
    )
  }
  
  filteredData.sort((a, b) => b.amount - a.amount)
  
  return filteredData
}

export const TableService = {
  getLeads,
  getOpportunities,
}
