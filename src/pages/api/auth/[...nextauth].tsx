import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import TwitterProvider from "next-auth/providers/twitter"
import clientPromise from "../../../utils/connectMongo"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: "2.0" // opt-in to Twitter OAuth 2.0
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log({ ...user, ...account, ...profile })
      user.avatar = profile.image || profile.picture
      user.name = (profile.username as string) + "#" + profile.discriminator
      // @ts-expect-error
      user.id = profile.id
      user.email = profile.email
      return true
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
    async session({ session, user, token }) {
      console.log(token)
      session.user = { ...user, ...token }
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
        token = { ...token, ...profile, ...user, isNewUser }
      }
      return token
    }
  },
  secret: process.env.SECRET,
  debug: true,
  session: {
    maxAge: 30 * 24 * 60 * 60
  }
})
