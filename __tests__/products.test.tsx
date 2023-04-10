import { findByText, getByText, render, screen } from '@testing-library/react'
import Sidebar from '@/components/Sidebar'
import AccountContext, {
  AuthContext,
} from '@/components/context/AccountContext'
import mockRouter from 'next-router-mock'
import { MockedProvider } from '@apollo/client/testing'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'
import CartContext, { UserCartContext } from '@/components/context/CartContext'
import Products from '@/pages/products'
import { FetchShopItemsDocument, ShopItem } from 'graphql/generated/graphql'

jest.mock('next/router', () => require('next-router-mock'))

describe('products', () => {
  const allItems: ShopItem[] = [
    {
      itemDescription: 'test',
      itemId: '1',
      itemImage: 'image',
      itemName: 'test-item',
      itemPrice: 30,
      itemQuantity: 4,
    },
    {
      itemDescription: 'test',
      itemId: '2',
      itemImage: 'image',
      itemName: 'test-item-2',
      itemPrice: 40,
      itemQuantity: 4,
    },
  ]
  const mocks = [
    {
      request: {
        query: FetchShopItemsDocument,
      },
      result: {
        data: {
          allItems,
        },
      },
    },
  ]
  it('should show a loading screen while fetching items', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Products />
      </MockedProvider>
    )

    expect(screen.getAllByRole('status')[0]).toBeInTheDocument()
  })
  it('should show products after loading', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Products />
      </MockedProvider>
    )
    expect(await screen.findByText('test-item')).toBeInTheDocument()
    expect(await screen.findByText('$30')).toBeInTheDocument()
  })

  it('should show all products', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Products />
      </MockedProvider>
    )
    expect(await screen.findAllByText('Add to cart')).toHaveLength(2)
  })
})
