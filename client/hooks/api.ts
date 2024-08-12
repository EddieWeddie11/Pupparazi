import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Puppy, PuppyData } from '../../models/Puppy'

// This hook gets all our puppies data from the server and sends it to our frontend components.
export function usePuppies() {
  // This is a reactQuery call to our puppies data in the server.
  return useQuery({
    // The queryKey allows ReactQuery to keep track of the right data
    queryKey: ['puppies'],
    // The queryFn is an API call to our server to get all puppies
    queryFn: async () => {
      const res = await request.get('/api/v1/puppies')
      // We then return all our puppies data as an array of multiple Puppy (i.e., our TypeScript interface)
      // You could also return this as Puppy[] which means the same thing
      return res.body.puppies as Array<Puppy>
    },
  })
}

// This hook finds a single puppy by its id, and gets it from the server to send to the frontend component.
export function usePuppy(id: number) {
  return useQuery({
    // As well as the query key, we also need to pass in the id to find the correct puppy from our data
    queryKey: ['puppies', id],
    // The queryFn is an API call to our server to get the puppy by its id
    queryFn: async () => {
      const res = await request.get(`/api/v1/puppies/${id}`)
      // We then return our puppy data as the Puppy TypeScript interface
      return res.body as Puppy
    },
  })
}

// This hook takes in the id of a specific puppy
export function useDeletePuppy(id: number) {
  const client = useQueryClient()
  return useMutation({
    // Then it sends that id to the backend
    mutationFn: async () => {
      await request.delete(`/api/v1/puppies/${id}`)
    },
    // Once the puppy has been deleted from the backend, all of the puppies data is refreshed to show the changes
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['puppies'] })
    },
  })
}

// This hook takes in the puppy data a user has typed into the form
export function useCreatePuppy() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({ puppy }: { puppy: PuppyData }) => {
      // Then it sends that puppy data to the backend
      const res = await request.post('/api/v1/puppies').send(puppy)
      // Then, it returns the new id for that puppy, and the location
      return res.body as { id: number; location: string }
    },
    // Finally, it refreshes all of the puppies data so that our new puppy shows up in the browser
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['puppies'] })
    },
  })
}
