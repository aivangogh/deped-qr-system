"use client";

import AppLayout from "@/app/layouts/AppLayout";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

export default function QueryClientProviderContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout> {children} </AppLayout>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
