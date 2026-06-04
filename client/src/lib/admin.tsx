import { createContext, useContext, useState, ReactNode } from "react";
import { setAdminToken } from "@/lib/queryClient";

type AdminContextType = {
  token: string | null;
  setToken: (t: string | null) => void;
  isAdmin: boolean;
};

const AdminContext = createContext<AdminContextType>({
  token: null,
  setToken: () => {},
  isAdmin: false,
});

export function AdminProvider({ children }: { children: ReactNode }) {
  // In-memory only (sandboxed iframes block localStorage). Owner re-logs per session.
  const [token, setTokenState] = useState<string | null>(null);
  const setToken = (t: string | null) => {
    setAdminToken(t);
    setTokenState(t);
  };
  return (
    <AdminContext.Provider value={{ token, setToken, isAdmin: !!token }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
