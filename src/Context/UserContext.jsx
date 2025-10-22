import { createContext, useState, useCallback } from 'react';
import { WorkoutUser } from '../Lib/WorkoutUser';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const setUserFromAuth = useCallback((authUser) => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }
    const newUser = new WorkoutUser({
      id: authUser.id ?? authUser.user?.id ?? null,
      email: authUser.email ?? authUser.user?.email ?? '',
      displayName: authUser.user_metadata?.full_name ?? authUser.user?.user_metadata?.full_name ?? authUser.user?.display_name ?? authUser.display_name ?? '',
      photoURL: authUser.user?.avatar_url ?? authUser.user?.photo_url ?? authUser.photoURL ?? '',
      metadata: authUser,
    });
    setUser(newUser);
    setLoading(false);
    return newUser;
  }, []);

  const setSessionFromSupabase = useCallback((s) => {
    setSession(s ?? null);
    // if session contains a user, keep loading false
    setLoading(false);
  }, []);

  const updateUser = useCallback((fields) => {
    setUser((prev) => {
      if (!prev) return prev;
      prev.update(fields);
      return new WorkoutUser(prev.toJSON());
    });
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setSession(null);
    setLoading(false);
  }, []);

  const isAuthenticated = Boolean(session?.access_token ?? false);

  return (
    <UserContext.Provider value={{ user, session, isAuthenticated, loading, setLoading, setUserFromAuth, setSessionFromSupabase, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
