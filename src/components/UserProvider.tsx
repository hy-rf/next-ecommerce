"use client";

import { ReactNode } from "react";
import UserContext from "./UserContext";
import { useAuth } from "@/lib/auth";

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const { user } = useAuth();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
