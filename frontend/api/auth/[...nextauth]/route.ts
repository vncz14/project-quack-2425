import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/github"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)

