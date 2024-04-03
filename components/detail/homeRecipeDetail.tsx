'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


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

    return (
        <>
            <div className="text-black">
                <div className="flex flex-row gap-x-3">
                    <div className="">Title:</div>
                    <div className="">{recipeData?.title}</div>
                </div>
                <div className="flex flex-row gap-x-3">
                    <div className="">Description:</div>
                    <div className="">{recipeData?.description}</div>
                </div>
            </div>
        </>
    )
    
};
