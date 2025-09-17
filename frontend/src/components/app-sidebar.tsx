import { Home, Inbox, Settings, MessageCirclePlus } from "lucide-react"
import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Conversas",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Configurações",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const { open, setOpen } = useSidebar();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const handleDropdownChange = (open: boolean) => {
        setDropdownOpen(open);

        if (!open) {
            setOpen(false);
        }

    }

    return (
        <Sidebar
            collapsible="icon"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
                if (!dropdownOpen) {
                    setOpen(false);
                }
            }}
        >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownChange}>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton size={"lg"} isActive={dropdownOpen}
                                            className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground !outline-none !ring-0 cursor-pointer">
                                            <Avatar>
                                                <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
                                                <AvatarFallback>UA</AvatarFallback>
                                            </Avatar>
                                            <span>Alesito</span>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#">Meu Perfil</a>
                                            </SidebarMenuButton>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#">Sair</a>
                                            </SidebarMenuButton>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                            </SidebarMenuItem>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
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
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuButton asChild
                        className={`
    bg-primary text-white font-bold 
    hover:bg-primary/90 hover:text-white 
    transition-all duration-200 ease-in-out 
    rounded-md
    ${open ? "p-5 mb-2" : ""}
  `}>
                        <a href="#">
                            <MessageCirclePlus />
                            <span>Nova conversa</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
