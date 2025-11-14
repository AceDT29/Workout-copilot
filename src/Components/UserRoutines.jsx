import { useServices } from "../hooks/useServises";
import { useWorkout } from "../hooks/useWorkoutContext";
import { CreateRoutine } from "./CreateRoutine";
import { useEffect, useState } from "react";
import loadIcon from '../assets/images/loading.png'
import removeIcon from '../assets/images/garbage.svg'

export function UserRoutines({ user, session }) {
    const { deleteData, getData } = useServices();
    const { state: routines, dispatch } = useWorkout();
    const [showCreate, setShowCreate] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeleteWorkout = async (workoutId) => {
        try {
            await deleteData(user, workoutId, routines);
        } catch (error) {
            console.error('Error deleting workout:', error);
        } finally {
            dispatch({ type: 'REMOVE_WORKOUT', payload: workoutId });
        }
    }

    useEffect(() => {
        if (user && session) {
            setLoading(true);
            getData(user, dispatch).finally(() => setLoading(false));
        } else {
            dispatch({ type: 'CLEAR_WORKOUTS' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, session]);

    return (
        <>
            {showCreate && (
                <CreateRoutine closeAd={() => setShowCreate(false)} displayAd={showCreate} />
            )}

            {loading ? (
                <div className="w-full text-center flex flex-col items-center justify-center rounded-md shadow border gap-2 py-4">
                    <figure className="w-24 h-24 animate-spin">
                        <img src={loadIcon} alt="Cargando" />
                    </figure>
                    <p>Cargando tus rutinas...</p>
                </div>
            ) : (
            <section className={`w-full p-4 rounded-md shadow border bg-white`}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">Tus rutinas</h3>
                    <button onClick={() => setShowCreate(true)} className="text-sm text-blue-600 hover:underline">Crear / Editar</button>
                </div>
                <div className="border border-dashed border-slate-200 rounded p-2">
                    {routines && routines.length > 0 ? (
                        <ul className='flex flex-col gap-y-3'>
                            {routines.map(item => (
                                <li key={item.id} className='flex items-center w-full justify-between p-2 rounded-md border bg-slate-50'>
                                    <div className='flex items-center gap-3'>
                                        <figure className='w-12 h-12'>
                                            <img src={item.icon} alt={item.name} />
                                        </figure>
                                        <div>
                                            <h4 className='text-sm font-medium'>{item.name}</h4>
                                            <p className='text-xs text-slate-500'>Duración: {item.duration}s · Series: {item.series}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button onClick={() => handleDeleteWorkout(item.id)} className='w-10 h-10 p-2 text-sm text-red-600'>
                                            <img src={removeIcon} alt="" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center">
                            <p className="text-sm mb-3">Aun no has creado rutinas</p>
                            <button onClick={() => setShowCreate(true)} className="px-4 py-2 rounded bg-blue-600 text-white">Crea tu primera rutina</button>
                        </div>
                    )}
                </div>
            </section>
            )}
        </>
    )
}