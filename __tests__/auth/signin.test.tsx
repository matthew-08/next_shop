/* eslint-disable testing-library/no-render-in-setup */
import SignIn from '@/pages/auth/signin'
import { ApolloProvider, gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GraphQLError } from 'graphql'
import { LogInMutationResult, LogInDocument } from 'graphql/generated/graphql'

const signInMutation = gql`
  mutation LogIn($LoginType: LoginType!) {
    login(input: $LoginType) {
      __typename
      ... on MutationLoginSuccess {
        data {
          email
          id
          token
          cart {
            id
            userItems {
              item {
                itemDescription
                itemId
                itemImage
                itemName
                itemPrice
                itemQuantity
              }
            }
          }
        }
      }
      ... on Error {
        message
      }
    }
  }
`

const renderSignInComponent = () =>
  render(
    <MockedProvider>
      <SignIn />
    </MockedProvider>
  )

describe('SignIn Component', () => {
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
  /* describe('errors on server failure', () => {
    beforeEach(() => {
      render(
        <MockedProvider
          addTypename={false}
          mocks={[
            {
              request: {
                query: signInMutation,
                variables: { email: 'username1232@gmail.com', password: '123' },
              },
              result: {
                errors: [new GraphQLError('Invalid Email')]
              },
            },
          ]}
        >
          <SignIn />
        </MockedProvider>
      )
    })

    it.only('should set token in localstorage upon success', async () => {
      await userEvent.click(screen.getByText('Submit'))
      expect(await screen.findByText('Invalid email')).toBeInTheDocument()
    })
  }) */
})
