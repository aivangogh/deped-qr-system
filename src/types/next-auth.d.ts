import { Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role?: Role;
      position?: string;
      school?: string;
      phone?: string;
      isSubmitted?: boolean;
      // Add other optional properties as needed (e.g., name, email, image, etc.)
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user'];
  }

  /** The OAuth profile returned from your provider */
  interface Profile {
    email_verified: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
