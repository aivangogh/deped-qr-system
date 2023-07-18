import { navRoutes } from '../routes';

export const metadata = {
  title: `${navRoutes.settings.name} | DepEd: Training QR System`,
  description: "DepEd's Training QR System",
};

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './(components)/SidebarNav';

const sidebarNavItems = [
  {
    title: navRoutes.settings.subroutes.documentTemplate.name,
    href: navRoutes.settings.subroutes.documentTemplate.path,
  },
  {
    title: navRoutes.settings.subroutes.excelTemplate.name,
    href: navRoutes.settings.subroutes.excelTemplate.path,
  },
  {
    title: navRoutes.settings.subroutes.driveFolder.name,
    href: navRoutes.settings.subroutes.driveFolder.path,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage configurations and template URLs.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
