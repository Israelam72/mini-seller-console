import { LeadsData } from "@/types/list-type"
import { LocalStorageService } from "./localstorage-service"

export const saveLeadData = async (leadId: number, updatedData: { email: string; status: string }): Promise<boolean> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const success = LocalStorageService.updateLead(leadId, {
      email: updatedData.email,
      status: updatedData.status
    })
    
    if (!success) {
      throw new Error('Failed to save to localStorage')
    }
    
    if (Math.random() > 0.05) {
      return true
    } else {
      throw new Error('Simulated network error - please try again')
    }
    
  } catch (error) {
    console.error('Error saving lead data:', error)
    return false
  }
}

export const downloadLeadsAsJson = (leads?: LeadsData[]) => {
  const leadsToDownload = leads || LocalStorageService.getLeads()
  
  const dataStr = JSON.stringify(leadsToDownload, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'data-leads.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
