import { Link } from 'react-router-dom'
import { usePuppies } from '../hooks/api.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import LoadingIndicator from '../components/LoadingIndicator.tsx'

export default function PuppiesList() {
  // usePuppies is a custom hook. You can find it in 'hooks/api.ts' for more info.
  const puppies = usePuppies()

  if (puppies.isPending) {
    return <LoadingIndicator />
  }

  if (puppies.isError || !puppies.data) {
    return <ErrorMessage error={puppies.error} />
  }

  return (
    <>
      <h3>
        <Link to="/new">Add Puppy</Link>
      </h3>
      <div className="container">
        {puppies.data.map((pup) => (
          <div key={pup.id} className="puppy-list">
            <Link to={`/${pup.id}`}>
              <img className="img-circle" src={pup.image} alt={pup.name} />
              <h3>{pup.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
