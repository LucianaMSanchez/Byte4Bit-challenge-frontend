import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse, AxiosError } from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "password", type: "password", placeholder: "***" },
      },
      async authorize(credentials, req) {
        try {
          const response: AxiosResponse = await axios.post("http://localhost:3001/api/users/login", credentials);
          const { data } = response;
          const { user } = data;

          return {
            ...data,
            role: user.role,
          };
        } catch (error) {
       
          if (axios.isAxiosError(error) && error.response?.status === 401) {
           
            throw new Error("Invalid credentials");
          }
          throw new Error((error as AxiosError).message);
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      session.role = token.role as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/"
  },
});

export { handler as GET, handler as POST };
