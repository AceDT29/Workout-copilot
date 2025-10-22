import ghostIcon from '../assets/images/ghostLight.png';
import closeIcon from '../assets/images/close.svg'

export function Advisor({displayExcep, exception, closeExcep}) {

    return (
        <article className="fixed inset-0 bg-gradient-to-b from-slate-50/40 to-slate-800/40 flex items-center justify-center z-30 font-Lexend">
            <dialog open={displayExcep} className="bg-white w-[40vw] mx-auto p-4 h-auto min-w-62 min-h-32 rounded shadow-lg z-50 animFadeDown animate-duration-700">
                <label className="w-10 h-10 relative left-[88%] active:scale-75 transition-all cursor-pointer lg:left-[92%] lg:w-12 lg:h-12" forhtml="swt">
                    <input onClick={() => closeExcep(!displayExcep)} type="checkbox" className="hidden" id="swt" />
                    <img className='w-8 h-8 block' src={closeIcon} alt="" />
                </label>
                {exception.map(err => (
                    <li key={err.code} className="flex flex-col gap-y-2 items-center">
                        <figure className="w-20 h-20 lg:w-36 lg:h-36">
                            <img className="" src={ghostIcon} alt=""/>
                        </figure>
                        <h1 className="text-lg text-black md:text-2xl font-lobster">Error {err.code}</h1>
                        <div className='w-[60%] h-auto text-center'>
                            <p className="text-slate-600/90 text-sm md:text-base">{err.message}</p>
                        </div>
                    </li>
                ))}
            </dialog>
        </article>
    )
}