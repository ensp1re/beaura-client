/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const saveToLocalStorage = (key: string, data: any): void => {
  if (typeof window !== "undefined") {
    const value = typeof data === "string" ? data : JSON.stringify(data);
    window.localStorage.setItem(key, value);
  }
};

export const getDataFromLocalStorage = (key: string): any => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    }
  }
  return null;
};

export const saveToSessionStorage = (data: string, username: string): void => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem('isLoggedIn', data);
  window.sessionStorage.setItem('loggedInUser', username);
};

export const getDataFromSessionStorage = (key: string): any => {
  if (typeof window === "undefined") return null;
  const data = window.sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null; // Handle null safely
};