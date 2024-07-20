'use client'
import Image from "next/image"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import fallbackAvatar from "../../public/assets/fallback-avatar.png"
import { LogOut, Settings, User, UserCheck2Icon, UserCheckIcon, UserCircle2Icon } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { api_base_url } from "./API_BASE_URL"



type RefreshTokenType = {
    refresh: string
}

type ProfileDTO = {
    id: number
    username: string
    first_name: string
    last_name: string,
    email: string,
    bio: string,
    profile_picture: string,
    headline: string,
    instagram: string,
    facebook: string,
    website: string 
}


export default function Icon() {

    // const token = localStorage.getItem('accessToken') as string 
    // const refresh = localStorage.getItem('refreshToken') as string 
    
    const token = sessionStorage.getItem('accessToken') as string 
    const refresh = sessionStorage.getItem('refreshToken') as string 

    const router = useRouter()

    const logout = useMutation({
        mutationKey: ['logout'],
        mutationFn: async (newData: RefreshTokenType) => {
            const response = await axios.post(`${api_base_url}` + 'api/auth/logout/', newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data

        },

        onSuccess: (data) => {
            // localStorage.removeItem('accessToken')
            // localStorage.removeItem('refreshToken')

            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('refreshToken')

            toast.success(data.detail, {
                position: 'top-center',
                duration: 2000,
                closeButton: true
            })
            router.push("/")
            setTimeout(() => {
                router.refresh()
            }, 1000)
        },

        onError: (error) => {
            toast.error('An error ocurred whiles logging out, please try again', {
                position: 'top-center',
                duration: 5000,
                closeButton: true
            })
            console.log("Icon image error");
        }
    })

    const logoutHandler = async () => {
        logout.mutateAsync({
            refresh: refresh
        })
    }

    // Get Profile Picture
    const getProfilePic = useQuery({
        queryKey: ['profile-pic'],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}`+ 'api/auth/user-profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('User Profile data', response.data);
            return response.data
        }
    })

    const [charFName, setCharFName] = useState<string>('')
    const [charLName, setCharLName] = useState<string>('')

    useEffect(() => {
        if (getProfilePic.data && getProfilePic.data?.length > 0) {
            const profileData = getProfilePic?.data[0] as ProfileDTO
            console.log("profile data", profileData);
            setCharFName(profileData?.first_name)
            setCharLName(profileData?.last_name)
        }
    }, [getProfilePic.data])



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline"  className="focus:border-none focus-visible:ring-1 ring-offset-0 focus-visible:ring-gray-200"> */}
                <button className="focus:outline-none ">
                    {getProfilePic && getProfilePic?.data?.map((picture: ProfileDTO) => (

                    
                    <Avatar key={picture.id} className="cursor-pointer w-[2.5rem] h-[2.5rem]">
                        <AvatarImage src={picture?.profile_picture} className="rounded-full "/>
                        <AvatarFallback className="rounded-full  font-semibold">
                            {charFName.charAt(0).toUpperCase()}{charLName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    ))}
                </button>
                {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[17rem] !p-0">
                <Link href="/profile">
                <DropdownMenuGroup className="hover:bg-hover-1 hover:bg-opacity-40 px-5 py-4">
                    {getProfilePic && getProfilePic?.data?.map((data: ProfileDTO) => (
                        <DropdownMenuItem key={data.id}  className="flex flex-row justify-start items-center gap-3 cursor-pointer hover:outline-none ">

                            <button className="focus:outline-none ">
                                <Avatar  className="cursor-pointer w-[3.3rem] h-[3.3rem]">
                                    <AvatarImage 
                                         src={data?.profile_picture} 
                                         className="rounded-full "
                                    />
                                    <AvatarFallback className="rounded-full  font-semibold">
                                      {charFName.charAt(0).toUpperCase()}{charLName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                           
                            </button>
                            <div className="flex flex-col gap-0">
                                <p className="text-lg font-semibold ">{data?.first_name} {data?.last_name}</p>
                                <p className="text-base font-medium">@{data?.username}</p>
                            </div>

                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                </Link>
     
                <DropdownMenuSeparator className="bg-hover-1 h-[0.1rem]" />

                <DropdownMenuGroup className="flex flex-col gap-y-1 font-semibold ">
                    {/* <DropdownMenuItem className="flex flex-row items-center gap-x-1 py-3 px-5  cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 ">
                        <User className="h-4 w-4 " />
                        <button onClick={() => router.push('/#')}>
                        <span>Profile</span></button>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-3 px-5 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40">
                        
                        <button onClick={() => router.push("/profile-settings")} className="flex flex-row gap-x-2">
                            <UserCircle2Icon size={23} strokeWidth={2}/>
                            <span>Profile Settings</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-3 px-5 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40">
                        
                        <button onClick={() => router.push("")} className="flex flex-row gap-x-2">
                            <Settings size={23} strokeWidth={2} />
                            <span>Account</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-hover-1 h-[0.1rem]" />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-3 px-5 font-semibold text-red-700 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40">
                        
                        <button onClick={logoutHandler} className="flex flex-row gap-x-2">
                            <LogOut size={23} strokeWidth={2}/>
                            <span>Logout</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            
            </DropdownMenuContent>
                                       
                                    
                                
        </DropdownMenu>
    )
    
};
