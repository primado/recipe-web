'use client'
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import NextAuth, { NextAuthOptions, User } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"


interface UserCredentials {
    username: string,
    password: string,
    email: string,
}

interface RequestBody {
    action: 'login' | 'register' | 'logout'
}

const options: NextAuthOptions = {

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },

    providers: [
        
        CredentialsProvider({
            credentials: {
                username: {label: "username", type: "text"},
                email: {label: "Email", type: "Email"},
                password: {label: "Password", type: "password"}

            },
           async authorize(credentials: UserCredentials | undefined, req) {
                const  { action }: RequestBody = req.body as RequestBody

                switch (action) {
                    case 'login':
                        const loginResponse = await axios.post('http://localhost:8000/api/auth/login/', {
                            username: credentials?.username,
                            password: credentials?.password
                        }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })

                        const user = loginResponse.data

                        if (user.status === 200) {
                            return user.data
                        } else {
                           return null
                        }

                    
                    default: 
                        return null
                }
           }

        })
    ],
    callbacks: {
        async jwt({token, user}) {
            return {...token, ...user}
            
        },
        async session({ session, token, user}) {
            session.user = token as any
            return session
        }
    }
}

export default NextAuth(options)