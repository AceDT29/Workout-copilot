import { useState, useEffect } from 'react';
import placeHolder from '../assets/images/muscle-placeHolder.svg';
import pauseBg from "../assets/images/pause-bg.png";
import playBg from "../assets/images/play-bg.png";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

export function WorkoutState({ showNext, name, iconPath, duration, series, routine, routineIndex = 0, onAdvanceRoutine, onRoutineComplete }) {
  const [isActive, setIsActive] = useState(false);
  const isRoutineMode = Array.isArray(routine) && routine.length > 0;
  const currentExercise = isRoutineMode
    ? (routine[routineIndex] ?? {})
    : { name, iconPath, duration, series };

  const nextExercise =
    isRoutineMode && routineIndex < routine.length - 1
      ? routine[routineIndex + 1]
      : null;

  const [newSeries, setNewSeries] = useState(currentExercise.series ?? 0);
  const [newDuration, setNewDuration] = useState(currentExercise.duration ?? 0);

  const hasSelection = Boolean(currentExercise && currentExercise.name && currentExercise.name.length > 0);

  useEffect(() => {
    setNewDuration(currentExercise.duration ?? 0);
    setNewSeries(currentExercise.series ?? 0);
    setIsActive(false);
  }, [currentExercise.name, currentExercise.duration, currentExercise.series, routine, routineIndex]);

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
          <div className='flex items-center justify-center gap-4 w-full'>
            <div className='flex flex-col gap-y-2 text-center'>
              <h2 className="font-bold text-lg">Ejercicio Actual</h2>
              <h3 className='text-md'>{currentExercise.name}</h3>
            </div>
            {isRoutineMode && nextExercise && (
              <div className='flex flex-col gap-y-2 text-center opacity-60'>
                <h2 className="font-bold text-lg">Siguiente</h2>
                <h3 className='text-md'>{nextExercise.name}</h3>
              </div>
            )}
          </div>
          <div className="relative w-auto h-auto rounded-full p-2 flex items-center justify-center progress-Bar">
            <CountdownCircleTimer
                isPlaying={isActive}
                key={newDuration} // Reinicia el timer al cambiar la duración
                duration={newDuration} // segundos
                onComplete={() => {
                  // Evitar off-by-one: repetir solo si quedan más de 1 series
                  if (newSeries > 1) {
                    setNewSeries(prev => prev - 1);
                    setIsActive(true);
                    return { shouldRepeat: true, delay: 3.5 };
                  } else {
                    // Última serie completada -> detener y avanzar si corresponde
                    setNewSeries(0);
                    setIsActive(false);
                    if (Array.isArray(routine) && routine.length > 0) {
                      if ((routineIndex ?? 0) < (routine.length - 1)) {
                        onAdvanceRoutine && onAdvanceRoutine();
                        return { shouldRepeat: false, reset: false };
                      } else {
                        onRoutineComplete && onRoutineComplete();
                        return { shouldRepeat: false, reset: false };
                      }
                    }
                    return { shouldRepeat: false, reset: false };
                  }
                }}
                size={230}
                strokeWidth={12}
                strokeLinecap="round"
                trailStrokeWidth={12}
                rotation="clockwise"
                trailColor="#e6e6e6"
                colors={['#004777', '#F7B801', '#A30000']}
                colorsTime={[newDuration, Math.ceil(newDuration * 0.66), 0]}
                isSmoothColorTransition={true}
              >
                  {({ remainingTime }) => (
                    <figure className='w-[90%] h-[90%] mx-auto rounded-full bg-white p-4 flex flex-col items-center justify-center gap-y-4'>
                      <p className='text-sm'>Restante: {remainingTime}'s</p>
                      <img className='w-[60%] h-[60%]' src={currentExercise.iconPath} alt={currentExercise.name} />
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
            <p>Duración: {currentExercise.duration}'s</p>
            <div>
              {newSeries == 0 && !isActive ? (
                // Si estamos en rutina y hay siguiente ejercicio, llamar al avance de rutina
                Array.isArray(routine) && routine.length > 0 ? (
                  (routineIndex ?? 0) < (routine.length - 1) ? (
                    <button className='animateRedColor cursor-pointer z-10 active:scale-95 transition-all w-auto h-auto p-2 border-slate-600/70 border-2 rounded-md bg-amber-700/80 text-white ' onClick={() => onAdvanceRoutine && onAdvanceRoutine()}>
                      Siguiente ejercicio
                    </button>
                  ) : (
                    <button className='animateRedColor cursor-pointer z-10 active:scale-95 transition-all w-auto h-auto p-2 border-slate-600/70 border-2 rounded-md bg-emerald-700/80 text-white ' onClick={() => onRoutineComplete ? onRoutineComplete() : showNext()}>
                      Rutina finalizada
                    </button>
                  )
                ) : (
                  <button className='animateRedColor cursor-pointer z-10 active:scale-95 transition-all w-auto h-auto p-2 border-slate-600/70 border-2 rounded-md bg-red-800/80 text-white ' onClick={showNext}>
                    Siguiente
                  </button>
                )
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