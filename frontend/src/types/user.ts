export interface User {
  _id: string;
  username: string;
  email: string;
  online?: boolean;
  createdAt?: string;
  isActive?: boolean;
}
