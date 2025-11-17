import { supabase } from "../Lib/supabaseConfig";

export const useServices = () => {
    const getData = async (user, dispatch) => {
        if (user) {
            const { data, error } = await supabase
                .from('uRoutines')
                .select('excerciseId, categories, name, iconPath, description, duration, series')
                .eq('user_id', user.id);
            if (error) {
                console.error('Error fetching routines:', error);
            } else {
                console.log("Routines fetched from DB:", data);
                dispatch({ type: 'SET_MANY_WORKOUTS', payload: data.map(item => ({ ...item, id: item.excerciseId })) });
            }
        } else {
            return
        }
    };

    const queryData = async (user, routineId) => {
        if (user) {
            const { data, error } = await supabase
                .from('uRoutines')
                .select('*')
                .eq('user_id', user.id)
                .eq('excerciseId', routineId);
            if (error) {
                console.error('Error querying routine:', error);
                return null;
            } else {
                return data;
            }
        }
    };

    const postData = async (user, workout, dispatch) => {
        if (user && workout) {
            const { data, error } = await supabase
                .from('uRoutines')
                .insert([
                    {
                        excerciseId: workout.id,
                        user_id: user.id,
                        name: workout.name,
                        iconPath: workout.iconPath,
                        description: workout.description,
                        duration: workout.duration,
                        categories: workout.categories,
                        series: workout.series
                    }
                ]);
            if (error) {
                console.error('Error al insertar tus datos', error);
            } else {
                dispatch({ type: 'UPDATE_WORKOUT_ID', payload: data });
            }
        }
    };

    const deleteData = async (user, workoutId, state) => {
        if (user && workoutId && state.length !== 0) {
            const { error } = await supabase
                .from('uRoutines')
                .delete()
                .eq('user_id', user.id)
                .eq('excerciseId', workoutId);
            if (error) {
                console.error('Error al actualizar tus datos', error);
            } else {
                console.log('Workout deleted from DB:', workoutId);
            }
        }
    };

    return { getData, queryData, postData, deleteData };
}
