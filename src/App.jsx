import { useForm } from 'react-hook-form'
import './App.css'
import { useState } from 'react';

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ showPassword, setShowPassword ] = useState(false);

  const onSubmit = (data) => {
    console.log(data)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className='flex flex-col items-center justify-center h-screen bg-gray-300'>
      <h2 className='text-2xl font-bold'>Formulario React Hook Form:</h2>
      <form className='flex flex-col items-center justify-center max-w-md w-1/2 p-4 bg-white rounded-lg shadow-lg gap-2' onSubmit={handleSubmit(onSubmit)} >
        <div className='flex flex-col w-full p-2'>
          <label>Usuario:</label>
          <input className='bg-gray-300 rounded-lg pl-2' type="text" {...register('username', { required: true})} />
        </div>
        <div className='flex flex-col w-full p-2'>
          <label>Contraseña:</label>
          <div className='relative w-full'>
            <input className='bg-gray-300 rounded-lg pl-2 w-full' type={showPassword ? "text" : "password"} {...register('password', { 
              required: "Este campo es obligatorio", 
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                message: "Contraseña no válida. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
              }
            })} />
            <button type="button" className='absolute rounded-lg pl-2 pr-2 right-0 top-0 bg-gray-400' onClick={togglePasswordVisibility}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </div>
        <div className='flex flex-col w-full p-2'>
          <label>Correo electronico:</label>
          <input className='bg-gray-300 rounded-lg pl-2' type="mail" {...register('mail', { required: true, pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Correo electrónico no válido"}})} />
          {errors.mail && <span className='text-red-500 p-1'>{errors.mail.message}</span>}
        </div>
        <button>Enviar</button>
      </form>
    </main>
  )
}

export default App
