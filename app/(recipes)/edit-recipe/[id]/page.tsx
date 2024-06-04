import EditRecipeComponent from "@/components/createComponent/editRecipe";
import Navbar from "@/components/universal/navbar";



export default function EditRecipe({params}: {params: {id: number}}) {

    
    return (

        <>
            <Navbar />
            <EditRecipeComponent id={params.id} />
        </>
    )
};
