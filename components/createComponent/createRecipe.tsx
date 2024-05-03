'use client'

import { ArrowLeft, ArrowLeftIcon, ArrowLeftSquare, ArrowRightSquareIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"



export default function CreateRecipe() {

    const router = useRouter()

    return (
        <>
            <div className="flex flex-col w-full gap-16">
                <Button size={'sm'} variant={'default'} className="bg-black rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center">
                    <p className="text-white flex flex-row gap-x-2 items-center justify-center">
                        <ArrowLeftIcon  className="font-semibold text-base text-white"/>
                        Go back
                    </p>
                </Button>
                <div className="flex flex-col justify-center items-center">
                  
                    <form action="" className="flex flex-col gap-y-3 justify-center items-start max-w-[38%] w-[37%] border border-red-500">
                        <div className="flex flex-row w-full gap-3">
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="title" className="text-base font-medium">Title</label>
                                <input 
                                    type="text" 
                                    className="bg-white focus:outline-none px-3 py-1 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md" 

                                />
                            </div>
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="title" className="text-base font-medium">Description</label>
                                <input 
                                    type="text" 
                                    className="bg-white focus:outline-none px-3 py-1 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3 w-full ">
                            
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="intruction" className="text-base font-medium">Instruction</label>
                                <textarea 
                                    cols={30}
                                    rows={4}
                                    className="bg-white focus:outline-none px-3 py-1 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction" className="text-base font-medium">Ingredients</label>
                                <textarea 
                                    cols={30}
                                    rows={4}
                                    className="bg-white focus:outline-none px-3 py-1 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-3">
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction" className="text-base font-medium">Visibility</label>
                                <input 
                                    type="text" 
                                    
                                    className="bg-white focus:outline-none px-3 py-1 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction" className="text-base font-medium">Difficulty Level</label>
                                <input 
                                    type="text" 
                                    className="bg-white focus:outline-none px-3 py-1 font-medium text-base border border-slate-700 focus:ring-2 focus:ring-yellow-600 focus:border-0 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="mt-3 w-full">
                            <button

                            className="bg-black hover:opacity-90 w-full text-white text-xl py-1 hover:font-medium rounded-md transition-colors duration-300 ease-in-out"
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
