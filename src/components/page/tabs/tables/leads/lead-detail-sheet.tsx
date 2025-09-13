import { LeadsData } from "@/types/list-type"
import {
  Sheet,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Building2, Globe, TrendingUp, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { z } from "zod"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { saveLeadData } from "@/lib/services/leads-service"
import { getStatusColor } from "@/lib/utils/status-utils"
import { LocalStorageService } from "@/lib/services/localstorage-service"

const leadEditSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Unqualified'])
})

type LeadEditData = z.infer<typeof leadEditSchema>

interface LeadDetailSheetProps {
  lead: LeadsData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LeadDetailSheet({ lead, open, onOpenChange }: LeadDetailSheetProps) {
  const queryClient = useQueryClient()
  const [editableData, setEditableData] = useState<LeadEditData>({
    email: lead?.email || '',
    status: (lead?.status as LeadEditData['status']) || 'New'
  })

  const [errors, setErrors] = useState<Partial<Record<keyof LeadEditData, string>>>({})

  const [hasChanges, setHasChanges] = useState(false)

  const [isSaving, setIsSaving] = useState(false)
  const [isConverting, setIsConverting] = useState(false)

  useEffect(() => {
    if (lead) {
      setEditableData({
        email: lead.email,
        status: lead.status as LeadEditData['status']
      })
      setErrors({})
      setHasChanges(false)
    }
  }, [lead])

  if (!lead) return null

  const validateField = (field: keyof LeadEditData, value: string) => {
    try {
      leadEditSchema.shape[field].parse(value)
      setErrors(prev => ({ ...prev, [field]: undefined }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0]?.message }))
      }
      return false
    }
  }

  const handleFieldChange = (field: keyof LeadEditData, value: string) => {
    setEditableData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
    validateField(field, value)
  }

  const handleSave = async () => {
    try {
      leadEditSchema.parse(editableData)
      
      setIsSaving(true)
      
      const success = await saveLeadData(lead.id, editableData)
      
      if (success) {
        toast.success('Lead data saved successfully!')
        setHasChanges(false)
        
        queryClient.invalidateQueries({ queryKey: ["leadsTable"] })
        
        setTimeout(() => {
          onOpenChange(false)
        }, 1000)
      } else {
        toast.error('Failed to save data. Please try again.')
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof LeadEditData, string>> = {}
        error.issues.forEach((issue: z.ZodIssue) => {
          if (issue.path[0]) {
            newErrors[issue.path[0] as keyof LeadEditData] = issue.message
          }
        })
        setErrors(newErrors)
      } else {
        toast.error('Unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditableData({
      email: lead.email,
      status: lead.status as LeadEditData['status']
    })
    setErrors({})
    setHasChanges(false)
    onOpenChange(false)
  }

  const handleConvertLead = async () => {
    if (!lead) return
    
    try {
      setIsConverting(true)
      
      const success = LocalStorageService.convertLeadToOpportunity(lead)
      
      if (success) {
        toast.success('Lead converted to opportunity successfully!')
        
        queryClient.invalidateQueries({ queryKey: ["opportunitiesTable"] })
        queryClient.invalidateQueries({ queryKey: ["leadsTable"] })
        
        setTimeout(() => {
          onOpenChange(false)
        }, 1000)
      } else {
        toast.error('Failed to convert lead. Please try again.')
      }
      
    } catch (error) {
      console.error('Error converting lead:', error)
      toast.error('Unexpected error occurred. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }


  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 75) return 'text-yellow-500'
    if (score >= 60) return 'text-orange-500'
    return 'text-red-500'
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">

        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-4 w-4" />
                {lead.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">             
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    value={editableData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter lead email"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-sm font-medium">{lead.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <Select 
                  value={editableData.status} 
                  onValueChange={(value) => handleFieldChange('status', value)}
                >
                  <SelectTrigger className={`mt-1 ${errors.status ? 'border-red-500' : ''}`}>
                    <div className="flex items-center gap-2">
                      <Badge className="text-white flex items-center gap-2" variant="outline">
                        <span className={`${getStatusColor(editableData.status)} h-2 w-2 rounded-full`}/>
                        {editableData.status}
                      </Badge>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="px-2">
                    <SelectItem value="New">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-500 h-2 w-2 rounded-full"/>
                        <Badge className="text-white" variant="outline">New</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="Contacted">
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-500 h-2 w-2 rounded-full"/>
                        <Badge className="text-white" variant="outline">Contacted</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="Qualified">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-500 h-2 w-2 rounded-full"/>
                        <Badge className="text-white" variant="outline">Qualified</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="Unqualified">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-500 h-2 w-2 rounded-full"/>
                        <Badge className="text-white" variant="outline">Unqualified</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-500 mt-1">{errors.status}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Score</label>
                <p className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                  {lead.score}
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${getScoreColor(lead.score).replace('text-', 'bg-')}`}
                    style={{ width: `${lead.score}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Source</label>
                  <p className="text-sm font-medium">{lead.source}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Separator className="mt-6" />
        <SheetFooter className="mt-6">
          <div className="flex flex-col items-center justify-center flex-1 gap-3 ">
            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                onClick={handleSave}
                disabled={!hasChanges || Object.keys(errors).some(key => errors[key as keyof LeadEditData]) || isSaving}
                className={`${!hasChanges || Object.keys(errors).some(key => errors[key as keyof LeadEditData]) || isSaving ? '' : 'cursor-pointer'}`}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleCancel}
                disabled={isSaving}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </div>
            <Button 
              variant="default" 
              className="flex-1 cursor-pointer"
              onClick={handleConvertLead}
              disabled={isConverting || isSaving}
            >
              {isConverting ? 'Converting...' : 'Convert Lead'}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
