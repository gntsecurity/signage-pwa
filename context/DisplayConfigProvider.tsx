'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface DisplayContextType {
  token: string | null;
  setToken: (value: string) => void;
}

const DisplayContext = createContext<DisplayContextType>({
  token: null,
  setToken: () => {},
});

export function DisplayConfigProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('device-token');
    if (stored) setTokenState(stored);
  }, []);

  const setToken = (value: string) => {
    setTokenState(value);
    localStorage.setItem('device-token', value);
  };

  return (
    <DisplayContext.Provider value={{ token, setToken }}>
      {children}
    </DisplayContext.Provider>
  );
}

export const useDisplayConfig = () => useContext(DisplayContext);
