
import RecipeDetail from "@/components/detail/homeRecipeDetail"

export default function HomeRecipeDetail({params}: {params:  {id: number}}) {

    return (
        <>
            <RecipeDetail id={params.id} />
        </>
    )
    
};
