'use client';

import { useRouter } from 'next/navigation';
import { dashboardRoutes } from '../routes';

export default function DashboardPage() {
  const router = useRouter();

  router.push(dashboardRoutes.dashboard.path);
}
