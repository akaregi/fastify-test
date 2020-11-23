import fastify, { RouteShorthandOptions } from 'fastify'

const server = fastify({
  logger: {
    prettyPrint: true,
  }
})

interface Params {
  api?: string
}

const opts: RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      properties: {
        api: {
          type: 'string'
        }
      }
    }
  }
}

server.get('/', async (_, reply) => {
  reply.type('application/json')
  reply.code(200)

  return {
    status: 200,
    response: 'Success!'
  }
})

server.get<{ Params: Params }>('/apis/:api', opts, async (request, reply) => {
  const api = request.params.api

  reply.type('application/json')
  reply.code(200)

  return {
    status: 200,
    response: `API you called is ${api}, right?`
  }
})

server.listen(8081, '0.0.0.0', (error, _) => {
  if (error) {
    server.log.fatal(`Failed to boot the server!`)
    throw error
  }
})
