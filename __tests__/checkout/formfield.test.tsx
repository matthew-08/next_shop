import { render, screen } from '@testing-library/react'
import FormField from '@/components/Checkout/FormField'
import userEvent from '@testing-library/user-event'

describe('FormField component', () => {
  const formRegister = jest.fn()
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <FormField
        input="address"
        error={{
          errorMsg: undefined,
          hasError: false,
        }}
        labelText="Address"
        register={formRegister}
      />
    )
  })
  test('Renders the label text', () => {
    expect(screen.getByLabelText('Address')).toBeInTheDocument()
  })
  test('renders text into the field', async () => {
    const input = screen.getByLabelText('Address')
    await userEvent.type(input, '123 street')
    expect(input).toHaveValue('123 street')
  })
  test('registers the component into form state', () => {
    expect(formRegister).toHaveBeenCalled()
  })
  test('registers the component into form state with the corresponding input type', () => {
    expect(formRegister).toHaveBeenCalledWith('address')
  })
})
