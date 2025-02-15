import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenu, SidebarGroup, SidebarGroupContent, SidebarProvider, SidebarTrigger, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

import QauntumDashboardIcon from "@/components/icons/dashboard";
import QuantumPulseIcon from "@/components/icons/pulse";
import QuantumCommentDotsIcon from "@/components/icons/comment-dots";
import QuantumStethoscopeIcon from "@/components/icons/stethoscope";
import QuantumBloodTestTubeIcon from "@/components/icons/blood-test-tube";
import QuantumCrystalBallIcon from "@/components/icons/crystal-ball";
import QuantumChatbotIcon from "@/components/icons/chatbot";
import QuantumLogoutIcon from "@/components/icons/logout";

const items = [
    { title: "Dashboard", url: "/dashboard", icon: QauntumDashboardIcon },
    { title: "My Vitals", url: "/my-vitals", icon: QuantumPulseIcon },
    { title: "Consultations", url: "/consultations", icon: QuantumCommentDotsIcon },
    { title: "Recommendations", url: "/recommendations", icon: QuantumStethoscopeIcon },
    { title: "Lab Results", url: "/test-results", icon: QuantumBloodTestTubeIcon },
    { title: "Future Predictions", url: "/future-predictions", icon: QuantumCrystalBallIcon },
    { title: "Chat Bot", url: "/chat-bot", icon: QuantumChatbotIcon },
]

const AppSidebar = () => {

    const router = useRouter();

  return (
    <Sidebar>
      <SidebarContent className="bg-quantum-blue text-white font-semibold flex flex-col justify-between items-start">
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-12">
                  <SidebarMenuButton asChild isActive={router.pathname === item.url} className="h-12 data-[active=true]">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                <SidebarMenuItem className="h-12">
                        <SidebarMenuButton asChild className="h-12">
                            <Button variant="destructive" className="h-12 flex flex-row justify-start items-center gap-2">
                                <QuantumLogoutIcon />
                                <span>Logout</span>
                            </Button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="static top-0 right-0" />
            <div className="bg-white flex flex-col items-center justify-center h-screen w-full overflow-y-scroll">
                {children}
            </div>
        </SidebarProvider>
    )
}

export default DashboardLayout;