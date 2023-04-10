import React, { ReactNode } from 'react'
import AccountContext from '@/components/context/AccountContext'
import CartContext from '@/components/context/CartContext'
import Navbar from './Navbar'

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
