'use client'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { api_base_url } from "../universal/API_BASE_URL"



// const token: string | null = localStorage.getItem('accessToken')
const token = typeof window !== 'undefined' ? sessionStorage.getItem("accessToken") : null

export default function DeleteRecipe({id}: {id: number}) {

    const router = useRouter()
    const queryClient = useQueryClient()

    const { handleSubmit } = useForm()


    const getRecipe = useQuery({
        queryKey: ['getRecipeDel', id],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}api/recipe/${id}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            console.log(response.data);
            return response.data
        }
    });

    const deleteRecipe = useMutation({
        mutationKey: ['deleteRecipe', id],
        mutationFn: async () => {
            const response = await axios.delete(`${api_base_url}api/recipe/${id}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            return response.data
        },
        onSuccess: () => {
            toast.success('Recipe deleted successfully.', {
                style: {
                    background: "#ecfdf3",
                    color: "#30a257"
                }
            })
            queryClient.invalidateQueries({queryKey: ['getUpdateRecipeData']})
            setTimeout(() => {
                router.refresh()
                router.push("/feed")
            }, 1000);
        },
        onError: (error) => {
            // toast.error('Oops an error occured, try again.', {
            //     duration: 3000,
            //     closeButton: true,
            //     position: 'top-center'
            // })
            toast.error("Oops an error occured, try again.", {
                style: {
                    background: "#fff0f0",
                    color: "#ec3e3e"
                }
            })
            console.log("Delete Recipe Error msg", error.message, error.cause);
        }
    })

   
    
    return (
        <div className="px-52 py-16 bg-tan w-full min-h-screen ">
            <div className="flex flex-row justify-between items-center">
                <Button 
                    size={'sm'} variant={'default'} 
                    onClick={() => router.back()}
                    className="text-base py-5">
                    <p className="flex flex-row gap-x-1 justify-center items-center">
                        <ArrowLeftIcon  className="font-semibold text-base text-white"/>
                        Go back
                    </p>
                </Button>
            </div>
            {getRecipe && getRecipe?.data?.map((data: any) => (
                <div key={data?.id} className="flex flex-col justify-center items-center gap-10">
                   
                        <p className="text-black font-medium text-xl">Are you sure you want to delete <b>&quot;{data?.title}&quot;</b>?</p>
                        <div className="flex flex-row gap-5">
                            <Button
                                size={'lg'} variant={'destructive'}
                                disabled={deleteRecipe.isPending}
                                onClick={() => deleteRecipe.mutateAsync()}
                                className={`${deleteRecipe.isPending ? 'bg-opacity-50' : ''} rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center`}
                            >
                               {deleteRecipe.isPending ? 'Deleting' : ' Delete'}
                            </Button>
                            <Button
                                size={'lg'} variant={'outline'}
                                onClick={() => router.back()}
                                className="rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center"
                            >
                                Cancel
                            </Button>

                        </div>
                    
                </div>
            ))}
        </div>
    )
};
