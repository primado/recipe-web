'use client'
import CreateRecipe from "@/components/recipeCRUD/createRecipe"
import Navbar from "@/components/universal/navbar"
import { redirect } from "next/navigation"
import { useEffect, useLayoutEffect } from "react"



export default function Dashboard() {

    return (
        <>
            <Navbar />
            <section className="bg-tan w-full px-52 py-20">
                <CreateRecipe />
            </section>

        </>
    )
    
};
