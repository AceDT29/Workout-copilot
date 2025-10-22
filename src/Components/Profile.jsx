import emailIcon from '../assets/images/email-light.svg';
import nameIcon from '../assets/images/name.svg';
import avatarIcon from '../assets/images/avatar.png';
import changePicIcon from '../assets/images/set-profilePic.png'
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { supabase } from '../Lib/supabaseConfig';

export function Profile() {
  const { user, clearUser, loading, isAuthenticated } = useUser();
  const Navigate = useNavigate()

  const userOut = async () => {
    try {
      await supabase.auth.signOut();
      Navigate('/ingresar', { replace: true });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      clearUser();
    }
  }

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      Navigate('/ingresar', { replace: true });
    }
  }, [isAuthenticated, loading, Navigate]);

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
      <article className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
          <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg border-2">
            <img
              src={user && user?.photoURL ? user.photoURL : avatarIcon}
              alt='Foto de perfil'
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
              <img src={changePicIcon} alt="Cambia la foto de perfil" />
            </button>
          </div>

          <h2 className="text-xl font-medium">{user && user?.displayName ? user.displayName : 'No display name'}</h2>

          <div className="w-full flex flex-col gap-2 mt-4">
            <button
              onClick={userOut}
              className="w-full px-4 py-2 rounded shadow-lg border text-slate-700 hover:bg-slate-400/70  transition duration-500"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <div className={`w-full p-4 rounded-md shadow mb-4 bg-white `}>
            <h3 className="text-lg font-semibold mb-2">Informacion de cuenta</h3>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-3">
                <figure className="w-8 h-8 inline-block p-1 rounded-full">
                  <img src={nameIcon} alt="" />
                </figure>
                <div>
                  <div className="text-sm font-medium"></div>
                  <div className="text-sm text-slate-500">
                    {user && user.displayName ? user.displayName : <button className='profileSetters'>Añade un nombre</button>} 
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <figure className="w-8 h-8 inline-block p-2 rounded-full">
                  <img src={emailIcon} alt="" />
                </figure>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-sm text-slate-500">{user?.email}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-full p-4 rounded-md shadow bg-white`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Tus rutinas</h3>
              <button className="text-sm text-blue-600 hover:underline">Ver todo</button>
            </div>
            <div className="border border-dashed border-slate-200 rounded p-6 text-center">
              <p className="text-sm mb-3">Aun no has creado rutinas</p>
              <button className="px-4 py-2 rounded bg-blue-600 text-white">Crea tu primera rutina</button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
