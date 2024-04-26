'use client'
import React, { useState, useRef, MouseEventHandler, useEffect } from "react"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import fallbackAvatar from "../../public/assets/fallback-avatar.png"
import Image from "next/image"
import { Button } from "../ui/button"
import { Controller, useForm } from "react-hook-form"
import { Router, SignalZero } from "lucide-react"
import { ErrorMessage } from "@hookform/error-message"
import { useRouter } from "next/navigation"


type UserProfile = {
    key: number,
    first_name: string | undefined,
    last_name: string | undefined,
    username: string | undefined,
    email?: string,
    headline?: string,
    bio?: string,
    website?: string,
    instagram?: string,
    facebook?: string
}

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

    const { register, handleSubmit, setValue, control, formState: {errors} } = useForm<UserProfile>({
        criteriaMode: 'all',
    })


    // const [ file, setFile ] = useState<File | null>(null)
    const [ fileError, setFileError ] = useState<String>('')
    const [ fError, setFError ] = useState<Boolean>(false)
    const [isFileSelect, setIsFileSelect] = useState<Boolean>(false)

    const router = useRouter();


    const queryClient = useQueryClient()


    const {data: profile, isError, error, isSuccess: isUserProfileSuccess, isPending: isUserProfilPending} = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/api/auth/user-profile', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data);
            return response.data
        },
        
    })

    const updateUserProfile = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: async (newProfileData: UserProfile) => {
            const response = await axios.patch('http://localhost:8000/api/auth/profile-update', newProfileData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data.data
        },
        onSuccess: (data) => {
            toast.success('Successfully updated user profile', {
                position: 'top-center',
                duration: 4000,
                closeButton: true 
            })
            window.location.reload()
            queryClient.invalidateQueries({queryKey: ['profile']})

        },
        onError: (error) => {
            toast.error('An occured while updating profile', {
                position: 'top-center',
                duration: 4000,
                closeButton: true 
            })
            console.log(error.cause, error.message)
        }
    })

    const onSubmit = async (data: UserProfile) => {
        updateUserProfile.mutateAsync(data)
    }


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
    
    const handleFileSubmit = async  (e: any) => {
        e.preventDefault()
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

    const handleButtonClick = async (e: any) => {
        e.preventDefault()
        // Trigger the click event of the file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
            
        }
    };

    // setting form values
    
    

    return (
        <>
     

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
                                                    <Button onClick={() => router.push("/profile")} variant={'link'} size={'sm'}>Cancel</Button>
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
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-6">
                                {profile?.map((data: UserProfile) => (
                                <div key={data.key} className="flex flex-col gap-y-3">
                                    <div  className="flex flex-row gap-10">

                                        <div  className="flex flex-col gap-3 ">
                                            <label htmlFor="fname" className="text-sm font-medium">First Name</label>
                                            <input 
                                                type="text"
                                                defaultValue={data?.first_name || ''}
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                {...register('first_name', {
                                                    required: {
                                                        value: true,
                                                        message: 'First name is required'
                                                    },
                                                    maxLength: {
                                                        value: 150,
                                                        message: 'Accepts 150 maximum characters or fewer'
                                                    },
                                                })}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="first_name"
                                                render={({ messages }) =>
                                                  messages &&
                                                  Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                  ))
                                                }
                                            />
                                        </div>
                                            
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="lname" className="text-sm font-medium">Last Name</label>
                                            <input 
                                                type="text"
                                                defaultValue={data?.last_name || ''}
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                {...register('last_name', {
                                                    required: {
                                                        value: true,
                                                        message: 'Last name is required'
                                                    },
                                                    maxLength: {
                                                        value: 150,
                                                        message: 'Accepts 150 maximum characters or fewer'
                                                    }
                                                })}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="last_name"
                                                render={({ messages }) =>
                                                  messages &&
                                                  Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                  ))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="uname" className="text-sm font-medium">Username</label>
                                            <input 
                                                type="text" 
                                                defaultValue={data?.username || ''}
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                {...register('username', {
                                                    required: {
                                                        value: true,
                                                        message: 'username is required'
                                                    },
                                                    maxLength: {
                                                        value: 150,
                                                        message: 'Accepts 150 maximum characters or fewer'
                                                    },
                                                    pattern: {
                                                        value: /^[\w.@+-]+$/,
                                                        message: "150 characters or fewer. Letters, digits and @/./+/-/_ only."
                                                    }
                                                })}

                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="username"
                                                render={({ messages }) =>
                                                  messages &&
                                                  Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                  ))
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email_address" className="text-sm font-medium">Email Address</label>
                                            <input 
                                                type="text" 
                                                defaultValue={data?.email || ''}
                                                className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                {...register('email', {
                                                    required: {
                                                        value: true,
                                                        message: 'Email address  is required'
                                                    },
                                                    maxLength: {
                                                        value: 150,
                                                        message: 'Accepts 150 maximum characters or fewer'
                                                    },
                                                   
                                                })}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name="email"
                                                render={({ messages }) =>
                                                  messages &&
                                                  Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                  ))
                                                }
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
                                                <textarea 
                                                    id="" cols={30} rows={4} maxLength={150} 
                                                    defaultValue={data?.bio || ''} 
                                                    {...register('bio', {
                                                        required: {
                                                            value: false,
                                                            message: ""
                                                        },
                                                        maxLength: {
                                                            value: 150,
                                                            message: "Accepts a maximum 150 characters or fewer."
                                                        }

                                                    })}
                                                    className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand">
                                                    
                                                </textarea>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="headline" className="text-sm font-medium">Headline</label>
                                                <input 
                                                    type="text"
                                                    defaultValue={data?.headline || ''}  
                                                    className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                    {...register('headline', {
                                                        required: {
                                                            value: false,
                                                            message: ""
                                                        },
                                                        maxLength: {
                                                            value: 150,
                                                            message: 'Accepts 150 maximum characters or fewer'
                                                        }
                                                    })}
                                                />
                                                <ErrorMessage
                                                errors={errors}
                                                name="last_name"
                                                render={({ messages }) =>
                                                  messages &&
                                                  Object.entries(messages).map(([type, message]) => (
                                                    <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                  ))
                                                }
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
                                                    defaultValue={data?.instagram || ''} 
                                                    className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                    {...register('instagram', {
                                                        required: {
                                                            value: false,
                                                            message: ''
                                                        },
                                                        maxLength: {
                                                            value: 200,
                                                            message: 'Accepts 150 maximum characters or fewer'
                                                        }
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="instagram"
                                                    render={({ messages }) =>
                                                      messages &&
                                                      Object.entries(messages).map(([type, message]) => (
                                                        <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                      ))
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="fb" className="text-sm font-medium">Facebook</label>
                                                <input 
                                                    type="text"
                                                    defaultValue={data?.facebook || ''} 
                                                    className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                    {...register('facebook', {
                                                        required: {
                                                            value: false,
                                                            message: ''
                                                        },
                                                        maxLength: {
                                                            value: 150,
                                                            message: 'Accepts 150 maximum characters or fewer'
                                                        }
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="facebook"
                                                    render={({ messages }) =>
                                                      messages &&
                                                      Object.entries(messages).map(([type, message]) => (
                                                        <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                      ))
                                                }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                                <label htmlFor="website" className="text-sm font-medium">Website</label>
                                                <input 
                                                    type="text"
                                                    defaultValue={data?.website || ''} 
                                                    className="text-base font-medium focus:outline-none ring-2 ring-gray-400 p-3 rounded-md focus:ring-2 focus:ring-brand"
                                                    {...register('website', {
                                                        required: {
                                                            value: false,
                                                            message: ''
                                                        },
                                                        maxLength: {
                                                            value: 200,
                                                            message: 'Accepts 150 maximum characters or fewer'
                                                        }
                                                    })}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="website"
                                                    render={({ messages }) =>
                                                      messages &&
                                                      Object.entries(messages).map(([type, message]) => (
                                                        <p key={type} className="text-red-500 text-sm font-normal">{message}</p>
                                                      ))
                                                    }
                                                />
                                        </div>
                                        <div className="">
                                            <Button variant={'default'} size={'lg'} type="submit">
                                                {isUserProfilPending ? 'Submitting' : 'Submit'}
                                            </Button>
                                        </div>
                                                
                                    </div>
                                                
                                                
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
