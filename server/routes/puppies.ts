import express from 'express'
import { getPuppies } from '../../store'

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
