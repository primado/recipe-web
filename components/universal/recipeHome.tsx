'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image"
import default_img from "../../public/assets/recipe-img1.jpg"
import { useState } from "react"
import Link from "next/link"



interface Recipe {
    id: number;
    title: string;
    description: string;
    ingredient: string;
    instruction: string;
    cooking_time: number;
    visibility: string;
    difficulty_level: string;
    recipe_image: string | null;
    user: number;
  }
  

export default function RecipeHome() {

    const {data: recipeData, isSuccess, isError} = useQuery({
        queryKey: ['home-recipes'],
        queryFn: async () => {
            const response = await axios.get("http://localhost:8000/api/feed/", {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("Data:", response.data)
            console.log("headers", response.headers)
            return response.data.data
        }
    })


    return (

        <section className="bg-[#F8F8F8] w-full py-16 flex flex-col justify-center items-center gap-y-10 px-60">
            <div className="flex flex-col justify-center items-center">
                <p className="text-[#6ca97e] text-base uppercase font-semibold">Recipes</p>
                <h2 className="text-davy-gray text-3xl font-medium">Pupolar Recipes</h2>
            </div>
            <div className="flex flex-row gap-14">
                {recipeData && recipeData.slice(0, 4).map((recipe: Recipe) => (
                <div className="" key={recipe?.id}>


                    <Link href={`home-detail/${recipe.id}`} >
                        <Card  className="flex flex-col bg-[#F5F5F5]  h-full max-w-[350px] overflow-hidden shadow-md duration-300 hover:text-brand">
                            <div className="h-60 overflow-y-clip overflow-x-hidden" >
                                <Image
                                    src={recipe?.recipe_image || default_img}
                                    alt="Recipe image"
                                    width={300}
                                    height={300}
                                    quality={100}
                                    
                                    className="object-cover w-full  object-top overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-110"
                              
                                />
                            </div>
                            <CardContent className=" px-8 flex flex-col  py-6  gap-y-2 rounded-b-md">
                                <CardTitle className="text-lg break-words text-left">{recipe?.title}</CardTitle>
                            </CardContent>
                        </Card>
                    </Link>
                
                </div>
                ))}
            </div>
            <div className="flex flex-col gap-y-3 items-center">
                <p className="text-davy-gray text-3xl font-medium">To view more recipes:</p>
                <Link href="#" className="bg-dark-green  text-lg font-semibold p-3 w-fit rounded-md text-white hover:bg-primary-none hover:bg-opacity-90">
                    <span>Register</span>
                </Link>
            </div>

            
        </section>

    )
}