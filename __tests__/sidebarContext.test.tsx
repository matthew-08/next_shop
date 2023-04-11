/* eslint-disable no-plusplus */
import { UserCartContext } from '@/components/context/CartContext'
import SidebarContent from '@/components/SidebarContent'
import {
  screen,
  render,
  fireEvent,
  waitFor,
  getAllByTestId,
  findAllByTestId,
} from '@testing-library/react'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'
import { ShopItem } from 'graphql/generated/graphql'
import { KeyboardHost } from '@testing-library/user-event/dist/types/system/keyboard'

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

beforeEach(() => {
  cartMock = resetCartMock()
})

const handleRemoveFromCart = jest.fn(() => cartMock[0].itemQuantity--)
const handleAddToCart = jest.fn(() => cartMock[0].itemQuantity++)

const setup = (options: 'empty' | 'populated') =>
  render(
    <UserCartContext.Provider
      value={{
        cart: options === 'empty' ? emptyCartMock : resetCartMock(),
        handleRemoveFromCart,
        handleAddToCart,
      }}
    >
      <SidebarContent />
    </UserCartContext.Provider>
  )

describe('sidebar content', () => {
  it('should display cart items', () => {
    setup('populated')
    expect(screen.getByText('item')).toBeInTheDocument()
  })
  it('calls the removeFromCart function', async () => {
    setup('populated')
    const decrementButton = screen.getAllByRole('button')[0]
    await userEvent.click(decrementButton)
    expect(handleRemoveFromCart).toHaveBeenCalledTimes(1)
    jest.resetAllMocks()
  })

  it('decrements quantity upon click of decrement button', async () => {
    setup('populated')
    const button = screen.getAllByRole('button')[0]
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
    expect(cartMock[0].itemQuantity).toEqual(3)
  })
  /* 
  test('should show the correct price upon click of decrement', async () => {
    setup('populated')
    const decrementButton = screen.getAllByTestId('decrement-button')[0]
    await userEvent.dblClick(decrementButton)
    setup('populated')
    expect(await screen.findByText(/6/i)).toBeInTheDocument()
  })

  it('should show cart is empty text if cart is empty', () => {
    unmount()
    setup('empty')
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })

  it('should delete item from cart if decremented from 1', () => {
    setup('empty')
  })

  it('should show the calculated quantity * price', () => {
    setup('empty')
  }) */
})
