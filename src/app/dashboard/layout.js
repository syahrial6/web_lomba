import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
      <SidebarTrigger className="lg:hidden" />
        {children}
      </main>
    </SidebarProvider>
  )
}
