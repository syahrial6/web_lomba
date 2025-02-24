'use client'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import {SessionProvider} from "next-auth/react";

const queryClient = new QueryClient();

const Provider = ({ children,session }) => {
  return (
    <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
