'use client'

import { ArrowLeft, ArrowLeftIcon, ArrowLeftSquare, ArrowRightSquareIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"



export default function CreateRecipe() {

    const router = useRouter()

    return (
        <>
            <div className="flex flex-col w-full gap-10">
                <Button size={'sm'} variant={'default'} className="bg-black rounded-md w-[5rem] px-14 py-2 opacity-90 flex flex-row justify-center items-center">
                    <p className="text-white flex flex-row gap-x-2 items-center justify-center">
                        <ArrowLeftIcon  className="font-semibold text-base text-white"/>
                        Go back
                    </p>
                </Button>
                <div className="flex flex-col justify-center items-center">
                  
                    <form action="" className="flex flex-col justify-center items-start max-w-[30rem] w-[25rem] border border-red-500">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col gap-y-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="" />
                            </div>
                           
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="title">Description</label>
                                <input type="text" className="" />
                            </div>
                            <div className="flex flex-col w-full gap-y-2 ">
                                <label htmlFor="intruction">Instruction</label>
                                <input type="text" className="" />
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction">Ingredients</label>
                                <input type="text" className="" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-6">
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction">Visibility</label>
                                <input type="text" className="" />
                            </div>
                            <div className="flex flex-col w-full gap-y-2">
                                <label htmlFor="intruction">Difficulty Level</label>
                                <input type="text" className="" />
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
    
};
