
import default_img from "../../public/assets/recipe-img1.jpg"
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { api_base_url } from "../universal/API_BASE_URL"



type RecipeType = {
    id: number,
    title: string,
    recipe_image: string,
}

const token: string | null = sessionStorage.getItem("accessToken")

export default function CollectionRecipes({recipeID}: {recipeID: number}) {


    const getRecipeData = useQuery({
        queryKey: ['getRecipesInCollection', recipeID],
        queryFn: async () => {
            const response = await axios.get(`${api_base_url}` + `api/collection-recipes/{recipe}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log("List Recipes in Collections =>", response.data);
            return response.data
        }
    })

    const {data: recipeData} = getRecipeData


    return (
        <>
            <div className="grid grid-cols-4 justify-between place-content-center gap-6">
                    {recipeData && recipeData?.map((data:RecipeType) => (
                    <Link key={data.id}  href={`feed/${data.id}`}>
                    <Card  className="flex w-full flex-col bg-[#F5F5F5] h-full max-w-[350px] overflow-hidden shadow-xl duration-300 hover:text-brand">
                        <div className="w-full relative h-[250px]" >
                            <Image 
                                alt={data?.title}
                                fill
                                priority={true}
                                src={data?.recipe_image || default_img}
                                className="overflow-clip transition ease-in-out hover:translate-y-1 duration-300 hover:scale-105"  
                            />
                        </div>
                        <CardHeader className="p-5">
                             <div className="flex flex-col gap-y-2">
                                <CardTitle className="font-semibold text-lg">
                                    {data?.title}
                                </CardTitle>
                            </div>
                        </CardHeader>
                    </Card>
                    </Link>
                    ))}
                </div>
        </>
    )
    
};
