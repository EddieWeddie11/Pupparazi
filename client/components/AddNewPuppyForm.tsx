import { useCreatePuppy } from '../hooks/api.ts'
import { type PuppyData } from '../../models/Puppy.ts'
import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'

//This is the default state for our form, before the user types anything into it.
const empty = {
  name: '',
  breed: '',
  owner: '',
  image: '/images/puppy1.jpg',
} as PuppyData

export default function AddNewPuppyForm() {
  // useCreatePuppy is a custom hook. You can find it in 'hooks/api.ts' for more info.
  const createPuppy = useCreatePuppy()
  const navigate = useNavigate()

  const [formState, setFormState] = useState(empty)

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    // If our custom hook hasn't finished processing, then we want to remain on the current webpage instead of redirecting
    if (createPuppy.isPending) {
      return
    }
    // If createPuppy.mutateAsync finishes successfully, then navigate to this page
    const { id } = await createPuppy.mutateAsync({ puppy: formState })
    navigate(`/${id}`)
  }

  //handleChange keeps track of the state of our puppy data as the user writes in the form.
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.currentTarget
    // Below, we are spreading the existing data and adding the new data onto it. Just like we showed you in the React Forms (multipart) lecture.
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="breed">Breed:</label>
        <input
          name="breed"
          id="breed"
          value={formState.breed}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="owner">Owner:</label>
        <input
          name="owner"
          id="owner"
          value={formState.owner}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="image">Image:</label>
        <input
          name="image"
          id="image"
          value={formState.image}
          onChange={handleChange}
        />
      </div>
      <button data-pending={createPuppy.isPending}>Submit</button>
    </form>
  )
}
