import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import db from "../../../../modules/db";
import { authConfig } from "@/modules/auth";

const handler = NextAuth(authConfig);

export {handler as GET, handler as POST};