import {
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  useMediaQuery,
} from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { UserCartContext } from '@/components/_Context/CartContext'
import CartProduct from '@/components/CartProduct'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import TotalSection from '@/components/Checkout/TotalSection'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/_Context/AccountContext'
import { gql } from '@apollo/client'
import client from 'apollo-client'
import useFetchSession from 'utils/hooks/FetchSession'

function Checkout() {
  const { cart, total, getCart } = useContext(UserCartContext)
  const { accountFetchData, sessionFetchLoading } = useContext(AuthContext)
  const [isSmallerThan1200] = useMediaQuery('(max-width:1200px)')
  const router = useRouter()
  const [sessionFetched, fetchedUser] = useFetchSession()

  useEffect(() => {
    if (sessionFetched && !fetchedUser) {
      router.push('/')
    }
  }, [sessionFetched, fetchedUser])

  return (
    <Flex
      minW="100%"
      px="4rem"
      py="1rem"
      minH="100%"
      overflowX="hidden"
      flexGrow="1"
      flexDir={isSmallerThan1200 ? 'column' : 'row'}
    >
      <Flex
        minW="30%"
        align="center"
        flexDir="column"
        borderRight="1px solid"
        borderColor="grey.600"
        padding="1rem"
      >
        <VStack overflow="auto" maxHeight="500px" minH="500px" padding="0.5rem">
          {cart?.cartItems.map((item) => (
            <CartProduct cartItem={item} key={uuid()} />
          ))}
        </VStack>
        <TotalSection total={total()} />
      </Flex>
      <Flex
        flexGrow="1"
        height="100%"
        padding="1rem"
        minH="100%"
        align="center"
        flexDir="column"
      >
        <CheckoutForm cartId={cart.cartId} />
      </Flex>
    </Flex>
  )
}

export default Checkout
