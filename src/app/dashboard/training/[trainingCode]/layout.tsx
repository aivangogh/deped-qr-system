'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import HrtdAuthLayout from '@/layouts/HrtdAuthLayout';
import { navRoutes, authRoutes } from '@/app/routes';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HrtdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    router.push(authRoutes.signIn.path);
  }

  if (session && session.user.role === 'participant') {
    router.push(navRoutes.participant.path);
  }

  return <HrtdAuthLayout>{children}</HrtdAuthLayout>;
}
