'use client';

import Image from 'next/image';
import DepedLogo from '../../../../public/images/deped-logo.png';
import Link from 'next/link';
import { authRoutes, navRoutes } from '@/app/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { UserNav } from './UserNav';

export default function ParticipantNavbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex space-x-2">
          <Image src={DepedLogo} width={44} height={44} alt="DepEd Logo" />

          <Link
            href={navRoutes.home.path}
            passHref
            className="flex items-center"
          >
            <h2 className="text-lg font-bold  tracking-normal">
              Training QR System
            </h2>
          </Link>
        </div>
        {session && session.user.role === 'participant' && (
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        )}
      </div>
    </>
  );
}
