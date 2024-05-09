'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ArrowLeftIcon, ImageIcon, TimerIcon } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow , formatISO } from "date-fns"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"


const token = localStorage.getItem('accessToken')

export default function PublicRecipeDetial({id}: {id: number}) {
    
    const {data: recipeData} = useQuery({
        queryKey: ['retrieveRecipe', id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/api/recipe/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.data);
            return response.data.data
        }
    })

    const formatLastUpdated = (lastUpdated: string ) => {
        const parsedDate = new Date(lastUpdated)
        if (isNaN(parsedDate.getTime())) {
            return 'Invalid date';
        }
        return formatDistanceToNow(new Date(parsedDate), {addSuffix: true},)
    }

    const recipeLastUpdated = formatLastUpdated(recipeData?.last_updated)


    const router = useRouter()


    return (

        <>
            <section className="px-28 py-16 bg-tan w-full min-h-screen">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-row justify-between items-center">
                        <Button 
                              size={'sm'} variant={'default'} 
                              onClick={() => router.back()}
                              className="bg-black rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center">
                             <p className="text-white flex flex-row gap-x-2 items-center justify-center">
                                 <ArrowLeftIcon  className="font-semibold text-base text-white"/>
                                 Go back
                             </p>
                        </Button>
                        <Button size={'sm'} variant={'default'}
                            
                        >

                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex flex-col gap-y-4 w-[70%]">
                            <h1 className="text-black break-words text-5xl font-bold">{recipeData?.title}</h1>
                            <p className="text-black text-xl font-medium">{recipeData?.description}</p>
                        </div>
                        <div className="flex flex-row justify-between items-stretch">
                           <div className="flex flex-col gap-y-5">
                                <div className="">
                                    <h2 className="text-black font-semibold text-2xl">{recipeData?.user.first_name} {recipeData?.user?.last_name}</h2>
                                    <p className="italic text-gray-500 text-lg font-normal">Updated - {recipeLastUpdated}</p>
                                </div>
                                <div className="">
                                    <h4 className="text-black text-lg font-medium flex flex-row gap-x-1">
                                        <TimerIcon className="text-red-500" />
                                        <span>Total Time</span>
                                    </h4>
                                    <p className="text-base font-medium">
                                        {recipeData?.cooking_duration_time}
                                    </p>
                                </div>
                            </div>
                            <div className="">

                                <Image 
                                    src={recipeData?.recipe_image || ImageIcon}
                                    alt={`Photo of ${recipeData?.title} `}
                                    width={300}
                                    height={500}
                                    className="overflow-clip transition ease-in-out hover:translate-x-1 duration-300 hover:scale-105"  
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
