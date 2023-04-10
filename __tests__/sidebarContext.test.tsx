import { UserCartContext } from '@/components/context/CartContext'
import SidebarContent from '@/components/SidebarContent'
import { screen, render, fireEvent } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event/dist/types/setup'

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

const emptyCartMock = []

const setup = (options: 'empty' | 'populated') =>
  render(
    <UserCartContext.Provider
      value={{
        cart: options === 'empty' ? emptyCartMock : cartMock,
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
  it('should increment upon click of the corresponding button', () => {
    setup('populated')
    fireEvent.click(screen.getByRole('button'))
  })
})
