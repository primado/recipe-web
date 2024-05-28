
import DeleteRecipe from "@/components/createComponent/deleteRecipe";
import Navbar from "@/components/universal/navbar";



export default function EditRecipe({params}: {params: {id: number}}) {

    
    return (

        <>
            <Navbar />
            <DeleteRecipe id={params.id} />
        </>
    )
};
