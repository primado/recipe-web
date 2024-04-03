'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ImageIcon, TimerIcon } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow , formatISO } from "date-fns"
import { space } from "postcss/lib/list"


export default function RecipeDetail({id}: {id: number}) {

    const {data: recipeData} = useQuery({
        queryKey: ['getRecipe', id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/api/feed/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.data
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

    return (
        <>
            <section className="px-28 py-16 bg-white-f8 w-full min-h-screen">
                <div className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-4 w-[70%]">
                        <h1 className="text-black break-words text-5xl font-bold">{recipeData?.title}</h1>
                        <p className="text-black text-xl font-medium">{recipeData?.description}</p>
                    </div>
                    <div className="flex flex-row justify-between">
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
                                    {recipeData?.cooking_time} {' '}

                                    {recipeData?.cooking_time > 1 ? (
                                       <span>{recipeData?.time_duration_unit}s</span>

                                    ): (
                                       <span>{recipeData?.time_duration_unit}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <Image 
                                src={recipeData?.recipe_image || ImageIcon}
                                alt={`Photo of ${recipeData?.title} `}
                                width={300}
                                height={300}
                                className="rounded-md "
                            />
                        </div>
                    </div>
                </div>
            </section>
                
        </>
    )
    
};
