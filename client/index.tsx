import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'

const router = createBrowserRouter(routes)
const client = new QueryClient()

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>
)
