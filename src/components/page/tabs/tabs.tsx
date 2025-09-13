import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import LeadsTable from "./tables/leads/leads-table"
import OpportunitiesTable from "./tables/opportunities/opportunities-table"

const TabsComponent = () => {
  return (
    <section className="w-full">
      <Tabs defaultValue="tab-1" className="items-start">
        <TabsList className="h-auto rounded-none border-b bg-transparent p-0 dark:border-border">
          <TabsTrigger
          value="tab-1"
          className="relative rounded-none py-2 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground dark:data-[state=active]:text-foreground"
        >
          Leads
          </TabsTrigger>
          <TabsTrigger
          value="tab-2"
          className="relative rounded-none py-2 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-transparent data-[state=active]:after:bg-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground dark:data-[state=active]:text-foreground"
        >
          Opportunities
          </TabsTrigger>
        </TabsList>
        <Separator className="-translate-y-2 dark:bg-border"/>
        <TabsContent value="tab-1" className="w-full">
          <LeadsTable />
        </TabsContent>
        <TabsContent value="tab-2" className="w-full">
          <OpportunitiesTable />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default TabsComponent