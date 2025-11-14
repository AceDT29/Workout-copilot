import { useWorkout } from '../hooks/useWorkoutContext'
import { useServices } from '../hooks/useServises';
import { useUser } from '../hooks/useUser';
import { useEffect, useState } from 'react';
import removeIcon from '../assets/images/garbage.svg'
import loadIcon from '../assets/images/loading.png'

export function MyRoutines({ display }) {
  const { state, dispatch } = useWorkout();
  const { deleteData, getData } = useServices();
  const { user, session } = useUser();
  const [loading, setLoading] = useState(false);

  const handleRemove = async (id) => {
    try {
      await deleteData(user, id, state);
    } catch (error) {
      console.error('Error deleting workout:', error);
    } finally {
      dispatch({ type: 'REMOVE_WORKOUT', payload: id });
    }
  }

  useEffect(() => {
    if (user && session) {
      setLoading(true);
      getData(user, dispatch).finally(() => setLoading(false));
    } else {
      return dispatch({ type: 'CLEAR_WORKOUTS' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, session]);


  return (
    <nav className={display ? 'SideWorkoutList' : 'hidden'} onClick={(e) => e.stopPropagation()}>
      <div className='backdrop-filter backdrop-blur-2xl p-2 shadow-md lg:p-4'>
        <h2 className='text-lg font-semibold mb-4'>Mi Rutina</h2>
        {loading ? (
          <div className="w-full text-center flex flex-col items-center justify-center rounded-md shadow border gap-2 py-4">
            <figure className="w-16 h-16 animate-spin">
              <img src={loadIcon} alt="Cargando" />
            </figure>
            <p>Cargando tus rutinas...</p>
          </div>
        ) : state && state.length > 0 ? (
          <ul className='flex flex-col gap-y-4'>
            {state.map(item => (
              <li key={item.id} className='flex p-2 justify-between items-center rounded-md border w-full h-20 bg-slate-50 shadow-lg'>
                <button className='flex items-center gap-3 w-full text-left'>
                  <figure className='w-16 h-16'>
                    <img src={item.icon} alt={item.name} />
                  </figure>
                  <div>
                    <h3 className='text-sm lg:text-base'>{item.name}</h3>
                    <p className='text-xs text-slate-500'>Duración: {item.duration}s · Series: {item.series}</p>
                  </div>
                </button>
                <button onClick={() => handleRemove(item.id)} className='w-8 h-8 p-1'>
                  <img src={removeIcon} alt='Remover' />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-slate-600'>No tienes ejercicios en tu rutina. Crea una nueva desde "Crear Rutina".</p>
        )}
      </div>
    </nav>
  )
}

