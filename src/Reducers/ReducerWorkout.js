export const initialState = []

export function reducerApp(state, action) {
    switch (action.type) {
        case 'ADD_WORKOUT':
            return [...state, action.payload]
        case 'SET_WORKOUTS':
            return Array.isArray(action.payload) ? action.payload : state
        case 'REMOVE_WORKOUT':
            return state.filter(workout => workout.id !== action.payload)
        case 'CLEAR_WORKOUTS':
            return []
        default:
            return state
    }
}