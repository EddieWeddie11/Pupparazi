import { useNavigate, useParams } from 'react-router-dom'
import { useDeletePuppy, usePuppy } from '../hooks/api.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import LoadingIndicator from '../components/LoadingIndicator.tsx'

export default function ViewPuppy() {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)
  if (isNaN(id)) {
    throw new Error(`Route param "id" is missing or invalid`)
  }

  // usePuppy is a custom hook. You can find it in 'hooks/api.ts' for more info.
  const puppy = usePuppy(id)
  // useDeletePuppy is a custom hook. You can find it in 'hooks/api.ts' for more info.
  const deletePuppy = useDeletePuppy(id)

  if (puppy.isPending) {
    return <LoadingIndicator />
  }

  if (puppy.isError || !puppy.data) {
    return <ErrorMessage error={puppy.error} />
  }

  async function handleDelete(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) {
    evt.preventDefault()
    // If our custom hook hasn't finished processing, then we want to remain on the current webpage instead of redirecting to the home page
    if (deletePuppy.isPending) {
      return
    }
    // We call our deletePuppy hook as defined on line 17 above, and ask it to mutate our data
    await deletePuppy.mutateAsync()
    // Navigate to the home page so we can see our updated data
    navigate('/')
  }

  const { name, breed, owner, image } = puppy.data
  return (
    <div className="puppy">
      <img className="img-circle" src={image} alt={name} />
      <h2>{name}</h2>
      <div>Breed: {breed}</div>
      <div>Owner: {owner}</div>
      <button onClick={(evt) => handleDelete(evt, id)}>Delete</button>
      <a href={`/${id}/edit`}>Edit</a>
    </div>
  )
}
