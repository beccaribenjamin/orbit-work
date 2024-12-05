import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const {login, errors: loginErrors, isAuthenticated} = useAuth()
    
    const navigate = useNavigate()

    const onSubmit = handleSubmit( data => {
        login(data)
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-10 rounded-md bg-neutral-500">
                    <h2 className="text-3xl text-center font-bold pb-5 text-white">Inicia Sesión</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            type="text" 
                            placeholder='Email'
                            name='email'
                            {...register("email", { required: true })}
                            className='w-full bg-zinc-100 px-4 py-2 my-2 rounded-md'
                        />
                        <input 
                            type="password" 
                            placeholder='Password'
                            name='password'
                            {...register("password", { required: true, minLength: 6 })}
                            className='w-full bg-zinc-100 px-4 py-2 my-2 rounded-md'
                        />
                        <button type="submit" className="w-full h-10 mt-4 px-4 rounded-md bg-sky-900 text-white ">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
