import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  User: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ User, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
