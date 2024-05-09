'use client'

import { ArrowLeftIcon,  } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Controller, useForm } from "react-hook-form"
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

import { toast } from "sonner"
import { Input } from "postcss"



type RecipeDTO = {
    title: string,
    instruction: string,
    description: string,
    ingredient: string,
    cooking_time_duration: string,
    visibility: string,
    difficulty_level: string,
    recipe_image: File | null,
}


const token = localStorage.getItem("accessToken")

export default function CreateRecipe() {

    const router = useRouter()
    const queryClient = useQueryClient()

    //  React Hook Form for form handling

    const { register, control, setValue, handleSubmit, reset, formState: { errors } } = useForm<RecipeDTO>({
        criteriaMode: 'all',
        defaultValues: {
            title: '',
            instruction: '',
            description: '',
            ingredient: '',
            cooking_time_duration: '',
            visibility: '',
            difficulty_level: '',
            recipe_image: null,
        }
    })

    // Tanstack React Query

    const createRecipeMutation = useMutation({
        mutationKey: ['createRecipe'],
        mutationFn: async (newCreateRecipeData: RecipeDTO) => {
            const response = await axios.post('http://localhost:8000/api/recipe', newCreateRecipeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
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
            reset()
            queryClient.invalidateQueries({queryKey: ['publicRecipes']})
            window.location.reload()
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
                  
                    <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-y-3 justify-center items-start max-w-[47%] w-[47%] border border-red-500">
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="title" className="text-base font-medium">Title</label>
                                <input 
                                    type="text" 
                                    {...register('title', {
                                        required: {
                                            value: true,
                                            message: 'The Title field required is a field.'
                                        },
                                        maxLength: {
                                            value: 150,
                                            message: 'Accepts a maximum of 150 characters.'
                                        }
                                    })}
                                    placeholder="Title"
                                    className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md" 

                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="title"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
                                />

                            </div>
                          
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
                                            value: 300,
                                            message: "Accepts a maximum of 150 characters."
                                        }
                                    })} 
                                    placeholder="Description"
                                    className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                                 <ErrorMessage
                                    errors={errors}
                                    name="description"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
                                />
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
                                 <ErrorMessage
                                    errors={errors}
                                    name="instruction"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
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
                                 <ErrorMessage
                                    errors={errors}
                                    name="ingredient"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-y-2">
                            <label htmlFor="cooking_duration_time" className="text-base font-medium">Cooking Duration Time</label>
                            <input 
                                type="text"  
                                {...register("cooking_time_duration", {
                                    required: {
                                        value: true,
                                        message: "Cooking Duration Time is a required field"
                                    }
                                })}
                                placeholder="eg. 1 hr 20 min"
                                className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                            />
                             <ErrorMessage
                                    errors={errors}
                                    name="cooking_time_duration"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
                                />
                        </div>
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="visibility" className="text-base font-medium">Visibility</label>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Visibility field is required",
                                        }
                                    }}
                                    name="visibility"
                                    render={({ field: { onChange, onBlur, value } }) => (
                            
                                  
                                    <Select onValueChange={onChange} defaultValue={value}>
                                        <SelectTrigger className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md">
                                            <SelectValue placeholder="Public" className="!text-black"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                           <SelectItem value="public">Public</SelectItem>
                                           <SelectItem value="private">Private</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                                />
                                 <ErrorMessage
                                    errors={errors}
                                    name="visibility"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
                                />
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="difficulty_level" className="text-base font-medium">Difficulty Level</label>
                                <Controller 
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Difficulty Level field is required",
                                    }
                                    
                                }}
                                name="difficulty_level"
                                render={({ field: {onChange, onBlur, value} }) => (
                                    <Select
                                        onValueChange={onChange}
                                        defaultValue={value}
                                    >
                                        <SelectTrigger className=" bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:!ring-2 focus:ring-yellow-600 focus:border-0 rounded-md ">
                                            <SelectValue placeholder="Easy" className="!text-black"/>
                                        </SelectTrigger>
                                        <SelectContent 
                                            className="bg-white focus:border-none focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                        >
                                           <SelectItem value="easy">Easy</SelectItem>
                                           <SelectItem value="medium">Medium</SelectItem>
                                           <SelectItem value="hard">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                                />
                                 <ErrorMessage
                                    errors={errors}
                                    name="difficulty_level"
                                    render={({ messages }) =>
                                      messages &&
                                      Object.entries(messages).map(([type, message]) => (
                                        <p key={type} className="text-red-500 font-medium">{message}</p>
                                      ))
                                    }
                                />
                            </div>
                           
                        </div>
                        <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="recipe-image" className="text-base font-medium">Recipe Image</label>
                                <Controller
                                    control={control}
                                    name={"recipe_image"}
                                    rules={{ required: {
                                            value: true,
                                            message: "Recipe Picture is required"
                                    } }}    
                                    render={({ field: { value, onChange, ...field } }) => {
                                        return (
                                            <input
                                                {...field}
                                                onChange={(event) => {
                                                   const file = event.target.files?.[0]
                                                   onChange(file)
                                                }}
                                                type="file"
                                               
                                                className=""
                                            />
                                        )
                                    }}
                                />
                        </div>
                        <div className="mt-4 w-full">
                            <button
                            type="submit"
                            disabled={createRecipeMutation.isPending}
                            className={`${createRecipeMutation.isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} bg-black hover:opacity-90 w-full text-white text-xl py-2 hover:font-semibold rounded-md transition-colors duration-300 ease-in-out`}
                        >
                            <span>{createRecipeMutation.isPending ? 'Creating recipe...' : 'Create recipe'}</span>
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
    
};
