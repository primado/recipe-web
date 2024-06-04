"use client"
import { ArrowBigRight, ArrowRight } from "lucide-react";
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
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay"
import { heroImg } from "./hero-img"; 
import hero_img1 from "../../public/assets/hero-img/hero-img1.png" 
import hero_img2 from "../../public/assets/hero-img/hero-img2.png" 
import hero_img3 from "../../public/assets/hero-img/hero-img3.png" 
import hero_img4 from "../../public/assets/hero-img/hero-img4.png" 
import hero_img5 from "../../public/assets/hero-img/hero-img5.png" 

export default function Hero() {

    const router = useRouter()

    const token = sessionStorage.getItem('accessToken')

    return (
        <>
            <div className="bg-hero flex flex-row justify-between items-center  py-10  px-60 ">
                <div className="flex flex-row w-full justify-between gap-24 items-center">
                    <div className="flex flex-col gap-y-20">
                        <div className="flex flex-col gap-y-5">
                            <h1 className="text-5xl font-medium break-words max-w-xl leading-[1.2]">A recipe hub built to find your favorite recipes.</h1>
                            <p className=" max-w-md">Browse through various recipes and save to collections that delight you.</p>
                        </div>
                        {!token && (
                        <div className="flex flex-row gap-x-4 items-center">
                            <Button onClick={() => router.push('/register')} className="bg-dark-green w-[10rem] h-14 text-white hover:bg-primary-none hover:bg-opacity-90">
                                <span className="text-lg">Get Started</span>
                                <ArrowRight className="ml-2 text-2xl font-medium"/> 
                            </Button>
                            <p className="text-dark-green font-medium text-base">Sign up to get started</p>
                        </div>
                        )}

                    </div>
                    <div className="">
                        <Carousel 
                            className="w-full max-w-md"
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                  delay: 3000,
                                }),
                              ]}
                        >
                          <CarouselContent >
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

