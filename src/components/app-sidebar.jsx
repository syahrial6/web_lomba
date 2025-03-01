
'use client'
  import { Calendar, Home, Inbox, Search, Settings,User } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {  usePathname } from "next/navigation"
import Link from "next/link"

  

  const items = [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,

    },
    {
      title: "User",
      url: "/dashboard/user",
      icon: User,

    },
    {
      title: "Nilai Siswa",
      url: "/dashboard/nilai",
      icon: Inbox,

    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]
  export function AppSidebar() {
    const pathName = usePathname()
    
    return (
      <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground font-Poppins font-bold text-2xl my-8 text-center">Dashboard Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-lg hover:bg-blue-200" asChild>
                    <Link className={`${pathName === item.url ? "bg-blue-500 text-white px-2 py-6" : "px-2 py-6"}`} href={item.url}>
                      <item.icon  />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    )
  }
  