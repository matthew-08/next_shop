import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import getToken from 'utils/getToken'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
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
  uri: 'http://localhost:3000/api/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
