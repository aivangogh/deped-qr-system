'use client';

import ParticipantNavbar from '@/app/participant/(components)/ParticipantNavbar';
import SiteFooter from '@/components/layouts/SiteFooter';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ParticipantAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full">
        <div className="sticky top-0 z-40 border-b container py-2 bg-white">
          <ParticipantNavbar />
        </div>

        <ScrollArea>{children}</ScrollArea>
        <div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
