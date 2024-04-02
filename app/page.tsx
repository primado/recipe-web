import Hero from "@/components/universal/hero";
import Navbar from "@/components/universal/navbar";
import RecipeHome from "@/components/universal/recipeHome";
import Image from "next/image";

export default function Home() {
  return (
    
    <main>
      <Hero />
      <RecipeHome />
    </main>
    
  );
}
