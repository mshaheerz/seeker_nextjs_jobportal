import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { OAuthConfig } from 'next-auth/providers'
export default NextAuth({
    providers:[
        //google provider
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string 
        })
    ]
})