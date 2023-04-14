import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'
import client from 'apollo-client'
import Layout from '@/components/Layout'
import localFont from 'next/font/local'

export const poppins = localFont({
  src: '../fonts/poppins/Poppins-Bold.ttf',
})

const theme = extendTheme({
  fonts: {
    heading: poppins.style.fontFamily,
  },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  )
}
