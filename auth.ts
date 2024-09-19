import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import GoogleProvider from "next-auth/providers/google";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
          params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
          },
      },
  })
  ],
});
