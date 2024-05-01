import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Button } from "../ui/button"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"
import default_img from "../../public/assets/recipe-img1.jpg"
import Link from "next/link"
import { useState } from "react"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';



const token = localStorage.getItem('accessToken')

type RecipeType = {
    id: number,
    title: string,
    recipe_image: string,
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

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true)
    }

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
                        <Button onClick={openModal} variant={'default'}>
                          Create Recipe
                        </Button>
                       
                    </div>
                </div>
               
             
            </div>
        </>
    )
}
