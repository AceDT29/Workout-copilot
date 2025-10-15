import { useEffect, useState } from 'react'
import { WorkoutsList } from './WorkoutsList'
import { WorkoutState } from './WorkoutState'
import menuIcon from '../assets/images/menu-burger.svg'
import newRutineIcon from '../assets/images/create.svg'
import closeIcon from '../assets/images/close.svg'

export function WorkoutsContainer() {
    const [selected, setSelected] = useState(null)
    const [showlist, setShowlist] = useState(false);

    useEffect(() => {
        return () => {
            setShowlist(false)
        }
    }, [selected]);

    return (
        <>
            <div className='flex justify-between items-center w-full auto md:justify-around'>
                <div className='w-auto h-auto relative flex'>
                    <button onClick={() => setShowlist(!showlist)} className='w-10 h-10 rounded-full my-8 p-2 border md:w-12 md:h-12 cursor-pointer active:scale-95 transition-all'>
                        <img src={showlist ? closeIcon : menuIcon} alt="Menu" className={`${showlist ? 'rotateClass' : 'active:rotate-180 transition duration-700'}`}  />
                    </button>
                    {showlist && (
                        <WorkoutsList selected={selected} onSelect={setSelected} />
                    )}
                </div>
                <button className='w-10 h-10 rounded-full my-8 p-2 border md:w-12 md:h-12 cursor-pointer'>
                    <img src={newRutineIcon} alt="Crear Rutina" className='' />
                </button>
            </div>
            <WorkoutState
                name={selected?.name ?? ''} 
                icon={selected?.icon ?? ''} 
                duration={selected?.duration ?? 0} 
                series={selected?.series ?? 0} 
                showNext={() => setShowlist(true)}
            />
        </>
    )
}
