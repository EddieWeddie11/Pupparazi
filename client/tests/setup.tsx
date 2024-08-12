import { beforeEach, expect } from 'vitest'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, cleanup } from '@testing-library/react/pure'
import userEvent from '@testing-library/user-event'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import * as matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom/vitest'
import routes from '../routes.tsx'
import { Puppy } from '../../models/Puppy.ts'

beforeEach(cleanup)
expect.extend(matchers)

interface Data {
  puppies: Puppy[]
}

export function testData() {
  return {
    puppies: [
    {
      id: 1,
      name: 'Coco',
      owner: 'James',
      breed: 'Pug',
      image: '/images/dog1.jpg',
    },
    {
      id: 2,
      name: 'Fido',
      owner: 'Jimmy',
      breed: 'Dog',
      image: '/images/dog2.jpg',
    },
    {
      id: 3,
      name: 'Kermit',
      owner: 'Jerm',
      breed: 'Frog',
      image: '/images/dog3.jpg',
    },
  ],
  } as Data
}

export function renderRoute(path = '/') {
  const router = createMemoryRouter(routes, {
    initialEntries: [path],
  })

  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

  const screen = render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )

  const user = userEvent.setup()

  return { ...screen, user }
}
