import SignIn from '@/pages/auth/signin'
import { ApolloProvider } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const renderSignInComponent = () =>
  render(
    <MockedProvider>
      <SignIn />
    </MockedProvider>
  )

describe('SignIn Component', () => {
  const mocks = {}
  test('It should render the user input into fields', async () => {
    renderSignInComponent()
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    await userEvent.type(passwordInput, 'password123')
    await userEvent.type(emailInput, 'anemail@gmail.com')
    expect(emailInput).toHaveValue('anemail@gmail.com')
    expect(passwordInput).toHaveValue('password123')
  })
  test('disable the submit button if fields are not dirty', async () => {
    renderSignInComponent()
    const submitButton = screen.getByText(/submit/i)
    expect(submitButton).toBeDisabled()
    await userEvent.type(screen.getByLabelText(/email/i), 'anemail@gmail.com')
    expect(submitButton).not.toBeDisabled()
  })
})
