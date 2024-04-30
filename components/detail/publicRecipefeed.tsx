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
                {isModalOpen ? (
                        <>
                            
                            <div className="fixed inset-0 flex items-center justify-center">
                                    <Transition appear show={isModalOpen} as={Fragment}>
                                        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={() => setIsModalOpen(false)}>
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                            </Transition.Child>

                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <div className="flex items-center justify-center min-h-screen">
                                                    <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                                                        Payment successful
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Your payment has been successfully submitted. We’ve sent
                                                            you an email with all of the details of your order.
                                                        </p>
                                                    </div                               >

                                                    <div className="mt-4">
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                                                            onClick={() => setIsModalOpen(false)}
                                                        >
                                                            Got it, thanks!
                                                        </button>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </Dialog>
                                    </Transition>
                                </div>
                         
                        </>
                    ): (
                       null
                    )}
                <div className="grid grid-cols-4 gap-5 justify-center items-center">
                    {recipeData && recipeData.map((recipe: RecipeType) => (
                        <Link key={recipe.id} href={''}>
                            <Card className="flex flex-col bg-[#F5F5F5]  max-w-[450px] overflow-hidden shadow-md duration-300 hover:text-brand">
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
}
