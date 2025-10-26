import { Link } from 'react-router'
import checkListIcon from '../assets/images/checklist.svg'
import homeIcon from '../assets/images/house-light.svg'
import exercisesIcon from '../assets/images/exercises-icon.svg'
import logInIcon from '../assets/images/login-Sun.svg'
import avatarIcon from '../assets/images/avatar.png'
import { useUser } from '../hooks/useUser';

export function SideNavigator({ displayNav, showRoutines, showState }) {
  const { isAuthenticated, user } = useUser();

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
        {isAuthenticated &&
          <li className='SideLiConfig'>
            <button onClick={() => showRoutines(!showState)} className='SideArtConfig'>
              <figure className='SideFigureConfig'>
                <img src={checkListIcon} alt="Inicio" />
              </figure>
              <p className='SideTextConfig'>
                Mis rutinas
              </p>
            </button>
          </li>
        }
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
          <Link to={isAuthenticated ? '/perfil' : '/ingresar'}>
            <div className='SideArtConfig'>
              <figure className='SideFigureConfig'>
                <img className={`${user ? 'rounded-full' : 'rounded-none'}`} src={user ? avatarIcon : logInIcon} alt="Inicio" />
              </figure>
              <p className='SideTextConfig'>
                {user ? 'Perfil' : "Ingresar"}
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}