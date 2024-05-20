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
    id: number,
    title: string,
    instruction: string,
    description: string,
    ingredient: string,
    cooking_time_duration: string,
    visibility: string,
    difficulty_level: string,
    recipe_image: string,
}

const token = localStorage.getItem('accessToken')

export default function EditRecipeComponent({id}: {id: number}) {

    const router = useRouter()
    const queryClient = useQueryClient()



    // Tanstack React Query

    // Get Query
    const {data: recipeData} = useQuery({
        queryKey: ['getUpdateRecipeData', id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/api/recipe/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("Edit Recipe data =>", response.data);
            return response.data
        }
    })


    // const recipeData = getRecipe.data  

        //  React Hook Form for form handling

    const { register, control, setValue, handleSubmit, reset, formState: { errors } } = useForm<RecipeDTO>({
         criteriaMode: 'all',

    })

    const updateRecipeMutate = useMutation({
        mutationKey: ['updateRecipe', id],
        mutationFn: async (newEditRecipeData: RecipeDTO) => {
            const response = await axios.put(`http://localhost:8000/api/recipe/${id}`, newEditRecipeData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log('Edit Recipe Get Data:', response.data);
            return response.data
        },
        onSuccess: () => {
            toast.success("Recipe updated successfully", {
                position: 'top-center',
                duration: 3000,
                closeButton: true
            })
            queryClient.invalidateQueries({queryKey: ['getUpdateRecipeData']})
            window.location.reload()
        }
    })

    const onSubmit = async (data: RecipeDTO) => {
        console.log('Recipe update form data =>', data);
        updateRecipeMutate.mutateAsync(data)
    }
 
   
    
    return (
        <>

            <section className="bg-tan flex flex-col  gap-x-12 gap-y-5 shadow-md py-16 w-full px-52">
                <div className="flex flex-col justify-start items-start">
                    <Button size={'sm'} variant={'default'}
                        onClick={() => router.back()}
                        className="px-5 py-5"
                    >
                        <p className="flex flex-row justify-center items-center gap-x-2">
                            <ArrowLeftIcon className="text-white"/>
                            Go back
                        </p>
                    </Button>
                </div>
                    <div className="flex flex-col w-full justify-center items-center">
                        {recipeData?.map((data: RecipeDTO) => (
                        <form key={data.id} onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-y-3 justify-center items-start max-w-[47%] w-[47%] ">
                         
                            
                            <div className="flex flex-row w-full gap-4">
                                <div className="flex flex-col w-full gap-y-2 ">
                                    <label htmlFor="title" className="text-base font-medium">Title</label>
                                    <input 
                                        type="text"
                                        defaultValue={data ? data.title : ''}
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
                                        defaultValue={data ? data?.description : ''}
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
                                        defaultValue={data ? data?.instruction : ''}
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
                                        defaultValue={data ? data.ingredient : ''}
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
                                    defaultValue={data ? data.cooking_time_duration : ''} 
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
                                        defaultValue={data ? data.visibility : ''}
                                        name="visibility"
                                        render={({ field: { onChange, onBlur, value } }) => (

                                        <Select onValueChange={onChange} defaultValue={value || data.visibility} >
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
                                    defaultValue={data ? data.difficulty_level : ''}
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
                                disabled={updateRecipeMutate.isPending}
                                className={`${updateRecipeMutate.isPending ? 'cursor-not-allowed  opacity-65 font-semibold ' : 'cursor-pointer hover:opacity-90'} bg-black  w-full text-white text-base py-2 hover:font-semibold rounded-md transition-colors duration-300 ease-in-out`}
                            >
                                <span>{updateRecipeMutate.isPending ? 'Updating recipe...' : 'Update recipe'}</span>
                            </button>
                            </div>
                   
                            
                        </form>
                        ))}
                    </div>
                
            </section>
        </>
    )
};
