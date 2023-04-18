import { Heading, VStack, Text, StackDivider } from '@chakra-ui/react'
import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { UserCartContext } from '@/components/_Context/CartContext'
import { AuthContext } from '@/components/_Context/AccountContext'
import CartProduct from '../CartProduct'

function SidebarContent() {
  const { user } = useContext(AuthContext)
  const { cart } = useContext(UserCartContext)
  return (
    <VStack height="100%">
      <Heading mt="3rem" mb="1rem" fontSize="3rem">
        Shopping Cart
      </Heading>
      <VStack
        padding="1rem"
        overflowY="auto"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
      >
        {cart?.cartItems.length ? (
          cart.cartItems.map((item) => (
            <CartProduct key={uuid()} cartItem={item} />
          ))
        ) : (
          <Text mt="1rem" fontSize="2rem">
            Your cart is empty.
          </Text>
        )}
      </VStack>
    </VStack>
  )
}

export default SidebarContent
