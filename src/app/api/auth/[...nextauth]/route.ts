import { authRoutes } from '@/app/routes';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { User } from 'next-auth';
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
  const user = await prisma.user.findFirst({
    where: {
      email: {
        endsWith: '@student.buksu.edu.ph',
      },
    },
  });

  console.log(`User: ${user}`);

  if (!user) {
    return null;
  }

  return user;
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
  },
});

export { handler as GET, handler as POST };
