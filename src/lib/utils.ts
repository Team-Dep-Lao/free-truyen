import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'qs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createQuery (query: object) {
  return qs.stringify(query, {encodeValuesOnly: true})
}