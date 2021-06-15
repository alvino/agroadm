import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  //   callbacks: {
  //     async signIn(user, account, profile) {
  //       if (
  //         account.provider === "google" &&
  //         profile.verified_email === true &&
  //         profile.email.endsWith("@example.com")
  //       ) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     },
  //   },
});
