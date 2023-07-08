import { Inter } from 'next/font/google';
import './globals.css';
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css';

import QueryClientProviderContext from '@/context/QueryClientProviderContext';

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
        <QueryClientProviderContext>{children}</QueryClientProviderContext>
      </body>
    </html>
  );
}
