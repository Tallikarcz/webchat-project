"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getAllUsers } from "@/lib/api";
import { User } from "@/types/user";
import { SearchInput } from "@/components/common/SearchInput";
import { UserListItem } from "@/components/chat/UserListItem";

interface NewConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectUser?: (userId: string) => void;
}

export function NewConversationDialog({ open, onOpenChange, onSelectUser }: NewConversationDialogProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) fetchUsers();
  }, [open]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectUser = (userId: string) => {
    onSelectUser?.(userId);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:w-[400px] p-0 bg-gray-100 dark:bg-[#161717]">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle>Nova Conversa</SheetTitle>
        </SheetHeader>

        <div className="px-6 pb-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar usuários..."
          />
        </div>

        <div className="overflow-y-auto px-6 pb-6 space-y-2">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Carregando...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Nenhum usuário encontrado</p>
          ) : (
            filtered.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                onClick={handleSelectUser}
              />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
