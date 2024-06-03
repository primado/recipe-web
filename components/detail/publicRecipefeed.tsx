import { useQuery } from "@tanstack/react-query"
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
import default_img from "../../public/assets/recipe-img1.jpg"
import Link from "next/link"
import { useState } from "react"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from "next/navigation"
import { PlusIcon } from "lucide-react"
import { api_base_url } from "../universal/API_BASE_URL"



// const token = localStorage.getItem('accessToken')
const token: string | null = sessionStorage.getItem('accessToken')

type RecipeType = {
    id: number,
    title: string,
    recipe_image: string,
}

export default function PublicRecipeFeed() {

    const publicRecipe = useQuery({
        queryKey: ['publicRecipes'],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}` + 'api/public-recipe', {
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

    // router
    const router = useRouter()
    
    return (
        <>
            <div className="flex flex-col gap-10 ">
                <div className="flex flex-row justify-between item-center">
                    <div className="">
                        <h1 className="text-black font-bold text-3xl">Recipes</h1>
                        <p className="text-gray-500 font-semibold text-xl">Browse through various recipes</p>
                    </div>
                    <div className="">
                        <Button  variant={'default'} className="text-lg" onClick={() => router.push("/create-recipe")}>

                            <div className="flex flex-row gap-x-2 justify-center items-center">
                                <PlusIcon size={23} strokeWidth={2} className="font-semibold" />
                               <span>Create Recipe</span>
                            </div>
                          
                        </Button>
                       
                    </div>
                </div>

                <div className="grid grid-cols-4 justify-between place-content-center gap-6">
                    {recipeData && recipeData.map((data:RecipeType) => (
                    <Link key={data.id}  href={`feed/${data.id}`}>
                    <Card  className="flex w-full flex-col bg-[#F5F5F5] h-full max-w-[350px] overflow-hidden shadow-xl duration-300 hover:text-brand">
                        <div className="w-full relative h-[250px]" >
                            <Image 
                                alt={data?.title}
                                fill
                                priority={true}
                                src={data?.recipe_image || default_img}
                                className="overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-105"  
                            />
                        </div>
                        <CardHeader className="p-5">
                             <div className="flex flex-col gap-y-2">
                                <CardTitle className="font-semibold text-lg">
                                    {data?.title}
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                    </Link>
                    ))}
                </div>
             
            </div>
        </>
    )
}
