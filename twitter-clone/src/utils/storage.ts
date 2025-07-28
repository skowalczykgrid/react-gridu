import { User } from "../types";
import DOMPurify from "dompurify";

const USER_KEY = "twitter_clone_user";

export const storage = {
  setUser: (user: User) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  getUser: (): User | null => {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },
  removeUser: () => localStorage.removeItem(USER_KEY),
};

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["strong", "em", "code", "br"],
    ALLOWED_ATTR: [],
  });
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
