import googleIcon from '../assets/images/google.svg'
import eyeOff from '../assets/images/eye.svg'
import eyeOn from '../assets/images/eye-dont-see.svg'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { supabase } from '../Lib/supabaseConfig';
import { useUser } from '../hooks/useUser';
import { Advisor } from './Advisor';
import { useHandleAuth } from '../hooks/useAuthForm';

export function LogIn() {
  const { setUserFromAuth, loading, isAuthenticated } = useUser();
  const { validateFields, showExcep, setShowExcep, excepResult, errorHandler, navigate } = useHandleAuth();
  const [showPass, setShowPass] = useState(false);
  const inputEmail = useRef(null);
  const inputPass = useRef(null);

  const finishForm = async (e) => {
    e.preventDefault();
    if (!validateFields(inputEmail.current, inputPass.current)) return
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputEmail.current.value,
      password: inputPass.current.value,
    });
    if (error) {
      errorHandler(error)
      inputEmail.current.style.borderColor = 'red'
      inputPass.current.style.borderColor = 'red'
    } else {
      setUserFromAuth(data.user)
      navigate('/perfil', { replace: true });
    }
  }

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/perfil', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <>
      {showExcep && (
        <Advisor displayExcep={showExcep} exception={excepResult} closeExcep={setShowExcep} />
      )}
      <section className="LoginSecForm">
        <div className="flex gap-x-4">
          <div className="flex group flex-col">
            <h2 className="text-2xl">Ingresar</h2>
            <span className="w-full h-1 rounded-md bg-blue-700/70 shadow-lg "></span>
          </div>
          <Link to='/registrarse'>
            <div className="flex group flex-col">
              <button className="cursor-pointer text-2xl text-slate-600/80">Registrarse</button>
            </div>
          </Link>
        </div>
        <form onSubmit={finishForm} className="z-10 LoginForm h-auto">
          <label className="text-center" forhtml="emailID">
            Email
            <input ref={inputEmail} className="LoginInput" type="email" placeholder="Ejemplo@gmail.com" id="emailID" required />
          </label>
          <label className="relative text-center" forhtml="passID">
            Contraseña
            <input ref={inputPass} className="LoginInput" type={showPass ? "text" : "password"} placeholder="******" autoComplete="off" id="passID" required />
            <span className="text-sm text-slate-500"></span>
            <button onClick={() => (setShowPass(!showPass))} className="absolute top-8 left-[85%] cursor-pointer z-10 ">
              <img className="globalImgs w-6 h-6 transition-all" src={showPass ? eyeOn : eyeOff} alt="" />
            </button>
          </label>
          <button className="cursor-pointer w-24 h-10 p-2 rounded-lg bg-gradient-to-r text-white self-center
              from-sky-700 to-blue-600 " type="submit">
            Log in
          </button>
          <hr className="drop-shadow-lg" />
        </form>
        <div className="relative self-center flex flex-col items-start mx-auto gap-y-2 ">
          <h3 className="text-lg dark:text-gray-400">O inicia/registrate con google:</h3>
          <button className="w-10 h-10 p-2 cursor-pointer bg-white active:scale-90 rounded-full transition-all">
            <img className="block w-full h-full" src={googleIcon} alt="" />
          </button>
        </div>
      </section>
    </>
  )
}