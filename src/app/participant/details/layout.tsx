'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { authRoutes, navRoutes } from '@/app/routes';

export default function ParticipantLayout({
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
    return <div>Unauthorize</div>;
  }

  if (session && session.user.role === 'hrtd') {
    router.push(navRoutes.dashboard.path);
  }

  return (
    <>
      {children}
    </>
  );
}
