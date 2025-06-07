import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import { getUser } from "@/components/db/db";

export const authOptions : NextAuthOptions = {
  providers : [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email : { label : "email", type: "email", placeholder: "m@example.com" },
        password: { label: "password", type: "password" }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials : any ) : Promise<any> {
        try {
          console.log(credentials)
          const user = await getUser(credentials.email);
          if (!user) {
            throw new Error("Invalid credentials.")
          }
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            throw new Error("Invalid credentials.")
          }
          return user;
        } catch (err : unknown) {
          console.log("Error: ", err)
          throw new Error(err as string);
        }
      }
    })
  ],
  pages : {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({session, token}) {
      if (token) {
        session.user.username = token.username
      }
      return session
    },
    async jwt({token, user}) {
      if (user) {
        token.username = user.username
      }
      return token
    }
  }
}