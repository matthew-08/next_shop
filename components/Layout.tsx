import React, { ReactNode } from 'react'
import AccountContext from '@/components/context/AccountContext'
import CartContext from '@/components/context/CartContext'
import { Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout({ children }: { children: ReactNode }) {
  return (
    <AccountContext>
      <CartContext>
        <AccountContext>
          <CartContext>
            <Navbar />
            {children}
          </CartContext>
        </AccountContext>
      </CartContext>
    </AccountContext>
  )
}

export default Layout
