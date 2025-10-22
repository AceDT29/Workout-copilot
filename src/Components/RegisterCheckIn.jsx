import greenCheck from '../assets/images/green-check.png'

export function CheckIn() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center gap-y-6 p-4'>
            <figure className='w-28 h-28 rounded-full bg-green-300/60'>
                <img src={greenCheck} alt="" />
            </figure>
            <h2 className='text-2xl'>Ya casi estamos...</h2>
            <div className="w-[60%] h-auto text-center">
                <p className=''>
                    Hemos enviado la confirmacion de tu cuenta, revisa tu correo, has click en el enlace para activar tu cuenta.
                    Debes iniciar sesion para ingresar a tu perfil
                </p>
            </div>
        </div>
    )
}