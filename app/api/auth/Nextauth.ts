scope: 'https://www.googleapis.com/auth/gmail.send'
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string | undefined; // This adds accessToken to the session type
  }
}
