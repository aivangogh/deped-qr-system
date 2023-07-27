import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { Awaitable, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

type ExpectedUserType = {
  id: string;
  role: 'participant' | 'hrtd';
  position: string;
  school: string;
  phone: string;
  isSubmitted: boolean;
  // Add other optional properties as needed (e.g., name, email, image, etc.)
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

async function findUserByEmailDomain(email: string): Promise<User | null> {
  return prisma.user.findFirst({
    where: {
      email: {
        endsWith: '@student.buksu.edu.ph',
        equals: email,
      },
    },
  });
}

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
      // Check if there's already an existing user with the same email domain
      if (user && user.email && user.email.endsWith('@student.buksu.edu.ph')) {
        const existingUser = await findUserByEmailDomain(user.email);
        if (existingUser) {
          // If an existing user is found, merge the accounts into a single session
          session.user = token as any;
        }
      } else {
        // For other users (not ending with @student.buksu.edu.ph),
        // simply add them to the session as is
        session.user = token as any;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});

export { handler as GET, handler as POST };
