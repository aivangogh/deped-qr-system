import { HrtdNav } from '@/app/dashboard/(components)/HrtdNav';
import { dashboardNavRoutes, dashboardRoutes } from '@/app/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DepedLogo from '../../../../public/images/deped-logo.png';

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      <div className="w-full flex justify-between">
        <div className="flex space-x-12">
          <div className="flex space-x-2">
            <Image src={DepedLogo} width={44} height={44} alt="DepEd Logo" />

            <Link
              href={dashboardRoutes.dashboard.path}
              passHref
              className="flex items-center"
            >
              <h2 className="text-lg font-bold  tracking-normal">
                Training QR System
              </h2>
            </Link>
          </div>
          <nav
            className={cn(
              'flex items-center space-x-4 lg:space-x-6',
              className
            )}
            {...props}
          >
            {dashboardNavRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  } text-sm font-medium transition-colors hover:text-primary`}
                >
                  {route.label}
                  
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <HrtdNav />
        </div>
      </div>
    </>
  );
}
