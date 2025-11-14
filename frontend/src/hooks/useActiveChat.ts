import { useEffect, useState, useCallback } from "react";

export interface ChatMessage {
  _id: string;
  from: string;
  text: string;
  createdAt: string;
}

export interface ChatUser {
  _id: string;
  name: string;
  avatar?: string | null;
  online?: boolean;
}