import { useWorkout } from "../hooks/useWorkoutContext";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react"
import { supabase } from "../Lib/supabaseConfig";   

export function RoutinesSync() {
    const { state, dispatch } = useWorkout()
    const { user, session } = useUser();

    const getData = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('uRoutines')
                .select('*')
                .eq('user_id', user.id);
            if (error) {
                console.error('Error fetching routines:', error);
            } else {
                dispatch({ type: 'SET_WORKOUT', payload: data });
            }
        }
    };

    const postData = async (routine) => {
        if (user) {
            const { data, error } = await supabase
                .from('uRoutines')
                .insert([
                    { ...routine, user_id: user.id }
                ]);
            if (error) {
                console.error('Error inserting routine:', error);
            } else {
                dispatch({ type: 'ADD_WORKOUT', payload: data });
            }
        }
    };

    useEffect(() => {
        if (user && session) {
            getData();
        }
        if (state.length > 0 && user && session) {
            state.forEach(routine => {
                postData(routine);
            });
        }
    }, [user, session, state]);
}