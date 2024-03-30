import { ArrowBigRight } from "lucide-react";
import { Button } from "../ui/button";
import hero_img from "../../public/assets/hero-img.png"
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { heroImg } from "./hero-img"; 
import hero_img1 from "../../public/assets/hero-img/hero-img1.png" 
import hero_img2 from "../../public/assets/hero-img/hero-img2.png" 
import hero_img3 from "../../public/assets/hero-img/hero-img3.png" 
import hero_img4 from "../../public/assets/hero-img/hero-img4.png" 
import hero_img5 from "../../public/assets/hero-img/hero-img5.png" 

export default function Hero() {

    return (
        <>
            <div className="bg-hero px-10 py-10">
                <div className="flex flex-row gap-x-[10rem]">
                    <div className="flex flex-col gap-y-5 border-2 border-red-500">
                        <h1 className="text-4xl break-words w-[28rem]">A recipe hub built to find your favorite recipes.</h1>
                        <p>Browse through various recipes and save to collections that delight you.</p>

                        <div className="flex flex-row gap-x-4">
                            <Button variant="secondary">
                                <span>Get Started</span>
                                <ArrowBigRight className="ml-2 w-4 h-4"/> 
                            </Button>
                            <p className="">Sign up to get started</p>
                            <image />
                            
                        
                        </div>

                    </div>
                    <div className="">
                        <Carousel className="w-full max-w-xs">
                          <CarouselContent>
                              <CarouselItem  >
                                <div className="p-1">
                                    <Image 
                                        src={hero_img1}
                                        alt="hero image"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                              </CarouselItem>
                              <CarouselItem  >
                                <div className="p-1">
                                    <Image 
                                        src={hero_img2}
                                        alt="hero image"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                              </CarouselItem>
                              <CarouselItem  >
                                <div className="p-1">
                                    <Image 
                                        src={hero_img3}
                                        alt="hero image"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                              </CarouselItem>
                              <CarouselItem  >
                                <div className="p-1">
                                    <Image 
                                        src={hero_img4}
                                        alt="hero image"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                              </CarouselItem>
                              <CarouselItem  >
                                <div className="p-1">
                                    <Image 
                                        src={hero_img5}
                                        alt="hero image"
                                        width={600}
                                        height={600}
                                    />
                                </div>
                              </CarouselItem>
                         
                           
                          </CarouselContent>
                          <CarouselPrevious />
                          <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}

