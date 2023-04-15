/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from '@testing-library/react'
import FormField from '@/components/Checkout/FormField'
import userEvent from '@testing-library/user-event'

const formRegister = jest.fn()
describe('FormField component', () => {
  describe('general component functionality', () => {
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

  describe('invalid input hanlding', () => {
    let input: HTMLElement
    beforeEach(() => {
      render(
        <FormField
          input="address"
          error={{
            errorMsg: 'invalid input',
            hasError: true,
          }}
          labelText="Address"
          register={formRegister}
        />
      )
      input = screen.getByLabelText('Address')
    })

    test('field is invalid if field has an error', () => {
      expect(input).toBeInvalid()
    })
    test('field shows an error message', () => {
      expect(screen.getByText('invalid input')).toBeInTheDocument()
    })
  })
  describe('number input', () => {
    beforeEach(() => {
      render(
        <FormField
          input="phoneNumber"
          error={{
            errorMsg: undefined,
            hasError: false,
          }}
          labelText="phone"
          register={formRegister}
        />
      )
    })
    test('renders', () => {
      expect(screen.getByLabelText('phone')).toHaveAttribute('type', 'number')
    })
  })
})
