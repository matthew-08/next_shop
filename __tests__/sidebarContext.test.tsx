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

let cartMock: ShopItem[]
const emptyCartMock: any[] = []

beforeEach(() => {
  cartMock = [
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
})
const handleRemoveFromCart = jest.fn(() => cartMock[0].itemQuantity--)
const handleAddToCart = jest.fn(() => cartMock[0].itemQuantity++)

const setup = (options: 'empty' | 'populated') =>
  render(
    <UserCartContext.Provider
      value={{
        cart: options === 'empty' ? emptyCartMock : cartMock,
        handleRemoveFromCart,
        handleAddToCart,
      }}
    >
      <SidebarContent />
    </UserCartContext.Provider>
  )
const { rerender, unmount } = setup('populated')

describe('sidebar content', () => {
  it('should display cart items', () => {
    setup('populated')
    expect(screen.getByText('item')).toBeInTheDocument()
  })

  it('calls the removeFromCart function', () => {
    setup('populated')
    const decrementButton = screen.getAllByRole('button')[0]
    fireEvent.click(decrementButton)
    expect(handleRemoveFromCart).toHaveBeenCalled()
  })

  it('decrements quantity upon click of decrement button', async () => {
    setup('populated')
    const decrementButton = screen.getAllByTestId('decrement-button')[0]
    expect(decrementButton).toBeInTheDocument()
    await userEvent.dblClick(decrementButton)
    expect(handleRemoveFromCart).toBeCalledTimes(2)
    expect(cartMock[0].itemQuantity).toEqual(2)
  })

  it('should show the correct price upon click of decrement', async () => {
    setup('populated')
    const decrementButton = screen.getAllByTestId('decrement-button')[0]
    await userEvent.dblClick(decrementButton)
    expect(await screen.findByText('8')).toBeInTheDocument()
    jest.clearAllMocks()
  })

  it('should show cart is empty text if cart is empty', () => {
    setup('empty')
  })

  it('should delete item from cart if decremented from 1', () => {
    setup('empty')
  })

  it('should show the calculated quantity * price', () => {
    setup('empty')
  })
})
