"use client";

import { useState } from "react";
import { SearchInput } from "@/components/common/SearchInput";
import { ConversationItem } from "@/components/chat/ConversationItem";
import { mockConversations } from "@/constants/mockData";

export default function ChatsLayout() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-[#161717] p-4 flex flex-col border-r border-gray-300 dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4">Ale Chat</h1>
      
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Buscar conversas..."
        className="mb-4"
      />

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            {...conversation}
            isSelected={selectedChat === conversation.id}
            onClick={setSelectedChat}
          />
        ))}
      </div>
    </div>
  );
}
