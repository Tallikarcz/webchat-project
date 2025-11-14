import { MessageCirclePlus } from "lucide-react";
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
} from "@/components/ui/sidebar";

import { NewConversationDialog } from "@/components/chat/NewConversationDialog";
import { UserDropdown } from "@/components/sidebar/UserDropdown";
import { sidebarMenuItems } from "@/config/sidebarConfig";

const items = sidebarMenuItems;

export function AppSidebar({ activeSession, setActiveSession }: { activeSession: "home" | "chats", setActiveSession: (session: "home" | "chats") => void }) {
    const { open, setOpen } = useSidebar();
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [newConvoOpen, setNewConvoOpen] = React.useState(false);

    const handleDropdownChange = (open: boolean) => {
        setDropdownOpen(open);
        if (!open) {
            setOpen(false);
        }
    };

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
                                <UserDropdown
                                    isOpen={dropdownOpen}
                                    onOpenChange={handleDropdownChange}
                                    sidebarOpen={open}
                                />
                            </SidebarMenuItem>
                            {items.map((item) => {
                                if (item.title === "Home") {
                                    return (
                                        <SidebarMenuItem key={item.title} className="my-menu-item-link">
                                            <SidebarMenuButton asChild onClick={() => setActiveSession("home")}>
                                                <button className="cursor-pointer">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }

                                if (item.title === "Conversas") {
                                    return (
                                        <SidebarMenuItem key={item.title} className="my-menu-item-link">
                                            <SidebarMenuButton asChild onClick={() => setActiveSession(activeSession === "chats" ? "home" : "chats")}>
                                                <button className="cursor-pointer">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </button>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                }

                                // Other items
                                return (
                                    <SidebarMenuItem key={item.title} className="my-menu-item-link">
                                        <SidebarMenuButton asChild>
                                            <button className="cursor-pointer">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className="my-menu-item-link rounded-md ${">
                    <SidebarMenuButton asChild
                        className={`
     dark:text-white font-bold hover:text-white text-black ml-0.5 hover:bg-primary/90
    ${open ? "p-6 bg-primary hover:bg-primary/90" : "bg-primary"}
  `}>
                        <button onClick={() => {  setNewConvoOpen(true); }} className="cursor-pointer">
                            <MessageCirclePlus className=""/>
                            <span>Nova conversa</span>
                        </button>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <NewConversationDialog 
                open={newConvoOpen} 
                onOpenChange={setNewConvoOpen}
                onSelectUser={(id) => { console.log("Selected user:", id); setActiveSession("chats"); }}
            />
        </Sidebar>
    );
}
