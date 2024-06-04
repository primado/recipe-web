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
import { api_base_url } from "./API_BASE_URL"
import { Oval } from "react-loader-spinner"



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

    const {data: recipeData, isSuccess, isError, isLoading} = useQuery({
        queryKey: ['home-recipes'],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}`+ "api/feed/", {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("Data:", response.data)
            console.log("headers", response.headers)
            return response.data
        }
    })


    return (

        <section className="bg-[#F8F8F8] w-full py-16 flex flex-col justify-center items-center gap-y-10 px-60">
            <div className="flex gap-3 text-lg font-medium justify-center items-center">
                {isLoading && (
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#4fa94d"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                )}
                Loading...
            </div>
            <div className="flex flex-col justify-center items-center">
                <p className="text-[#6ca97e] text-base uppercase font-semibold">Recipes</p>
                <h2 className="text-davy-gray text-3xl font-medium">Pupolar Recipes</h2>
            </div>
          
            <div className="grid grid-cols-4 justify-between place-content-center gap-6">
                {recipeData && recipeData.map((data:Recipe) => (
                <Link key={data.id} href={`home-detail/${data.id}`} >
                <Card   className="flex w-full flex-col bg-[#F5F5F5] h-full max-w-[350px] overflow-hidden shadow-xl duration-300 hover:text-brand">
                    <div className="w-full relative h-[280px]" >
                        <Image 
                            alt={data?.title}
                            fill
                            priority={true}
                            quality={10}
                            src={data?.recipe_image || default_img}
                            className="overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-105"  
                        />
                    </div>
                    <CardHeader className="p-5">
                         <div className="flex flex-col gap-y-2">
                            <CardTitle className="font-semibold text-lg">
                                {data?.title}
                            </CardTitle>
                            <CardDescription className="text-left font-medium text-base">
                                {''}
                            </CardDescription>
                        </div>
                    </CardHeader>
                </Card>
                </Link>
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