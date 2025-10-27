import { useEffect } from 'react';
import { supabase } from '../Lib/supabaseConfig';
import { useUser } from '../hooks/useUser';
import { useWorkout } from '../hooks/useWorkoutContext'
import RoutinesSync from './RoutinesSync';

export function AuthSync() {
  const { setUserFromAuth, setSessionFromSupabase, clearUser, user } = useUser();
  const { state: routines, dispatch } = useWorkout();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        const session = data?.session ?? null;
        setSessionFromSupabase(session);
        setUserFromAuth(session?.user ?? null);
      } catch {
        // ignore
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const authUser = session?.user ?? null;
      const s = session ?? null;
      setSessionFromSupabase(s);
      if (authUser) setUserFromAuth(authUser);
      else clearUser();
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, [setUserFromAuth, setSessionFromSupabase, clearUser]);

  // Render the child component that owns routines persistence and realtime
  return <RoutinesSync user={user} routines={routines} dispatch={dispatch} />;
}

export default AuthSync;
