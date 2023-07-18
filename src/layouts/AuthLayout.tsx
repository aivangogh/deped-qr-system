'use client';

import { authRoutes, navRoutes } from '@/app/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push(authRoutes.signIn.path);
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Unauthorized</div>;
  }

  if (session && session.user.role === 'hrtd') {
    router.push(navRoutes.dashboard.path);
  }

  if (session && session.user.role === 'participant') {
    router.push(navRoutes.participant.path);
  }
}
