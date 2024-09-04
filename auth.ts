import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { signInSchema } from "./lib/zod"
import { ZodError } from "zod"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        id: 'credentials',
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            try {
                const { email, password } = await signInSchema.parseAsync(credentials)
      
                const user = await prisma.user.findUnique({
                  where: { email },
                });
      
                if (!user) {
                  throw new Error('No user found with the provided email');
                }
      
                const isValidPassword = await bcrypt.compare(password, user.password);
      
                if (!isValidPassword) {
                  throw new Error('Invalid password');
                }
      
                return user;
              }catch (error) {
                if (error instanceof ZodError) {
                  // Return `null` to indicate that the credentials are invalid
                  return null
                } 
              }
        },
      }),
  ],
})