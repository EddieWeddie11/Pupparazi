// TODO: Write your fs functions that affect the puppy data in this file and export them.
import * as fs from 'node:fs/promises'
import type { Puppy } from './models/Puppy.ts'

// Function that gets an ARRAY of ALL PUPPIES, and then returns one with matching ID or undefined if not found
export async function getPuppyById(id: number): Promise<Puppy | undefined> {
  const puppyId = await getPuppies()
  try {
    const foundPuppy = puppyId.find(() => foundPuppy === id)
    // Trying to find the matching ID to the puppy
  } catch (error: unknown) {
    console.error('loading the pups failed', error)
    // Showing error if it is undefined
  }
}

export async function getPuppies() {
  try {
    const json = await fs.readFile('./storage/data.json', 'utf8') // Reading the file
    const data = JSON.parse(json)
    return data // Returning the data.json file where the puppies are
  } catch (error: unknown) {
    console.error('loading the pups failed', error)
  }
}
