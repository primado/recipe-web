'use client'
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"


interface LoginTYpe {
    username: string,
    password: string
}

export default function Login() {

    const { register, formState: { errors } } = useForm<LoginTYpe>({
        criteriaMode: "all"
    })

    return (
        <>
            <form action="">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="username">Username</label>
                    <input type="text" {...register('username', {
                        required: {
                            value: true,
                            message: "Username is required"
                        },})}
                        className="focus:outline-none border-2 border-gray-500"
                        />
                    <ErrorMessage 
                        errors={errors}
                        name="username"
                        render={({ messages }) => 
                            messages && 
                            Object.entries(messages).map(([type, message]) => (
                                <p key={type}>{message}</p>
                            ))
                        }
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register('password', {
                        required: {
                            value: true,
                            message: "Password Required"
                        }
                    })}
                    className="focus:outline-none border-2 border-gray-500"
                    />
                    <ErrorMessage 
                      errors={errors}
                      name="username"
                      render={({ messages }) => 
                          messages && 
                          Object.entries(messages).map(([type, message]) => (
                              <p key={type}>{message}</p>
                          ))
                      }
                    />
                </div>
                <div className="">
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
    
};
