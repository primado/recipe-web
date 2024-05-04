'use client'

import { ArrowLeftIcon,  } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import axios from "axios"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Accesstoken } from "@/lib/globalVar"
import { toast } from "sonner"



type RecipeDTO = {
    id: number,
    title: string,
    instruction: string,
    description: string,
    ingredient: string,
    cook_time_duration: string,
    visibility: string,
    difficulty_level: string,
    recipe__image: string,
}


const token = Accesstoken

export default function CreateRecipe() {

    const router = useRouter()
    const queryClient = useQueryClient()

    //  React Hook Form for form handling

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RecipeDTO>({
        criteriaMode: 'all',
        defaultValues: {
            id: 0,
            title: '',
            instruction: '',
            description: '',
            ingredient: '',
            cook_time_duration: '',
            visibility: 'public',
            difficulty_level: '',
            recipe__image: '',
        }
    })

    // Tanstack React Query

    const createRecipeMutation = useMutation({
        mutationKey: ['createRecipe'],
        mutationFn: async (newCreateRecipeData: RecipeDTO) => {
            const response = await axios.post('http://localhost:8000/api/recipe', newCreateRecipeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer  ${token}`
                }
            })

            console.log(response.data);
            return response.data
        },
        onSuccess: () => {
            toast.success("Recipe created successfully", {
                position: 'top-center',
                duration: 3000,
                closeButton: true
            })
            queryClient.invalidateQueries({queryKey: ['publicRecipes']})
            router.refresh()
            
        }
    })

    const onSubmit = async (data: RecipeDTO) => {
        console.log('Create Recipe form data =>', data);
        createRecipeMutation.mutateAsync(data)
    }



    return (
        <>
            <div className="flex flex-col w-full gap-16">
                <Button 
                     size={'sm'} variant={'default'} 
                     onClick={() => router.back()}
                     className="bg-black rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center">
                    <p className="text-white flex flex-row gap-x-2 items-center justify-center">
                        <ArrowLeftIcon  className="font-semibold text-base text-white"/>
                        Go back
                    </p>
                </Button>
                <div className="flex flex-col w-full justify-center items-center">
                  
                    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-y-3 justify-center items-start max-w-[55%] w-[55%] border border-red-500">
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="title" className="text-base font-medium">Title</label>
                                <input 
                                    type="text" 
                                    {...register('title', {
                                        required: {
                                            value: true,
                                            message: 'The Title is a field required field.'
                                        },
                                        maxLength: {
                                            value: 150,
                                            message: 'Accepts a maximum of 150 characters.'
                                        }
                                    })}
                                    placeholder="Title"
                                    className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md" 

                                />
                            </div>
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="description" className="text-base font-medium">Description</label>
                                <input 
                                    type="text"
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: "The Description is a field required."
                                        },
                                        maxLength: {
                                            value: 150,
                                            message: "Accepts a maximum of 150 characters."
                                        }
                                    })} 
                                    placeholder="Description"
                                    className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3 w-full ">
                            
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="intruction" className="text-base font-medium">Instruction</label>
                                <textarea 
                                    cols={30}
                                    rows={4}
                                    {...register("instruction", {
                                        required: {
                                            value: false,
                                            message: "The intruction is not required field."
                                        }
                                    })}
                                    placeholder="Intructions"
                                    className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction" className="text-base font-medium">Ingredients</label>
                                <textarea 
                                    cols={30}
                                    rows={4}
                                    {...register("ingredient", {
                                        required: {
                                            value: false,
                                            message: "The Ingredients is not a required field."
                                        }
                                    })}
                                    placeholder="Ingredients"
                                    className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-y-2">
                            <label htmlFor="cooking_duration_time">Cooking Duration Time</label>
                            <input 
                                type="text"  
                                {...register("cook_time_duration", {
                                    required: {
                                        value: true,
                                        message: "Cooking Duration Time is a required field"
                                    }
                                })}
                                placeholder="eg. 1 hr 20 min"
                                className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                            />
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="visibility" className="text-base font-medium">Visibility</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Public"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="public">Public</SelectItem>
                                       <SelectItem value="public">Private</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="difficulty_level" className="text-base font-medium">Difficulty Level</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Easy"/>
                                    </SelectTrigger>
                                    <SelectContent 
                                        className="bg-whit focus:border-none focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                    >
                                       <SelectItem value="public">Easy</SelectItem>
                                       <SelectItem value="public">Medium</SelectItem>
                                       <SelectItem value="public">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="mt-4 w-full">
                            <button
                            type="submit"
                            className="bg-black hover:opacity-90 w-full text-white text-xl py-2 hover:font-medium rounded-md transition-colors duration-300 ease-in-out"
                        >
                            <span>Create recipe</span>
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
    
};
