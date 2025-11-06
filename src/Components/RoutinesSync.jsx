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
                dispatch({ type: 'SET_WORKOUTS_FROM_DB', payload: data });
                console.log('Routines fetched from DB:', data);
                console.log('Current state after fetch:', state);
            }
        }
    };

    const queryData = async (routineName) => {
        if (user) {
            const { data, error } = await supabase
                .from('uRoutines')
                .select('*')
                .eq('user_id', user.id)
                .eq('name', routineName);
            if (error) {
                console.error('Error querying routine:', error);
                return null;
            } else {
                return data;
            }
        }
    };

    const postData = async (routine) => {
        if (user) {
            const { data, error } = await supabase
                .from('uRoutines')
                .insert([
                    {
                        user_id: user.id,
                        name: routine.name,
                        icon: routine.icon,
                        description: routine.description,
                        duration: routine.duration,
                        categories: routine.categories,
                        series: routine.series
                    }
                ]);
            if (error) {
                console.error('Error al insertar tus datos', error);
            } else {
                dispatch({ type: 'UPDATE_WORKOUT_ID', payload: data });
            }
        }
    };


    useEffect(() => {
        if (user && session) {
            getData();
            
        }

        return () => {
            dispatch({ type: 'CLEAR_WORKOUTS' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, session]);

    useEffect(() => {
        if (state.length > 0) {
            state.forEach((workout) => {
                if (!workout.id) return;
                queryData(workout.name).then((data) => {
                    if (data && data.length === 0) {
                        postData(workout);
                        console.log('Routine posted to DB:', workout.name);
                    } else {
                        console.log('Routine already exists in DB:', workout.name);
                    }
                });
            });
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    
}
