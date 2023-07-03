import { Inter } from 'next/font/google';
import './globals.css';
import AppLayout from './layouts/AppLayout';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DepEd: Training QR System',
  description: "DepEd's Training QR System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout> {children} </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
