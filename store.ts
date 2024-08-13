// TODO: Write your fs functions that affect the puppy data in this file and export them.
import * as fs from 'node:fs/promises'
import type { Puppy } from './models/Puppy.ts'
import type { PuppyData } from './models/Puppy.ts'

// Function that gets an ARRAY of ALL PUPPIES, and then returns one with matching ID or undefined if not found
export async function getPuppyById(id: number): Promise<Puppy | undefined> {
  try {
    const data = await getPuppies()
    const puppy = data.puppies.find((p: Puppy) => p.id === id)
    // console.log('showing return puppy', puppy)
    // Trying to find the matching ID to the puppy
    return puppy
  } catch (error: unknown) {
    console.error('loading the pups failed', error)
    // Showing error if it is undefined
  }
}

// Function that DELETES a single Puppy
export async function deletePuppy(id: number): Promise<void> {
  const data = await getPuppies()
  data.puppies = data.puppies.filter((puppy: Puppy) => puppy.id != id)
  // Filtering out only one puppy
  const newFile = JSON.stringify(data, null, 2)
  console.log(newFile)
  await fs.writeFile('./storage/data.json', newFile)
}
// Stringfy - turns object into a string. The reason is because write file always take a string and write it to the file as is

// Function for ADDING a new puppy
export async function addPuppy(newPuppyData: PuppyData): Promise<void> {
  const data = await getPuppies()
  const copiedData = [...data.puppies]
  // Find the next id of puppy
  const nextId =
    copiedData
      .map((puppy) => puppy.id) // For each puppy object in copiedData, puppy.id takes the id property, showing in an array of ID
      // Reduce takes 2 arguments, the maxmimumId and the currentId. The Math.max is returning the greater of the two arguments so maxId always going to be the greater.
      .reduce((maxId, currentId) => Math.max(maxId, currentId), 0) + 1
  // console.log('showing next id', nextId)
  // Add the new puppy with the nextId variable
  const newPuppy = { ...newPuppyData, id: nextId }
  copiedData.push(newPuppy)
  // Save the updated data back to the file
  await fs.writeFile(
    './storage/data.json',
    JSON.stringify({ puppies: copiedData }, null, 2),
  )
  return nextId
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
