import { WorkoutAd } from './WorkoutAd'
import { exercises } from "../assets/objects/excersiceList"
import { useUser } from '../hooks/useUser';
import { useServices } from '../hooks/useServises';
import { useWorkout } from '../hooks/useWorkoutContext';
import unFavIcon from '../assets/images/heart.svg'
import favIcon from '../assets/images/favHeart.svg'
import closeIcon from '../assets/images/close.svg'


export function CreateRoutine({ closeAd, displayAd }) {
    const { state, dispatch } = useWorkout();
    const { user, isAuthenticated } = useUser();
    const { queryData, postData, deleteData } = useServices();

    const handleAddWorkout = (workout) => {
        const workoutExist = state.some(item => item.id === workout.id);
        if (!workoutExist) {
            dispatch({
                type: 'ADD_WORKOUT',
                payload: {
                    id: workout.id,
                    categories: workout.categories,
                    name: workout.name,
                    iconPath: workout.iconPath,
                    description: workout.description,
                    duration: workout.duration,
                    series: workout.series
                }
            })
            try {
                queryData(user, workout.id).then((data) => {
                    if (data && data.length === 0) {
                        postData(user, workout, dispatch);
                        console.log('Routine posted to DB:', workout.name);
                    } else {
                        console.log('Routine already exists in DB:', workout.name);
                    }
                });
            } catch (error) {
                console.error('Error adding workout:', error);
            }
        }
    }

    const handleRemoveWorkout = (workoutId) => {
        dispatch({ type: 'REMOVE_WORKOUT', payload: workoutId });
        try {
            deleteData(user, workoutId, dispatch);
            console.log('Routine removed from DB:', workoutId);
        } catch (error) {
            console.error('Error removing workout:', error);
        }
    }
    
    return (
        <>
            {!isAuthenticated ?
                <WorkoutAd closeAd={closeAd} displayAd={displayAd} />
                :
                <div className="fixed inset-0 bg-gradient-to-b from-slate-50/40 to-slate-800/40 flex items-center justify-center z-30">
                    <dialog open={displayAd} className='w-[80%] mt-40 h-auto max-h-[60vh] p-2 overflow-auto mx-auto  z-50 rounded-md bg-pink-50 md:w-[30%]'>
                        <div className='sticky z-10  w-full h-auto flex justify-between items-center my-5 bg-pink-50'>
                            <span></span>
                            <h3 className='text-lg'>Añade Ejercicios a tu Rutina</h3>
                            <button onClick={closeAd} className='w-8 h-8 p-1'>
                                <img src={closeIcon} alt="" />
                            </button>
                        </div>
                        <ul className='flex flex-col gap-y-6 items-center'>
                            {exercises.map(exercise => (
                                <li className='flex p-2 justify-between items-center rounded-md border w-[85%] h-20 bg-slate-50 shadow-lg' key={exercise.id}>
                                    <figure className='w-16 h-16'>
                                        <img src={exercise.iconPath} alt="" />
                                    </figure>
                                    <h3 className='text-sm lg:text-base'>{exercise.name}</h3>
                                    <button onClick={() => handleAddWorkout(exercise)} onDoubleClick={() => handleRemoveWorkout(exercise.id)} className='w-10 h-10 p-2'>
                                        <img src={state.some(item => item.name === exercise.name) ? favIcon : unFavIcon} alt="Añadir a favoritos" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </dialog>
                </div>
            }

        </>
    )
}   