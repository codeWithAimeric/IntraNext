import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("credentials = =  = = =  == ", credentials);
        
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // const { email, password } = credentials;
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            // throw new Error('No user found with the provided email');
            return null;
          }

          const isValidPassword = await bcrypt.compare(password, user.password);

          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});
