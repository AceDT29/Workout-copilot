import { useEffect } from 'react';
import { supabase } from '../Lib/supabaseConfig';

// RoutinesSync: child component mounted by AuthSync that owns
// persistence and realtime sync for the `routines` state.
// Props:
// - user: current supabase user (or null)
// - routines: current routines array from reducer
// - dispatch: reducer dispatch to update routines locally
export function RoutinesSync({ user, routines, dispatch }) {
  // Concrete table/column names based on your schema
  const TABLE = 'uRoutines';
  const USER_COL = 'user_id';
  const ID_COL = 'Rutina_id';

  // Load persisted routines once when auth becomes available
  useEffect(() => {
    let mounted = true;
    if (!user) return;

    const fetchAndDispatch = async () => {
      const selectFields = `${ID_COL}, name, icon, description, categories, duration, series`;
      try {
        const { data: rows, error } = await supabase.from(TABLE).select(selectFields).eq(USER_COL, user.id);

        if (!mounted) return;
        if (error) {
          console.error('Failed to load persisted routines (select):', error);
          return;
        }

        const exercises = (rows || []).map(r => ({
          item_id: r[ID_COL],
          name: r.name,
          icon: r.icon,
          description: r.description,
          categories: r.categories,
          duration: r.duration,
          series: r.series,
        }));

        dispatch({ type: 'ADD_WORKOUT', payload: {exercises} });
      } catch (err) {
        console.error('Failed to load persisted routines:', err);
      }
    };

    fetchAndDispatch();

    return () => { mounted = false };
  }, [user, dispatch]);

  // Persist routines whenever they change and there's an authenticated user
  // Now the table stores one row per exercise; we delete previous rows and insert the current ones
  useEffect(() => {
    let mounted = true;
    if (!user) return;

    const persist = async () => {
      if (!mounted) return;
      try {
        const { error: delErr } = await supabase.from(TABLE).delete().eq(USER_COL, user.id);
        if (delErr) console.error('Error deleting old routines before insert:', delErr);

        if (!Array.isArray(routines) || routines.length === 0) return;

        const rowsToInsert = routines.map(item => ({
          [USER_COL]: user.id,
          name: item.name ?? '',
          icon: item.icon ?? '',
          // description is NOT NULL in the table schema: ensure a string fallback
          description: (typeof item.description === 'string' && item.description.length) ? item.description : '',
          // categories column is jsonb NOT NULL: default to empty array
          categories: item.categories ?? [],
          // duration and series are NOT NULL: provide numeric fallbacks
          duration: typeof item.duration === 'number' ? item.duration : 0,
          series: typeof item.series === 'number' ? item.series : 0,
        }));

        const { error: insErr } = await supabase.from(TABLE).insert(rowsToInsert, { returning: 'minimal' });
        if (insErr) console.error('Error inserting routines:', insErr);
      } catch (err) {
        console.error('Error persisting routines:', err);
      }
    };

    persist();
    return () => { mounted = false };
  }, [routines, user]);

  // Subscribe to realtime changes on the detected table for this user
  useEffect(() => {
    if (!user) return;

  let channel;

    const setupRealtime = async () => {
      channel = supabase
        .channel(`${TABLE}-user-${user.id}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: TABLE, filter: `${USER_COL}=eq.${user.id}` },
          async () => {
            try {
              const { data: rows, error } = await supabase.from(TABLE).select(`${ID_COL}, name, icon, description, categories, duration, series`).eq(USER_COL, user.id);
              if (error) {
                console.error('Realtime reload failed:', error);
                return;
              }

              const exercises = (rows || []).map(r => ({
                item_id: r[ID_COL],
                name: r.name,
                icon: r.icon,
                description: r.description,
                categories: r.categories,
                duration: r.duration,
                series: r.series,
              }));

              dispatch({ type: 'ADD_WORKOUT', payload: exercises });
            } catch (err) {
              console.error('Realtime routine handler error:', err);
            }
          }
        )
        .subscribe();
    };

    setupRealtime();

    return () => {
      try {
        channel?.unsubscribe();
      } catch (unsubscribeErr) {
        try { supabase.removeChannel?.(channel); } catch (removeErr) { console.error('Failed to remove realtime channel', removeErr); }
        console.error('Failed to unsubscribe channel', unsubscribeErr);
      }
    };
  }, [user, dispatch]);

  return null;
}

export default RoutinesSync;
