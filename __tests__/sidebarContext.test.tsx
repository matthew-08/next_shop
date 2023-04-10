import { UserCartContext } from '@/components/context/CartContext'
import SidebarContent from '@/components/SidebarContent'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'

const cartMock = [
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

const emptyCartMock: any[] = []
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

describe('sidebar content', () => {
  it('should display cart items', () => {
    setup('populated')
    expect(screen.getByText('item')).toBeInTheDocument()
  })

  it('calls the remove from cart function', () => {
    setup('populated')
    const decrementButton = screen.getAllByRole('button')[0]
    fireEvent.click(decrementButton)
    expect(handleRemoveFromCart).toHaveBeenCalled()
  })

  it('decrements quantity upon click of decrement button', async () => {
    setup('populated')
    const decrementButton = screen.getAllByTestId('decrement-button')[0]
    console.log(decrementButton)
    expect(decrementButton).toBeInTheDocument()
    const quantityCount = screen.getAllByTestId('cart-quantity')[0]
    expect(quantityCount).toHaveTextContent('3')
    await userEvent.click(decrementButton)
  })

  it('should show the correct quantity upon click of decrement', () => {
    setup('populated')
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
