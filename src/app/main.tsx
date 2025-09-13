import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import RootLayout from './layout.tsx'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NuqsAdapter>
          <RootLayout />
        </NuqsAdapter>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
