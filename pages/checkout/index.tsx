import { Flex, Heading, VStack, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { UserCartContext } from '@/components/context/CartContext'
import CartProduct from '@/components/CartProduct'
import CheckoutForm from '@/components/Checkout/CheckoutForm'

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
        <Flex
          mt="auto"
          fontSize="1.5rem"
          flexDir="column"
          align="center"
          width="50%"
        >
          <Flex
            width="100%"
            borderBottom="2px solid"
            borderColor="gray.300"
            mb="0.4rem"
          >
            <Text>Summary:</Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text>Subtotal:</Text>
            <Text> ${total()} </Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text>Shipping:</Text>
            <Text> FREE </Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text>Taxes and fees:</Text>
            <Text> ${Math.round((total() * 0.7) / 100)} </Text>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Text>Total:</Text>
            <Text> ${Math.round((total() * 0.7) / 100) + total()} </Text>
          </Flex>
        </Flex>
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
      </Flex>
    </Flex>
  )
}

export default Checkout
