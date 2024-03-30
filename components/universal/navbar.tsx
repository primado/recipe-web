
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

export default function Navbar() {

    return (
        <>
            <nav className="bg-white flex flex-row justify-between items-center gap-x-12 shadow-md py-5 w-full px-28">
                <div className="">
                    <Link href="/" className="text-brand text-2xl font-semibold">
                        <p>Recipe</p>
                    </Link>
                </div>
                <div className="flex flex-row my-auto justify-around items-center gap-x-20  ">
                    <div className="flex flex-row gap-x-10 text-davy-gray text-lg font-semibold">
                        <Link href="/feed" className="">
                            <p>Feed</p>
                        </Link>
                        <Link href="/about" className="">
                            <p>About</p>
                        </Link>
                        <Link href="/about" className="">
                            <p>Contact</p>
                        </Link>
                        
                    </div>
                    <div className="">
                        <div className=" rounded-full w-10 h-10 ">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    {/* <Button variant="outline"  className="focus:border-none focus-visible:ring-1 ring-offset-0 focus-visible:ring-gray-200"> */}
                                    <button className="focus:outline-none">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage 
                                                 src="https://github.com/shadcn.png" 
                                                 className="rounded-full "
                                            />
                                            <AvatarFallback>
                                                <Image
                                                    src={fallbackAvatar}
                                                    alt="fallback avatar"
                                                    className="rounded-full"
                                               />
                                            </AvatarFallback>
                                        </Avatar>
                                    </button>
                                    {/* </Button> */}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[11rem]">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-hover-1" />
                                    <DropdownMenuGroup className="flex flex-col gap-y-2 ">
                                        <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-2 ml-2 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md ">
                                            <User className="h-4 w-4 ml-2" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-2 ml-2 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md">
                                            <Settings className=" h-4 w-4 ml-2" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-2 ml-2 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md">
                                            <LogOut className=" h-4 w-4 ml-2" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    

                                </DropdownMenuContent>
                                       
                                    
                                
                            </DropdownMenu>
                            
                        </div>
                    </div>
                    
                </div>
               
            </nav>
        </>
    )
}