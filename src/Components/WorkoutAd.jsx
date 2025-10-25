import closeIcon from '../assets/images/close.svg'
import invitationRegister from '../assets/images/invitation.png'
import { Link } from 'react-router'

export function WorkoutAd({ closeAd, displayAd }) {
    return (
        <article className="fixed inset-0 bg-gradient-to-b from-slate-50/40 to-slate-800/40 flex items-center justify-center z-30">
            <dialog open={displayAd} className="bg-white w-[70%] mx-auto p-3 h-[70vh] rounded shadow-lg z-50 animFadeDown animate-duration-700 lg:w-[45%]">
                <label className="w-10 h-10 relative left-[90%] z-50 active:scale-75 transition-all cursor-pointer lg:left-[95%] lg:w-12 lg:h-12" forhtml="swt">
                    <input onClick={() => closeAd(!displayAd)} type="checkbox" className="hidden" id="swt" />
                    <img className='w-6 h-6 block' src={closeIcon} alt="" />
                </label>
                <section className='w-full h-full flex flex-col items-center justify-center gap-y-4'>
                    <figure className='w-56 h-56 lg:w-72 lg:h-72'>
                        <img src={invitationRegister} alt="" />
                    </figure>
                    <div className='flex flex-col items-center justify-center gap-2 w-1-2 h-auto text-center'>   
                        <h2 className='text-lg md:text-2xl'>Unete a Workout copilot!</h2>
                        <p className='text-sm md:text-base text-slate-600/90'>Podras crear rutinas personalizadas y llevar registro de tu progreso.</p>
                    </div>
                    <Link to='/registrarse'>
                        <button className='w-auto h-auto p-3 rounded-md shadow-2xl bg-gradient-to-l from-amber-400/70 to-amber-900/70 hover-opacity-70 transition-all'>
                            Unirse
                        </button>
                    </Link>
                </section>
            </dialog>
        </article>
    )
}