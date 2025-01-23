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

export const saveToSessionStorage = (isAuthenticated: boolean, p0: boolean, data: string, p1: null, refreshToken: string): void => {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem('isLoggedIn', data);
  window.sessionStorage.setItem('refreshToken', refreshToken);
};

export const getDataFromSessionStorage = (key: string): any => {
  if (typeof window === "undefined") return null;
  const data = window.sessionStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  return null;
};


export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
}

export const toFirstCharUppercase = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};