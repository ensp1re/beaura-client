import { ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

export interface ErrorBoudaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export interface ISize {
  width: string;
  height: string;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  nickname?: string;
  isPrivate?: boolean;
  profilePicture?: string;
  bio?: string;
  creditBalance?: number;
  isNotificationEnabled?: boolean;
  status?: string;
  role?: string;
}
