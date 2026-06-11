export interface User {
  id: string;

  firstName: string;
  lastName: string;

  email: string;

  lastActiveAt: string | null;

  createdAt: string;
  updatedAt: string;
}