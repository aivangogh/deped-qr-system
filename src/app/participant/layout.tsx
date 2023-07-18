'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { authRoutes, navRoutes } from '../routes';
import ParticipantAuthLayout from '@/layouts/ParticipantAuthLayout';

export default function ParticipantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return <div>Unauthorize</div>;
  }

  if (session && session.user.role === 'hrtd') {
    router.push(navRoutes.dashboard.path);
  }

  return (
    <>
      <ParticipantAuthLayout>{children}</ParticipantAuthLayout>
    </>
  );
}
