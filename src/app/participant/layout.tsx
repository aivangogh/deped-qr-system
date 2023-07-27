'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { authRoutes, navRoutes, participantRoutes } from '@/app/routes';
import ParticipantAuthLayout from '@/layouts/ParticipantAuthLayout';
import { useQuery } from 'react-query';
import { getProfile } from '@/services/fetch/users';
import { User } from '@prisma/client';

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

  const { data: user, isLoading } = useQuery<User>({
    enabled: !!session,
    queryKey: ['user', session?.user.id],
    queryFn: () => getProfile(session?.user.id!),
  });

  if (status === 'loading' || isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Unauthorize</div>;
  }

  if (session && session.user.role === 'hrtd') {
    router.push(navRoutes.dashboard.path);
  }

  if (session && user?.isSubmitted === false) {
    router.push(participantRoutes.participantDetails.path);
  }

  console.log(user);

  return (
    <>
      <ParticipantAuthLayout>{children}</ParticipantAuthLayout>
    </>
  );
}
