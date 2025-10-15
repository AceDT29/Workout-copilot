import { useState, useEffect } from 'react';
import placeHolder from '../assets/images/muscle-placeHolder.svg';
import pauseBg from "../assets/images/pause-bg.png";
import playBg from "../assets/images/play-bg.png";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export function WorkoutState({ showNext, name, icon, duration, series }) {
  const [isActive, setIsActive] = useState(false);
  const [newSeries, setNewSeries] = useState(series);
  const [newDuration, setNewDuration] = useState(duration);

  const hasSelection = Boolean(name && name.length > 0);

  useEffect(() => {
    setNewDuration(duration);
    setNewSeries(series);
    setIsActive(false);
  }, [duration, series, name]);

  return (
    <div className="w-full h-full mx-auto z-10 p-4 mt-8">
      {!hasSelection ? (
        <div className="p-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-xl font-semibold mb-2">Empieza a entrenar</h2>
          <figure className="w-32 h-32 mx-auto opacity-50">
            <img src={placeHolder} alt="" />
          </figure>
          <p className="text-md text-gray-600">Elige un ejercicio de la lista o crea una rutina</p>
        </div>
      ) : (
        <article className="flex flex-col items-center justify-center gap-8">
          <div className='flex flex-col items-center justify-center gap-4'>
            <h2 className="text-2xl font-bold mb-4">Ejercicio Actual</h2>
            <h3 className='text-center text-lg font-semibold'>{name}</h3>
          </div>
          <div className="relative w-auto h-auto rounded-full p-2  flex items-center justify-center progress-Bar">
            <CountdownCircleTimer
                isPlaying={isActive}
                key={newDuration} // Reinicia el timer al cambiar la duración
                duration={newDuration} // Convierte minutos a segundos
                onComplete={() => {
                  if (newSeries !== 0) {
                    setNewSeries(newSeries - 1);
                    setIsActive(true);
                    return { shouldRepeat: true, delay: 3.5,  };
                  } else {
                    setIsActive(false);
                    // Aqui podemos llamar a una función para notificar que el entrenamiento ha terminado
                    return { shouldRepeat: false, reset: false };
                  }
                }} // Detener el timer al completar
                size={230}
                strokeWidth={12}
                strokeLinecap="round"
                trailStrokeWidth={12}
                rotation="clockwise"
                trailColor="#e6e6e6" // color de fondo (más claro que el stroke)
                // Usar formato MultipleColors: array de colores y array de tiempos (segundos)
                colors={['#004777', '#F7B801', '#A30000']}
                colorsTime={[newDuration, Math.ceil(newDuration * 0.66), 0]}
                isSmoothColorTransition={true}
              >
                  {({ remainingTime }) => (
                    <figure className='w-[90%] h-[90%] mx-auto rounded-full bg-white p-4 flex flex-col items-center justify-center gap-y-4'>
                      <p className='text-sm'>Restante: {remainingTime}'s</p>
                      <img className='w-[60%] h-[60%]' src={icon} alt={name} />
                    </figure>
                  )}
            </CountdownCircleTimer>
            <figure
              className='w-[90%] h-[90%] absolute bg-gradient-to-b from-black/50 to-white/50 rounded-full opacity-0 flex items-center justify-center hover:opacity-100 cursor-pointer transition-opacity duration-300'
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? (
                <img src={pauseBg} alt="Pause" className='w-12 h-12 block md:w-14 md:h-14' />
              ) : (
                <img src={playBg} alt="Play" className='w-12 h-12 block md:w-14 md:h-14' />
              )}
            </figure>
          </div>
          <div className="flex w-full h-auto justify-around items-center">
            <p>Duración: {duration}'s</p>
            <div>
              {newSeries == 0 && !isActive ? (
                <button className='animateRedColor cursor-pointer z-10 active:scale-95 transition-all w-auto h-auto p-2 border-slate-600/70 border-2 rounded-md bg-red-800/80 text-white ' onClick={showNext}>
                  Siguiente
                </button>
              ) : (
                <p>Series restantes: {newSeries}</p>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}