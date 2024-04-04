'use client'
import { useForm } from "react-hook-form"


interface register {
    username: string,
    email: string,
    password: string
}


export default function Register() {

    const { register, formState: { errors } } = useForm<register>()

    return (
        <>
            <h1>Register Page</h1>
        </>
    )


    
};
