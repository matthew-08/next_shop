import { Flex, Heading, VStack, Text, Button } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { UserCartContext } from '@/components/_Context/CartContext'
import CartProduct from '@/components/CartProduct'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import TotalSection from '@/components/Checkout/TotalSection'
import { useCheckoutMutation } from 'graphql/generated/graphql'

function Checkout() {
  const { cart, total, cartId } = useContext(UserCartContext)

  useEffect(() => {
    console.log(cart)
    console.log(total)
  }, [])

  return (
    <Flex minW="100%" px="4rem" py="1rem" overflowX="hidden" minH="80%">
      <Flex
        minW="30%"
        align="center"
        flexDir="column"
        borderRight="1px solid"
        borderColor="grey.600"
        padding="1rem"
      >
        <Heading fontSize="3rem">Cart:</Heading>
        <VStack overflow="auto" maxHeight="500px" minH="500px">
          {cart?.map((item) => (
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
        <Heading>Order Details:</Heading>
        <CheckoutForm cartId={cartId} />
      </Flex>
    </Flex>
  )
}

export default Checkout
