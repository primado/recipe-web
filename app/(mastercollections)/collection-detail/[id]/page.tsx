
import CollectionDetail from "@/components/collections/collectionDetail";



export default function EditCollection({params}: {params: {id: number}}) {


    
    return (

        <main  className="bg-tan w-full px-52 py-20 min-h-screen">

            <CollectionDetail id={params.id} />

        </main>
    )
};
