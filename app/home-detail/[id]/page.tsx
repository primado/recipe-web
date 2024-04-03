
import RecipeDetail from "@/components/detail/homeRecipeDetail"
import Navbar from "@/components/universal/navbar"

export default function HomeRecipeDetail({params}: {params:  {id: number}}) {

    return (
        <>
            <Navbar />
            <RecipeDetail id={params.id} />
        </>
    )
    
};
