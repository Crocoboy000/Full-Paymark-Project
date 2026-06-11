'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  // Le useState garantit que chaque requête utilisateur possède son propre QueryClient
  // Cela évite le partage de données entre différents utilisateurs sur le serveur
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Avec le SSR, il est souvent préférable de définir un temps de mise en cache minimal
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}