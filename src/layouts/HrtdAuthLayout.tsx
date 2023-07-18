'use client';

import Navbar from '@/app/dashboard/(components)/Navbar';
import SiteFooter from '@/components/layouts/SiteFooter';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function HrtdAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full">
        <div className="sticky top-0 z-40 border-b container py-2 bg-white">
          <Navbar />
        </div>

        <ScrollArea>{children}</ScrollArea>
        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
