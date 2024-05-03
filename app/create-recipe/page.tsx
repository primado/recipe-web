'use client'
import CreateRecipe from "@/components/createComponent/createRecipe"
import Navbar from "@/components/universal/navbar"
import { redirect } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"



export default function Dashboard() {

    return (
        <>
            <Navbar />
            <section className="bg-tan w-full px-60 py-20">
                <CreateRecipe />
            </section>

        </>
    )
    
};
