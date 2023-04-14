/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'
import { User } from '@/types/types'
import { CartItem } from '@prisma/client'
import { useRouter } from 'next/router'

interface Props {
  onClose: () => void
  user: User | null
  cart: CartItem[]
}

function SidebarButtonGroup({ onClose, user, cart }: Props) {
  const router = useRouter()
  let mainButton: ReactNode
  if (!user?.email) {
    mainButton = (
      <Button
        fontSize="1.5rem"
        padding="1.5rem"
        colorScheme="green"
        width="100%"
        onClick={() => {
          router.push('/auth/signin')
          onClose()
        }}
      >
        Login
      </Button>
    )
  } else {
    mainButton = (
      <Button
        isDisabled={cart?.length === 0}
        fontSize="1.5rem"
        padding="1.5rem"
        colorScheme="green"
        width="100%"
        onClick={() => {
          router.push('/checkout')
          onClose()
        }}
      >
        Checkout
      </Button>
    )
  }
  return (
    <Flex m="auto" flexDir="column" width="60%" gap="0.5rem">
      {!user ||
        (!user.id && (
          <Text textAlign="center">
            *You aren't currently logged in. Log in to save your cart and
            checkout!
          </Text>
        ))}
      <Button
        fontSize="1.5rem"
        width="100%"
        padding="1.5rem"
        variant="outline"
        mr={3}
        onClick={onClose}
      >
        Cancel
      </Button>
      {mainButton}
    </Flex>
  )
}

export default SidebarButtonGroup
