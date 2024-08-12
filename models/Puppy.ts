export interface PuppyData {
  name: string
  owner: string
  image: string
  breed: string
}

export interface Puppy extends PuppyData {
  id: number
}

export interface Data {
  puppies: Puppy[]
}