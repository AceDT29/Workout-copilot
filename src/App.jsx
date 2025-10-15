import { Router, Routes, Route, Link } from 'react-router'
import { WorkoutsContainer } from './Components/WorkoutsContainer'
import { SideNavigator } from './Components/SideNavigator'
import { LogIn } from './Components/LogIn'
import { SignUp } from './Components/SignUp'
import { Profile } from './Components/Profile'
import { useState } from 'react'
import rightArrow from './assets/images/arrowR.svg'
import leftArrow from './assets/images/arrowL.svg'
import './css/index.css'

export function AppRouter() {
  const [gotNav, setGotNav] = useState(false);

  const validateFields = (inputEmail, inputPass) => {
    const patternValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let confirmValue = false;
    let emailValue = inputEmail.value;
    let passValue = inputPass.value;

    if (patternValid.test(emailValue.trim())) {
      inputEmail.style.borderColor = "green";
    } else {
      inputEmail.style.borderColor = "red";
    }

    if (passValue.trim().length < 8) {
      inputPass.style.borderColor = "red";
      inputPass.nextElementSibling.textContent = "La contraseña es muy corta";
    } else {
      inputPass.style.borderColor = "green";
      inputPass.nextElementSibling.textContent = "";
    }
    confirmValue = patternValid.test(emailValue) && passValue.length >= 8;
    return confirmValue
  };

  return (
    <main>
      <header className='sticky w-full z-30 h-auto border-b shadow-lg flex items-center justify-center p-4 backdrop-blur-2xl bg-white/30 mb-16'>
        <h1 className="text-4xl my-4">Workout Copilot</h1>
      </header>
      <section className='flex flex-grow'>
        <div className='fixed z-20 flex items-center group w-auto h-auto transition-all'> 
          <SideNavigator displayNav={gotNav} />
          <button className='z-20 w-8 h-8 lg:w-12 lg:h-12 cursor-pointer' onClick={() => setGotNav(!gotNav)}>
              <img src={gotNav ? leftArrow : rightArrow} className={`${gotNav ? 'rotateClass rotate-360 duration-500' : 'active:rotate-90 transition duration-500'}`} alt="" />
          </button>
        </div>
        <article onClick={() => setGotNav(false)} className='relative w-[80%] h-auto h-min-[100vh] rounded-md border shadow-lg p-4 mx-auto md:w-[70%]'>
          <Routes>
            <Route path='/' element={<WorkoutsContainer />} />
            <Route path='/ingresar' element={<LogIn validate={validateFields} />} />
            <Route path='/registrarse' element={<SignUp validate={validateFields} />} />
            <Route path='/perfil' element={<Profile />} />
          </Routes>
        </article>
      </section>
    </main>  
  )
}


