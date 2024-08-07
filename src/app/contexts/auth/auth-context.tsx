"use client"
import { getSession as getNextAuthSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const AuthContext = createContext({
    isLogged: false,
    setIsLogged: () => {}
  });

// Proveedor de contexto
const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getNextAuthSession();

      if (session) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
