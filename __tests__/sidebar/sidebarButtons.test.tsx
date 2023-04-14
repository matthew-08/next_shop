/* eslint-disable testing-library/no-render-in-setup */
import SidebarButtonGroup from '@/components/Sidebar/SidebarButtonGroup'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'))

describe('Sidebar Buttons', () => {
  const onClose = jest.fn()
  describe('user is not logged in and cart is empty', () => {
    beforeEach(() => {
      render(
        <SidebarButtonGroup
          onClose={onClose}
          user={{
            email: null,
            id: null,
          }}
          cart={[]}
        />
      )
    })
    test('Shows a login button instead of a checkout button', () => {
      expect(screen.getByText('Login')).toBeInTheDocument()
    })
  })
  describe('user is logged in and cart is empty', () => {
    beforeEach(() => {
      render(
        <SidebarButtonGroup
          onClose={onClose}
          user={{
            email: 'username123@gmail.com',
            id: '124124',
          }}
          cart={[]}
        />
      )
    })
    test('Shows a checkout button', () => {
      expect(screen.getByText('Checkout')).toBeInTheDocument()
    })
    test('disables the checkout button if cart is empty', () => {
      expect(screen.getByText('Checkout')).toBeDisabled()
    })
  })
  describe('user is logged in and cart is not empty', () => {
    beforeEach(() => {
      render(
        <SidebarButtonGroup
          onClose={onClose}
          user={{
            email: 'username123@gmail.com',
            id: '124124',
          }}
          cart={[
            {
              itemDescription: '1',
              itemId: '1',
              itemImage: '1',
              itemName: '1',
              itemPrice: 1,
              itemQuantity: 1,
              __typename: 'ShopItem',
            },
          ]}
        />
      )
    })
    test('Allows user to checkout if cart is populated', () => {
      expect(screen.getByText('Checkout')).not.toBeDisabled()
    })

    test('Redirects to checkout page upon click of checkout button', async () => {
      await userEvent.click(screen.getByText('Checkout'))
      await waitFor(() =>
        expect(mockRouter).toMatchObject({
          pathname: '/checkout',
        })
      )
    })
  })
})
