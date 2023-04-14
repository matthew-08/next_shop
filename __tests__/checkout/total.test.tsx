import TotalSection from '@/components/Checkout/TotalSection'
import { render, screen } from '@testing-library/react'

describe('total section', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<TotalSection total={50} />)
  })
  test('it should render the correct subtotal', () => {
    expect(screen.getByTestId('subtotal')).toHaveTextContent(/50/)
  })
  test('it should render the correct tax', () => {
    expect(screen.getByTestId('tax')).toHaveTextContent(/3.50/)
  })
})
