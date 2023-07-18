import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { Awaitable } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../../lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),

    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (
        account?.provider === 'google' &&
        profile?.email?.endsWith('@student.buksu.edu.ph')
      ) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});

export { handler as GET, handler as POST };
