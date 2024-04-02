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

        <section className="bg-[#F8F8F8] w-full p-16 flex flex-col justify-center items-center gap-y-10">
            <div className="flex flex-col justify-center items-center">
                <p className="text-[#6ca97e] text-base uppercase font-semibold">Recipes</p>
                <h2 className="text-davy-gray text-3xl font-medium">Pupolar Recipes</h2>
            </div>
            <div className="flex flex-row gap-5">

                {recipeData && recipeData.slice(0, 4).map((recipe: Recipe) => (
                <Card key={recipe?.id} className="flex flex-col bg-[#F5F5F5] max-w-[350px] shadow-md">
           
                        <Image
                            src={recipe?.recipe_image || default_img}
                            alt="Recipe image"
                            width={350}
                            height={350}
                            className="object-fill w-full "
                            layout="responsive"
                        />
             
                    <CardContent className=" px-8 flex flex-col  py-6  gap-y-2 rounded-b-md">
                        <CardTitle className="text-lg break-words text-left ">{recipe?.title}</CardTitle>
                        {/* <CardDescription className="text-left text-lg !text-black font-medium break-words">
                           {recipe?.description &&  recipe?.description.slice(0, 30) + '' + '...'  }
                        </CardDescription> */}
                        {/* <CardFooter className="flex flex-row p-0 justify-end items-baseline">
                            <b className="bg-[#a2ffc3] text-slate-700 p-2 capitalize hover:text-white cursor-default hover:transition-colors hover:duration-300 rounded-sm">
                                {recipe?.visibility}
                            </b>
                        </CardFooter> */}
                    </CardContent>
                </Card>
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