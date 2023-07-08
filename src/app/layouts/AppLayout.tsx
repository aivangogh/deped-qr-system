'use client';

import Navbar from '../components/Navbar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full">
        <div className="border-b container py-2 px-12">
          <Navbar />
        </div>
        {children}
      </div>
    </>
  );
}
