export interface User {
  id: string;
  email: string;
  name: string;
  lastLogin?: Date;
  location?: string;
  numberOfReports: number;
  reportsEmailedSuccessfully: number;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}