'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

export const ReactQueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools buttonPosition="bottom-left" />
  </QueryClientProvider>
)
