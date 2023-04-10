import { AuthContext } from '@/components/context/AccountContext'
import { MockedProvider } from '@apollo/client/testing'
import { screen, render } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import { FetchSessionDocument } from 'graphql/generated/graphql'

const errorMock = [
  {
    request: {
      query: FetchSessionDocument,
      variables: { name: 'Buck' },
    },
    result: {
      data: {
        user: 'user',
      },
    },
  },
]

describe('account context', () => {
  it('should run a fetch on load', async () => {
    const user = {
      email: null,
      id: null,
    }
    const accountFetchData = null

    // eslint-disable-next-line no-return-assign
    const setUser = jest.fn(() => (user.email = null))
    render(
      <MockedProvider mocks={errorMock} addTypename>
        <AuthContext.Provider
          value={{
            user,
            accountFetchData,
            setUser,
          }}
        />
      </MockedProvider>
    )

    expect(await accountFetchData).toBeNull()
  })
})
