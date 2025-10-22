import { useEffect } from 'react';
import { supabase } from '../Lib/supabaseConfig';
import { useUser } from '../hooks/useUser';

export function AuthSync() {
  const { setUserFromAuth, setSessionFromSupabase, clearUser } = useUser();

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

  return null;
}

export default AuthSync;
