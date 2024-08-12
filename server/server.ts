import express from 'express'

// Import your router here

const server = express()

// Server configuration
server.use(express.json())

// Your routes/router(s) should go here

export default server
