import { routes } from '../routes';

export const metadata = {
  title: `${routes.settings.name} | DepEd: Training QR System`,
  description: "DepEd's Training QR System",
};

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './(components)/SidebarNav';

const sidebarNavItems = [
  {
    title: routes.settings.subroutes.documentTemplate.name,
    href: routes.settings.subroutes.documentTemplate.path,
  },
  {
    title: routes.settings.subroutes.excelTemplate.name,
    href: routes.settings.subroutes.excelTemplate.path,
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
