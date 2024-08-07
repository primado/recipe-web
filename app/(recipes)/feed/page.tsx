'use client'
import PublicRecipeFeed from "@/components/detail/publicRecipefeed"
import Navbar from "@/components/universal/navbar"
import { redirect } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"



export default function Dashboard() {


    useEffect(() => {
        const token = sessionStorage.getItem('accessToken')
         if (!token) {
             redirect("/")
         }
    }, [])


    return (
        <>
            <Navbar />
            <section className="bg-tan w-full min-h-screen px-52 py-20">
                <PublicRecipeFeed />
            </section>

        </>
    )
    
};
