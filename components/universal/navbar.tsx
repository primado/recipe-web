
"use client"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import fallbackAvatar from "./../../public/assets/fallback-avatar.png"
import Image from "next/image"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import {Button} from "../ui/button"
import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import Icon from "./Icon"
import { useEffect } from "react"

export default function Navbar() {

    const token = localStorage.getItem('accessToken') as string
    const refresh = localStorage.getItem('refreshToken')

    useEffect(() => {
        if (!refresh) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    })

    return (
        <>
            <nav className="bg-white flex flex-row justify-between items-center gap-x-12 shadow-md py-5 w-full px-36">
                <div className="">
                    <Link href="/" className="text-brand text-2xl font-semibold hover:text-emerald-600 hover:transition-all hover:duration-300">
                        <p>Recipe</p>
                    </Link>
                </div>
                <div className="flex flex-row my-auto justify-around items-center gap-x-16 ">
                    <div className="flex flex-row gap-x-10 text-davy-gray text-lg font-semibold">
                        {token && (
                            <>
                                <Link href="/feed" className="hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md p-2 hover:text-emerald-600 hover:transition-all hover:duration-300">
                                    <p>Feed</p>
                                </Link>
                                <Link href="#" className="hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md p-2 hover:text-emerald-600 hover:transition-all hover:duration-300">
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