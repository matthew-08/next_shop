import React, { ReactNode, useContext } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/context/AccountContext'
import { UserCartContext } from '@/components/context/CartContext'
import SidebarContent from './SidebarContent'
import SidebarButtonGroup from './SidebarButtonGroup'

function Sidebar({
  isOpen,
  onClose,
  btnRef,
}: {
  isOpen: boolean
  onClose: () => void
  btnRef: React.RefObject<HTMLButtonElement>
}) {
  const { user } = useContext(AuthContext)
  const { cart } = useContext(UserCartContext)
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
    <Drawer
      isOpen={isOpen}
      colorScheme="blackAlpha"
      size="lg"
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <SidebarContent />
        </DrawerBody>

        <DrawerFooter alignItems="center" mb="2rem">
          <SidebarButtonGroup
            mainButton={mainButton}
            onClose={onClose}
            user={user}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
