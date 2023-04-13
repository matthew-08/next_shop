/* eslint-disable testing-library/no-render-in-setup */
import Register from '@/pages/auth/register'
import { screen, render, getByLabelText } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => require('next-router-mock'))

const inputs = {
  email: () => screen.getByLabelText(/email/i),
  password: () => screen.getByLabelText('Password'),
}

const buttons = {
  submitButton: () => screen.getByText('Submit'),
}

describe('Register Component', () => {
  it('Renders', () => {
    render(
      <MockedProvider>
        <Register />
      </MockedProvider>
    )
  })

  describe('Error fields on empty input', () => {
    beforeEach(() => {
      render(
        <MockedProvider>
          <Register />
        </MockedProvider>
      )
    })
    test('shows error message for email input', async () => {
      await userEvent.type(inputs.password(), '3333')
      await userEvent.click(buttons.submitButton())
      expect(inputs.email()).toBeInvalid()
    })
    test('shows error message for password input', async () => {
      await userEvent.type(inputs.email(), 'auser@gmail.com')
      await userEvent.click(buttons.submitButton())
      expect(inputs.password()).toBeInvalid()
    })
  })
})
