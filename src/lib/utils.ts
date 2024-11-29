import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";
import { Item } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createQuery(query: object) {
  return qs.stringify(query, { encodeValuesOnly: true });
}

export function initBookmarks() {
  const existingData = localStorage.getItem("myList");

  if (!existingData) {
    localStorage.setItem("myList", JSON.stringify([]));
  }
}

export function bookmark(data: Item, type: "update" | "del") {
  initBookmarks();
  let existingData = localStorage.getItem("myList");
  if (!existingData) return;
  if (type === "update") {
    localStorage.setItem(
      "myList",
      JSON.stringify(JSON.parse(existingData).push(data))
    );
  } else {
    const list: Item[] = JSON.parse(existingData);
    const index = list.findIndex((item) => item._id === data._id);

    if (index === -1) return;
    localStorage.setItem("myList", JSON.stringify(list.splice(0, index)));
  }
}

export function checkBookmark(_id: string) {
  let existingData = localStorage.getItem("myList");
  if (!existingData) return false;
  const list: Item[] = JSON.parse(existingData);
  return list.findIndex((item) => item._id) !== -1;
}
