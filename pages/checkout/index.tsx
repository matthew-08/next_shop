import { Flex, Heading, VStack, Text, Button } from '@chakra-ui/react'
import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { UserCartContext } from '@/components/context/CartContext'
import CartProduct from '@/components/CartProduct'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import TotalSection from '@/components/Checkout/TotalSection'

function Checkout() {
  const { cart, total } = useContext(UserCartContext)
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
        <CheckoutForm />
        <Button>Submit</Button>
      </Flex>
    </Flex>
  )
}

export default Checkout
