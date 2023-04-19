/* eslint-disable no-underscore-dangle */
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import useFetchSession from 'utils/hooks/FetchSession'
import { User, AuthContextType } from '../../types/types'

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
})

function AccountContext({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    id: null,
    email: null,
  })
  const [fetchedSession, fetchedUser] = useFetchSession()
  useEffect(() => {
    if (fetchedSession && fetchedUser) {
      setUser(fetchedUser)
    }
  }, [fetchedSession, fetchedUser])

  const contextValue = useMemo(() => ({ user, setUser }), [user])
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AccountContext
