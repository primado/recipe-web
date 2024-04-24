'use client'
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

type Username = {
    username : string
}





export default function Profile() {

    const token: string | null = localStorage.getItem('accessToken')

    const {data: profile, isError, error, isSuccess} = useQuery({
        queryKey: ['profile',],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/auth/user-profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data);
            return response.data
        },
        
    
    })

    if (isSuccess) {
        toast.success('Request Successful', {
            position: 'top-right',
            duration: 1000,
            closeButton: true
        })
    } else if (isError) {
        toast.error(error.message, {
            position: 'top-right',
            duration: 3000,
            closeButton: true
        })
        console.log(error.message);
    }



    return (
        <>
            <h1 className="font-semibold text-2xl">Welcome to the Update User Profile Page</h1>
            <p className="text-xl font-medium">Profile details</p>
            {profile?.map((data: any) => (
            <div key={data.id} className="">
                <p className="flex flex-row">Username: <span>{data?.username}</span> </p>
                <p className="flex flex-row">Bio: <span>{data?.bio}</span> </p>
                <p className="">Headline: <span>{data?.headline}</span> </p>
                <p className="">First Name: <span>{data?.first_name}</span> </p>
                <p className="">Last Name: <span>{data?.last_name}</span></p> 
                <p className="">Email: <span>{data?.email}</span> </p>
                <p className="">Webiste: <span>{data?.website}</span> </p>
                <p className="">Instagram: <span>{data?.instagram}</span> </p>
                <p className="">Facebook: <span>{data?.facebook}</span> </p>
            </div>
            ))}
        </>
    )
};
