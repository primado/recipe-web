'use client'
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import Link from "next/link"


interface LoginTYpe {
    username: string,
    password: string
}

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginTYpe>({
        criteriaMode: "all"
    })

    const login = useMutation({
        mutationKey: ['login'],
        mutationFn: async (loginData: LoginTYpe) => {
            const response = await axios.post('http://localhost:8000/api/auth/login/', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log("User data:", response?.data);
            return response.data
        },

        onSuccess: (data) => {
            toast.success("Logged in successfully", {
                position: "top-right",
                duration: 4000,
                closeButton: true,
            })
            localStorage.setItem('accessToken', data?.access)
            localStorage.setItem('refreshToken', data?.refresh)
        },

        onError: () => {
            toast.error("Invalid username or password", {
                position: "top-right",
                duration: 4000,
                closeButton: true,
            })
        }

    })

    const onSubmit = async (data: LoginTYpe) => {
        login.mutateAsync(data)
    }



    return (
        <>

            <div className="bg-light-gray min-h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-white shadow-md rounded-md sm-425:!w-screen sm-425:min-h-screen sm-425:pt-12">
                        <div className="">
                            <form onSubmit={handleSubmit(onSubmit)}  action="" className="p-5 min-w-[20rem] sm-425:p-10">
                                <div className="flex flex-col gap-y-2 mb-2">
                                    <label htmlFor="username" className="text-base">Username</label>
                                    <input type="text" {...register('username', {
                                        required: {
                                            value: true,
                                            message: "Username is required"
                                        },})}
                                        className="focus:outline-none border-2 border-gray-400 p-1 rounded-md"
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
                                    <label htmlFor="password" className="text-base">Password</label>
                                    <input type="password" {...register('password', {
                                        required: {
                                            value: true,
                                            message: "Password Required"
                                        }
                                    })}
                                    className="focus:outline-none border-2 border-gray-400 p-1 rounded-md"
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
                           
                                <button type="submit" className=" bg-black flex flex-row w-full my-3 py-2 text-white justify-center rounded-md font-medium hover:bg-opacity-90 cursor-pointer ">
                                    {login.isPending ? (
                                        <span>Logging in...</span>
                                    ): (
                                        <span>Login</span>
                                    )}
                                </button>

                                <div className="text-base">
                                    <p>Don&apos;t have an account? {' '} 
                                        <span  className="text-blue-500">
                                            <Link href="">Register</Link>
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
