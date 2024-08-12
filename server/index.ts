import server from './server.ts'

const port = 3000

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port', port)
})
