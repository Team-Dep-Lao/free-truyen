"use client";

import api from "@/apis";
import { Categories } from "@/lib/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IDataCommonContext {
  categories: Categories[];
  setCategories: (data: Categories[]) => void;
}

const DataCommonContext = createContext<IDataCommonContext | undefined>(
  undefined
);

export const DataCommonContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<Categories[]>([]);

  async function getCategories() {
    try {
      const res = await api.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/the-loai`);

      setCategories(res.data.items);
    } catch (e) {
    } finally {
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <DataCommonContext.Provider value={{ categories, setCategories }}>
      {children}
    </DataCommonContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(DataCommonContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
