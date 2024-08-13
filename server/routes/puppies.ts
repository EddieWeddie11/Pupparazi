import express from 'express'
import { getPuppies, getPuppyById } from '../../store'

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
  const onePuppy = {
    onePuppy: id
  }
}










//   try {
//     const puppy = await getPuppyById(id)
//     if (puppy) {
//       res.json(puppy)
//       console.log(id)
//     } else {
//       res.sendStatus(404)
//     }
//   } catch (error: unknown) {
//     console.log('error gettting puppy by id', error)
//     res.sendStatus(500)
//   }
// })
