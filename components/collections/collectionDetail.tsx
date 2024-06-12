'use client'

import { ArrowLeftIcon, Edit2Icon, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { api_base_url } from "../universal/API_BASE_URL"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"



const token: string | null = sessionStorage.getItem("accessToken")

interface CollectionDTO  {
    id?: number;
    name: string;
    description: string;
    visibility: 'public' | 'private';
    user: {
        id?: number;
        first_name: string;
        last_name: string;

    }
}


export default function CollectionDetail({id}: {id: number}) {

    const router = useRouter()
    const queryClient = useQueryClient()

    const { register: register2, handleSubmit: handleSubmit2, 
        control: control2, reset: reset2, formState: { errors: errors2, }, setValue} = useForm<CollectionDTO>({
        criteriaMode: 'all',
        defaultValues: {
            'name': '',
            'description': '',
            'visibility': 'public'
        }
    })


      // Retrieve collection details
    const getCollection = useQuery({
        queryKey: ['getCollection', id],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}` + `api/collections/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("Get Collection => ", response.data);
            return response.data
        }
    })


    
    const updateCollection = useMutation({
        mutationKey: ['updateCollection', id],
        mutationFn: async (newCollectionData: CollectionDTO) => {
            const response = await axios.patch(`${api_base_url}` + `api/collection/${id}`, newCollectionData, {
                headers: {
                    'Content-Type': 'application',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        },
    })


    // Fetch Current User
    const fetchCurrentUser = async () => {
        const response = await axios.get(`${api_base_url}` + 'api/auth/user-profile', {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        })
        console.log("User Data", response.data)
        return response.data
    }

    const currentUser = useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
    })

    const [userID, setUserID] = useState<Number>(0)


    useEffect(() => {
        // console.log("Current User ID: ", currentUser.data);
        if (currentUser.data && currentUser.data.length > 0) {
            // Access the first element of the array to get user data
            const userData = currentUser.data[0];
            // Set the user ID
            setUserID(userData.id);
        };

    }, [currentUser])

    

    // Delete Collection

      // Delete Collection
    const deleteCollection = useMutation({
        mutationKey: ['deleteCollection', id],
        mutationFn: async () => {
            const response = await axios.delete(`${api_base_url}` + `api/collection/${id}`, {
                headers: {
                    'Content-Type': 'application.json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            return response.data
        },
        onSuccess: () => {
            toast.success('Collection deleted successfully.', {
                style: {
                    background: "#ecfdf3",
                    color: "#30a257"
                }
            })
            queryClient.invalidateQueries({queryKey: ['listCollections']})
        },
        onError: (error) => {
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
        <>
            <section>
                       
                <div className="flex flex-row justify-between items-center">
                    <Button 
                          size={'sm'}  variant={'default'} 
                          onClick={() => router.back()}
                          className="text-base py-5">
                         <p className="flex flex-row gap-x-1 justify-center items-center">
                             <ArrowLeftIcon size={23} strokeWidth={2} />
                             Go back
                         </p>
                    </Button>
                    
            
                        {getCollection && getCollection?.data?.map((data: CollectionDTO) => (
                            <div  key={data.id} className="flex flex-row justify-center gap-5">
                            {userID === data?.user?.id && (
                                <Button
                                    size={'sm'} variant={'default'} 
                                    onClick={() => router.push(`/edit-recipe/${data.id}`)}
                                    className="text-base py-5"
                                >
                                    <p className="flex flex-row gap-x-1 justify-center items-center">
                                        <Edit2Icon size={23} strokeWidth={2} />
                                        <span>Edit Recipe</span>
                                    </p>
                                </Button>
                            )}
                            {userID === data?.user?.id && getCollection && getCollection?.data?.map((data: CollectionDTO) => (
                                <Dialog key={data.id}>
                                    <DialogTrigger>
                                        <Button
                                            size={'sm'} variant={'destructive'}
                                            // onClick={() => router.push(`/delete-recipe/${data.id}`)}
                                            className="text-base py-5"
                                        >
                                            <p className="flex flex-row gap-x-1 justify-center items-center">
                                                <Trash size={23} strokeWidth={2} />
                                                <span>Delete Collection</span>
                                            </p>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogDescription className="text-black font-medium text-lg">
                                            Are you sure you want to delete <b>&quot;{data?.name}&quot;</b>? 
                                        </DialogDescription>
                                        <div className="flex flex-row justify-center items-center gap-x-10">
                                            <Button
                                                size={'lg'} variant={'destructive'}
                                                disabled={deleteCollection.isPending}
                                                onClick={() => deleteCollection.mutateAsync()}
                                                className={`${deleteCollection.isPending ? 'bg-opacity-50' : ''} rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center`}
                                            >
                                                {deleteCollection.isPending ? 'Deleting' : ' Delete'}
                                            </Button>

                                            <Button
                                                size={'lg'} variant={'outline'}
                                                onClick={() => router.back()}
                                                className="rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        
                            </div>
                        ))}
                 
                </div>
                <div className="">

                </div>
            </section>

        </>
    )
    
};
