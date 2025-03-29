import { useState, useEffect } from 'react';
import { useAuth } from '../../ui/context/AuthProvider';

export function useAuthState() {
  const { user, login, logout } = useAuth();
  const [authState, setAuthState] = useState(user);

  useEffect(() => {
    setAuthState(user);
  }, [user]);

  return { authState, login, logout };
}
