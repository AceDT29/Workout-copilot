import { useState } from 'react'
import { Link } from 'react-router'
import homeIcon from '../assets/images/house-light.svg'
import exercisesIcon from '../assets/images/exercises-icon.svg'
import logInIcon from '../assets/images/login-Sun.svg'
import avatarIcon from '../assets/images/avatar.png'

export function SideNavigator({ displayNav }) {
  const [user, setUser] = useState(false);
  const userName = "Alejandro"

  return (
    <nav className={`${displayNav ? 'SideNavMain' : 'hidden'}`}>
      <ul className='flex flex-col justify-around items-start h-full space-y-4 '>
          <li className='SideLiConfig'>
            <Link to='/'> 
              <div className='SideArtConfig'>
                <figure className='SideFigureConfig'>
                  <img src={homeIcon} alt="Inicio" />
                </figure>
                <p className='SideTextConfig'>
                  Inicio
                </p>
              </div>
            </Link>
          </li>
          <li className='SideLiConfig'>
            <Link to='/ejercicios'>
              <div className='SideArtConfig'>
                <figure className='SideFigureConfig'>
                  <img src={exercisesIcon} alt="Inicio" />
                </figure>
                <p className='SideTextConfig'>
                  Ejercicios
                </p>
              </div>
             </Link>
          </li>
          <li className='SideLiConfig'>
            <Link to={user ? '/perfil' : '/ingresar'}>
              <div className='SideArtConfig'>
                <figure className='SideFigureConfig'>
                  <img className={`${user ? 'rounded-full': 'rounded-none'}`} src={user ? avatarIcon : logInIcon} alt="Inicio" />
                </figure>
                <p className='SideTextConfig'>
                  {user ? userName : "Ingresar"}
                </p>
              </div>
             </Link>
          </li> 
      </ul>
    </nav>
  )
}