import { authRoutes } from '@/app/routes';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
      if (account?.provider === 'google' && user.email) {
        // Define the allowed email addresses
        const allowedEmails = [
          'rex.dacanay@deped.gov.ph',
          'woodrowwilson.merida@deped.gov.ph',
        ];

        if (allowedEmails.includes(user.email)) {
          return true; // Allow sign-in for allowed email addresses
        } else {
          return false; // Block sign-in for other email addresses
        }
      }

      return false; // Block sign-in for non-Google providers
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
    signIn: authRoutes.signIn.path,
    signOut: authRoutes.signIn.path,
  },
});

export { handler as GET, handler as POST };
