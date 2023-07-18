'use client';

import AppLayout from '@/layouts/HrtdAuthLayout';
import { Toaster } from '@/components/ui/toaster';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import NextAuthProvider from '@/layouts/NextAuthProvider';

const queryClient = new QueryClient();

export default function QueryClientProviderContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>
        {children}
        <Toaster />
      </NextAuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
