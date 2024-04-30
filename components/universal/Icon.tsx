
import Image from "next/image"
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
import { LogOut, Settings, User } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


type RefreshTokenType = {
    refresh: string
}




export default function Icon() {

    const token = localStorage.getItem('accessToken') as string 
    const refresh = localStorage.getItem('refreshToken') as string 
    const router = useRouter()

    const logout = useMutation({
        mutationKey: ['logout'],
        mutationFn: async (newData: RefreshTokenType) => {
            const response = await axios.post('http://localhost:8000/api/auth/logout/', newData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            
            })
            return response.data

        },

        onSuccess: (data) => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            toast.success(data.detail, {
                position: 'top-center',
                duration: 2000,
                closeButton: true
            })
            router.push("/")
            window.location.reload()
        },

        onError: (error) => {
            toast.error('An error ocurred whiles logging out, please try again', {
                position: 'top-center',
                duration: 5000,
                closeButton: true
            })
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
            const response = await axios.get('http://localhost:8000/api/auth/user-profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log('User Profile data', response.data);
            return response.data
        }
    })



    const pictures = getProfilePic.data


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline"  className="focus:border-none focus-visible:ring-1 ring-offset-0 focus-visible:ring-gray-200"> */}
                <button className="focus:outline-none ">
                    {pictures && pictures.map((picture: any) => (

                    
                    <Avatar key={picture.id} className="cursor-pointer ">
                        <AvatarImage 
                             src={picture?.profile_picture} 
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
                    ))}
                </button>
                {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[11rem]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-hover-1" />
                <DropdownMenuGroup className="flex flex-col gap-y-2 ">
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-2 ml-2 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md ">
                        <User className="h-4 w-4 ml-2" />
                        <button onClick={() => router.push('/profile')}><span>Profile</span></button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-2 ml-2 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md">
                        <Settings className=" h-4 w-4 ml-2" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-2 ml-2 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 hover:rounded-md">
                        <LogOut className=" h-4 w-4 ml-2" />
                        <button onClick={logoutHandler}><span>Logout</span></button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            
            </DropdownMenuContent>
                                       
                                    
                                
        </DropdownMenu>
    )
    
};
