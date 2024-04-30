'use client'
import React, { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation";



export default function AllowedPages({children}: {children: React.ReactNode}) { 

    const [authenticated, setAuthenticated] = useState<Boolean>(false)

    const router = useRouter()

    useEffect(() => {
        
        const checkAuthentication = async () => {
            const token = localStorage.getItem('accessToken')
            if (!token && window.location.pathname !== '/') {
                router.push("/")
            } else if (token && window.location.pathname === '/login') {
              router.push('/feed')
            } else if (!token && window.location.pathname === '/feed') {
                router.push("/")
            }
        };

        checkAuthentication();
   
    }, [router]);



    return authenticated ? <>{children}</> : <>{children}</>;


}