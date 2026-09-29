import { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { api } from '../api/client.js';

const AuthContext = createContext(null);
const KEY = 'anvexa_admin_token';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem(KEY));

  const login = useCallback(async (email, password) => {
    const { token: t } = await api.login(email, password);
    sessionStorage.setItem(KEY, t);
    setToken(t);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(KEY);
    setToken(null);
  }, []);

  const value = useMemo(() => ({ token, login, logout }), [token, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
