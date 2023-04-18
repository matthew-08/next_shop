/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react'
import { useFetchSessionMutation } from 'graphql/generated/graphql'
import getToken from 'utils/getToken'
import { User } from '@/types/types'

const useFetchSession = () => {
  const [sessionChecked, setSessionChecked] = useState<boolean>(false)
  const [fetchedUser, setFetchedUser] = useState<null | User>(null)
  const [
    mutateFunction,
    { data: accountFetchData, loading: sessionFetchLoading, error },
  ] = useFetchSessionMutation()

  useEffect(() => {
    const checkForUser = async () => {
      const token = getToken()
      if (token) {
        await mutateFunction({
          variables: {
            input: {
              token,
            },
          },
        })
      } else {
        setSessionChecked(true)
      }
    }
    checkForUser()
  }, [])

  useEffect(() => {
    if (accountFetchData) {
      if (
        accountFetchData.checkForSession.__typename ===
        'MutationCheckForSessionSuccess'
      ) {
        const { email, cart, token, id } = accountFetchData.checkForSession.data
        setFetchedUser({
          email,
          id,
        })
        setSessionChecked(true)
      }
    }
  }, [accountFetchData])
  return [sessionChecked, fetchedUser] as const
}

export default useFetchSession
