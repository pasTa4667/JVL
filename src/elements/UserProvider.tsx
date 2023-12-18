import { ReactNode, createContext, useContext, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextProps {
  userId: string | null;
  login: (newUserId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);

  const login = (newUserId: string) => {
    setUserId(newUserId);
  };

  const logout = () => {
    setUserId(null);
  };

  const contextValue: UserContextProps = {
    userId: userId,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
