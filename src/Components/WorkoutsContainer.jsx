import { useEffect, useState } from 'react'
import { WorkoutsList } from './WorkoutsList'
import { WorkoutState } from './WorkoutState'
import { CreateRoutine } from './createRoutine'
import { WorkoutAd } from './WorkoutAd'
import { useWorkout } from '../hooks/useWorkoutContext'
import { useUser } from '../hooks/useUser'
import menuIcon from '../assets/images/menu-burger.svg'
import newRutineIcon from '../assets/images/create.svg'
import closeIcon from '../assets/images/close.svg'
import listIcon from '../assets/images/workout-list.svg'

export function WorkoutsContainer() {
    const [selected, setSelected] = useState(null)
    const [showlist, setShowlist] = useState(false);
    const [toRoutines, setToRoutines] = useState(false)
    const [routineActive, setRoutineActive] = useState(false);
    const [routineIndex, setRoutineIndex] = useState(0);
    const [showWorkoutAd, setShowWorkoutAd] = useState(false);

    const { state: routineState } = useWorkout();
    const { isAuthenticated } = useUser();

    useEffect(() => {
        return () => {
            setShowlist(false)
        }
    }, [selected]);

    return (
        <>
            {toRoutines &&
                <CreateRoutine closeAd={() => setToRoutines(false)} displayAd={toRoutines} />
            }
            {showWorkoutAd && (
                <WorkoutAd closeAd={() => setShowWorkoutAd(false)} displayAd={showWorkoutAd} />
            )}
            <div className='flex justify-between items-center w-full mx-auto md:justify-around'>
                <div className='w-auto h-auto relative flex'>
                    <button onClick={() => setShowlist(!showlist)} className='w-10 h-10 rounded-full my-8 p-2 border md:w-12 md:h-12 cursor-pointer active:scale-95 transition-all'>
                        <img src={showlist ? closeIcon : menuIcon} alt="Menu" className={`${showlist ? 'rotateClass' : 'active:rotate-180 transition duration-700'}`} />
                    </button>
                    {showlist && (
                        <WorkoutsList selected={selected} onSelect={setSelected} />
                    )}
                </div>
                {/* Botón para iniciar la rutina: solo si hay items en la rutina */}
                {routineState && routineState.length > 0 && (
                    <button onClick={() => {
                        if (!isAuthenticated) {
                            setShowWorkoutAd(true);
                            return;
                        }
                        setRoutineActive(true);
                        setRoutineIndex(0);
                        setShowlist(false);
                    }} className='flex items-center gap-x-2 w-auto h-16 p-2 rounded-md border hover:opacity-90'>
                        <p>Iniciar rutina</p>
                        <img className='w-10 h-10 p-1' src={listIcon} alt="" />
                    </button>
                )}

                <div className='flex gap-2 items-center'>
                    <button onClick={() => setToRoutines(true)} className='w-10 h-10 rounded-full my-8 p-2 border md:w-12 md:h-12 cursor-pointer'>
                        <img src={newRutineIcon} alt="Crear Rutina" className='' />
                    </button>

                </div>
            </div>
            <WorkoutState
                // Modo rutina si routineActive === true
                {...(routineActive ? {
                    routine: routineState,
                    routineIndex: routineIndex,
                    onAdvanceRoutine: () => setRoutineIndex(i => i + 1),
                    onRoutineComplete: () => setRoutineActive(false),
                    showNext: () => setShowlist(true),
                } : {
                    name: selected?.name ?? '',
                    iconPath: selected?.iconPath ?? '',
                    duration: selected?.duration ?? 0,
                    series: selected?.series ?? 0,
                    showNext: () => setShowlist(true),
                })}
            />
        </>
    )
}
