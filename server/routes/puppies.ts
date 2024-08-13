import express from 'express'
import { deletePuppy, getPuppies, getPuppyById } from '../../store'

const router = express.Router()
export default router

// router.get('/', async (req, res) => {
//   res.json([])
// })

router.get('/', async (req, res) => {
  try {
    const data = await getPuppies()
    res.json(data) // Returning the response as a JSON with the Parse data (status code 200)
  } catch (error: unknown) {
    // This is what happens if the code doesn't work
    console.log('getting puppies failed', error)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const puppy = await getPuppyById(id)
  console.log(puppy)
  if (puppy) {
    res.json(puppy)
  } else {
    res.sendStatus(404)
  }
  console.log(id)
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await deletePuppy(id)
    res.sendStatus(200)
  } catch (error: unknown) {
    console.log('Could not delete puppy', error)
    res.sendStatus(500)
  }
})
