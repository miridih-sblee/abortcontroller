import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex flex-col items-center justify-center">
      <nav className="bg-black py-2 px-4 w-full">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-white text-xl font-bold">Logo</a>
          <ul className="flex items-center space-x-4">
            <li><a href="/eventhandlers" className="text-white hover:text-gray-300">Event Handlers</a></li>
            <li><a href="/fetch" className="text-white hover:text-gray-300">Fetch</a></li>
            <li><a href="/fetchtimeout" className="text-white hover:text-gray-300">Fetch Timeout</a></li>
            <li><a href="/fetchUnmount" className="text-white hover:text-gray-300">Fetch Unmount</a></li>
            <li><a href="/query" className="text-white hover:text-gray-300">Query</a></li>
            <li><a href="/longtask" className="text-white hover:text-gray-300">Long Task</a></li>
            <li><a href="/longtaskworker" className="text-white hover:text-gray-300">Long Task Worker</a></li>
          </ul>
        </div>
      </nav>
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <Component {...pageProps} />
      </div>
    </div>
    </QueryClientProvider>
  );
  
}
