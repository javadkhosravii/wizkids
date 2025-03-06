import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * A test showing how to hash an email to save a unique id
 */
export function hashEmail(email: string) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash.toString(16);
}

/**
 * Simple hash function to hash a password with a salt.
 * This is a basic implementation and **not secure** for production use.
 */
export function hashPassword(password: string, salt = "salty") {
  let hash = 0;
  const combined = password + salt;

  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }

  return hash.toString(16);
}
