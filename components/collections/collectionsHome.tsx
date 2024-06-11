'use client'
import { Folder, Info, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api_base_url } from "../universal/API_BASE_URL"
import { toast } from "sonner";
import Link from "next/link";
const token: string | null = sessionStorage.getItem("accessToken")

type CollectionDTO = {
    id: number;
    name: string;
    description: string;
    visibility: 'public' | 'private';
}

export default function CollectionsHome() {

    const { register, handleSubmit, control, reset, } = useForm<CollectionDTO>({
        criteriaMode: 'all',
        defaultValues: {
            'name': '',
            'description': '',
            'visibility': 'public'
        }
    })

    const createCollection = useMutation({
        mutationKey: ['createCollection'],
        mutationFn: async (collectionData: CollectionDTO) => {
            const response = await axios.post(`${api_base_url}` + 'api/create-collection', collectionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("Create Collection =>", response.data)
            return response.data
        },
        onSuccess: () => {
            toast.success("Collection created successfully", {
                style: {
                    background: "#ecfdf3",
                    color: "#30a257"
                }
            })
            reset()
        },
        onError: (error) => {
            toast.error("Oops an error occured, please try again", {
                style: {
                    background: "#fff0f0",
                    color: "#ec3e3e"
                }
            }),
            console.log(error.cause, error.message)
        }
    })

    const onSubmit = async (data: CollectionDTO) => {
        createCollection.mutateAsync(data)
    }

    
    // List Collections
    const getCollections = useQuery({
        queryKey: ['getCollections'],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}` + 'api/public-collections', {
                headers: {
                    'Content-Length': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
    })

    

    return (
        <section className="flex flex-col gap-10 ">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold">Recipe Collections</h1>
                    <p className="text-gray-500 font-medium text-lg">Browse through your favorite recipe collections</p>
                </div>
                <div className="">
                    <Dialog>
                        <DialogTrigger>
                            <Button
                                size={'sm'}
                                variant={'default'}
                                className="text-base py-5"
                            >
                                <p  className="flex flex-row gap-x-1 justify-center items-center">
                                    <PlusIcon size={23} strokeWidth={2} />
                                    Create collection
                                </p>

                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Create a Collection</DialogTitle>
                            <DialogDescription>Create a Collection to add your favorite recipes.</DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)} action="#" className="flex flex-col gap-y-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="flex flex-row gap-x-2 items-center text-base font-medium">Name
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger>
                                            <Info size={13} strokeWidth={2} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="!text-sm">Name your collection</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    </label>
                                    <input type="text"
                                        {...register('name', {
                                            required: {
                                                'value': true,
                                                'message': 'Name is a required field'
                                            }, 
                                            maxLength: {
                                                'value': 100,
                                                'message': 'Name should be 100 characters or less'
                                            
                                            }
                                        })} 
                                        placeholder="Name"
                                        className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="flex flex-row gap-x-2 items-center text-base font-medium">Description
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Info size={13} strokeWidth={2} />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="!text-sm">Describe your collection</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </label>
                                    <input type="text" 
                                        {...register('description', {
                                            required: {
                                                'value': true,
                                                'message': 'Description is a required field'
                                            }, 
                                            maxLength: {
                                                'value': 255,
                                                'message': 'Description should be 100 characters or less'
                                            
                                            }
                                        })} 
                                        placeholder="Description"
                                        className="bg-white focus:outline-none px-3 py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="visibility" className="flex flex-row gap-x-2 items-center text-base font-medium">Visibility</label>
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
                                    <Select 
                                        onValueChange={onChange} 
                                        defaultValue={value}
                                    >
                                      <SelectTrigger className="w-[180px] focus:ring-yellow-600 focus:border-0">
                                        <SelectValue placeholder="Public" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="public">Public</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    )}
                                    />
                                </div>

                                <div className="flex flex-row ">
                                    <Button
                                        size={'sm'}
                                        variant={'default'}
                                        type="submit"
                                        disabled={createCollection.isPending}
                                        className={`${createCollection.isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90'} bg-black  w-full text-white text-base py-2 hover:font-semibold rounded-md transition-colors duration-300 ease-in-out`}
                                    >
                                        {createCollection.isPending ? 'Creating...' : 'Create collection'}
                                    </Button>
                                </div>

                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="grid grid-cols-5 place-content-center items-center gap-5">
                {getCollections && getCollections?.data?.map((data: CollectionDTO) => (
                <Link  key={data.id}  href={''} className="cursor-pointer">
                    <div className="flex flex-row gap-3 justify-center items-center bg-white py-4 px-2 rounded-md shadow-md">
                        <div className="">
                            <Folder size={23} strokeWidth={3} />
                        </div>
                        <div className="">
                            <p>{data.name.substring(0, 15) + '...'}</p>
                        </div>
                    </div> 
                </Link> 
                ))}                  
            </div>
        </section>
    )
    
};
