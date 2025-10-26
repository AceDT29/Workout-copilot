import { Routes, Route } from 'react-router'
import { WorkoutsContainer } from './Components/WorkoutsContainer'
import { SideNavigator } from './Components/SideNavigator'
import { LogIn } from './Components/LogIn'
import { SignUp } from './Components/SignUp'
import { Profile } from './Components/Profile'
import { CheckIn } from './Components/RegisterCheckIn'
import { MyRoutines } from './Components/MyRoutines'
import { useState } from 'react'
import rightArrow from './assets/images/arrowR.svg'
import leftArrow from './assets/images/arrowL.svg'
import './css/index.css'

export function AppRouter() {
  const [gotNav, setGotNav] = useState(false);
  const [showMyList, setShowMyList] = useState(false);
  
  console.log(showMyList)

  return (
    <main>
      <header className='sticky w-full z-30 h-auto border-b shadow-lg flex items-center justify-center p-4 backdrop-blur-2xl bg-white/30 mb-16'>
        <h1 className="text-4xl my-4">Workout Copilot</h1>
      </header>
      <section className='relative flex flex-grow'>
        <div className='fixed z-20 flex items-center group w-auto h-auto transition-all'> 
          <SideNavigator displayNav={gotNav} showRoutines={setShowMyList} showState={showMyList}/>
          <button className='z-20 w-8 h-8 lg:w-12 lg:h-12 cursor-pointer' onClick={() => setGotNav(!gotNav)}>
              <img src={gotNav ? leftArrow : rightArrow} className={`${gotNav ? 'rotateClass rotate-360 duration-500' : 'active:rotate-90 transition duration-500'}`} alt="" />
          </button>
        </div>
        <article onClick={() => setGotNav(false)} className='relative w-[80%] h-auto h-min-[100vh] rounded-md shadow-md p-4 mx-auto'>
          <Routes>
            <Route path='/' element={<WorkoutsContainer />} />
            <Route path='/ingresar' element={<LogIn />} />
            <Route path='/registrarse' element={<SignUp />} />
            <Route path='/ingresar' element={<LogIn />} />
            <Route path='/registrarse' element={<SignUp />} />
            <Route path='/perfil' element={<Profile />} />
            <Route path='/registrarse/confirmar' element={<CheckIn />}/>
          </Routes>
        </article>
         <div className='fixed right-0 z-30 flex items-center group w-auto h-auto transition-all'>
          <MyRoutines display={showMyList} />
        </div>
      </section>
    </main>  
  )
}


