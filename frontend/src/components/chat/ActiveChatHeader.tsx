import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/avatarHelpers";

interface ActiveChatHeaderProps {
  name: string;
  avatar?: string | null;
  status?: "online" | "offline" | string;
  onBack?: () => void;
  onOpenInfo?: () => void;
}

export function ActiveChatHeader({
  name,
  avatar,
  status,
  onBack,
  onOpenInfo,
}: ActiveChatHeaderProps) {
  return (
    <header className="flex items-center gap-4 px-4 py-3 border-b dark:border-neutral-800">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="md:hidden text-sm px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-900"
        >
          ←
        </button>
      )}

      <Avatar className="h-10 w-10 flex-shrink-0">
        {avatar ? <AvatarImage src={avatar} /> : <AvatarFallback>{getInitials(name)}</AvatarFallback>}
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold truncate">{name}</h2>
          {status && (
            <span
              className={`text-xs ml-1 ${
                status === "online" ? "text-green-500" : "text-gray-400"
              }`}
            >
              {status}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenInfo}
          aria-label="Mostrar informações"
          className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-900"
        >
          Info
        </button>
      </div>
    </header>
  );
}