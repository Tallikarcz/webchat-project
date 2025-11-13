import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth/authContext";

interface UserDropdownProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sidebarOpen: boolean;
}

export function UserDropdown({ isOpen, onOpenChange, sidebarOpen }: UserDropdownProps) {
  const { user, loading, logout } = useAuth();

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          isActive={isOpen}
          className={`!outline-none !ring-0 cursor-pointer my-menu-item-link`}
        >
          <Avatar>
            <AvatarImage
              src="https://i.pravatar.cc/150?img=3"
              alt="User Avatar"
              className={sidebarOpen ? "" : "!rounded-full"}
            />
            <AvatarFallback>UA</AvatarFallback>
          </Avatar>
          <span>{loading ? "Loading..." : user?.username ?? "Entrar"}</span>
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
            <button onClick={logout}>Sair</button>
          </SidebarMenuButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
