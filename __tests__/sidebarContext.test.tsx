/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable no-plusplus */
import { UserCartContext } from '@/components/context/CartContext'
import { screen, render } from '@testing-library/react'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'
import { ShopItem } from 'graphql/generated/graphql'
import SidebarContent from '@/components/Sidebar/SidebarContent'

let cartMock: ShopItem[]
const emptyCartMock: any[] = []

const resetCartMock = () => [
  {
    itemName: 'item',
    itemDescription: 'a description',
    itemId: '2',
    itemImage: 'image',
    itemPrice: 3,
    itemQuantity: 4,
  },
  {
    itemName: 'item 2',
    itemDescription: 'a description',
    itemId: '3',
    itemImage: 'image',
    itemPrice: 3,
    itemQuantity: 4,
  },
]

function setup() {
  const cart = resetCartMock()
  const handleRemoveFromCart = jest.fn(() => cart[0].itemQuantity--)
  const handleAddToCart = jest.fn(() => cart[0].itemQuantity++)
  return {
    ...render(
      <UserCartContext.Provider
        value={{
          cart,
          handleRemoveFromCart,
          handleAddToCart,
        }}
      >
        <SidebarContent />
      </UserCartContext.Provider>
    ),
    cart,
    handleRemoveFromCart,
    handleAddToCart,
  }
}

describe('sidebar content with cart items', () => {
  beforeEach(() => {})

  it.only('should display cart items', () => {
    setup()
    expect(screen.getByText('item')).toBeInTheDocument()
  })
  it.only('calls the removeFromCart function', async () => {
    const { handleRemoveFromCart } = setup()
    const decrementButton = screen.getAllByRole('button')[0]
    await userEvent.click(decrementButton)
    expect(handleRemoveFromCart).toHaveBeenCalledTimes(1)
    jest.resetAllMocks()
  })

  it.only('decrements quantity upon click of decrement button', async () => {
    const { cart } = setup()
    const button = screen.getAllByRole('button')[0]
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
    expect(cart[0].itemQuantity).toEqual(3)
  })

  test.only('should show the correct price upon click of decrement', async () => {
    const { unmount, rerender, cart } = setup()
    const decrementButton = screen.getAllByTestId('decrement-button')[0]
    await userEvent.dblClick(decrementButton)
    const { itemPrice, itemQuantity } = cart[0]
    const total = itemPrice * itemQuantity
    expect(total).toEqual(6)
  })

  it('should show cart is empty text if cart is empty', () => {
    setup()
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })
})
