import googleIcon from '../assets/images/google.svg'
import eyeOff from '../assets/images/eye.svg'
import eyeOn from '../assets/images/eye-dont-see.svg'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { supabase } from '../Lib/supabaseConfig';
import { useUser } from '../hooks/useUser';
import { Advisor } from './Advisor';
import { useHandleAuth } from '../hooks/useAuthForm';

export function SignUp() {
    const { loading, isAuthenticated } = useUser();
    const { validateFields, showExcep, setShowExcep, excepResult, errorHandler, navigate } = useHandleAuth();
    const [showPass, setShowPass] = useState(false);
    const inputEmail = useRef(null);
    const inputPass = useRef(null);
    const inputPassCheck = useRef(null);

    const matchingValue = (value, confirmValue, field) => {
        let check = false
        if (value !== confirmValue) {
            field.style.borderColor = "red"
            field.nextElementSibling.textContent = "Las contraseñas no coinciden"
        } else {
            field.style.borderColor = "green"
        }
        check = value === confirmValue
        return check
    }

    const finishForm = async (e) => {
        e.preventDefault();
        if (!validateFields(inputEmail.current, inputPass.current)) return
        if (!matchingValue(inputPass.current.value, inputPassCheck.current.value, inputPassCheck.current)) return
        const { error } = await supabase.auth.signUp({
            email: inputEmail.current.value,
            password: inputPass.current.value,
        });
        if (error) {
            errorHandler(error) // Pasamos el objeto de error completo
            inputEmail.current.style.borderColor = 'red'
            inputPass.current.style.borderColor = 'red'
        } else {
            navigate('/registrarse/confirmar', { replace: true });
        }
    }

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/perfil', { replace: true });
        }
    }, [loading, isAuthenticated, navigate]);

    return (
        <>
            {showExcep && (
                <Advisor displayExcep={showExcep} exception={excepResult} closeExcep={setShowExcep} />
            )}
            <section className="LoginSecForm">

                <div className="flex gap-x-4">
                    <div className="flex group flex-col">
                        <h2 className="text-2xl">Registrarse</h2>
                        <span className="w-full h-1 rounded-md bg-blue-700/70 shadow-lg "></span>
                    </div>
                    <Link to='/ingresar'>
                        <div className="flex group flex-col">
                            <button className="cursor-pointer text-2xl text-slate-600/80">Ingresar</button>
                        </div>
                    </Link>
                </div>
                <form onSubmit={finishForm} className="z-10 LoginForm h-auto">
                    <label className="text-center" forhtml="emailID">
                        Ingresa tu email
                        <input ref={inputEmail} className="LoginInput" type="email" placeholder="Ejemplo@gmail.com" id="emailID" required />
                    </label>
                    <label className="relative text-center" forhtml="passID">
                        Crea una contraseña
                        <input ref={inputPass} className="LoginInput" type={showPass ? "text" : "password"} placeholder="******" autoComplete="off" id="passID" required />
                        <span className="text-sm text-center text-slate-500">La contraseña debe tener al menos 8 caracteres</span>
                        <button onClick={() => (setShowPass(!showPass))} className="absolute top-8 left-[85%] cursor-pointer z-10 ">
                            <img className="globalImgs w-6 h-6 transition-all" src={showPass ? eyeOn : eyeOff} alt="" />
                        </button>
                    </label>
                    <label className="relative text-center" forhtml="passCheckID">
                        Confirma la contraseña
                        <input ref={inputPassCheck} className="LoginInput" type={showPass ? "text" : "password"} placeholder="******" autoComplete="off" id="passCheckID" required />
                        <span className="text-sm text-slate-500">La contraseña debe ser la misma del campo anterior</span>
                        <button onClick={() => (setShowPass(!showPass))} className="absolute top-8 left-[85%] cursor-pointer z-10 ">
                            <img className="globalImgs w-6 h-6 transition-all" src={showPass ? eyeOn : eyeOff} alt="" />
                        </button>
                    </label>
                    <button className="cursor-pointer w-24 h-10 p-2 rounded-lg bg-gradient-to-r text-white self-center
                     from-orange-700 to-red-600 " type="submit">
                        Registrase
                    </button>
                    <hr className="drop-shadow-lg" />
                </form>
                <div className="relative self-center flex flex-col justify-center items-start gap-y-2">
                    <h3 className="text-lg text-center dark:text-gray-400">O inicia/registrate con google:</h3>
                    <button className="w-10 h-10 p-2 cursor-pointer bg-white active:scale-90 rounded-full transition-all">
                        <img className="block w-full h-full" src={googleIcon} alt="" />
                    </button>
                </div>
            </section>
        </>
    )
}