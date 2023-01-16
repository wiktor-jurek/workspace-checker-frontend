import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.SIGNIN_CLIENT_ID,
      clientSecret: process.env.SIGNIN_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@cobry.co.uk");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
