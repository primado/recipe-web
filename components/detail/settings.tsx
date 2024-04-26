'use client'
import React, { useState, useRef, MouseEventHandler } from "react"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import fallbackAvatar from "../../public/assets/fallback-avatar.png"
import Image from "next/image"
import { Button } from "../ui/button"
import { Controller, useForm } from "react-hook-form"
import { SignalZero } from "lucide-react"


type Username = {
    username : string
}

type ProfilePicture = {
    id?: number,
    profile_picture: string
}

type ChangePicture = {
    profile_picture: File
}


export default function Profile() {

    const token: string | null = localStorage.getItem('accessToken')

    const { register, handleSubmit, setValue, control, formState: {errors} } = useForm<ChangePicture>({
        criteriaMode: 'all'
    })

    // const [ file, setFile ] = useState<File | null>(null)
    const [ fileError, setFileError ] = useState<String>('')
    const [ fError, setFError ] = useState<Boolean>(false)
    const [isFileSelect, setIsFileSelect] = useState<Boolean>(false)

    


    const queryClient = useQueryClient()


    const {data: profile, isError, error, isSuccess} = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/auth/user-profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response.data);
            return response.data.data
        },
        
    
    })

    // CRUD Operations for Profile Picture
    const {data: getPicture} = useQuery({
        queryKey: ['myPicture'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/auth/profile-picture', {
                headers: {
                    'Content-Type': 'applications/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }
    })

    // --------- Delete Picture -------------- //

    const deleteProfilePciture = useMutation({
        mutationKey: ['deleteMyPic'],
        mutationFn: async () => {
            const response = await axios.delete('http://localhost:8000/api/auth/profile-picture', {
                headers: {
                    'Content-Type': 'application/json;',
                    'Authorization': `Bearer ${token}`
                },
            })
            
            console.log(response.data);
            return response.data
        },
        onSuccess: () => {
            toast.success('Deleted profile picture pucessfully', {
                position: 'top-center',
                duration: 4000,
                closeButton: true 
            })
            queryClient.invalidateQueries({queryKey: ['myPicture']})
            
        },
        onError: (error) => {
            console.log(error.cause, error.message)
            toast.error('An error occured, please try again.', {
                position: 'top-center',
                duration: 4000,
                closeButton: true
            })
        }
    })

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);

    const uploadFile = async () => {
      try {
        if (!file) throw new Error('No file selected');
  
        const formData = new FormData();
        formData.append('profile_picture', file);
        console.log(file);
        const response = await axios.put('http://localhost:8000/api/auth/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error('Failed to upload file');
      }
    };
  
    const { mutateAsync, isSuccess: fileUploadSuccess, isPending } = useMutation({
        mutationKey: ['uploadpicture'],
        mutationFn: uploadFile,
        onSuccess: () => {
            toast.success('Profile Picture Updated Successfully', {
                position: 'top-center',
                duration: 4000,
                closeButton: true 
            })
            setIsFileSelect(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            queryClient.invalidateQueries({queryKey: ['myPicture', 'profile-pic']})
            
            
            
        },
        onError: (error) => {
            console.log(error.cause, error.message)
            toast.error('An error occured, please try again.', {
                position: 'top-center',
                duration: 4000,
                closeButton: true
            })
        }
    });
    
    const handleFileSubmit = async  () => {
        
        if (file) {
            try {
                await mutateAsync();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

    };



    const handleFileChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setFile(selectedFile); setIsFileSelect(true);
        
      };

    const handleButtonClick = async () => {
        // Trigger the click event of the file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
            
        }
        
        
    };



    return (
        <>
            {/* <h1 className="font-semibold text-2xl">Welcome to the Update User Profile Page</h1>
            <p className="text-xl font-medium">Profile details</p>
            {profile?.map((data: any) => (
            <div key={data.id} className="">
                <p className="flex flex-row">Username: <span>{data?.username}</span> </p>
                <p className="flex flex-row">Bio: <span>{data?.bio}</span> </p>
                <p className="">Headline: <span>{data?.headline}</span> </p>
                <p className="">First Name: <span>{data?.first_name}</span> </p>
                <p className="">Last Name: <span>{data?.last_name}</span></p> 
                <p className="">Email: <span>{data?.email}</span> </p>
                <p className="">Webiste: <span>{data?.website}</span> </p>
                <p className="">Instagram: <span>{data?.instagram}</span> </p>
                <p className="">Facebook: <span>{data?.facebook}</span> </p>
                div
            </div>
            ))} */}

            <div className="flex flex-col justify-center items-center gap-10 ">
                <div className="flex flex-col justify-start items-start gap-10 max-w-[50%]  ">
                    <div className="">
                        <h1 className="text-2xl font-bold">Profile</h1>
                    </div>
                    <div className="flex flex-col gap-8 ">
                        <div className="">
                            <div className="">
                                
                                    <div className="flex flex-row justify-start items-center gap-10 ">
                                        <div className="shadow-xl flex justify-center items-center rounded-full bg-gray-200 w-32 h-32 ">
                                            {getPicture?.map((data: ProfilePicture) => (
                                            <Avatar key={data.id} className="cursor-pointer w-28 h-28 ">
                                               
                                                    <AvatarImage 
                                                        src={data?.profile_picture} 
                                                        className="rounded-full " 
                                                    />
                                                <AvatarFallback>
                                                    <Image
                                                        src={fallbackAvatar}
                                                        alt="fallback avatar"
                                                        className="rounded-full"
                                                   />
                                                </AvatarFallback>
                                            </Avatar>
                                            ))}
                                        </div>
                                        <form  className="">
                                            <div className="flex flex-col gap-3 mb-2">
                                                <input 
                                                    type="file" 
                                                    name="file"
                                                   
                                                    onChange={handleFileChange}
                                                    accept="image/png, image/jpg"
                                                    style={{ display: "none" }}
                                                    ref={fileInputRef}
                                                />
                                              
                                            </div>
                                           <div className="flex flex-col gapx-x-0 gap-y-2 ">
                                           {isFileSelect ? 
                                                (<div className="flex flex-row  gap-0"> 
                                                    <Button onClick={handleFileSubmit} type="button" variant={'outline'} size={'sm'}>
                                                    {isPending ? "Submitting..." : "Submit"}
                                                    </Button>
                                                    <Button onClick={() => setFile(null)} variant={'link'} size={'sm'}>Cancel</Button>
                                                    </div>
                                                ): (
                                                    null
                                            )}
                                            <Button onClick={handleButtonClick}  type="button" size={'sm'}  className="">
                                                Change Picture 
                                            </Button> 
                                                <Button onClick={ async () => deleteProfilePciture.mutateAsync()} variant={'destructive'} size={'sm'} type="button">
                                                    {deleteProfilePciture.isPending ? 'Deleting...' : 'Delete Picture'}
                                                </Button>
                                            </div>
                                          
                                            
                                        </form>
                                    </div>
                               
                            </div>
                        </div>
                        <div className="">
                            <form action="" className="flex flex-col w-full gap-6">
                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-col gap-2 ">
                                        <label htmlFor="fname" className="text-sm font-medium">First Name</label>
                                        <input 
                                            type="text"
                                            className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="lname" className="text-sm font-medium">Last Name</label>
                                        <input 
                                            type="text"
                                            className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="uname" className="text-sm font-medium">Username</label>
                                        <input 
                                            type="text" 
                                            className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="uname" className="text-sm font-medium">Email Address</label>
                                        <input 
                                            type="text" 
                                            className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"

                                        />
                                    </div>
                                </div>
                                <hr className="border border-gray-400"/>
                                <div className="flex flex-col w-full gap-5">
                                    <h2 className="text-xl font-bold">About You</h2>
                                    <hr className="border border-gray-400"/>
                                    <div className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                                            <textarea name="" id="" cols={30} rows={4}  className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"></textarea>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="headline" className="text-sm font-medium">Headline</label>
                                            <input 
                                                type="text" 
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-5 ">
                                    <h2 className="text-xl font-bold">Social Media Handles</h2>
                                    <hr className="border border-gray-400"/>
                                    <div className="flex flex-row gap-10">
                                        <div className="flex flex-col gap-2 ">
                                            <label htmlFor="ig" className="text-sm font-medium">Instagram</label>
                                            <input 
                                                type="text"
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="fb" className="text-sm font-medium">Facebook</label>
                                            <input 
                                                type="text"
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                            <label htmlFor="website" className="text-sm font-medium">Website</label>
                                            <input 
                                                type="text"
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                            />
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
