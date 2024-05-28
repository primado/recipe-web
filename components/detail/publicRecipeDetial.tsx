'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ArrowLeftIcon, Edit2Icon, ImageIcon, TimerIcon, Trash } from "lucide-react"
import Image from "next/image"
import dayjs from "dayjs"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"


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

const token = localStorage.getItem('accessToken')

export default function PublicRecipeDetial({id}: {id: number}) {

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
                              size={'lg'} variant={'default'} 
                              onClick={() => router.back()}
                              className="bg-black rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center">
                             <p className="text-white flex flex-row gap-x-2 items-center justify-center">
                                 <ArrowLeftIcon  className="font-semibold text-base text-white"/>
                                 Go back
                             </p>
                        </Button>
                
                            { recipeData && recipeData?.data?.map((data: RecipeDTO) => (
                                <div  key={data.id} className="flex flex-row justify-center gap-5">
                                {userID === data?.user?.id && (
                                    <Button
                                        size={'lg'} variant={'default'} 
                                        onClick={() => router.push(`/edit-recipe/${data.id}`)}
                                        className="bg-black rounded-md  px-5 opacity-90 flex flex-row justify-center items-center"
                                    >
                                        <p className="text-white flex flex-row justify-center items-center gap-2">
                                            <Edit2Icon size={18} strokeWidth={3} />
                                            <span>Edit Recipe</span>
                                        </p>
                                    </Button>

                                    
                                )} 

                                {userID === data?.user?.id && (
                                    <Button
                                        size={'lg'} variant={'destructive'}
                                        className="rounded-md  px-5 opacity-90 flex flex-row justify-center items-center"
                                    >
                                        <p className="text-white flex flex-row justify-center items-center gap-2">
                                            <Trash size={18} strokeWidth={3} />
                                            <span>Delete Recipe</span>
                                        </p>
                                    </Button>
                                )}
                                </div>
                            ))}

                     
                    </div>
                    {recipeData && recipeData.data?.map((data: any) => (
                         <div key={data.id} className="flex flex-col gap-y-5">
                         <div className="flex flex-col gap-y-4 w-[70%]">
                             <h1 className="text-black break-words text-5xl font-bold">{data?.title}</h1>
                             <p className="text-black text-xl font-medium">{data?.description}</p>
                         </div>
                         <div className="flex flex-row justify-between items-stretch">
                            <div className="flex flex-col gap-y-5">
                                 <div className="">
                                     <h2 className="text-black font-semibold text-2xl">{data?.user?.first_name} {data?.user?.last_name}</h2>
                                     <p className="italic text-gray-500 text-lg font-normal"> Last updated - {formattedLastUpdate}</p>
                                 </div>
                                 <div className="flex flex-row gap-3 justify-start items-center">
                                    <h4 className="text-black text-lg font-medium flex flex-row gap-x-1">
                                        <TimerIcon className="text-red-500" />
                                        <span>Total Time -</span>
                                    </h4>
                                    <p className="text-lg font-medium">
                                        {data?.cooking_time_duration}
                                    </p>
                                 </div>
                             </div>
                             
                         </div>
                         <div className="flex flex-row justify-between items-center">
                             <div className="flex flex-row gap-10 text-base font-medium text-black w-[60%]">
                                    <div className="flex flex-col gap-3 w-[50%]">
                                        <h2 className="text-black font-semibold text-2xl">Description</h2>
                                        {data?.instruction}
                                    </div>
                                     <div className="flex flex-col gap-3 w-[50%]">
                                        <h2 className="text-black font-semibold text-2xl">Ingredient</h2>
                                        {data?.ingredient}
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
