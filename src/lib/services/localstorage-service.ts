import { LeadsData, OpportunitiesData } from "../../types/list-type"

const LEADS_STORAGE_KEY = 'mini-seller-leads-data'
const OPPORTUNITIES_STORAGE_KEY = 'mini-seller-opportunities-data'

export class LocalStorageService {

  static getLeads(): LeadsData[] {
    try {
      const storedData = localStorage.getItem(LEADS_STORAGE_KEY)
      if (!storedData) {
        return []
      }
      return JSON.parse(storedData) as LeadsData[]
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      return []
    }
  }


  static saveLeads(leads: LeadsData[]): boolean {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads))
      return true
    } catch (error) {
      console.error('Error saving data to localStorage:', error)
      return false
    }
  }

  static async initializeLeadsData(): Promise<boolean> {
    try {
      const existingData = this.getLeads()
      if (existingData.length > 0) {
        return true
      }


      const response = await fetch('/data-leads.json')
      if (!response.ok) {
        throw new Error('Failed to load data from JSON')
      }
      
      const jsonData: LeadsData[] = await response.json()
      
      const success = this.saveLeads(jsonData)
      
      return success
    } catch (error) {
      console.error('Error initializing data:', error)
      return false
    }
  }


  static updateLead(leadId: number, updatedData: Partial<LeadsData>): boolean {
    try {
      const leads = this.getLeads()
      const leadIndex = leads.findIndex(lead => lead.id === leadId)
      
      if (leadIndex === -1) {
        console.error('Lead not found:', leadId)
        return false
      }

      leads[leadIndex] = { ...leads[leadIndex], ...updatedData }
      
      return this.saveLeads(leads)
    } catch (error) {
      console.error('Error updating lead:', error)
      return false
    }
  }

  static deleteLead(leadId: number): boolean {
    try {
      const leads = this.getLeads()
      const leadIndex = leads.findIndex(lead => lead.id === leadId)
      
      if (leadIndex === -1) {
        console.error('Lead not found:', leadId)
        return false
      }

      leads.splice(leadIndex, 1)
      
      return this.saveLeads(leads)
    } catch (error) {
      console.error('Error deleting lead:', error)
      return false
    }
  }

  static clearLeadsData(): void {
    try {
      localStorage.removeItem(LEADS_STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing data:', error)
    }
  }


  static hasLeadsData(): boolean {
    const data = this.getLeads()
    return data.length > 0
  }

  // Opportunities methods
  static getOpportunities(): OpportunitiesData[] {
    try {
      const storedData = localStorage.getItem(OPPORTUNITIES_STORAGE_KEY)
      if (!storedData) {
        return []
      }
      return JSON.parse(storedData) as OpportunitiesData[]
    } catch (error) {
      console.error('Error loading opportunities from localStorage:', error)
      return []
    }
  }

  static saveOpportunities(opportunities: OpportunitiesData[]): boolean {
    try {
      localStorage.setItem(OPPORTUNITIES_STORAGE_KEY, JSON.stringify(opportunities))
      return true
    } catch (error) {
      console.error('Error saving opportunities to localStorage:', error)
      return false
    }
  }

  static addOpportunity(opportunity: OpportunitiesData): boolean {
    try {
      const opportunities = this.getOpportunities()
      opportunities.push(opportunity)
      return this.saveOpportunities(opportunities)
    } catch (error) {
      console.error('Error adding opportunity:', error)
      return false
    }
  }

  static convertLeadToOpportunity(lead: LeadsData): boolean {
    try {
      // Generate random amount between 1000 and 10999
      const amount = Math.floor(Math.random() * 10000) + 1000
      
      // Create account name by concatenating person name + company
      const accountName = `${lead.name} - ${lead.company}`
      
      // Create new opportunity
      const opportunity: OpportunitiesData = {
        id: lead.id,
        name: lead.name,
        stage: 'Initial Contact',
        amount: amount,
        account_name: accountName
      }
      
      const opportunityAdded = this.addOpportunity(opportunity)
      
      if (opportunityAdded) {
        const leadDeleted = this.deleteLead(lead.id)
        
        if (!leadDeleted) {
          console.warn('Opportunity was created but lead could not be deleted')
        }
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error converting lead to opportunity:', error)
      return false
    }
  }
}