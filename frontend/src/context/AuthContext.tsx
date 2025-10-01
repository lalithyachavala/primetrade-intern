
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/axios';
import { clearToken, saveToken } from '../lib/storage';

interface User { id: string; name: string; email: string }
interface Ctx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthCtx = createContext<Ctx>(null!);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/users/me'); setUser(data); } catch {}
    })();
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    saveToken(data.token); setUser(data.user);
  }
  async function register(name: string, email: string, password: string) {
    const { data } = await api.post('/auth/register', { name, email, password });
    saveToken(data.token); setUser(data.user);
  }
  function logout() { clearToken(); setUser(null); window.location.href = '/'; }

  return <AuthCtx.Provider value={{ user, login, register, logout }}>{children}</AuthCtx.Provider>;
}
