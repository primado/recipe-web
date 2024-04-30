'use client' 
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "../ui/button"
import Image from "next/image"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { ImageDownIcon } from "lucide-react"
import { Accesstoken } from "@/lib/globalVar"
import default_img from "../../public/assets/recipe-img1.jpg"
import Link from "next/link"




const token  = localStorage.getItem('accessToken')

type RecipeType = {
    id: number,
    title: string,
    description: string,
    ingredient: string,
    instruction: string,
    cooking_time: number,
    visibility: boolean,
    difficulty_level: string,
    recipe_image: string,
    created_at: string,
    last_updated: string
}

export default function PublicRecipeFeed() {

    const publicRecipe = useQuery({
        queryKey: ['publicRecipes'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/public-recipe', {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data
        }
    })

    const recipeData = publicRecipe.data
    
    return (
        <>
            <div className="flex flex-col gap-10">
                <div className="flex flex-row justify-between item-center">
                    <div className="">
                        <h1 className="text-black font-bold text-xl">Recipes</h1>
                        <p className="text-gray-500 font-semibold text-lg">Browse through various recipes</p>
                    </div>
                    <div className="">
                        <Button variant={'default'}>Create Recipe</Button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-5 justify-center items-center">
                {recipeData && recipeData.map((recipe: RecipeType) => (
                <Link key={recipe.id} href={''}>
                <Card className="flex flex-col bg-[#F5F5F5]  max-w-[450px] overflow-hidden shadow-md duration-300 hover:text-brand">
                    <div  className="h-60 overflow-y-clip overflow-x-hidden" >
                        <Image
                            src={recipe?.recipe_image || default_img}
                            alt="Recipe image"
                            width={300}
                            height={300}
                            quality={100}
                            className="object-cover w-full  object-top overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-110"
                        />
                        
                    </div>
                    <CardContent className=" px-3 flex flex-col  py-10  gap-y-2 rounded-b-md">
                        <CardTitle className="text-lg break-words text-left">{recipe?.title}</CardTitle>
                    </CardContent>
                </Card>
                </Link>
                ))}
                </div>
            </div>
        </>
    )
};
