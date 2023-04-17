/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutForm from '@/components/Checkout/CheckoutForm'
import { MockedProvider } from '@apollo/client/testing'
import mockRouter from 'next-router-mock'
import generateMutationMock from '__tests__/utils/generateMutationMock'
import {
  CheckoutMutation,
  CheckoutDocument,
  CheckoutMutationFn,
  CheckoutMutationVariables,
} from 'graphql/generated/graphql'
import { act } from 'react-dom/test-utils'

type FieldAndValues = {
  field: string
  value: string
}
// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'))

describe('checkout form', () => {
  describe('access to the page', () => {
    beforeEach(() => {
      render(
        <MockedProvider>
          <CheckoutForm cartId={null} />
        </MockedProvider>
      )
    })
    it('should redirect the user if the user has no active cart', () => {
      expect(mockRouter.pathname).not.toBe('/checkout')
    })
  })
  describe('submission of form', () => {
    const mock = generateMutationMock<
      CheckoutMutation,
      CheckoutMutationVariables
    >(
      CheckoutDocument,
      { checkout: 'link.com' },
      {
        cartId: '123',
      }
    )
    beforeEach(() => {
      render(
        <MockedProvider mocks={[mock]}>
          <CheckoutForm cartId="123" />
        </MockedProvider>
      )
    })
    test.only('Test without map', async () => {
      const submitButton = screen.getByText(/pay/i)
      const fieldAndValues: FieldAndValues[] = [
        {
          field: 'Last Name',
          value: 'person',
        },
        {
          field: 'First Name',
          value: 'persony',
        },
        {
          field: 'Address',
          value: '123 street street',
        },
        {
          field: 'Phone Number',
          value: '123123',
        },
        {
          field: 'Zip Code',
          value: '123123',
        },
        {
          field: 'City',
          value: 'city',
        },
      ]
      // eslint-disable-next-line no-restricted-syntax
      for (const { field, value } of fieldAndValues) {
        // eslint-disable-next-line no-await-in-loop
        await userEvent.type(screen.getByLabelText(field), value)
      }
      await userEvent.click(submitButton)
    })
  })
})
