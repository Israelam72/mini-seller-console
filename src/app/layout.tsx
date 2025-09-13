import TabsComponent from "@/components/page/tabs/tabs"
import Topbar from "@/components/page/topbar/topbar"
import { Toaster } from "sonner"
import { useTheme } from "@/hooks/use-theme"

function RootLayout() {
  const { theme } = useTheme()

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-background text-foreground">
      <Topbar />
      <TabsComponent />
      <Toaster 
        theme={theme}
        position="bottom-right"
        expand={true}
        richColors={true}
        closeButton={true}
      />
    </main>
  )
}

export default RootLayout
