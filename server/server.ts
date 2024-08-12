import express from 'express'

// Import your router here
import puppies from './routes/puppies'
const server = express()

// Server configuration
server.use(express.json())
server.use('/api/v1/puppies', puppies)
// Your routes/router(s) should go here

export default server
