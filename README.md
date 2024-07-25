# Side Project - Recipe Management System

I decided to build this project to learn and improve my API integration and authentication in frontend applications using Nextjs. So that I can be able to integrate REST APIs in React Applications

## Table of contents

- [Getting Started](#getting-started)
  - [Project](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  <!-- - [Useful resources](#useful-resources) -->
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Project
Build a Recipe Management System to enable users post and share recipes with user authentication.


### Screenshot

| Desktop View  | Screenshots  |
| ------------- | ------------|
| ![](./public//recipe%20web-screenshots/home-page.png) | ![](./public//recipe%20web-screenshots/home-pg-01.png) |
| ![](./public/recipe%20web-screenshots//login-pg.png) | ![](./public/recipe%20web-screenshots/register-pg.png) |
| ![](./public//recipe%20web-screenshots/home-page.png) | ![](./public/recipe%20web-screenshots/recipes-detail.png) |
| ![](./public//recipe%20web-screenshots/edit-recipe.png) | ![](./public/recipe%20web-screenshots/delete-recipe.png) |
| ![](./public/recipe%20web-screenshots/collections-pg.png) | ![](./public//recipe%20web-screenshots/collections-recipes.png) |
| ![](./public/recipe%20web-screenshots/share-collection.png) | ![](./public/recipe%20web-screenshots/edit-collections.png) |
| ![](./public/recipe%20web-screenshots/profile-settings.png) | ![](./public/recipe%20web-screenshots/profile-settings.png) |


### Links

- The project hasn't been deployed yet to any hosting platform

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tanstack React Qauery](https://tanstack.com/query/latest) - Powerful asynchronous state
- And other libraries

### What I learned

Fetch the first and last name from the authenticated user to get the their initails to use as fallback when profile image is not available.


```JSX
 return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* <Button variant="outline"  className="focus:border-none focus-visible:ring-1 ring-offset-0 focus-visible:ring-gray-200"> */}
                <button className="focus:outline-none ">
                    {getProfilePic && getProfilePic?.data?.map((picture: ProfileDTO) => (

                    
                    <Avatar key={picture.id} className="cursor-pointer w-[2.5rem] h-[2.5rem]">
                        <AvatarImage src={picture?.profile_picture} className="rounded-full "/>
                        <AvatarFallback className="rounded-full  font-semibold">
                            {charFName.charAt(0).toUpperCase()}{charLName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    ))}
                </button>
                {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[17rem] !p-0">
                <Link href="/profile">
                <DropdownMenuGroup className="hover:bg-hover-1 hover:bg-opacity-40 px-5 py-4">
                    {getProfilePic && getProfilePic?.data?.map((data: ProfileDTO) => (
                        <DropdownMenuItem key={data.id}  className="flex flex-row justify-start items-center gap-3 cursor-pointer hover:outline-none ">

                            <button className="focus:outline-none ">
                                <Avatar  className="cursor-pointer w-[3.3rem] h-[3.3rem]">
                                    <AvatarImage 
                                         src={data?.profile_picture} 
                                         className="rounded-full "
                                    />
                                    <AvatarFallback className="rounded-full  font-semibold">
                                      {charFName.charAt(0).toUpperCase()}{charLName.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                           
                            </button>
                            <div className="flex flex-col gap-0">
                                <p className="text-lg font-semibold ">{data?.first_name} {data?.last_name}</p>
                                <p className="text-base font-medium">@{data?.username}</p>
                            </div>

                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                </Link>
     
                <DropdownMenuSeparator className="bg-hover-1 h-[0.1rem]" />

                <DropdownMenuGroup className="flex flex-col gap-y-1 font-semibold ">
                    {/* <DropdownMenuItem className="flex flex-row items-center gap-x-1 py-3 px-5  cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40 ">
                        <User className="h-4 w-4 " />
                        <button onClick={() => router.push('/#')}>
                        <span>Profile</span></button>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-3 px-5 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40">
                        
                        <button onClick={() => router.push("/profile-settings")} className="flex flex-row gap-x-2">
                            <UserCircle2Icon size={23} strokeWidth={2}/>
                            <span>Profile Settings</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-3 px-5 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40">
                        
                        <button onClick={() => router.push("")} className="flex flex-row gap-x-2">
                            <Settings size={23} strokeWidth={2} />
                            <span>Account</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-hover-1 h-[0.1rem]" />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row items-center gap-x-2 py-3 px-5 font-semibold text-red-700 cursor-pointer hover:outline-none hover:bg-hover-1 hover:bg-opacity-40">
                        
                        <button onClick={logoutHandler} className="flex flex-row gap-x-2">
                            <LogOut size={23} strokeWidth={2}/>
                            <span>Logout</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            
            </DropdownMenuContent>
                                       
                                    
                                
        </DropdownMenu>
    )
```

### Continued development

In my next project, instead storing the JWT tokens in the session storage I will learn ways to it in the cookies.


## Author

- Website - [Prince Adimado](https://prince-adimado.vercel.app/)
- Blog - [Prince Adimado's Blog](https://prince-adimado.hashnode.dev/)
- Twitter - [@_primado](https://www.twitter.com/primado)


## Acknowledgments

I just thank **my self.**


