'use client'
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useForm, Controller, } from "react-hook-form"
import { Button } from "../ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { ErrorMessage } from "@hookform/error-message"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


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

const token = localStorage.getItem('accessToken')

export default function EditRecipeComponent({id}: {id: number}) {

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

    // Get Query
    const getRecipe = useQuery({
        queryKey: ['getEditRecipe', id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/api/recipe/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
    })

    const editRecipeMutation = useMutation({
        mutationKey: ['editRecipe', id],
        mutationFn: async (newEditRecipeData: RecipeDTO) => {
            const response = await axios.put(`http://localhost:8000/api/recipe/${id}`, newEditRecipeData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data
        },
        onSuccess: () => {
            toast.success("Recipe updated successfully", {
                position: 'top-center',
                duration: 3000,
                closeButton: true
            })
            queryClient.invalidateQueries({queryKey: ['publicRecipes']})
            window.location.reload()
        }
    })

    const onSubmit = async (data: RecipeDTO) => {
        console.log('Recipe update form data =>', data);
        editRecipeMutation.mutateAsync(data)
    }


    const getRecipeData = getRecipe.data
    
    return (
        <>

            <section className="bg-tan flex flex-col  gap-x-12 shadow-md py-16 w-full px-52">
                <div className="flex flex-col justify-start items-start">
                    <Button size={'sm'} variant={'default'}
                        onClick={() => router.back()}
                        className="py-5"
                    >
                        <p className="flex flex-row justify-center items-center gap-x-2">
                            <ArrowLeftIcon className="text-white"/>
                            Go back
                        </p>
                    </Button>
                </div>
                    <div className="flex flex-col w-full justify-center items-center">
                        <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-y-3 justify-center items-start max-w-[47%] w-[47%] ">
                            <div className="flex flex-row w-full gap-4">
                                <div className="flex flex-col w-full gap-y-2 ">
                                    <label htmlFor="title" className="text-base font-medium">Title</label>
                                    <input 
                                        type="text" 
                                        defaultValue={getRecipeData?.title}
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
                                        defaultValue={getRecipeData?.description}
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
                                        defaultValue={getRecipeData?.instruction}
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
                                        defaultValue={getRecipeData?.ingredient}
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
                            <div className="flex flex-col w-full gap-y-2 mb-3">
                                <label htmlFor="cooking_duration_time" className="text-base font-medium">Cooking Duration Time</label>
                                <input 
                                    type="text"  
                                    defaultValue={getRecipeData?.cooking_duration_time}
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
                            <div className="flex flex-row w-full gap-y-6 gap-x-5 mb-3">
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
                                        defaultValue={getRecipeData?.visibility}
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
                                    defaultValue={getRecipeData?.difficulty_level}
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
                                        defaultValue={getRecipeData?.recipe_image}  
                                        render={({ field: { value, onChange, ...field } }) => {
                                            return (
                                                <input
                                                    {...field}
                                                    onChange={(event) => {
                                                       const file = event.target.files?.[0]
                                                       onChange(file)
                                                    }}
                                                    type="file"
                                                    defaultValue={getRecipe?.data?.recipe_image}
                                                    className=""
                                                />
                                            )
                                        }}
                                    />
                            </div>
                            <div className="mt-4 w-full">
                                <button
                                type="submit"
                                disabled={editRecipeMutation.isPending}
                                className={`${editRecipeMutation.isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} bg-black hover:opacity-90 w-full text-white text-lg py-2 hover:font-semibold rounded-md transition-colors duration-300 ease-in-out`}
                            >
                                <span>{editRecipeMutation.isPending ? 'Updating recipe...' : 'Update recipe'}</span>
                            </button>
                            </div>
                        </form>
                    </div>
                
            </section>
        </>
    )
};
