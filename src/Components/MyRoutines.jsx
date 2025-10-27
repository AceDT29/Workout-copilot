import { useWorkout } from '../hooks/useWorkoutContext'
import removeIcon from '../assets/images/garbage.svg'

export function MyRoutines({ display }) {
  const { state, dispatch } = useWorkout();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_WORKOUT', payload: id });
  }

  return (
    <nav className={display ? 'SideWorkoutList' : 'hidden'} onClick={(e) => e.stopPropagation()}>
      <div className='backdrop-filter backdrop-blur-2xl p-2 shadow-md lg:p-4'>
        <h2 className='text-lg font-semibold mb-4'>Mi Rutina</h2>
        {state && state.length > 0 ? (
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

