import React, { useContext } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/components/_Context/AccountContext'
import { UserCartContext } from '@/components/_Context/CartContext'
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
          <SidebarButtonGroup cart={cart} onClose={onClose} user={user} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Sidebar
