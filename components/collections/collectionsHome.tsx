'use client'
import { Copy, EllipsisVertical, Folder, Info, Move, Pencil, PlusIcon, Share } from "lucide-react";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api_base_url } from "../universal/API_BASE_URL"
import { toast } from "sonner";
import Link from "next/link";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";





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

export default function CollectionsHome() {

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CollectionDTO>({
        criteriaMode: 'all',
        defaultValues: {
            'name': '',
            'description': '',
            'visibility': 'public'
        }
    });


    const router = useRouter()
    const queryClient = useQueryClient()

    const createCollection = useMutation({
        mutationKey: ['createCollection'],
        mutationFn: async (collectionData: CollectionDTO) => {
            const response = await axios.post(`${api_base_url}` + 'api/collections', collectionData, {
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
            queryClient.invalidateQueries({ queryKey: ['getCollections'] })
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
    const listCollections = useQuery({
        queryKey: ['getCollections'],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}` + 'api/public-collections', {
                headers: {
                    'Content-Length': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("List Collections =>", response.data);
            return response.data
        }

    })


    const [showModal, setShowModal] = useState(false);

    const openShareDialog = (event: any) => {
        event.preventDefault(); // Prevent default link behavior
        setShowModal(true);
    };


    // Handle Copy Btn
    const [copySuccess, setCopySuccess] = useState<string>('')

    const handleCopy = (event: MouseEvent<HTMLButtonElement>, link: string) => {
        event.preventDefault();
        navigator.clipboard.writeText(link)
        .then(() => {
            setCopySuccess('Link copied');
            setTimeout(() => toast.success('Link copied', {
                style: {
                    background: "#ecfdf3",
                    color: "#30a257"
                }
            }), 2000);
        })
        .catch(error => {
            console.error('Failed to copy', error);
            setCopySuccess("Failed to copy link");
            setTimeout(() => toast.error('Failed to copy link', {
                style: {
                    background: "#fff0f0",
                    color: "#ec3e3e"
                },
            }), 2000)
        })
    }
  
  
    return (
        <section className="flex flex-col gap-10 ">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold">Recipe Collections</h1>
                    <p className="text-gray-500 font-medium text-lg">Browse through your favorite recipe collections</p>
                </div>
                <div className="">
                    <Dialog >
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
                        <DialogContent className="p-6">
                            <DialogTitle>Create a Collection</DialogTitle>
                            <DialogDescription>Create a Collection to add your favorite recipes.</DialogDescription>
                            <form onSubmit={handleSubmit(onSubmit)} action="#" className="flex flex-col gap-y-6">
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

            {/* Vertical Menu  */}

            <div className="grid grid-cols-4 place-content-center items-center gap-x-3 gap-y-5">
                {listCollections && listCollections?.data?.map((data: CollectionDTO) => (
                <div key={data.id}  className="">
                    <div className="w-[14rem] max-h-[6rem] flex flex-row gap-x-2 justify-center items-center bg-white py-2 px-2 rounded-md shadow-md">
                        <Link href={`collection-detail/${data.id}`} className="flex flex-row gap-x-2 justify-start items-center" >
                            <div className="">
                                <Folder size={23} strokeWidth={3} />
                            </div>
                            <div className="max-w-[80%] text-base">
                                <p>{data?.name.substring(0, 12) + '...'}</p>
                            </div>
                        </Link>
                        <div className="">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="hover:bg-yellow-600/25 p-1 rounded-md focus:ring-yellow-600 focus:border-0 focus:outline-yellow-500 focus:outline-4 ">
                                    <EllipsisVertical size={20} strokeWidth={3} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="p-1 w-[10rem] flex flex-col justify-center items-center gap-y-2">
                                    <DropdownMenuItem asChild className="w-full hover:bg-gray-300">
                                        <Link href={`collection-detail/${data.id}`}  className="flex flex-row gap-x-3 w-full">
                                            <Move size={20} strokeWidth={2} />
                                            <span>Open</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="w-full hover:bg-gray-300">
                                        <Dialog>
                                            <DialogTrigger asChild className="w-full hover:bg-[#f1f5f9] p-1 opacity-80">
                                                <button
                                                    className="flex flex-row gap-x-3 w-full "
                                                >
                                                    <Share size={20} strokeWidth={2} />
                                                    <span>Share</span>
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[28rem] flex flex-col justify-start items-start">
                                                <DialogHeader>
                                                    <DialogTitle className="">Share Collection</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex flex-row gap-x-3 !w-full">
                                                    <input type="text"
                                                        defaultValue={`${api_base_url}` + `collection-detail/${data?.id}`}
                                                        className="bg-white focus:outline-none px-3 w-full py-2 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                                    />
                                                    <Button 
                                                        className="px-3"
                                                        size={'sm'}
                                                        type="submit"
                                                        onClick={(event) => handleCopy(event, `${api_base_url}` + `collection-detail/${data?.id}`)}
                                                    >
                                                        <span className="sr-only">Copy link</span>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger >
                                                                    <Copy color="#fff" size={20} strokeWidth={3} />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p className="!text-sm">Copy link</p>
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </Button>
                                                </div>
                                                <DialogFooter className="">
                                                    <DialogClose>
                                                        <Button size={'sm'} variant={'default'} >
                                                            <span>Close</span>
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                       
                    </div> 
                </div>
                ))}                  
            </div>
        </section>
    )
    
};
