import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import getToken from 'utils/getToken'

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_URI}/api/graphql`,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exist
  const token = getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  ssrMode: true,
  uri: `${process.env.NEXT_PUBLIC_URI}/api/graphql`,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
console.log(`${process.env.NEXT_PUBLIC_D_URL}/api/graphql`)

export default client
