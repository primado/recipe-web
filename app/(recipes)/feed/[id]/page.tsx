import PublicRecipeDetial from "@/components/detail/publicRecipeDetial";
import Navbar from "@/components/universal/navbar";



export default function RecipeDetailPage({params}: {params: {id: number}}) {

    
    return (

        <>
            <Navbar />
            <PublicRecipeDetial id={params.id} />
        </>
    )
};
