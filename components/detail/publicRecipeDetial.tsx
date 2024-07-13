'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ArrowLeftIcon, Edit2Icon, ImageIcon, TimerIcon, Trash } from "lucide-react"
import Image from "next/image"
import dayjs from "dayjs"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Oval } from "react-loader-spinner"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { toast } from "sonner"


type RecipeDTO = {
    id: number,
    title: string,
    instruction: string,
    description: string,
    ingredient: string,
    cooking_time_duration: string,
    visibility: string,
    difficulty_level: string,
    last_updated: string,
    // recipe_image: string | null,
    user: {
        id: number,
        first_name: string,
        last_name: string
    }
}

// const token = localStorage.getItem('accessToken')
const token: string | null = sessionStorage.getItem('accessToken')
import { api_base_url } from "../universal/API_BASE_URL"
import { DialogClose } from "@radix-ui/react-dialog"

export default function PublicRecipeDetial({id}: {id: number}) {


    const queryClient = useQueryClient()
    const router = useRouter()

    const fetchCurrentUser = async () => {
        const response = await axios.get('http://localhost:8000/api/auth/user-profile', {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        })
        console.log("User Data", response.data)
        return response.data
    }

    const currentUser = useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
    })
    
    const recipeData = useQuery({
        queryKey: ['retrieveRecipe', id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/api/recipe/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("Detail retrieve data =>", response.data);
            return response.data
        }
    })


    // Delete Recipe Data  Mutation
    const deleteRecipe = useMutation({
        mutationKey: ['deleteRecipe', id],
        mutationFn: async () => {
            const response = await axios.delete(`${api_base_url}api/recipe/${id}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            return response.data
        },
        onSuccess: () => {
            toast.success('Recipe deleted successfully.', {
                style: {
                    background: "#ecfdf3",
                    color: "#30a257"
                }
            })
            queryClient.invalidateQueries({queryKey: ['getUpdateRecipeData']})
            setTimeout(() => {
                router.refresh()
                router.push("/feed")
            }, 1000);
        },
        onError: (error) => {
            // toast.error('Oops an error occured, try again.', {
            //     duration: 3000,
            //     closeButton: true,
            //     position: 'top-center'
            // })
            toast.error("Oops an error occured, try again.", {
                style: {
                    background: "#fff0f0",
                    color: "#ec3e3e"
                }
            })
            console.log("Delete Recipe Error msg", error.message, error.cause);
        }
    })


    const [userID, setUserID] = useState<Number>(0)
    const [lDated, setLDatad] = useState<string>('')

    useEffect(() => {
        // console.log("Current User ID: ", currentUser.data);
        if (currentUser.data && currentUser.data.length > 0) {
            // Access the first element of the array to get user data
            const userData = currentUser.data[0];
            // Set the user ID
            setUserID(userData.id);
        };

        if (recipeData.data && recipeData.data.length > 0) {
            const recipeDataJson = recipeData.data[0]
            console.log("Recipe Data", recipeDataJson);
    
            setLDatad(recipeDataJson?.last_updated)
        }
    }, [currentUser, recipeData.data])


    const formattedLastUpdate = lDated
    ? dayjs(lDated).format('MMMM D, YYYY')
    : "Date not available";
  
    console.log(formattedLastUpdate);

    console.log("user id", userID);


    return (

        <>
            <section className="px-52 py-16 bg-tan w-full min-h-screen ">
               
                <div className="flex flex-col gap-12">
                    
                    <div className="flex flex-row justify-between items-center">
                        <Button 
                              size={'sm'}  variant={'default'} 
                              onClick={() => router.back()}
                              className="text-base py-5">
                             <p className="flex flex-row gap-x-1 justify-center items-center">
                                 <ArrowLeftIcon size={23} strokeWidth={2} />
                                 Go back
                             </p>
                        </Button>
                        
                
                            { recipeData && recipeData?.data?.map((data: RecipeDTO) => (
                                <div  key={data.id} className="flex flex-row justify-center gap-5">
                                {userID === data?.user?.id && (
                                    <Button
                                        size={'sm'} variant={'default'} 
                                        onClick={() => router.push(`/edit-recipe/${data.id}`)}
                                        className="text-base py-5"
                                    >
                                        <p className="flex flex-row gap-x-1 justify-center items-center">
                                            <Edit2Icon size={23} strokeWidth={2} />
                                            <span>Edit Recipe</span>
                                        </p>
                                    </Button>
                                )} 

                                {userID === data?.user?.id && recipeData && recipeData?.data?.map((data: RecipeDTO) => (
                                    <Dialog key={data.id}>
                                        <DialogTrigger>
                                            <Button
                                                size={'sm'} variant={'destructive'}
                                                // onClick={() => router.push(`/delete-recipe/${data.id}`)}
                                                className="text-base py-5"
                                            >
                                                <p className="flex flex-row gap-x-1 justify-center items-center">
                                                    <Trash size={23} strokeWidth={2} />
                                                    <span>Delete Recipe</span>
                                                </p>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogDescription className="text-black font-medium text-lg">
                                                    Are you sure you want to delete <b>&quot;{data?.title}&quot;</b>? 
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <div className="flex flex-row justify-end items-end gap-x-5">
                                                    <Button
                                                        size={'lg'} variant={'destructive'}
                                                        disabled={deleteRecipe.isPending}
                                                        onClick={() => deleteRecipe.mutateAsync()}
                                                        className={`${deleteRecipe.isPending ? 'bg-opacity-50' : ''} rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center`}
                                                    >
                                                        {deleteRecipe.isPending ? 'Deleting' : ' Delete'}
                                                    </Button>
                                                    <DialogClose asChild>
                                                        <Button
                                                            size={'lg'} variant={'outline'}
                                                            className="rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                </div>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                ))}
                            
                                </div>
                            ))}

                     
                    </div>
                    {recipeData && recipeData.data?.map((data: any) => (
                         <div key={data.id} className="flex flex-col gap-y-5">
                         <div className="flex flex-col gap-y-4 w-[70%]">
                             <h1 className="text-black break-words text-5xl font-bold">{data?.title}</h1>
                             <p className="text-black text-xl font-medium text-justify">{data?.description}</p>
                         </div>
                         <div className="flex flex-row justify-between items-stretch">
                            <div className="flex flex-col gap-y-5">
                                 <div className="">
                                     <h2 className="text-black font-semibold text-2xl">{data?.user?.first_name} {data?.user?.last_name}</h2>
                                     <p className="italic text-gray-500  text-lg font-normal"> Last updated - {formattedLastUpdate}</p>
                                 </div>
                                 <div className="flex flex-row gap-3 justify-start items-center ">
                                    <h4 className="text-black text-lg font-medium flex flex-row gap-x-1">
                                        <TimerIcon size={23} strokeWidth={2} className="text-red-500"/>
                                        <span>Total Time -</span>
                                    </h4>
                                    <p className="text-lg font-medium">
                                        {data?.cooking_time_duration}
                                    </p>
                                 </div>
                             </div>
                             
                         </div>
                         <div className="flex flex-row justify-between items-start">
                             <div className="flex flex-row gap-10 text-base font-medium text-black w-[60%]">
                                    <div className="flex flex-col gap-3 w-[50%] text-justify">
                                        <h2 className="text-black font-semibold text-lg">Description</h2>
                                        <p className="text-base">{data?.instruction}</p>
                                    </div>
                                     <div className="flex flex-col gap-3 w-[50%] text-justify">
                                        <h2 className="text-black font-semibold text-lg">Ingredient</h2>
                                        <p className="text-base">{data?.ingredient}</p>
                                    </div>
                                 </div>
                                 
                                 <div className="">
                                     <Image 
                                         src={data?.recipe_image || ImageIcon}
                                         alt={`Photo of ${data?.title} `}
                                         width={300}
                                         height={500}
                                         className="overflow-clip transition ease-in-out hover:translate-x-1 duration-300 hover:scale-105"  
                                     />
                             </div>
                         </div>
                         
                     </div>
                    ))}
                </div>
            </section>
        </>
    )
};
