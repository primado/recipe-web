'use client'

import { ArrowLeftIcon, Edit2Icon, Info, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter, redirect } from "next/navigation"
import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { api_base_url } from "../universal/API_BASE_URL"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import Image from "next/image"
import default_img from "../../public/assets/recipe-img1.jpg"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ErrorMessage } from "@hookform/error-message";
import Link from "next/link"
import CollectionRecipes from "./collectionsRecipes"
import { CollectionRecipe, CollectionDTO } from "./commonInterface"





const token = typeof window !== 'undefined' ? sessionStorage.getItem("accessToken") : null




export default function CollectionDetail({id}: {id: number}) {

    const router = useRouter()
    const queryClient = useQueryClient()

   


      // Retrieve collection details
    const getCollection = useQuery({
        queryKey: ['getCollection', id],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}` + `api/collection-recipes/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("Get collection detail => ", response.data);
            return response.data
        }
    })

    const {data: collectionData, isLoading, error} = getCollection;
    const collectionDataBtn = collectionData?.[0];

    console.log("Collection Data:", collectionData);
    // console.log("Collection Recipes:", collectionData?.collection_recipes);


    const { register,  handleSubmit, control, reset, formState: { errors }, setValue} = useForm<CollectionDTO>({
        criteriaMode: 'all',
        defaultValues: {
            name: collectionDataBtn?.name || '',
            description: collectionDataBtn?.description || '',
            visibility: collectionDataBtn?.visibility || 'public'
        }
    })
    
   
    const updateCollection = useMutation({
        mutationKey: ['updateCollection', id],
        mutationFn: async (newCollectionData: CollectionDTO) => {
            const response = await axios.patch(`${api_base_url}` + `api/collections/${id}`, newCollectionData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        },
        onSuccess: () => {
            toast.success('Collection updated successfully.', {
                style: {
                    background: "#ecfdf3",
                    color: "#30a257"
                }
            })
        },
        onError: (error) => {
            toast.error("Oops an error occured, try again.", {
                style: {
                    background: "#fff0f0",
                    color: "#ec3e3e"
                }
            });
            console.log("Update Collection Error msg", error.message, error.cause);
        }
    })


    const updateSubmit = async (data: CollectionDTO) => {
        updateCollection.mutateAsync(data)
    }


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

    console.log("User ID", userID);
    console.log("User ID in collectionData", collectionData?.user?.id);

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
            setTimeout(() => (
                router.push('/collections')
            ), 2000)
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
            <section className="flex flex-col gap-y-5">
                       
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
                    
            
                        {collectionDataBtn && (
                            <div  className="flex flex-row justify-center gap-5">
                            {userID && collectionDataBtn.user && userID === collectionDataBtn.user.id && (
                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            size={'sm'} variant={'default'} 
                                            // onClick={() => router.push(`/edit-recipe/${data.id}`)}
                                            className="text-base py-5"
                                        >
                                            <p className="flex flex-row gap-x-1 justify-center items-center">
                                                <Edit2Icon size={23} strokeWidth={2} />
                                                <span>Edit Recipe</span>
                                            </p>
                                        </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Collection</DialogTitle>
                                        <DialogDescription>Update your collection details</DialogDescription>
                                    </DialogHeader>
                                    {/* {collectionData?.map((CData: CollectionDTO) => ( */}
                                    <form onSubmit={handleSubmit(updateSubmit)} action="" className="flex flex-col gap-y-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="flex flex-row gap-x-2 items-center text-base font-medium">Name
                                                <TooltipProvider>
                                                  <Tooltip>
                                                    <TooltipTrigger >
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
                                            <ErrorMessage
                                                errors={errors}
                                                name="name"
                                                render={({ messages }) =>
                                                  messages &&
                                                  Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="text-red-500 font-medium">{message}</p>
                                                  ))
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="flex flex-row gap-x-2 items-center text-base font-medium">Description
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger >
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
                                                defaultValue={collectionDataBtn?.visibility}
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

                                        <div className="flex flex-row ">
                                            <Button
                                                size={'sm'}
                                                variant={'default'}
                                                type="submit"
                                                disabled={updateCollection.isPending}
                                                className={`${updateCollection.isPending ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:opacity-90 hover:font-semibold '} bg-black  w-full text-white text-base py-2 rounded-md transition-colors duration-300 ease-in-out`}
                                            >
                                                {updateCollection.isPending ? 'Updating...' : 'Update collection'}
                                            </Button>
                                        </div>
                                    </form>
                                    {/* ))} */}
                                </DialogContent>
                                </Dialog>
                            )}


                            {userID === collectionDataBtn?.user?.id && (
                                <Dialog >
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
                                            Are you sure you want to delete <b>&quot;{collectionDataBtn?.name}&quot;</b>? 
                                        </DialogDescription>
                                        <DialogFooter>
                                            <div className="flex flex-row justify-end items-end gap-x-5">
                                                <Button
                                                    size={'lg'} variant={'destructive'}
                                                    disabled={deleteCollection.isPending}
                                                    onClick={() => deleteCollection.mutateAsync()}
                                                    className={`${deleteCollection.isPending ? 'bg-opacity-50' : ''} rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center`}
                                                >
                                                    {deleteCollection.isPending ? 'Deleting' : ' Delete'}
                                                </Button>
                                                <DialogClose asChild>
                                                    <Button
                                                        size={'lg'} variant={'outline'}
                                                        className="rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )}
                        
                            </div>
                       )}
                 
                </div>
        

                {/* {isLoading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error.message}</div>
                ) : collectionData && collectionData.length > 0 ? (
                  <div className="">
                    <div className="grid grid-cols-4 justify-between place-content-center gap-6">
                      {collectionData[0].collection_recipes?.map((data: CollectionRecipe) => (
                        <Link key={data.recipe.id} href={`/feed/${data.recipe.id}`}>
                          <Card className="flex w-full flex-col bg-[#F5F5F5] h-full max-w-[350px] overflow-hidden shadow-xl duration-300 hover:text-brand">
                            <div className="w-full relative h-[250px]">
                              <Image
                                alt={data.recipe.title}
                                fill={true}
                                sizes="(max-width: 1024px) 100%"
                                priority={true}
                                src={data.recipe.recipe_image}
                                className="overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-105"
                              />
                            </div>
                            <CardHeader className="p-5">
                              <div className="flex flex-col gap-y-2">
                                <CardTitle className="font-semibold text-lg">
                                  {data.recipe.title}
                                </CardTitle>
                              </div>
                            </CardHeader>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-black text-xl text-center">No recipes found</div>
                )} */}

                {isLoading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>Error: {error.message}</div>
                ) : collectionData && collectionData.length > 0 ? (
                  <div className="">
                    {collectionData[0].collection_recipes && collectionData[0].collection_recipes.length > 0 ? (
                      <div className="grid grid-cols-4 justify-between place-content-center gap-6">
                        {collectionData[0].collection_recipes.map((data: CollectionRecipe) => (
                          <Link key={data.recipe.id} href={`/feed/${data.recipe.id}`}>
                            <Card className="flex w-full flex-col bg-[#F5F5F5] h-full max-w-[350px] overflow-hidden shadow-xl duration-300 hover:text-brand">
                              <div className="w-full relative h-[250px]">
                                <Image
                                  alt={data.recipe.title}
                                  fill={true}
                                  sizes="(max-width: 1024px) 100%"
                                  priority={true}
                                  src={data.recipe.recipe_image}
                                  className="overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-105"
                                />
                              </div>
                              <CardHeader className="p-5">
                                <div className="flex flex-col gap-y-2">
                                  <CardTitle className="font-semibold text-lg">
                                    {data.recipe.title}
                                  </CardTitle>
                                </div>
                              </CardHeader>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-black text-xl text-center">No recipes found in this collection</div>
                    )}
                  </div>
                ) : (
                  <div className="text-black text-xl text-center">No collection data found</div>
                )}
            </section>

        </>
    )
};
