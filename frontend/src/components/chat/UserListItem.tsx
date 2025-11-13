import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { getInitials } from "@/utils/avatarHelpers";

interface UserListItemProps {
  user: User;
  onClick: (userId: string) => void;
  showEmail?: boolean;
}

export function UserListItem({ user, onClick, showEmail = true }: UserListItemProps) {
  return (
    <div
      onClick={() => onClick(user._id)}
      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#1a1d1d] transition-colors"
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src="" />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {getInitials(user.username)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-sm truncate">{user.username}</h3>
          {user.online && <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />}
        </div>
        {showEmail && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
        )}
      </div>
    </div>
  );
}
