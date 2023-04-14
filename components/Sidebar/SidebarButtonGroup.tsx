import React, { ReactNode } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'
import { User } from '@/types/types'

interface Props {
  onClose: () => void
  mainButton: ReactNode
  user: User | null
}

function SidebarButtonGroup({ onClose, mainButton, user }: Props) {
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
