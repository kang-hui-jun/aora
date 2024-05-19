import { getCurrentUser } from "@/api";
import { User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
  isLogged: boolean;
  setIsLogged: (isLoggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
        setIsLogged(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{isLogged, setIsLogged, user, setUser, loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext必须在GlobalProvider中使用");
  }
  return context;
};
