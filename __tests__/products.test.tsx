/* eslint-disable global-require */
import { render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MockedProvider } from '@apollo/client/testing'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'
import CartContext, { UserCartContext } from '@/components/_Context/CartContext'
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
    expect(await screen.findByText(/30/)).toBeInTheDocument()
  })

  it('should show all products', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Products />
      </MockedProvider>
    )
    expect(await screen.findAllByText('Add to cart')).toHaveLength(2)
  })

  it('should call the add to cart function on click', async () => {
    const handleAddToCart = jest.fn()
    render(
      <MockedProvider mocks={mocks}>
        <UserCartContext.Provider
          value={{
            handleAddToCart,
          }}
        >
          <Products />
        </UserCartContext.Provider>
      </MockedProvider>
    )
    const button = (await screen.findAllByText('Add to cart'))[0]
    await userEvent.click(button)

    expect(handleAddToCart).toHaveBeenCalled()
  })

  it('should add an item to the cart context', async () => {
    const cart: string[] = []
    const handleAddToCart = jest.fn(() => {
      cart.push('item')
    })

    render(
      <MockedProvider mocks={mocks}>
        <UserCartContext.Provider
          value={{
            handleAddToCart,
            cart,
          }}
        >
          <Products />
        </UserCartContext.Provider>
      </MockedProvider>
    )
    const button = (await screen.findAllByText('Add to cart'))[0]
    await userEvent.click(button)
    expect(handleAddToCart).toHaveBeenCalled()
    expect(cart).toHaveLength(1)
  })
})
