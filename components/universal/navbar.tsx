"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Icon from "./Icon"
import { useEffect } from "react"

export default function Navbar() {

    const token = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null
    const refresh = typeof window !== 'undefined' ? sessionStorage.getItem('refreshToken') : null

    const pathname = usePathname()

    useEffect(() => {
        if (!refresh) {
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')
        }
    })

    return (
        <>
            <nav className="bg-white flex flex-row justify-between items-center gap-x-12 shadow-md py-5 w-full px-52">
                <div className="">
                    <Link href="/" className="text-brand text-2xl font-semibold hover:text-emerald-600 hover:transition-all hover:duration-300">
                        <p>Recipe</p>
                    </Link>
                </div>
                <div className="flex flex-row my-auto justify-around items-center gap-x-16 ">
                    <div className="flex flex-row gap-x-10 text-davy-gray text-lg font-semibold">
                        {token && (
                            <>
                                <Link href="/feed" className={` ${pathname === '/feed' ? 'text-emerald-600 ' : ''} hover:bg-hover-1  hover:bg-opacity-40 hover:text-emerald-600  hover:rounded-md p-2  hover:transition-all hover:duration-300`}>
                                    <p>Feed</p>
                                </Link>
                                <Link href="/collections" className={` ${pathname === '/collections' ? 'text-emerald-600 ' : ''} hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md p-2 hover:text-emerald-600 hover:transition-all hover:duration-300`}>
                                    <p>Collections</p>
                                </Link>
                            </>
                        )}
                       
                        <Link href="#" className="hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md p-2 hover:text-emerald-600 hover:transition-all hover:duration-300">
                            <p>About</p>
                        </Link>
                        <Link href="#" className="hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md p-2 hover:text-emerald-600 hover:transition-all hover:duration-300">
                            <p>Contact</p>
                        </Link>
                        
                    </div>
                    <div className="flex justify-center items-center">
                        <div className=" rounded-full   text-lg font-semibold ">
                            {!token ? (
                                <Link href="/login" className="hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md p-2 hover:text-emerald-600 hover:transition-all hover:duration-300">
                                    <span className="">Sign in</span>
                                </Link>
                                
                            ): (
                                <div className=""><Icon /></div>
                            )}
                        
                        </div>
                    </div>
                    
                </div>
               
            </nav>
        </>
    )
}