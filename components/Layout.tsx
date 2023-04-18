import React, { ReactNode } from 'react'
import AccountContext from '@/components/_Context/AccountContext'
import CartContext from '@/components/_Context/CartContext'
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
