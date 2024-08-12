import express from 'express'
import * as fs from 'node:fs/promises'

const router = express.Router()
export default router

// router.get('/', async (req, res) => {
//   res.json([])
// })

router.get('/', async (req, res) => {
  try {
    // This is what happens if the code works
    const json = await fs.readFile('./storage/data.json', 'utf8')
    const data = JSON.parse(json)
    res.json(data)
  } catch (error: unknown) {
    // This is what happens if the code doesn't work
    console.log('getting puppies failed', error)
    res.sendStatus(500)
  }
})
