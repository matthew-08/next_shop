import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  HStack,
  Image,
  VStack,
  Flex,
  Text,
  IconButton,
  Container,
  Box,
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { UserCartContext } from 'context/CartContext'
import { CartItem } from 'types/types'

function CartProduct({ cartItem }: { cartItem: CartItem }) {
  const { cart, handleRemoveFromCart, handleAddToCart } =
    useContext(UserCartContext)
  const handleClick = (symbol: '-' | '+') => {
    if (symbol === '-') {
      handleRemoveFromCart(cartItem)
    } else {
      handleAddToCart(cartItem)
    }
  }
  return (
    <HStack maxH="200px" width="100%" align="center">
      <Image
        src={cartItem.itemImage}
        boxSize="150px"
        objectFit="contain"
        mr="1rem"
      />
      <VStack minW="70%">
        <Text noOfLines={2} maxW="40ch" fontSize="1.3rem" fontWeight="bold">
          {cartItem.itemName}
        </Text>
        <Text fontSize="2rem" fontWeight="bold" pr="1rem">
          ${' '}
          {Math.round((cartItem.itemPrice * cartItem.itemQuantity * 100) / 100)}
        </Text>
        <Flex align="center">
          <IconButton
            aria-label="button"
            onClick={() => handleClick('-')}
            icon={<MinusIcon boxSize={4} />}
          />
          <Flex flexGrow={1} px="2rem">
            <Text fontSize="2rem">{cartItem.itemQuantity}</Text>
          </Flex>
          <IconButton
            aria-label="button"
            onClick={() => handleClick('+')}
            icon={<AddIcon boxSize={4} />}
          />
        </Flex>
      </VStack>
    </HStack>
  )
}

export default CartProduct
