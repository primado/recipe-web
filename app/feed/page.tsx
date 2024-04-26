'use client'
import Navbar from "@/components/universal/navbar"
import { redirect } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"



export default function Dashboard() {



    

    useLayoutEffect(() => {
        const token = localStorage.getItem('accessToken')
         if (!token) {
             redirect("/login")
         }
    }, [])


    return (
        <>
            <Navbar />
            <section className="bg-white-fb min-h-screen">
                <h1 className="text-2xl text-black font-serif">Hello, this is the Feed page</h1>
            </section>

        </>
    )
    
};
