import { createContext, useState, useEffect, useCallback } from "react";
import { useServices } from "../hooks/useServises";

// eslint-disable-next-line react-refresh/only-export-components
export const ExercisesContext = createContext();

export const ExercisesProvider = ({ children }) => {
    const { fetchData } = useServices();
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadExercises = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchData();
            if (data && Array.isArray(data)) {
                setExercises(data);
            } else {
                setExercises([]);
                setError('No exercises data received');
            }
        } catch (err) {
            console.error('Error loading exercises:', err);
            setExercises([]);
            setError(err.message || 'Failed to load exercises');
        } finally {
            setLoading(false);
        }
    }, [fetchData]);

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <ExercisesContext.Provider value={{ exercises, loading, error, refetch: loadExercises }}>
            {children}
        </ExercisesContext.Provider>
    );
};