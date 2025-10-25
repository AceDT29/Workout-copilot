export const initialState = []

export function reducerApp(state, action) {
    switch (action.type) {
        case 'ADD_WORKOUT':
            return [...state, action.payload]
        case 'REMOVE_WORKOUT':
            return state.filter(workout => workout.id !== action.payload)
        case 'CLEAR_WORKOUTS':
            return []
        default:
            return state
    }
}