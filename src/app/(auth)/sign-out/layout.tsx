import { authRoutes } from '@/app/routes';
import { useRouter } from 'next/navigation';

export default function SignOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  router.push(authRoutes.singOut.path);
  return { children };
}
