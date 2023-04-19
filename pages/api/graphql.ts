import { createYoga, createSchema } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import schema from 'graphql/schema'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
})
