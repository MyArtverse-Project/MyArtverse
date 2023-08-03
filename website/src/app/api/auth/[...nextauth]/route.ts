import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

const authOption: AuthOptions = {
    // @ts-expect-error
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user) {
                    return null
                }
                
                const passwordMatch = await compare(credentials.password, user.password)
                if (!passwordMatch) {
                    return null
                }
                return user;
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    }
}