'use client'
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"
import { Variable } from "lucide-react"
import { useState } from "react"


interface RegisterType {
    username: string,
    email: string,
    password1: string,
    password2: string
}

export default function Login() {

    const { register, setError, handleSubmit, formState: { errors } } = useForm<RegisterType>({
        criteriaMode: "all"
    })

    const [usernameAvailability, setUsernameAvaliablity] = useState('')


    const createAccount = useMutation({
        mutationKey: ['register'],
        mutationFn: async (registerData: RegisterType) => {
        
            const response = await axios.post('http://localhost:8000/api/auth/register/', registerData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

      
            console.log("User data:", response?.data);
            return response.data
        },

        onSuccess: (data) => {
            toast.success("Account created successfully", {
                position: "top-center",
                duration: 4000,
                closeButton: true,
            })
            // localStorage.setItem('accessToken', data?.access)
            // localStorage.setItem('refreshToken', data?.refresh)
            sessionStorage.setItem('accessToken', data?.access)
            sessionStorage.setItem('refreshToken', data?.refresh)
        },

        onError: (error) => {
            if (error.message.includes('400')) {
                toast.error('A user with that username already exists.', {
                    position: 'top-center',
                    duration: 4000,
                    closeButton: true
                })
            } else {
                toast.error('An error occurred, please try again', {
                    position: 'top-center',
                    duration: 4000,
                    closeButton: true
                })
            }
        }
    })    

    const onSubmit = async (data: RegisterType) => {
        createAccount.mutateAsync(data)
    }



    return (
        <>

            <div className="bg-light-gray min-h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-white shadow-md rounded-md sm-425:!w-screen sm-425:min-h-screen sm-425:pt-12">
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)}  action="" className="p-5  w-[23rem] max-w-[23rem] sm-425:p-10 flex flex-col gap-y-2">
                                <div className="">
                                    <h1 className="font-semibold text-2xl">Create an account</h1>
                                </div>
                                <div className="flex flex-col gap-y-2 mb-2">
                                    {/* {createAccount.status === 'error' ? (
                                        <p className="text-sm text-red-500">A user with that username already exists.</p>
                                    ): ''} */}
                                    <label htmlFor="username" className="text-base">Username</label>
                                    <input type="text" {...register('username', {
                                        required: {
                                            value: true,
                                            message: "Username is required"
                                        }, pattern: {
                                            value: /^[\w.@+-]+$/,
                                            message: "Username must contain only letters, digits, or the following special characters: . @ + -"
                                        },
                                        
                                        
                                    
                                       
                                    })}
                                        className="focus:outline-none border-2 border-gray-400 p-1 rounded-md focus:border-black focus-within:transition-all focus-within:ease-in-out focus-within:duration-700 "
                                        />
                                    <ErrorMessage 
                                        errors={errors}
                                        name="username"
                                        render={({ messages }) => 
                                            messages && 
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="text-sm text-red-500">{message}</p>
                                            ))
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2 mb-2">
                                    <label htmlFor="username" className="text-base">Email address</label>
                                    <input type="text" {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Email address is required"
                                        },})}
                                        className="focus:outline-none border-2 border-gray-400 p-1 rounded-md focus:border-black focus-within:transition-all focus-within:ease-in-out focus-within:duration-700 "
                                        />
                                    <ErrorMessage 
                                        errors={errors}
                                        name="email"
                                        render={({ messages }) => 
                                            messages && 
                                            Object.entries(messages).map(([type, message]) => (
                                                <p key={type} className="text-sm text-red-500">{message}</p>
                                            ))
                                        }
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2 mb-2">
                                    <label htmlFor="password" className="text-base">Password</label>
                                    <input type="password" {...register('password1', {
                                        required: {
                                            value: true,
                                            message: "Password Required"
                                        }
                                    })}
                                    className="focus:outline-none border-2 border-gray-400 p-1 rounded-md focus-within:border-black focus-within:transition-all focus-within:ease-in-out focus-within:duration-700"
                                    />
                                    <ErrorMessage 
                                      errors={errors}
                                      name="password1"
                                      render={({ messages }) => 
                                          messages && 
                                          Object.entries(messages).map(([type, message]) => (
                                              <p key={type} className="text-sm text-red-500">{message}</p>
                                          ))
                                      }
                                    />
                                </div>
                                <div className="flex flex-col gap-y-2 mb-2">
                                    <label htmlFor="password" className="text-base">Confirm Password</label>
                                    <input type="password" {...register('password2', {
                                        required: {
                                            value: true,
                                            message: "Password Required"
                                        }
                                    })}
                                    className="focus:outline-none border-2 border-gray-400 p-1 rounded-md focus-within:border-black focus-within:transition-all focus-within:ease-in-out focus-within:duration-700"
                                    />
                                    <ErrorMessage 
                                      errors={errors}
                                      name="password2"
                                      render={({ messages }) => 
                                          messages && 
                                          Object.entries(messages).map(([type, message]) => (
                                              <p key={type} className="text-sm text-red-500">{message}</p>
                                          ))
                                      }
                                    />
                                </div>
                           
                                <button type="submit" className=" bg-black flex flex-row w-full my-3 py-2 text-white justify-center rounded-md font-medium hover:bg-opacity-90 cursor-pointer ">
                                    {createAccount.isPending ? (
                                        <span>Logging in...</span>
                                    ): (
                                        <span>Login</span>
                                    )}
                                </button>

                                <div className="text-base">
                                    <p>Already have an account? {' '} 
                                        <span  className="text-blue-500">
                                            <Link href="/login">Login</Link>
                                        </span>    
                                    </p>
                                </div>
                             
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


