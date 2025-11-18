import { useExercises } from "../hooks/useExercises";

// WorkoutsList ahora es un componente puramente presentacional.
// Props:
// - selected: el objeto exercise seleccionado (o null)
// - onSelect: función llamada con el objeto seleccionado o null
export function WorkoutsList({ selected, onSelect }) {
    const { exercises } = useExercises();
    function handleSelected(e) {
        const id = e.target.value
        if (!id) {
            onSelect && onSelect(null)
            return
        }

        const item = exercises.find(ex => String(ex.id) === String(id)) || null
        onSelect && onSelect(item)
    }

    return (
        <div className="absolute left-full top-4 w-46 h-16 z-10 shadow-lg p-4 cursor-pointer rounded-lg transition-all">
            <div>
                <label className="sr-only" htmlFor="exercise-select">Selecciona un ejercicio</label>
                <select value={selected ? selected.id : ''} onChange={handleSelected} id="exercise-select" className="w-full p-2 rounded-md border bg-slate-50">
                    <option value="">-- Selecciona --</option>
                    {exercises.map(exercise => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}