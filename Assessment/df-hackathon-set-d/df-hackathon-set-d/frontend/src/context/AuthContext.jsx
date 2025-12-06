import React, { createContext, useState, useEffect } from 'react';
import { setAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('df_user');
    return raw ? JSON.parse(raw) : null;
  });
  useEffect(() => {
    if (user && user.token) setAuthToken(user.token);
    else setAuthToken(null);
  }, [user]);

  const login = (data) => {
    localStorage.setItem('df_user', JSON.stringify(data));
    setUser(data);
  };
  const logout = () => {
    localStorage.removeItem('df_user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
