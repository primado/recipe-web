'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Image from "next/image"

import { space } from "postcss/lib/list"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon, Edit2Icon, ImageIcon, TimerIcon } from "lucide-react"


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
    recipe_image: string | null,
    user: {
        id: number,
        first_name: string,
        last_name: string
    }
}

export default function RecipeDetail({id}: {id: number}) {

    const {data: recipeData} = useQuery({
        queryKey: ['getRecipe', id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/api/feed/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("Recipe Detail View =>", response.data)
            return response.data
        }
    })


     // router
     const router = useRouter()


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
                    {/* {recipeData && recipeData?.map((data: RecipeDTO) => (
                    <Button
                        key={data.id}
                        size={'lg'} variant={'default'} 
                        onClick={() => router.push(`/edit-recipe/${data?.id}`)}
                        className="bg-black rounded-md  px-5 opacity-90 flex flex-row justify-center items-center"
                    >
                        <p className="text-white flex flex-row justify-center items-center gap-2">
                            <Edit2Icon size={18} strokeWidth={3} />
                            <span>Edit Recipe</span>
                        </p>
                    </Button>
                    ))} */}
                </div>
                {recipeData && recipeData?.map((data: RecipeDTO | any) => (
                <div key={data.id} className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-4 w-[70%]">
                        <h1 className="text-black break-words text-5xl font-bold">{data?.title}</h1>
                        <p className="text-black text-xl font-medium">{data?.description}</p>
                    </div>
                    <div className="flex flex-row justify-between items-stretch">
                       <div className="flex flex-col gap-y-5">
                            <div className="">
                                <h2 className="text-black font-semibold text-2xl">{data?.user?.first_name} {data?.user?.last_name}</h2>
                                <p className="italic text-gray-500 text-lg font-normal">Updated - {data?.last_updated}</p>
                            </div>
                            <div className="">
                                <h4 className="text-black text-lg font-medium flex flex-row gap-x-1">
                                    <TimerIcon className="text-red-500" />
                                    <span>Total Time -{''}</span>
                                </h4>
                                <p className="text-base font-medium">
                                    {data?.cooking_time_duration}
                                </p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-10 text-base font-medium text-black w-[60%]">
                                <div className="">{data?.ingredient}</div>
                                <div className="">{data?.instruction}</div>
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
