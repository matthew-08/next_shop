import TotalSection from '@/components/Checkout/TotalSection'
import { render } from '@testing-library/react'

describe('total section', () => {
  beforeEach(() => {
    render(<TotalSection total={50} />)
  })
  test('it should render the total', () => {
    expect('')
  })
})
