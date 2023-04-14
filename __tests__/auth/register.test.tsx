/* eslint-disable global-require */
/* eslint-disable testing-library/no-render-in-setup */
import Register from '@/pages/auth/register'
import {
  screen,
  render,
  getByLabelText,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { MockedProvider } from '@apollo/client/testing'
import userEvent from '@testing-library/user-event'
import {
  RegisterDocument,
  RegisterMutation,
  RegisterMutationOptions,
  RegisterMutationResult,
  RegisterMutationVariables,
} from 'graphql/generated/graphql'
import generateMutationMock from '__tests__/utils/generateMutationMock'

jest.mock('next/router', () => require('next-router-mock'))

const inputs = {
  email: () => screen.getByLabelText(/email/i),
  password: () => screen.getByLabelText('Password'),
  confirmPassword: () => screen.getByLabelText('Confirm Password'),
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

  describe('form state', () => {
    beforeEach(() => {
      render(
        <MockedProvider>
          <Register />
        </MockedProvider>
      )
    })
    describe('Error fields on empty input', () => {
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
    describe('email input messages', () => {
      test('shows invalid email message if user does not adhere to email format', async () => {
        await userEvent.type(inputs.email(), 'auser')
        await userEvent.click(buttons.submitButton())
        expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
        expect(inputs.email()).toBeInvalid()
      })
    })
    describe('password input messages', () => {
      test('shows error message when password is too short', async () => {
        await userEvent.type(inputs.password(), '11')
        await userEvent.click(buttons.submitButton())
        expect(
          await screen.findByText(/at least 6 characters/i)
        ).toBeInTheDocument()
      })
      test('shows error message when passwords do not match', async () => {
        await userEvent.type(inputs.password(), 'password123')
        await userEvent.type(inputs.confirmPassword(), 'password1234')
        await userEvent.click(buttons.submitButton())
        expect(inputs.confirmPassword()).toBeInvalid()
        expect(await screen.findByText(/match/)).toBeInTheDocument()
      })
    })
  })

  describe('submit with valid input', () => {
    beforeEach(() => {
      const mock = generateMutationMock<
        RegisterMutation,
        RegisterMutationVariables
      >(
        RegisterDocument,
        {
          register: {
            __typename: 'MutationRegisterSuccess',
            data: {
              token: '123',
              email: 'anemail@gmail.com',
              id: '1',
            },
          },
        },
        {
          UserRegisterInput: {
            email: 'anemail@gmail.com',
            password: 'password123',
          },
        }
      )
      render(
        <MockedProvider mocks={[mock]}>
          <Register />
        </MockedProvider>
      )
    })
    test('redirects upon successful login', async () => {
      await userEvent.type(inputs.password(), 'password123')
      await userEvent.type(inputs.confirmPassword(), 'password123')
      await userEvent.type(inputs.email(), 'anemail@gmail.com')
      await userEvent.click(buttons.submitButton())
      await waitFor(() =>
        expect(mockRouter).toMatchObject({
          pathname: '/products',
        })
      )
    })
  })
})
