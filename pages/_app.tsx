import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from 'apollo-client'
import Layout from '@/components/Layout'
import { Poppins } from 'next/font/google'

export const poppins = Poppins({
  weight: '500',
  subsets: ['devanagari'],
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  )
}
