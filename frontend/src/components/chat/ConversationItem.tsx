import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/avatarHelpers";

interface ConversationItemProps {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isSelected: boolean;
  onClick: (id: number) => void;
}

export function ConversationItem({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unread,
  isSelected,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? "bg-primary/10 dark:bg-primary/20"
          : "hover:bg-gray-200 dark:hover:bg-[#1a1d1d]"
      }`}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm truncate">{name}</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
            {timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {lastMessage}
          </p>
          {unread > 0 && (
            <span className="flex-shrink-0 ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
