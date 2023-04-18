/* eslint-disable no-underscore-dangle */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useFetchSessionMutation } from 'graphql/generated/graphql'
import getToken from 'utils/getToken'
import useFetchSession from 'utils/hooks/FetchSession'
import { User, AuthContextType } from '../../types/types'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
  accountFetchData: null,
  sessionFetchLoading: false,
})

function AccountContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: null,
    email: null,
  })
  const [fetchedSession, fetchedUser] = useFetchSession()
  const [
    mutateFunction,
    { data: accountFetchData, loading: sessionFetchLoading, error },
  ] = useFetchSessionMutation()
  useEffect(() => {
    if (fetchedSession && fetchedUser) {
      setUser(fetchedUser)
    }
  }, [fetchedSession, fetchedUser])
  useEffect(() => {
    if (accountFetchData) {
      if (
        accountFetchData.checkForSession.__typename ===
        'MutationCheckForSessionSuccess'
      ) {
        const { email, cart, token, id } = accountFetchData.checkForSession.data
        setUser({
          email,
          id,
        })
      }
    }
  }, [accountFetchData])
  return (
    <AuthContext.Provider
      value={{ user, setUser, accountFetchData, sessionFetchLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AccountContext
