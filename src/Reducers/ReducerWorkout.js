export const initialState = []

export function reducerApp(state, action) {
    switch (action.type) {
        case 'ADD_WORKOUT': {
            const exists = state.some(workout => workout.id === action.payload.id);
            if (exists) {
                return state;
            }
            return [...state, action.payload];
        }
        case 'SET_MANY_WORKOUTS': {
            const workoutArr = action.payload;
            const existingIds = new Set(state.map(workout => workout.id)); // Almacena los IDs existentes en un Set para búsquedas rápidas

            const newWorkouts = workoutArr.filter(item => !existingIds.has(item.id)); // Filtra solo los nuevos workouts
            return [...state, ...newWorkouts]; // Devuelve un nuevo array con los workouts existentes + los nuevos
        }
        case 'UPDATE_WORKOUT_ID': {
            const payload = action.payload;
            const workoutFromDB = Array.isArray(payload) ? payload[0] : payload;
            if (!workoutFromDB) return state;
            return state.map(workout => {
                if (!workout) return workout;
                if (!workout.id && workout.name === workoutFromDB.name) {
                    return workoutFromDB;
                }
                return workout;
            });
        }
        case 'REMOVE_WORKOUT':
           return state.filter(workout => workout && workout.id !== action.payload);
        case 'CLEAR_WORKOUTS':
            return []
        default:
            return state
    }
}