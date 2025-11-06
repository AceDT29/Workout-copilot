export const initialState = []

export function reducerApp(state, action) {
    switch (action.type) {
        case 'SET_WORKOUTS_FROM_DB':
            return Array.isArray(action.payload) ? action.payload : state;
        case 'ADD_WORKOUT': {
            const exists = state.some(workout => workout.name.toLowerCase() === action.payload.name.toLowerCase());
            if (exists) {
                return state; // Don't add duplicate
            }
            return [...state, action.payload];
        }
        case 'UPDATE_WORKOUT_ID': {
            const workoutFromDB = action.payload;
            return state.map(workout => {
                if (!workout.id && workout.name === workoutFromDB.name) {
                    return workoutFromDB; // Replace local workout with the one from DB (which has an id)
                }
                return workout;
            });
        }
        case 'REMOVE_WORKOUT':
            return state.filter(workout => workout.id !== action.payload)
        case 'CLEAR_WORKOUTS':
            return []
        default:
            return state
    }
}