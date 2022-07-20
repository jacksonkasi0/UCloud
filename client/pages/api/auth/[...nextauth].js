import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    // secret: process.env.JWT_SECRET,
    // session: { strategy: 'jwt', },
    // callbacks: {
    //     async session({ session, token, user }) {
    //         session.user.username = session.user.name
    //             .split(" ")
    //             .join("-")
    //             .toLocaleLowerCase();

    //         session.user.uid = token.sub;
    //         return session;
    //     },
    // },
});
