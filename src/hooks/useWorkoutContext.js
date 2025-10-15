import { ContextWorkout } from '../Context/ContextWorkout.jsx';
import { useContext } from 'react';

export function useWorkout() {
    return useContext(ContextWorkout);
}