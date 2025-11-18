import { useContext } from 'react';
import { ExercisesContext } from '../Context/ExercisesContext';

export const useExercises = () => {
  const ctx = useContext(ExercisesContext);
  if (!ctx) throw new Error('useExercises must be used within an ExercisesProvider');
  return ctx;
};

export default useExercises;
